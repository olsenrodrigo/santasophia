import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startTestServer, type TestServer } from "../helpers/server";

/**
 * Testes de exemplo da borda POST /api/contact contra o bundle real de
 * produção (dist/index.cjs) — casos felizes, inválidos, payload gigante,
 * content-type errado, method not allowed e rate limit.
 */

describe("POST /api/contact", () => {
  let server: TestServer;

  beforeAll(async () => {
    server = await startTestServer();
  });
  afterAll(() => server.stop());

  function post(body: string, contentType = "application/json") {
    return fetch(`${server.url}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
    });
  }

  it("aceita contato válido com 201 e persiste no JSONL (fallback sem Postgres/SMTP)", async () => {
    const antes = await server.jsonlCount();
    const res = await post(JSON.stringify({
      name: "Maria de Lourdes",
      phone: "16 99999-0000",
      email: "maria@example.com",
      message: "Objetivo: Imóveis\n\nQuero planejar a compra de um apartamento.",
    }));
    expect(res.status).toBe(201);
    const corpo = await res.json();
    expect(corpo.success).toBe(true);
    expect(typeof corpo.id).toBe("number");
    expect(await server.jsonlCount()).toBe(antes + 1);
  });

  it("rejeita campos ausentes com 400 e erro estruturado", async () => {
    const res = await post(JSON.stringify({ name: "A" }));
    expect(res.status).toBe(400);
    const corpo = await res.json();
    expect(corpo.message).toMatch(/name|phone|email|message/);
  });

  it("rejeita e-mail inválido com 400", async () => {
    const res = await post(JSON.stringify({
      name: "QA", phone: "12345678", email: "nao-e-email", message: "oi",
    }));
    expect(res.status).toBe(400);
  });

  it("rejeita content-type errado com 400 (body não parseado não vira contato)", async () => {
    const antes = await server.jsonlCount();
    const res = await post(
      JSON.stringify({ name: "QA Teste", phone: "12345678", email: "a@b.co", message: "oi" }),
      "text/plain",
    );
    expect(res.status).toBe(400);
    expect(await server.jsonlCount()).toBe(antes);
  });

  it("rejeita payload gigante (>100kb) com 413 sem derrubar o servidor", async () => {
    const res = await post(JSON.stringify({
      name: "QA", phone: "12345678", email: "a@b.co", message: "x".repeat(200_000),
    }));
    expect(res.status).toBe(413);
    const depois = await post(JSON.stringify({
      name: "Contato Válido", phone: "12345678", email: "a@b.co", message: "ainda vivo",
    }));
    expect(depois.status).toBe(201);
  });

  it("JSON malformado responde 400 estruturado", async () => {
    const res = await post('{"name":"quebrado"');
    expect(res.status).toBe(400);
    const corpo = await res.json();
    expect(typeof corpo.message).toBe("string");
  });

  it("GET e PUT no endpoint não são atendidos (404 via catch-all)", async () => {
    const get = await fetch(`${server.url}/api/contact`);
    const put = await fetch(`${server.url}/api/contact`, { method: "PUT" });
    expect(get.status).toBe(404);
    expect(put.status).toBe(404);
  });
});

describe("rate limit do /api/contact", () => {
  let server: TestServer;

  beforeAll(async () => {
    server = await startTestServer();
  });
  afterAll(() => server.stop());

  it("bloqueia com 429 a partir da 11ª requisição do mesmo IP em 15 min", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 12; i += 1) {
      const res = await fetch(`${server.url}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Rate Limit ${i}`, phone: "16999990000", email: `rl${i}@example.com`, message: "teste",
        }),
      });
      statuses.push(res.status);
      if (res.status === 429) {
        expect(res.headers.get("RateLimit-Remaining")).toBe("0");
      }
    }
    expect(statuses.slice(0, 10).every((s) => s === 201)).toBe(true);
    expect(statuses.slice(10).every((s) => s === 429)).toBe(true);
  });
});
