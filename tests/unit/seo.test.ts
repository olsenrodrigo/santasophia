import { describe, expect, it } from "vitest";
import { absUrl, whatsappUrl, SITE_URL, WHATSAPP_BASE_URL } from "@/seo/constants";
import { findRouteMeta, notFoundRoute, routes } from "@/seo/routes";
import { buildHead } from "../../script/prerender";

describe("absUrl", () => {
  it("raiz vira URL absoluta com barra final", () => {
    expect(absUrl("/")).toBe(`${SITE_URL}/`);
  });

  it("preserva trailing slash das rotas internas", () => {
    expect(absUrl("/consorcio-de-imoveis/")).toBe(`${SITE_URL}/consorcio-de-imoveis/`);
  });

  it("aceita path sem barra inicial", () => {
    expect(absUrl("og/default.jpg")).toBe(`${SITE_URL}/og/default.jpg`);
  });
});

describe("whatsappUrl", () => {
  it("aponta para o número aprovado pelo cliente e escapa a mensagem", () => {
    const url = whatsappUrl("Olá, Magno & equipe?");
    expect(url.startsWith(`${WHATSAPP_BASE_URL}?text=`)).toBe(true);
    expect(WHATSAPP_BASE_URL).toBe("https://wa.me/5516991972435");
    expect(url).toContain(encodeURIComponent("Olá, Magno & equipe?"));
    expect(url).not.toContain(" ");
  });
});

describe("registro de rotas (fonte única de SEO)", () => {
  it("tem 13 rotas, todas com trailing slash e paths únicos", () => {
    expect(routes).toHaveLength(13);
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) {
      expect(p === "/" || p.endsWith("/"), `sem trailing slash: ${p}`).toBe(true);
    }
  });

  it("titles e descriptions únicos; titles dentro do limite de 60 caracteres do plano", () => {
    const titles = routes.map((r) => r.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const r of routes) {
      expect(r.title.length, `title longo (${r.title.length}c): ${r.title}`).toBeLessThanOrEqual(60);
      expect(r.description.length).toBeGreaterThan(0);
    }
  });

  it("apenas /404/ é noindex", () => {
    expect(routes.filter((r) => r.noindex).map((r) => r.path)).toEqual(["/404/"]);
  });

  it("findRouteMeta normaliza trailing slash e cai no 404 para rota desconhecida", () => {
    expect(findRouteMeta("/consorcio-de-imoveis").path).toBe("/consorcio-de-imoveis/");
    expect(findRouteMeta("/consorcio-de-imoveis/").path).toBe("/consorcio-de-imoveis/");
    expect(findRouteMeta("/")).toBe(routes[0]);
    expect(findRouteMeta("/consorcio-de-imoveis///")).toBe(findRouteMeta("/consorcio-de-imoveis/"));
    expect(findRouteMeta("/nao-existe/")).toBe(notFoundRoute);
    // Edge latente (não alcançável via wouter, que sempre entrega "/..."):
    // findRouteMeta("") normaliza para "/" e devolve a Home — registrado no QA.
    expect(findRouteMeta("").path).toBe("/");
  });

  it("todo jsonLd() é serializável e livre de PostalAddress (decisão do cliente: sem endereço)", () => {
    for (const route of routes) {
      const schemas = route.jsonLd();
      const json = JSON.stringify(schemas);
      expect(json).not.toContain("PostalAddress");
      expect(json).not.toContain('"address"');
      expect(JSON.parse(json)).toEqual(schemas);
    }
  });
});

describe("buildHead (prerender)", () => {
  it("emite title, description, canonical absoluto e og:image absoluto para toda rota", () => {
    for (const route of routes) {
      const head = buildHead(route);
      expect(head).toContain(`<link rel="canonical" href="${absUrl(route.path)}" />`);
      expect(head).toContain("<title>");
      expect(head).toContain('og:image" content="https://');
      expect(head).toContain('application/ld+json');
    }
  });

  it("noindex só aparece na rota 404", () => {
    for (const route of routes) {
      const temNoindex = buildHead(route).includes('content="noindex, follow"');
      expect(temNoindex, route.path).toBe(route.noindex === true);
    }
  });

  it("escapa aspas e HTML nos metadados e neutraliza </script> dentro do JSON-LD", () => {
    const head = buildHead({
      ...routes[0],
      title: 'Título com "aspas" & <tags>',
      description: "desc</script><script>alert(1)</script>",
      jsonLd: () => [{ "@type": "Thing", name: "fim</script><script>alert(1)</script>" }],
    });
    expect(head).not.toContain('content="Título com "aspas"');
    expect(head).toContain("&quot;aspas&quot;");
    const scripts = head.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    expect(scripts?.[1]).not.toContain("</script>");
  });
});
