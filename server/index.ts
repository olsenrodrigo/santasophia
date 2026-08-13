import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import compression from "compression";

const app = express();
const httpServer = createServer(app);

// Atras de CDN/proxy, sem isto todos os visitantes compartilham o mesmo IP
// e portanto o mesmo balde de rate-limit — o formulario para de funcionar.
if (process.env.TRUST_PROXY) {
  const value = process.env.TRUST_PROXY;
  app.set("trust proxy", /^\d+$/.test(value) ? Number(value) : value);
}

app.use(compression());

// O corpo bruto não é retido: o site não verifica assinatura de webhook e a
// única rota de API recebe dado pessoal (LGPD). Guardar o buffer só criaria
// mais um lugar de onde ele pode vazar.
app.use(express.json({ limit: "64kb" }));

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      // O corpo da resposta só entra no log fora de produção: mensagens de
      // validação podem ecoar o que o usuário digitou (LGPD).
      if (capturedJsonResponse && process.env.NODE_ENV !== "production") {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;

    // Nunca logue o objeto de erro inteiro: o body-parser anexa o payload cru
    // em `err.body` quando o JSON chega malformado, e ele carrega nome,
    // telefone e e-mail do visitante (LGPD, regra #9 do harness).
    if (status >= 500) {
      console.error(`[erro] ${req.method} ${req.path} ${status} ${err.type ?? err.name ?? "Error"}`);
      if (err.stack) console.error(err.stack);
    } else {
      log(`${req.method} ${req.path} ${status} ${err.type ?? "client_error"}`, "erro");
    }

    if (res.headersSent) {
      return next(err);
    }

    // A mensagem do parser de JSON embute trecho do corpo recebido, então ela
    // não pode voltar na resposta nem ser capturada pelo logger de requisição.
    const isParseError = err.type === "entity.parse.failed" || err instanceof SyntaxError;
    const isTooLarge = err.type === "entity.too.large";
    const message = isParseError
      ? "JSON inválido."
      : isTooLarge
        ? "Requisição muito grande."
        : status >= 500
          ? "Erro interno do servidor."
          : err.message || "Requisição inválida.";

    return res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
