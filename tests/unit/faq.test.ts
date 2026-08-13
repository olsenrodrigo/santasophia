import { describe, expect, it } from "vitest";
import {
  faqByCategory,
  faqByIds,
  faqEntries,
  faqSchemaItems,
  parseFaqAnswer,
  segmentFaq,
  segmentFaqAll,
  type SegmentFaqKey,
} from "@/content/faq";

describe("conteúdo do FAQ (fonte única página + JSON-LD)", () => {
  it("tem as 20 perguntas aprovadas do faq.md, com ids únicos", () => {
    expect(faqEntries).toHaveLength(20);
    const ids = faqEntries.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("nenhuma resposta contém HTML apesar do nome answerHtml (nada para injetar)", () => {
    for (const entry of faqEntries) {
      expect(entry.answerHtml, entry.id).not.toMatch(/<[a-z!/]/i);
    }
  });

  it("nenhuma resposta promete contemplação nem dinheiro rápido (compliance BACEN)", () => {
    for (const entry of faqEntries) {
      expect(entry.answerHtml).not.toMatch(/contempla[çc][ãa]o garantida|aprova[çc][ãa]o imediata/i);
      expect(entry.answerHtml).not.toMatch(/(?<!não é )dinheiro r[áa]pido/i);
    }
  });

  it("faqByIds falha alto para id inexistente (nada de FAQ silenciosamente vazio)", () => {
    expect(() => faqByIds("nao-existe")).toThrow(/FAQ não encontrado/);
  });

  it("todo segmento referencia apenas ids existentes, sem duplicatas entre items e related", () => {
    for (const key of Object.keys(segmentFaq) as SegmentFaqKey[]) {
      const todas = segmentFaqAll(key);
      expect(todas.length).toBe(segmentFaq[key].items.length + segmentFaq[key].related.length);
      const ids = todas.map((e) => e.id);
      expect(new Set(ids).size, `duplicata em ${key}`).toBe(ids.length);
    }
  });

  it("faqSchemaItems espelha pergunta e resposta 1:1", () => {
    const consorcio = faqByCategory("consorcio");
    const schema = faqSchemaItems(consorcio);
    expect(schema.map((s) => s.question)).toEqual(consorcio.map((e) => e.question));
    expect(schema.map((s) => s.answer)).toEqual(consorcio.map((e) => e.answerHtml));
  });
});

describe("parseFaqAnswer", () => {
  it("divide parágrafos por linha em branco", () => {
    const blocks = parseFaqAnswer("Primeiro.\n\nSegundo.");
    expect(blocks).toEqual([
      { type: "paragraph", text: "Primeiro." },
      { type: "paragraph", text: "Segundo." },
    ]);
  });

  it("reconhece lista de itens terminados em ponto e vírgula", () => {
    const blocks = parseFaqAnswer("Considere:\n\nprazo;\nvalor da carta;\nparcelas.");
    expect(blocks[1]).toEqual({
      type: "unordered-list",
      items: ["prazo;", "valor da carta;", "parcelas."],
    });
  });

  it("agrupa itens numerados consecutivos com detalhe na linha seguinte", () => {
    const blocks = parseFaqAnswer(
      "Antes de contratar, analise:\n\n1. O valor do crédito\nQual é o bem?\n\n2. O prazo\nQuanto tempo?\n\nConclusão final.",
    );
    expect(blocks).toEqual([
      { type: "paragraph", text: "Antes de contratar, analise:" },
      {
        type: "ordered-list",
        items: [
          { title: "O valor do crédito", detail: "Qual é o bem?" },
          { title: "O prazo", detail: "Quanto tempo?" },
        ],
      },
      { type: "paragraph", text: "Conclusão final." },
    ]);
  });

  it("lista numerada sem detalhe (caso aquisição de caminhões, 7 itens)", () => {
    const entrada = Array.from({ length: 7 }, (_, i) => `${i + 1}. Item ${i + 1}`).join("\n\n");
    const blocks = parseFaqAnswer(`${entrada}\n\nPor isso, avalie o conjunto.`);
    expect(blocks[0].type).toBe("ordered-list");
    expect((blocks[0] as { items: unknown[] }).items).toHaveLength(7);
    expect(blocks[1]).toEqual({ type: "paragraph", text: "Por isso, avalie o conjunto." });
  });

  it("string vazia e só espaços não quebram", () => {
    expect(parseFaqAnswer("")).toEqual([{ type: "paragraph", text: "" }]);
    expect(parseFaqAnswer("   \n\n   ")).toEqual([{ type: "paragraph", text: "" }]);
  });

  it("toda resposta real do site é parseável e não perde conteúdo relevante", () => {
    for (const entry of faqEntries) {
      const blocks = parseFaqAnswer(entry.answerHtml);
      expect(blocks.length, entry.id).toBeGreaterThan(0);
      const textoRenderizado = blocks
        .map((b) =>
          b.type === "paragraph"
            ? b.text
            : b.type === "unordered-list"
              ? b.items.join(" ")
              : b.items.map((i) => `${i.title} ${i.detail ?? ""}`).join(" "),
        )
        .join(" ");
      const palavrasOriginais = entry.answerHtml.split(/\s+/).filter(Boolean);
      const palavrasRender = textoRenderizado.split(/\s+/).filter(Boolean);
      // nenhuma palavra da copy aprovada pode sumir na renderização
      // (números de lista "1." são consumidos pelo marcador visual do <ol>)
      const faltantes = palavrasOriginais.filter(
        (p) => !/^\d+\.$/.test(p) && !palavrasRender.includes(p),
      );
      expect(faltantes, entry.id).toEqual([]);
    }
  });
});
