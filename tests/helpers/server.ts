import { spawn, type ChildProcess } from "node:child_process";
import { mkdtemp, readFile } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const SERVER_BUNDLE = path.resolve(import.meta.dirname, "../../dist/index.cjs");

export interface TestServer {
  url: string;
  port: number;
  dataFile: string;
  child: ChildProcess;
  logText(): string;
  jsonlCount(): Promise<number>;
  stop(): Promise<void>;
}

async function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address() as net.AddressInfo;
      probe.close(() => resolve(port));
    });
  });
}

/**
 * Sobe o bundle real de produção (dist/index.cjs) num diretório temporário,
 * sem DATABASE_URL/SMTP_USER (força o fallback JSONL, sem e-mail), capturando
 * stdout+stderr — necessário para o INV-5 (nenhum dado pessoal em log).
 */
export async function startTestServer(): Promise<TestServer> {
  const cwd = await mkdtemp(path.join(os.tmpdir(), "santa-sophia-qa-"));
  const port = await freePort();
  const env = { ...process.env, PORT: String(port), NODE_ENV: "production" };
  delete env.DATABASE_URL;
  delete env.SMTP_USER;

  const child = spawn(process.execPath, [SERVER_BUNDLE], { cwd, env });
  const logs: string[] = [];
  child.stdout.on("data", (chunk: Buffer) => logs.push(chunk.toString()));
  child.stderr.on("data", (chunk: Buffer) => logs.push(chunk.toString()));

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`servidor não subiu em 10s:\n${logs.join("")}`)),
      10_000,
    );
    const poll = setInterval(() => {
      if (logs.join("").includes(`serving on port ${port}`)) {
        clearTimeout(timer);
        clearInterval(poll);
        resolve();
      }
    }, 25);
    child.once("exit", (code) => {
      clearTimeout(timer);
      clearInterval(poll);
      reject(new Error(`servidor saiu com código ${code}:\n${logs.join("")}`));
    });
  });

  const dataFile = path.join(cwd, "data", "contact-messages.jsonl");

  return {
    url: `http://127.0.0.1:${port}`,
    port,
    dataFile,
    child,
    logText: () => logs.join(""),
    jsonlCount: async () => {
      try {
        const content = await readFile(dataFile, "utf8");
        return content.split("\n").filter(Boolean).length;
      } catch {
        return 0;
      }
    },
    stop: () =>
      new Promise<void>((resolve) => {
        if (child.exitCode !== null) return resolve();
        child.once("exit", () => resolve());
        child.kill("SIGTERM");
        setTimeout(() => child.kill("SIGKILL"), 2_000).unref();
      }),
  };
}

/**
 * O rate limit de produção é 10 requisições por IP a cada 15 min; os testes
 * reiniciam o servidor a cada lote para nunca esbarrar nele (reinício zera o
 * Map em memória). Mantém a pilha 100% real — sem app replicado em teste.
 */
export function createServerPool(requestsPerInstance = 9) {
  let server: TestServer | null = null;
  let used = 0;

  return {
    async acquire(): Promise<TestServer> {
      if (!server || used >= requestsPerInstance) {
        await server?.stop();
        server = await startTestServer();
        used = 0;
      }
      used += 1;
      return server;
    },
    current(): TestServer | null {
      return server;
    },
    async dispose() {
      await server?.stop();
      server = null;
    },
  };
}

/** Espera o flush do log de request (res "finish" é assíncrono em relação ao fetch). */
export function settle(ms = 40): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
