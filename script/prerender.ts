import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { absUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "../client/src/seo/constants";
import { routes, type RouteMeta } from "../client/src/seo/routes";

interface ServerEntry {
  render: (url: string) => string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function buildHead(route: RouteMeta): string {
  const canonical = absUrl(route.path);
  const ogImage = absUrl(route.ogImage ?? DEFAULT_OG_IMAGE);
  const schemas = route
    .jsonLd()
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`,
    )
    .join("\n    ");
  const gscVerification = process.env.VITE_GSC_VERIFICATION?.trim();

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    gscVerification
      ? `<meta name="google-site-verification" content="${escapeHtml(gscVerification)}" />`
      : "",
    route.noindex ? '<meta name="robots" content="noindex, follow" />' : "",
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="pt_BR" />',
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    schemas,
  ]
    .filter(Boolean)
    .join("\n    ");
}

function removeDefaultMeta(template: string): string {
  return template
    .replace(/\s*<title>[^<]*<\/title>/, "")
    .replace(/\s*<meta\s+name="description"[^>]*>/, "");
}

export async function prerenderSite(distRoot: string, serverEntryPath: string) {
  const templatePath = path.join(distRoot, "index.html");
  const template = removeDefaultMeta(await readFile(templatePath, "utf8"));
  if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
    throw new Error("O template não contém os placeholders app-head e app-html.");
  }

  const { render } = (await import(pathToFileURL(serverEntryPath).href)) as ServerEntry;

  for (const route of routes) {
    const page = template
      .replace("<!--app-head-->", buildHead(route))
      .replace("<!--app-html-->", render(route.path));
    const outputDirectory =
      route.path === "/" ? distRoot : path.join(distRoot, route.path.slice(1));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, "index.html"), page);
  }

  const buildDate = new Date().toISOString().slice(0, 10);
  const urls = routes
    .filter((route) => !route.noindex)
    .map(
      (route) => `  <url>
    <loc>${absUrl(route.path)}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${route.changefreq ?? "monthly"}</changefreq>
    <priority>${(route.priority ?? 0.5).toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await writeFile(path.join(distRoot, "sitemap.xml"), sitemap);
}
