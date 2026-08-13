import fc from "fast-check";
import { afterAll, describe, expect, it } from "vitest";
import { createServerPool, settle } from "../helpers/server";

/**
 * Propriedades do catálogo Sintetiza (~/.claude/sintetiza/invariantes.md)
 * aplicadas à única borda pública do site: POST /api/contact.
 *
 * Os testes rodam contra o bundle real de produção (dist/index.cjs) — rode
 * `npm run build` antes. O pool reinicia o servidor a cada 9 requisições para
 * não esbarrar no rate limit (10/15min por IP).
 */

const STACK_TRACE = /at .*\(.*:\d+:\d+\)/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Regras de negócio do formulário (shared/schema.ts): nome ≥2, telefone ≥8,
 * e-mail válido, mensagem ≥2. Aqui só as condições NECESSÁRIAS — não
 * reimplementamos o validador (oráculo espelho herdaria os mesmos bugs).
 */
function satisfazRegrasDeNegocio(payload: unknown): boolean {
  if (!isRecord(payload)) return false;
  const { name, phone, email, message } = payload;
  return (
    typeof name === "string" && name.length >= 2 &&
    typeof phone === "string" && phone.length >= 8 &&
    typeof email === "string" && email.includes("@") && !/\s/.test(email) &&
    typeof message === "string" && message.length >= 2
  );
}

const stringAdversarial = fc.oneof(
  fc.string(),
  fc.string({ unit: "grapheme", maxLength: 30 }),          // unicode / emoji
  fc.constantFrom("", " ", "  ", "\t\t", "  "),  // vazia / só espaços
  fc.string({ minLength: 10_000, maxLength: 12_000 }),     // strings gigantes 10k+
  fc.constantFrom(
    "<script>alert(1)</script>",
    "<img src=x onerror=alert(1)>",
    "'; DROP TABLE contact_messages; --",
    "\" OR 1=1 --",
    "a@b",
    "a@b.co",
    "nao-e-email",
  ),
);

const valorAdversarial = fc.oneof(
  stringAdversarial,
  fc.integer(),
  fc.double(),
  fc.boolean(),
  fc.constant(null),
  fc.array(fc.string({ maxLength: 5 }), { maxLength: 3 }),
  fc.dictionary(fc.string({ maxLength: 5 }), fc.string({ maxLength: 5 }), { maxKeys: 3 }),
);

const payloadAdversarial = fc.oneof(
  { arbitrary: fc.record(
      { name: valorAdversarial, phone: valorAdversarial, email: valorAdversarial, message: valorAdversarial },
      { requiredKeys: [] },
    ), weight: 5 },
  { arbitrary: fc.dictionary(
      fc.oneof(fc.string({ maxLength: 8 }), fc.constantFrom("__proto__", "constructor", "prototype")),
      fc.anything(),
      { maxKeys: 4 },
    ), weight: 2 },
  { arbitrary: fc.anything(), weight: 2 },
  { arbitrary: fc.constantFrom<unknown>(null, [], "", 0, 42, "texto solto", {}), weight: 1 },
);

describe("INV-2 — toda borda valida a entrada (harness #7)", () => {
  const pool = createServerPool(9);
  afterAll(() => pool.dispose());

  it("POST /api/contact nunca responde 5xx e nunca aceita payload que viole as regras de negócio", async () => {
    await fc.assert(
      fc.asyncProperty(payloadAdversarial, async (payload) => {
        const server = await pool.acquire();
        const antes = await server.jsonlCount();

        const body = JSON.stringify(payload) ?? "undefined";
        const res = await fetch(`${server.url}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        const texto = await res.text();

        expect(res.status, `payload=${body.slice(0, 200)}`).toBeLessThan(500);

        if (res.status === 201) {
          expect(satisfazRegrasDeNegocio(payload), `aceitou payload inválido: ${body.slice(0, 200)}`).toBe(true);
          expect(await server.jsonlCount()).toBe(antes + 1);
        } else {
          const corpo = JSON.parse(texto) as Record<string, unknown>;
          expect(typeof corpo.message).toBe("string"); // erro estruturado
          expect(texto).not.toMatch(STACK_TRACE);      // sem stack trace na resposta
          expect(await server.jsonlCount()).toBe(antes); // nada persistido
        }
      }),
      { numRuns: 300 },
    );
  }, 300_000);
});

describe("INV-5 — dado pessoal não vai para log (harness #9, LGPD)", () => {
  let sequencia = 0;

  /** Marcadores únicos e improváveis de colidir com texto legítimo de log. */
  const dadoPessoal = fc.integer({ min: 100_000, max: 999_999 }).map((n) => {
    sequencia += 1;
    const id = `${n}s${sequencia}`;
    return {
      name: `Titular Qalgpd${id}`,
      phone: `9198${n}${sequencia % 10}`,
      email: `qalgpd${id}@exemplo-lgpd.com.br`,
      message: `Quero uma simulação. marcador-qalgpd-${id}`,
    };
  });

  describe("caminho válido", () => {
    const pool = createServerPool(9);
    afterAll(() => pool.dispose());

    it("nenhum nome/telefone/e-mail de contato válido aparece no stdout/stderr do servidor", async () => {
      await fc.assert(
        fc.asyncProperty(dadoPessoal, async (contato) => {
          const server = await pool.acquire();
          const res = await fetch(`${server.url}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contato),
          });
          expect(res.status).toBe(201);

          await settle(); // o log de request é emitido no "finish" da resposta
          const log = server.logText();
          for (const valor of [contato.name, contato.phone, contato.email]) {
            expect(log, `valor pessoal vazou para o log: ${valor}`).not.toContain(valor);
          }
        }),
        { numRuns: 200 },
      );
    }, 300_000);
  });

  describe("caminho de erro (o vazamento clássico é o catch que loga o payload inteiro)", () => {
    const pool = createServerPool(50); // JSON malformado falha antes do rate limit
    afterAll(() => pool.dispose());

    it("dado pessoal em requisição malformada também não pode aparecer no log", async () => {
      await fc.assert(
        fc.asyncProperty(dadoPessoal, async (contato) => {
          const server = await pool.acquire();
          // JSON truncado/quebrado — como um cliente com bug, proxy ou retry cortado enviaria
          const body = `{"name":"${contato.name}","phone":"${contato.phone}","email":"${contato.email}", quebrado`;
          const res = await fetch(`${server.url}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          });
          expect(res.status).toBe(400);

          await settle();
          const log = server.logText();
          for (const valor of [contato.name, contato.phone, contato.email]) {
            expect(log, `valor pessoal vazou para o log: ${valor}`).not.toContain(valor);
          }
        }),
        { numRuns: 50 },
      );
    }, 300_000);
  });
});
