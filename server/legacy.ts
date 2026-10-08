/**
 * URLs herdadas do WordPress que ocupava o domínio antes deste site.
 *
 * O Search Console continua rastreando o que conheceu do site antigo. Sem esta
 * camada, páginas com equivalente novo viram 404 e perdem o histórico, e o
 * lixo do WordPress (feeds, /wp-*, busca, autor, páginas demo do tema) fica
 * acumulando em "Não encontrado", "noindex" e "soft 404".
 *
 * - Página antiga com equivalente direto: 301 para a página nova.
 * - URL que nunca vai voltar: 410, que tira do índice mais rápido que 404.
 */

export type LegacyResolution =
  | { status: 301; location: string }
  | { status: 410 }
  | null;

/** Chave sem barra final; o valor é a rota canônica nova (com barra final). */
const REDIRECTS: Record<string, string> = {
  "/consorcio-imoveis": "/consorcio-de-imoveis/",
  "/consorcios-de-imovel": "/consorcio-de-imoveis/",
  "/consorcios-de-veiculos": "/consorcio-de-veiculos/",
  "/quitacao-financiamento": "/quitacao-de-financiamento/",
  "/quitacao-de-financiamento-de-imovel": "/quitacao-de-financiamento/",
  "/investimento-seguro-de-vida": "/alavancagem-financeira/",
  "/investimento-e-seguro-de-vida": "/alavancagem-financeira/",
  "/cotas-contempladas": "/alavancagem-financeira/",
  "/cartas-contempladas": "/alavancagem-financeira/",
  "/politicadeprivacidade": "/politica-de-privacidade/",
  "/pagina-home": "/",
  "/santa-sophia-v2": "/",
  "/blog": "/o-que-e-consorcio/",
  "/fgts-para-construcao-no-consorcio-de-imoveis": "/construcao-e-reforma/",
  "/vantagens-de-se-construir-seu-imovel-pelo-consorcio-itau": "/construcao-e-reforma/",
  "/segredos-para-contemplar-o-seu-credito-em-tempo-recorde": "/o-que-e-consorcio/",
  "/5-fatores-que-podem-te-colocar-em-um-fria": "/o-que-e-consorcio/",
};

const GONE_PATHS = [
  /^\/wp-/, // wp-admin, wp-content, wp-includes, wp-json, wp-login.php, wp-sitemap.xml
  /^\/xmlrpc\.php$/,
  /^\/cgi-sys\//, // página "conta suspensa" da hospedagem antiga
  /^\/(author|search|category|tag)(\/|$)/,
  /(^|\/)feed(\/|$)/, // /feed/, /comments/feed/, /<post>/feed/, /search/x/feed/rss2/
  /^\/15c42-web-agency-gb-/, // páginas demo do tema
];

/** Parâmetros que só o WordPress usava (busca, post, página, feed). */
const GONE_QUERY_PARAMS = ["s", "p", "page_id", "attachment_id", "feed"];

function stripTrailingSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function resolveLegacy(path: string, query: URLSearchParams): LegacyResolution {
  let decoded: string;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    decoded = path;
  }

  if (GONE_PATHS.some((pattern) => pattern.test(decoded))) return { status: 410 };
  if (GONE_QUERY_PARAMS.some((param) => query.has(param))) return { status: 410 };

  const target = REDIRECTS[stripTrailingSlash(decoded).toLowerCase()];
  if (target) {
    const qs = query.toString();
    return { status: 301, location: qs ? `${target}?${qs}` : target };
  }

  return null;
}
