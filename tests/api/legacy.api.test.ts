import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startTestServer, type TestServer } from "../helpers/server";
import { routes } from "@/seo/routes";

/**
 * Status HTTP das URLs que o Search Console reportou (out/2026) — todas do
 * WordPress que ocupava o domínio antes — e das variações que geravam
 * duplicata ou soft 404 no site novo. Roda contra o bundle real de produção.
 */

describe("URLs legadas e canônicas", () => {
  let server: TestServer;

  beforeAll(async () => {
    server = await startTestServer();
  });
  afterAll(() => server.stop());

  function get(path: string) {
    return fetch(`${server.url}${path}`, { redirect: "manual" });
  }

  it.each([
    ["/consorcio-imoveis/", "/consorcio-de-imoveis/"],
    ["/consorcio-imoveis", "/consorcio-de-imoveis/"],
    ["/consorcios-de-imovel/", "/consorcio-de-imoveis/"],
    ["/consorcios-de-veiculos/", "/consorcio-de-veiculos/"],
    ["/quitacao-financiamento/", "/quitacao-de-financiamento/"],
    ["/quitacao-de-financiamento-de-imovel/", "/quitacao-de-financiamento/"],
    ["/investimento-seguro-de-vida", "/alavancagem-financeira/"],
    ["/investimento-e-seguro-de-vida", "/alavancagem-financeira/"],
    ["/cotas-contempladas", "/alavancagem-financeira/"],
    ["/cartas-contempladas", "/alavancagem-financeira/"],
    ["/politicadeprivacidade/", "/politica-de-privacidade/"],
    ["/pagina-home/", "/"],
    ["/santa-sophia-v2/", "/"],
    ["/blog/", "/o-que-e-consorcio/"],
    ["/fgts-para-construcao-no-consorcio-de-imoveis/", "/construcao-e-reforma/"],
    ["/vantagens-de-se-construir-seu-imovel-pelo-consorcio-itau/", "/construcao-e-reforma/"],
    ["/segredos-para-contemplar-o-seu-credito-em-tempo-recorde/", "/o-que-e-consorcio/"],
    ["/5-fatores-que-podem-te-colocar-em-um-fria/", "/o-que-e-consorcio/"],
    ["/consorcio-imoveis/?utm_source=x", "/consorcio-de-imoveis/?utm_source=x"],
  ])("301 %s → %s", async (from, to) => {
    const res = await get(from);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe(to);
  });

  it.each([
    "/wp-admin/",
    "/wp-content/themes/neve/*",
    "/wp-content/plugins/*",
    "/wp-json/",
    "/wp-json/pys-facebook/v1/event",
    "/wp-includes/js/wp-emoji-release.min.js?ver=7.0.1",
    "/wp-login.php",
    "/wp-sitemap.xml",
    "/xmlrpc.php",
    "/feed/",
    "/comments/feed/",
    "/fgts-para-construcao-no-consorcio-de-imoveis/feed/",
    "/search/{search_term_string}/",
    "/search/{search_term_string}/feed/rss2/",
    "/author/santasophia/",
    "/?s={search_term_string}",
    "/?p=123",
    "/15c42-web-agency-gb-portfolio/",
    "/15c42-web-agency-gb-contact-us/",
    "/cgi-sys/suspendedpage.cgi",
  ])("410 %s", async (path) => {
    const res = await get(path);
    expect(res.status).toBe(410);
    const html = await res.text();
    expect(html).toContain('content="noindex');
  });

  it("/404/ acessada direto responde 404, não 200", async () => {
    for (const path of ["/404", "/404/", "/404/index.html"]) {
      const res = await get(path);
      expect(res.status, path).toBe(404);
    }
  });

  it("index.html redireciona para a URL canônica com barra final", async () => {
    const home = await get("/index.html");
    expect(home.status).toBe(301);
    expect(home.headers.get("location")).toBe("/");

    const inner = await get("/consorcio-de-imoveis/index.html?utm_source=x");
    expect(inner.status).toBe(301);
    expect(inner.headers.get("location")).toBe("/consorcio-de-imoveis/?utm_source=x");
  });

  it("index.html com barras duplicadas não vira redirect para outro domínio", async () => {
    const res = await get("/.//evil.example/index.html");
    const location = res.headers.get("location") ?? "";
    expect(location.startsWith("//")).toBe(false);
  });

  it("todas as rotas indexáveis respondem 200 e mantêm query de campanha", async () => {
    for (const route of routes.filter((r) => !r.noindex)) {
      const res = await get(route.path);
      expect(res.status, route.path).toBe(200);
    }
    const utm = await get("/?utm_source=google&gclid=abc");
    expect(utm.status).toBe(200);
  });

  it("URL desconhecida continua 404", async () => {
    const res = await get("/nao-existe-xyz/");
    expect(res.status).toBe(404);
  });
});
