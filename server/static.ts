import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { resolveLegacy } from "./legacy";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const notFoundPage = path.resolve(distPath, "404/index.html");

  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    const url = new URL(req.originalUrl, "http://localhost");

    const legacy = resolveLegacy(url.pathname, url.searchParams);
    if (legacy?.status === 301) return res.redirect(301, legacy.location);
    if (legacy?.status === 410) return res.status(410).sendFile(notFoundPage);

    // A página de erro pré-renderizada só existe para ser servida com status
    // de erro. Acessada direto, responder 200 a faz parecer uma página real
    // (soft 404 no Search Console).
    if (/^\/404(\/|\/index\.html)?$/.test(url.pathname)) {
      return res.status(404).sendFile(notFoundPage);
    }

    // /rota/index.html duplicaria /rota/: aponta para a URL canônica.
    if (url.pathname.endsWith("/index.html")) {
      // Barras iniciais colapsadas: "//host/" viraria redirect para outro domínio.
      const canonical = url.pathname.slice(0, -"index.html".length).replace(/^\/+/, "/");
      return res.redirect(301, `${canonical}${url.search}`);
    }

    next();
  });

  app.use(express.static(distPath));

  // Unknown URLs are real 404s, rendered from the prebuilt noindex page.
  app.use("/{*path}", (_req, res) => {
    res.status(404).sendFile(notFoundPage);
  });
}
