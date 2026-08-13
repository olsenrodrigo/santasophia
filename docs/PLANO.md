# Plano de Implementação — Site Santa Sophia Consórcios

Base: fork whitelabel-v2 (React 19 + Vite 7 + Tailwind v4 + wouter + shadcn/ui + Express 5).
Domínio de produção: `https://santasophiaconsorcios.com.br`

---

## ⚠️ DECISÕES JÁ TOMADAS PELO CLIENTE — não contrariar

1. **CTA de conversão primário: WhatsApp `(16) 99197-2435`** → `https://wa.me/5516991972435?text=<msg URL-encoded por página>`.
2. **NÃO usar endereço físico em lugar nenhum.** O cliente decidiu não publicar o endereço de Ipanema/RJ. Nada de `PostalAddress` no JSON-LD, nada de endereço no footer ou em "Quem somos". O posicionamento é **atendimento digital e consultivo em todo o Brasil** (`areaServed: "BR"`). Onde o plano abaixo mencionar endereço, ignore.
3. **Dados institucionais aprovados (apenas estes):**
   - 0800 948 9095 — seg a sex, 8h às 20h
   - WhatsApp (16) 99197-2435
   - contato@santasophiaconsorcios.com.br
   - Instagram: https://www.instagram.com/santasophiaconsorcios/
4. **Foto do Magno: DISPONÍVEL** (atualizado após validação do cliente). O arquivo aprovado foi tratado e está em uso via `MagnoPortrait` na home e em `/magno-stiti-de-paula/`.
   **Limitação de resolução:** a origem tem 375×375 (tamanho de foto de perfil), então o recorte 4:5 rende 300×375. O `MagnoPortrait` limita o retrato a 300px de largura de propósito — acima disso a imagem amolece em tela retina. Se um original em resolução maior for fornecido, basta substituir `client/src/assets/brand/magno.{jpg,webp}` e relaxar o `max-w`.
   O `MagnoCard` (usado em `/quem-somos/`) segue com o símbolo "S".
5. **Assets da marca JÁ FORAM GERADOS — use-os, não recrie:**
   - `client/src/assets/brand/logo-horizontal.png` (992×180, alpha limpo, navy+amarelo+laranja) — navbar em fundo claro
   - `client/src/assets/brand/logo-horizontal-white.png` — navbar/footer em fundo navy
   - `client/src/assets/brand/logo-stacked.png` / `logo-stacked-white.png` (843×420) — footer, OG
   - `client/src/assets/brand/symbol.png` (564×512) — símbolo "S" isolado, motivo gráfico e monograma
   - `client/src/assets/brand/logo-original.png` — original do cliente (referência)
   - `client/public/favicon.ico`, `favicon-16/32/48/192/512.png`, `apple-touch-icon.png` — símbolo amarelo sobre quadrado navy arredondado, já prontos
   - Falta gerar apenas as **imagens OpenGraph** (`client/public/og/*.jpg`, 1200×630).
6. **Cores da marca extraídas do logo (valores exatos):** navy `#0A1D62`, amarelo `#FFC82B`, laranja `#F27018`.

---

## 0. Decisão técnica central: SSG (pré-renderização no build)

### 0.1 Por que SSG e não SSR runtime

O site é 100% conteúdo estático de marketing (13 rotas, sem dados dinâmicos por request). SSR em runtime no Express aumentaria TTFB, complicaria cache e não traz benefício sobre HTML estático. **Decisão: pré-renderizar cada rota no build com `react-dom/server` (`renderToString`), gerando `dist/public/<slug>/index.html` com H1, conteúdo, meta tags e JSON-LD reais no HTML.** O `serveStatic` existente já serve isso quase sem mudanças (detalhe em 0.5).

### 0.2 Registro central de rotas + SEO (fonte única de verdade)

Criar `client/src/seo/routes.ts` exportando um array tipado:

```ts
export interface RouteMeta {
  path: string;           // "/consorcio-de-imoveis/" — SEMPRE com trailing slash (exceto "/")
  title: string;
  description: string;
  h1: string;             // referência p/ QA, o H1 real vive na página
  ogImage?: string;       // default: /og/default.jpg
  changefreq?: string; priority?: number;
  noindex?: boolean;      // true p/ 404
  jsonLd: () => object[]; // builders importados de seo/jsonld.ts
}
export const routes: RouteMeta[] = [ ... ];
```

Três consumidores: (a) `App.tsx` monta as `<Route>` do wouter; (b) `script/build.ts` sabe o que pré-renderizar e gera `sitemap.xml`; (c) hook `usePageMeta` atualiza `document.title`/meta em navegação SPA. Complementos: `client/src/seo/constants.ts` (SITE_URL, 0800, WhatsApp, e-mail, Instagram) e `client/src/seo/jsonld.ts` (builders de Organization, Person, FAQPage, Service, BreadcrumbList, WebSite).

**Não usar** react-helmet nem o hoisting de metadata do React 19 (`<title>` dentro de componentes): com `renderToString` de um subtree montado em `#root` o hoisting é frágil. A injeção de meta/JSON-LD é feita por substituição de string no template, determinística.

### 0.3 Entry duplo + template com placeholders

1. **`client/index.html`** — limpar as meta tags médicas, remover o link do Google Fonts (fontes serão self-hosted), adicionar dois placeholders:
   - no `<head>`: `<!--app-head-->` (title, description, canonical, OG, twitter, JSON-LD por rota)
   - dentro de `<div id="root">`: `<!--app-html-->`
2. **`client/src/entry-server.tsx`** (novo):
   ```tsx
   import { renderToString } from "react-dom/server";
   import { Router } from "wouter";
   import App from "./App";
   export function render(url: string) {
     return renderToString(<Router ssrPath={url}><App /></Router>);
   }
   ```
   `App.tsx` deixa de envolver o próprio `<Router>` implícito: as rotas ficam num `AppRoutes` e o `<Router>` externo só existe no entry-server; no client o wouter usa o browser location por default.
3. **`client/src/main.tsx`** — trocar `createRoot(...).render(...)` por `hydrateRoot(document.getElementById("root")!, <App />)`. Como TODAS as rotas são pré-renderizadas, `hydrateRoot` é sempre correto em produção. Em dev o Vite serve o template com `<!--app-html-->` vazio; usar guard: se `#root` não tem filhos (`root.hasChildNodes()`), cair para `createRoot`.

### 0.4 Integração no `script/build.ts` (ordem exata)

```
1. rm dist
2. viteBuild()                              → dist/public (client, como hoje)
3. viteBuild({ build: { ssr: "src/entry-server.tsx",
     outDir: "<abs>/dist/ssr", emptyOutDir: true } })   → dist/ssr/entry-server.js (ESM)
4. PRERENDER:
   - template = readFile("dist/public/index.html")      // já tem os assets hasheados
   - const { render } = await import(pathToFileURL("dist/ssr/entry-server.js").href)
   - para cada route em routes.ts:
       html   = render(route.path)
       head   = buildHead(route)   // title, meta description, canonical absoluto,
                                   // og:*, twitter:*, robots noindex se aplicável,
                                   // <script type="application/ld+json"> por schema
       out    = template.replace("<!--app-head-->", head)
                        .replace("<!--app-html-->", html)
       write dist/public/<slug>/index.html   // "/" → dist/public/index.html (sobrescreve)
5. gerar dist/public/sitemap.xml a partir de routes.ts (exclui noindex), lastmod = data do build
6. esbuild do server → dist/index.cjs (inalterado)
```

Notas: o passo 3 reaproveita `vite.config.ts` (root = `client/`), então o entry SSR é `src/entry-server.tsx` relativo ao root; o outDir precisa ser absoluto com `emptyOutDir` para não apagar `dist/public`. O passo 4 roda sob `tsx` (ESM), então `import()` dinâmico do bundle SSR funciona. O helper `buildHead` pode viver em `script/prerender.ts` importando `client/src/seo/routes.ts` (tsx resolve TS + paths).

### 0.5 `server/static.ts` e URLs canônicas

`express.static` já serve `dist/public/consorcio-de-imoveis/index.html` para `GET /consorcio-de-imoveis/` e **redireciona 301 `/consorcio-de-imoveis` → `/consorcio-de-imoveis/`**. Portanto:
- **Convenção canônica: trailing slash em tudo** — canonical, sitemap, links internos (`<Link href="/consorcio-de-imoveis/">`). O wouter (regexparam) casa `/x` e `/x/` no mesmo pattern.
- Alterar o catch-all: em vez de sempre `index.html` (200), servir `dist/public/404/index.html` com `res.status(404)`. A rota `/404/` entra no prerender com `noindex: true`.

### 0.6 Dev mode

`npm run dev` continua SPA client-rendered via `server/vite.ts`. Adicionar script `"preview": "npm run build && npm run start"` para validar o HTML pré-renderizado (`curl -s localhost:5000/consorcio-de-imoveis/ | grep '<h1'`).

---

## 1. Arquitetura de informação — rotas, metas e keywords

Todas as URLs com trailing slash; canonical absoluto `https://santasophiaconsorcios.com.br<path>`.

| # | URL | Title (≤60c) | Meta description | H1 | Cluster de keywords |
|---|-----|--------------|------------------|----|------------------------------|
| 1 | `/` | Santa Sophia Consórcios \| Consórcio com estratégia | A Santa Sophia conecta você às melhores possibilidades em consórcio de imóveis, veículos e empresas. Atendimento consultivo com Magno Stiti de Paula em todo o Brasil. | Seu próximo grande passo não precisa esperar. | Marca (Santa Sophia, Santa Sophia Consórcios, Santa Sophia Crédito, Santa Sophia Consórcio Brasil) + gerais (consórcio online, consórcio Brasil, empresa de consórcio, soluções de crédito, planejamento de compra) |
| 2 | `/consorcio-de-imoveis/` | Consórcio de Imóveis: casa, apto e terreno \| Santa Sophia | Consórcio imobiliário com planejamento: carta de crédito para comprar casa, apartamento, terreno, construir ou reformar. Fale com um especialista da Santa Sophia. | Consórcio de imóveis: planeje a conquista da sua casa, apartamento ou terreno | consórcio de imóveis, consórcio imobiliário, consórcio para comprar casa/apartamento/terreno, carta de crédito imobiliária, consórcio para construção, consórcio para reforma |
| 3 | `/consorcio-de-veiculos/` | Consórcio de Veículos: carros e motos \| Santa Sophia | Consórcio de carros e motos com estratégia: entenda quando o consórcio de veículos faz sentido e planeje a troca do seu carro com a Santa Sophia. | Consórcio de veículos: troque de carro com planejamento, não com pressa | consórcio de carros, consórcio de veículos, consórcio de motos, carta de crédito para carro, carta de crédito para veículo, consórcio ou financiamento de carro |
| 4 | `/consorcio-de-caminhoes/` | Consórcio de Caminhões e Veículos Pesados \| Santa Sophia | Consórcio de caminhões, máquinas e veículos pesados para quem trabalha: renove ou amplie sua frota com aquisição planejada. Fale com a Santa Sophia. | Consórcio de caminhões e veículos pesados: estrutura para quem trabalha | consórcio de caminhões, consórcio de veículos pesados, consórcio para frota |
| 5 | `/consorcio-para-empresas/` | Consórcio para Empresas: máquinas e frota \| Santa Sophia | Consórcio empresarial para expansão, máquinas, equipamentos e frota. Capital planejado para a estratégia de crescimento da sua empresa. Fale com um especialista. | Consórcio empresarial: capital planejado para expandir sua empresa | consórcio empresarial, consórcio para empresas, consórcio para equipamentos, consórcio para máquinas, consórcio para frota |
| 6 | `/o-que-e-consorcio/` | O que é consórcio e como funciona? \| Santa Sophia | Entenda o que é consórcio, como funciona a contemplação, o lance e a carta de crédito, e como escolher um consórcio com segurança. Guia da Santa Sophia. | O que é consórcio e como funciona? | consórcio (head), carta de crédito, contemplação, lance, consórcio ou financiamento, como escolher consórcio, melhor consórcio, análise de consórcio |
| 7 | `/quem-somos/` | Quem somos \| Santa Sophia Consórcios | A Santa Sophia é uma empresa especializada em soluções de crédito por meio de consórcio, com atendimento digital e consultivo para clientes em todo o Brasil. | Quem é a Santa Sophia? | marca + empresa de consórcio + GEO ("Quem é a Santa Sophia?", "Onde atende?") |
| 8 | `/magno-stiti-de-paula/` | Magno Stiti de Paula — Especialista em Consórcios | Magno Stiti de Paula é especialista em consórcios e referência comercial no segmento, com experiência na comercialização de consórcios do Itaú. Fale com o Magno. | Magno Stiti de Paula, especialista em consórcios | Magno Stiti de Paula, Magno Stiti de Paula consórcio, Magno Stiti de Paula Santa Sophia, especialista em consórcio, consultor de consórcio |
| 9 | `/perguntas-frequentes/` | Perguntas Frequentes sobre Consórcio \| Santa Sophia | Consórcio vale a pena? Consórcio ou financiamento? Como funciona o lance? Respostas diretas da Santa Sophia para as principais dúvidas sobre consórcio. | Perguntas frequentes sobre consórcio | long-tail de dúvidas — hub FAQPage |
| 10 | `/simulacao-de-consorcio/` | Simulação de Consórcio personalizada \| Santa Sophia | Solicite uma simulação de consórcio feita por um especialista: conte seu objetivo, prazo e valor, e receba uma análise personalizada da Santa Sophia. | Solicite sua simulação de consórcio | simulação de consórcio, simular consórcio, contratar consórcio |
| 11 | `/fale-com-um-especialista/` | Fale com um Especialista em Consórcio \| Santa Sophia | Fale com Magno Stiti de Paula e a equipe Santa Sophia: WhatsApp, 0800 e formulário. Uma conversa séria sobre o seu próximo passo, sem pressão. | Fale com um especialista em consórcio | falar com especialista em consórcio, contratar consórcio, especialista em consórcio |
| 12 | `/politica-de-privacidade/` | Política de Privacidade \| Santa Sophia Consórcios | (padrão LGPD) | Política de Privacidade | — (obrigação LGPD, sustenta GA4/formulário) |
| 13 | `/404/` (noindex) | Página não encontrada \| Santa Sophia | — | Página não encontrada | — |

**Checagem de clusters — nenhum órfão:** Marca → 1, 7; Magno → 8; Gerais → 1, 6, 8; Imóveis → 2; Veículos leves → 3; Caminhões/pesados → 4; Empresas → 5; Alta intenção → 10, 11, 6. "Motos" ganha H2 próprio na página 3; "frota" ganha H2 na página 5 com link cruzado para a 4.

**Navegação (Navbar):** Consórcios (dropdown: Imóveis, Veículos, Caminhões e Pesados, Empresas) · Como funciona · Quem somos · FAQ · CTA laranja "Falar com um especialista". Footer com todas as rotas (cada página pré-renderizada linka todas as demais — crawlability sem JS).

---

## 2. Mapa de seções por página

Notação: `copy.md` = `copysiteSantaSophia.md`, `faq.md` = `faqsiteagente.md`, `def.md` = `copydefcomplementares.md`. Todos em `/Users/olsenrodrigo/Sites/SantaSophia/`. **A copy é aprovada — reaproveitar literalmente, não reinventar.**

### `/` Home — usa `copy.md` quase integral, na ordem
1. **Hero** — copy.md L3–27 (H1 = L5, sub = L7, lista de bens L9–15 vira chips/ticker, parágrafos L17–23, CTA L27 → WhatsApp + `/fale-com-um-especialista/`).
2. **AnswerBlock GEO** (novo, curto, extraível) — síntese de def.md L97–115: "A Santa Sophia é uma empresa especializada em soluções de crédito por meio de consórcio…" (2–3 frases declarativas + link Quem somos).
3. **O problema** — copy.md L31–49.
4. **Método em 3 passos** (Entender/Estruturar/Acompanhar) — copy.md L53–77.
5. **Por que a Santa Sophia** — copy.md L81–93.
6. **Magno** — copy.md L97–121 + `MagnoCard` (tratamento gráfico, sem foto) + link `/magno-stiti-de-paula/`.
7. **Segmentos** (5 cards, ícones lucide no lugar dos emojis) — copy.md L125–149; cards linkam páginas 2–5, o de crédito aponta para `/o-que-e-consorcio/`.
8. **"Não sei se consórcio é para mim"** — copy.md L153–171.
9. **Três verdades** — copy.md L175–205.
10. **CTA "Você não precisa decidir agora"** — copy.md L209–227.
11. **Atendimento em todo o Brasil** — copy.md L231–243.
12. **FAQ resumido** (5 Q&As de copy.md L247–269) + link → `/perguntas-frequentes/`.
13. **CTA final** — copy.md L273–291 (+ def.md L1–9 como variação de fechamento).
14. **Footer** — copy.md L295–307 + **disclaimer obrigatório** copy.md L308 (idêntico, sem edição) + dados aprovados (0800, WhatsApp, e-mail, Instagram) + menções Banco Central/ABAC/administradoras parceiras. **Sem endereço.**

### `/consorcio-de-imoveis/`
PageHero (H1 + parágrafo de copy.md L127–129) → AnswerBlock (faq.md L129–143) → H2s de faq.md IMÓVEIS L128–202: "Como comprar imóvel por consórcio" (L129–143), "Consórcio de imóvel vale a pena?" (L145–168), "Apartamento" (L170–182), "Terreno" (L184–194), "Construção e reforma" (L196–202) → Método 3 passos (reuso) → CTA WhatsApp com mensagem de imóveis → FaqAccordion (subset) → CTA final + disclaimer.

### `/consorcio-de-veiculos/`
PageHero (copy.md L131–133) → faq.md VEÍCULOS: "Consórcio de carro vale a pena?" (L205–227), "Consórcio ou financiamento de carro?" (L229–245) → H2 "Consórcio de motos" (única copy nova necessária, ~80 palavras, tom compliance, mesmas regras) → CTA → FAQ subset → disclaimer.

### `/consorcio-de-caminhoes/`
PageHero (copy.md L135–137) → faq.md "Como funciona consórcio de caminhão?" (L247–263), "Veículos pesados" (L265–285), "Caminhões: vale a pena?" (L342–368) → CTA (mensagem de frota) → FAQ subset → disclaimer.

### `/consorcio-para-empresas/`
PageHero (copy.md L139–141) → faq.md EMPRESAS: "Vale a pena?" (L288–302), "Expansão" (L304–322), "Máquinas e equipamentos" (L324–340) → H2 "Frota" com link para `/consorcio-de-caminhoes/` → CTA → FAQ subset → disclaimer.

### `/o-que-e-consorcio/`
PageHero → AnswerBlock (definição direta = faq.md L5–9) → faq.md CONSÓRCIO: "O que é e como funciona" (L3–13), "Vale a pena?" (L15–35), "Consórcio ou financiamento?" (L37–51), "Contemplação" (L53–65), "Carta de crédito" (L67–77), "Lance" (L79–97), "Como escolher" (L99–126) → Três verdades (copy.md L175–205, reuso) → CTA final faq.md L370–381 → disclaimer faq.md L385.

### `/quem-somos/`
H1 "Quem é a Santa Sophia?" → AnswerBlock com as 5 respostas GEO de def.md L97–115 em formato pergunta-H2/resposta-direta → copy.md L81–93 + L231–243 → credenciais (parceira de administradoras autorizadas pelo Banco Central, como Itaú Consórcios; sistema regulado pela Lei 11.795; ABAC) → card Magno → CTA.

### `/magno-stiti-de-paula/`
H1 → `MagnoCard` → copy.md L97–121 integral → AnswerBlock "Quem é Magno Stiti de Paula?" (def.md L101–103) + "Como falar com o Magno?" (def.md L113–115 → canais oficiais) → CTA WhatsApp direto.

### `/perguntas-frequentes/`
H1 → navegação por âncoras (Consórcio / Imóveis / Veículos / Empresas) → **todo** o faq.md L3–368 em accordions agrupados (**conteúdo visível no HTML pré-renderizado** — ver risco §7.8) → CTA final faq.md L370–381 → disclaimer L385.

### `/simulacao-de-consorcio/` e `/fale-com-um-especialista/`
H1 → parágrafo honesto (compliance: simulação elaborada por especialista conforme administradora; **sem números/parcelas inventados**) → ContactForm (nome, telefone, e-mail, objetivo [select imóveis/veículos/pesados/empresas — concatenado na mensagem para não mudar o schema], mensagem) → bloco de canais (WhatsApp com mensagem pré-preenchida, 0800 com horário, e-mail) → fechamento copy.md L209–227 / def.md L1–9 → disclaimer.

---

## 3. Design system

### 3.1 Look pretendido
Premium-consultivo, "banco boutique": fundo claro dominante com **seções âncora em navy profundo** (hero e CTAs), tipografia display grande e confiante, numerais oversized no método (01/02/03), o arco do "S" do logo reutilizado como motivo gráfico de fundo (curva amarela em baixa opacidade sobre navy), muito espaço em branco, linhas finas. **Zero "template genérico"**: nada de gradientes roxos, nada de cards com sombra pesada em grid 3×3 uniforme.

### 3.2 Tokens de cor (substituir o bloco `@theme inline` em `client/src/index.css`)

| Papel | Token | Valor | Regras de uso / contraste |
|---|---|---|---|
| Primário / texto forte | `--color-primary` | `#0A1D62` | Sobre branco: 15,4:1 (AAA). Headings, navbar. |
| Primário profundo | `--color-primary-deep` | `#061240` | Fundos de hero/CTA band, footer. |
| Primário claro | `--color-primary-soft` | `#122A7E` | Cards sobre navy. |
| CTA | `--color-cta` | `#F27018` | **Nunca como texto sobre branco (2,96:1 — reprova).** Como fundo de botão: par com texto navy `#0A1D62` (5,2:1, AA). Sobre navy como texto/ícone: 5,2:1 (AA). |
| CTA acessível (texto branco) | `--color-cta-strong` | `#C2410C` | Com texto branco: 5,2:1 (AA). |
| Destaque | `--color-highlight` | `#FFC82B` | **Proibido como texto sobre branco (1,55:1).** Permitido: texto/sublinhado/marcador sobre navy (9,9:1 AAA), chip com texto navy, detalhes gráficos. |
| Fundo | `--color-background` | `#FFFFFF` | — |
| Fundo alternado | `--color-surface` | `#F5F7FC` | Off-white frio (abandona o bege médico). |
| Texto corpo | `--color-foreground` | `#1E2A4A` | 12,9:1. |
| Texto secundário | `--color-muted-foreground` | `#51607F` | ≥ 5,9:1 sobre branco. |
| Borda | `--color-border` | `#E2E6F0` | — |
| Ring/foco | `--color-ring` | `#0A1D62` claro / `#FFC82B` navy | `focus-visible`: outline 2px + offset 2px, sempre visível. |

Deixar comentário no CSS para o QA: *amarelo e laranja jamais como texto sobre fundo claro; laranja `#F27018` como fundo pede texto navy; texto branco pede `#C2410C`*.

### 3.3 Tipografia
- **Substituir Lora + Montserrat.** O logo é uma sans geométrica bold de terminais suaves; a serifa Lora conflita com a identidade e Montserrat é "cara de template".
- **Headings/display: Plus Jakarta Sans** (600/700/800). **Corpo/UI: Inter** (400/500/600).
- **Self-hosted** (woff2 em `client/public/fonts/` + `@font-face` no `index.css` + `<link rel="preload">` no template): remove o `@import` do Google Fonts, que é render-blocking — ganho direto de LCP.
- Escala fluida: display `clamp(2.25rem, 5vw, 3.75rem)`; h2 `clamp(1.6rem, 3vw, 2.4rem)`; h3 `1.25rem`; body `1rem/1.7`; small `0.875rem`; eyebrow `0.75rem` caps tracking-widest.

### 3.4 Espaçamento, radius, sombra
- Seções `py-20 md:py-28` (manter utilitários `section-padding`/`container-custom`, atualizando cores).
- Radius: botões `0.5rem`, cards `1rem`, chips `9999px`.
- Sombras tingidas de navy: `0 8px 30px rgba(10,29,98,0.08)` (card), `0 2px 8px rgba(10,29,98,0.06)` (raso). Nada de sombras pretas duras.
- Motivo gráfico: arco do "S" como `background` decorativo `aria-hidden` em hero/CTA bands.

---

## 4. Inventário de componentes

### Deletar (whitelabel médico) — `client/src/components/`
`About.tsx`, `Services.tsx`, `Treatments.tsx`, `Differentials.tsx`, `Locations.tsx`, `Credentials.tsx`, `HowItWorks.tsx`, `FAQ.tsx`, `Hero.tsx`, `Contact.tsx`, `Navbar.tsx`, `Footer.tsx` (recriados do zero em `components/site/` — o estilo inline deles é antipadrão a abandonar em favor de tokens). Deletar também `client/src/assets/images/*` (fotos médicas), `vite-plugin-meta-images.ts` + referência no `vite.config.ts`, e os 3 plugins `@replit/*` de `vite.config.ts` e `package.json`.

### Criar — `client/src/components/site/`
| Componente | Função |
|---|---|
| `Layout.tsx` | Navbar + `<main>` + Footer + FloatingWhatsApp + ScrollToTop (wouter não rola ao topo) |
| `Navbar.tsx` | logo, menu com dropdown Consórcios, CTA laranja, mobile via `ui/sheet` |
| `Footer.tsx` | 4 colunas de links (todas as rotas), dados institucionais aprovados, selos texto (Banco Central/ABAC/administradoras), **disclaimer obrigatório**, link privacidade |
| `PageHero.tsx` | hero interno (eyebrow + H1 + lede + Breadcrumbs) |
| `Reveal.tsx` | wrapper de animação SSR-safe (ver risco §7.1) |
| `AnswerBlock.tsx` | bloco GEO de resposta direta (borda amarela à esquerda sobre surface, pergunta em H2, resposta em 2–3 frases declarativas) |
| `WhatsAppCta.tsx` / `FloatingWhatsApp.tsx` | `https://wa.me/5516991972435?text=<msg por página>`; dispara evento GA4 `whatsapp_click` |
| `CtaBand.tsx` | seção navy full-width com CTA duplo (WhatsApp + formulário) |
| `SegmentCards.tsx` | 5 cards com ícones lucide (`Home`, `Car`, `Truck`, `Building2`, `Coins`) |
| `MethodSteps.tsx` | 01/02/03 Entender-Estruturar-Acompanhar |
| `FaqAccordion.tsx` | sobre `ui/accordion`, recebe subset de `content/faq.ts` |
| `ContactForm.tsx` | react-hook-form + zod (`insertContactMessageSchema`), select de objetivo concatenado na mensagem, estados loading/success/error, evento GA4 `form_submit` |
| `Breadcrumbs.tsx` | sobre `ui/breadcrumb`, alimentado pelo route registry |
| `MagnoCard.tsx` | tratamento gráfico (símbolo "S") + bio curta + CTA; ponto de troca por foto comentado |
| `ComplianceNote.tsx` | disclaimer reutilizável (copy.md L308) |

### Dados de conteúdo
`client/src/content/faq.ts` (todas as Q&As do faq.md tipadas `{ category, question, answerHtml, cta }` — alimenta páginas E o JSON-LD FAQPage a partir da mesma fonte) e `client/src/content/segments.ts`.

### Reaproveitar de `ui/`
`accordion`, `button`, `card`, `input`, `textarea`, `label`, `select`, `form`, `breadcrumb`, `separator`, `sheet`, `sonner`/`toaster`, `skeleton`. Recomenda-se deletar `chart.tsx`, `carousel.tsx`, `sidebar.tsx`, `calendar.tsx`, `input-otp.tsx`, `drawer.tsx`, `resizable.tsx`, `command.tsx` e remover deps órfãs (`recharts`, `embla-carousel-react`, `react-day-picker`, `input-otp`, `vaul`, `react-resizable-panels`, `cmdk`, `passport`, `passport-local`, `express-session`, `connect-pg-simple`, `memorystore`, `next-themes`) — higiene, Fase 6.

---

## 5. Plano SEO/GEO técnico — arquivo a arquivo

| Item | Onde mora | Detalhe |
|---|---|---|
| Title/description/canonical/OG/twitter | `client/src/seo/routes.ts` → injetados pelo prerender; em navegação SPA, `client/src/seo/usePageMeta.ts` atualiza `document.title` + meta description | Canonical absoluto com trailing slash. OG: `og:locale=pt_BR`, `og:site_name`, `og:image` absoluto 1200×630 |
| JSON-LD | builders em `client/src/seo/jsonld.ts`; serializados no `<head>` de cada página no prerender | **Organization/FinancialService** (home + quem-somos): name, alternateName "Santa Sophia Consórcios", url, logo, telephone +558009489095, contactPoint (0800 + WhatsApp, hoursAvailable Mo-Fr 08:00-20:00), email, sameAs [Instagram], **areaServed "BR"**, employee → Person. **SEM `address`/PostalAddress.** **Person** (Magno, em `/magno-stiti-de-paula/`): name, jobTitle "Especialista em Consórcios", worksFor → Organization, knowsAbout, url. **FAQPage** em `/perguntas-frequentes/` (todas) e subsets nas páginas de segmento. **Service** por página de segmento (serviceType, provider → Organization, areaServed BR). **BreadcrumbList** em todas as internas. **WebSite** na home (SearchAction omitido — não há busca interna). |
| sitemap.xml | gerado no passo 5 do `script/build.ts` → `dist/public/sitemap.xml` | rotas indexáveis, `<lastmod>` = data do build, trailing slash |
| robots.txt | `client/public/robots.txt` | `User-agent: *` / `Allow: /` / `Sitemap: https://santasophiaconsorcios.com.br/sitemap.xml`. **Não** bloquear GPTBot/ClaudeBot/PerplexityBot (GEO). |
| llms.txt | `client/public/llms.txt` | Markdown: linha-resumo da empresa; seções respondendo literalmente as 5 perguntas de def.md L97–115; lista das URLs canônicas com descrição de 1 linha cada; canais de contato do Magno. |
| Breadcrumbs visíveis | `components/site/Breadcrumbs.tsx` em todas as internas | espelham o BreadcrumbList JSON-LD (mesma fonte: route registry) |
| GA4 + conversões | `client/src/lib/analytics.ts`, carregado em `main.tsx` só se `import.meta.env.VITE_GA_ID` e PROD; gtag com `defer` | Eventos: `whatsapp_click` (com `page` e `variant`), `form_submit`, `phone_click`. GSC: meta de verificação no template via env `VITE_GSC_VERIFICATION` — instruções no README. |
| Imagens | `client/public/og/` (og-default.jpg + og por segmento, 1200×630 navy com logo), logos já em `client/src/assets/brand/`, `width/height` explícitos, `loading="lazy"` (hero: `fetchpriority="high"`), alt descritivo | favicons **já prontos** em `client/public/` |
| H1 único / hierarquia | por página (tabela §1); `PageHero` é o único emissor de `<h1>` nas internas | QA: `curl <rota> \| grep -c '<h1'` = 1 |
| 404 | prerender `/404/` com `noindex`; `server/static.ts` responde status 404 | evita soft-404 |
| Compliance | `ComplianceNote` no footer de todas as páginas; nenhuma página usa "contemplação garantida", "dinheiro rápido", "aprovação imediata" | QA: grep do build por termos proibidos |

---

## 6. Fases de execução (com critérios de aceite)

### Fase 0 — Saneamento e rebrand base
Remover plugins Replit e `vite-plugin-meta-images`; deletar componentes/imagens médicos; reescrever tokens do `client/src/index.css` (§3); self-host de fontes; atualizar `client/index.html` (placeholders, metas default, preload de fontes, favicons já prontos).
**Aceite:** `npm run check` sem erros; `npm run dev` sobe na 5000 sem referências médicas; nenhum request a `fonts.googleapis.com`; `grep -ri "replit" vite.config.ts package.json` vazio.

### Fase 1 — Fundação SSG (crítica)
`entry-server.tsx`, `main.tsx` com `hydrateRoot`, `App.tsx` com as 13 rotas (páginas placeholder com H1 correto), `seo/routes.ts` + `seo/constants.ts`, prerender + sitemap no `script/build.ts`, 404 no `server/static.ts`, `robots.txt` e `llms.txt` iniciais.
**Aceite:** após `npm run build && npm run start`: (1) `curl -s localhost:5000/consorcio-de-imoveis/ | grep '<h1'` retorna o H1 sem JS; (2) o HTML contém `<title>` da rota, `<link rel="canonical">` e ≥1 `<script type="application/ld+json">`; (3) `curl -sI localhost:5000/consorcio-de-imoveis` → 301 para `/consorcio-de-imoveis/`; (4) `curl -sI localhost:5000/rota-inexistente` → 404; (5) `dist/public/sitemap.xml` lista as 12 rotas indexáveis; (6) navegação client-side sem reload atualiza `document.title`; (7) console sem erro de hydration mismatch.

### Fase 2 — Design system e componentes compartilhados
Componentes de §4 + **fallback do backend**: `server/storage.ts` usa Postgres só se `DATABASE_URL` definido, senão grava JSONL em `data/contact-messages.jsonl` (gitignored); `server/email.ts` retorna cedo com log se `SMTP_USER` ausente; destino default = `contato@santasophiaconsorcios.com.br`, assunto/HTML rebrandeados.
**Aceite:** POST `/api/contact` válido retorna 201 **sem** Postgres/SMTP e grava no JSONL; inválido retorna 400; WhatsApp abre `wa.me/5516991972435` com texto correto; focus ring visível em todos os interativos; sem violações de contraste.

### Fase 3 — Home
As 14 seções do §2 com a copy aprovada (literal; emojis → ícones lucide).
**Aceite:** copy renderizada sem omissões relevantes vs .md; H1 = "Seu próximo grande passo não precisa esperar."; CTAs funcionam; disclaimer presente; Lighthouse mobile: Perf ≥ 90, SEO ≥ 95, A11y ≥ 95.

### Fase 4 — Segmentos + educacional + FAQ hub
Páginas 2–6 e 9, `content/faq.ts` completo, FAQPage/Service JSON-LD.
**Aceite:** cada Q&A do faq.md presente (checklist de 20 perguntas); conteúdo dos accordions no HTML estático (view-source, não só após clique); Rich Results Test sem erros para FAQPage e Service; breadcrumbs visíveis e no JSON-LD; cada página linka ≥2 outras internas.

### Fase 5 — Institucionais e conversão
Quem somos, Magno, Simulação, Fale com especialista, Privacidade, 404.
**Aceite:** as 5 perguntas GEO de def.md L97–115 respondidas em blocos H2+parágrafo em `/quem-somos/` e `/magno-stiti-de-paula/`; Person JSON-LD válido; formulário nas duas páginas de conversão com select de objetivo; privacidade cita LGPD e GA4.

### Fase 6 — SEO/GEO final + performance + limpeza
GA4 + eventos, meta GSC, og-images, llms.txt final, prune de dependências, auditoria de termos proibidos, auditoria CWV.
**Aceite:** Lighthouse mobile em TODAS as rotas: Perf ≥ 90, SEO ≥ 95, A11y ≥ 95, Best Practices ≥ 95; JS inicial ≤ 250 KB gzip; `grep -rniE "dinheiro r[áa]pido" dist/public --include='*.html' | grep -viE "não é dinheiro r[áa]pido"` vazio (a frase existe legitimamente em negação na copy aprovada — o critério original nunca passaria); sitemap acessível; `npm run check` limpo.

---

## 7. Riscos e armadilhas

1. **framer-motion + prerender = conteúdo invisível no HTML.** O padrão `initial={{ opacity: 0 }}` + `whileInView` renderizaria todo o texto com `opacity:0` no HTML estático — desastre para SEO/GEO e no-JS. Obrigatório no `Reveal.tsx`: o HTML SSR sai **totalmente visível**; a animação só é aplicada após mount (estado `mounted` + `initial={false}` no primeiro paint, ou classe CSS via IntersectionObserver respeitando `prefers-reduced-motion`). Nenhum componente fora do `Reveal` pode usar `initial` com opacidade 0. Considerar `LazyMotion + m` (`domAnimation`) para cortar ~15–20 KB.
2. **Hydration mismatch.** Fontes: `new Date().getFullYear()` no Footer (calcular em constante de módulo), `use-mobile.tsx` (`matchMedia` — não usar para decidir markup inicial; usar CSS responsivo), qualquer `window`/`localStorage` no render. Primeiro render idêntico server/client; efeitos só em `useEffect`.
3. **wouter + SSG.** `<Router ssrPath>` apenas no entry-server; `App.tsx` não instancia hooks de browser location no server. wouter não restaura scroll: `ScrollToTop` obrigatório. Links internos sempre via `<Link>` com trailing slash para não gerar 301.
4. **Trailing slash / duplicidade.** `express.static` define a canônica com barra final. Sitemap, canonical, JSON-LD `url` e links internos 100% consistentes — helper único `absUrl(path)` em `seo/constants.ts`.
5. **Tailwind v4 sem config file.** Tokens só via `@theme inline` no `client/src/index.css`; classes como `bg-primary` derivam dos nomes `--color-*`. Não inventar cores arbitrárias nem estilo inline hex. Cuidado com classes dinâmicas (`bg-${x}`) — o scanner v4 não as detecta; usar mapas explícitos.
6. **Ordem do build.** O prerender roda DEPOIS do client build (template com assets hasheados); o `emptyOutDir` do build SSR não pode apagar `dist/public` (outDir separado `dist/ssr` absoluto). Import do bundle SSR com `pathToFileURL` (ESM em `type: module`).
7. **Express 5.** Catch-all usa a sintaxe nova `"/{*path}"` (já correta em `static.ts` e `vite.ts`) — não regredir para `"*"`, que quebra no path-to-regexp v8.
8. **Accordion do FAQ e SEO.** Radix Accordion desmonta o conteúdo fechado por padrão. Para garantir conteúdo no HTML pré-renderizado: `forceMount` + colapso via CSS, ou `<details>` nativo. O critério de aceite da Fase 4 (respostas no view-source) é inegociável.
9. **Peso do bundle vs CWV.** framer-motion inteiro (~34 KB gz); `ui/chart.tsx` puxa recharts (~100 KB) — deletar o arquivo previne. Sem code-splitting por rota (site pequeno). Orçamento: ≤ 250 KB gz.
10. **Compliance (Lei 11.795/BACEN).** A copy aprovada já é conservadora — não "melhorar" com promessas. A simulação não exibe números/parcelas inventados; coleta o objetivo e promete análise por especialista. Disclaimer no footer de todas as páginas.
11. ~~**Foto do Magno:** indisponível. Fallback gráfico com o símbolo "S".~~ **Resolvido:** o cliente liberou a foto (decisão nº 4 no topo); o fallback saiu e o `MagnoPortrait` serve a imagem aprovada.
12. **Storage fallback.** O `pg.Pool` atual é criado no import de `server/storage.ts` mesmo sem `DATABASE_URL` — mover a criação para dentro do branch condicional para o server não depender de Postgres em import-time.

---

## Arquivos críticos
- `script/build.ts` — orquestra client build + SSR build + prerender + sitemap (coração do SSG)
- `client/src/seo/routes.ts` (novo) — registro único que alimenta App, prerender e sitemap
- `client/src/entry-server.tsx` (novo) — `render(url)` com wouter `ssrPath`; par com `client/src/main.tsx` em `hydrateRoot`
- `server/static.ts` — páginas estáticas por diretório + 404 real
- `client/src/index.css` — design system inteiro via `@theme inline`


---

## 8. Correções pós-QA (registro)

O QA (invariantes Sintetiza) reprovou a primeira entrega por **INV-5 (LGPD)** e apontou outros defeitos. Todos corrigidos e verificados:

| Severidade | Defeito | Correção |
|---|---|---|
| ALTO | Dado pessoal no log: o body-parser anexa o payload cru em `err.body` e o handler logava o erro inteiro; a mensagem do parser de JSON também ecoava trecho do corpo na resposta 400 | `server/index.ts`: handler loga só método/rota/status/tipo; resposta genérica para erro de parse; corpo da resposta só entra no log fora de produção; `rawBody` deixou de ser retido |
| MÉDIO | Formulário aceitava nome só com espaços, telefone sem dígitos e mensagem de 90 mil caracteres | `shared/schema.ts`: `trim()` antes de `min()`, telefone exigindo ≥10 dígitos (aceitando máscara), `max()` nos 4 campos |
| MÉDIO | `text-primary-foreground/45` reprovava no axe | elevado para `/70` |
| BAIXO | Rate-limit sem limpeza e sem `trust proxy` (atrás de CDN todos dividiriam o mesmo balde) | `pruneRateLimit()` + `TRUST_PROXY` por env |
| BAIXO | IDs do JsonlStorage colidiam acima de 1000 mensagens | contador reinicia a cada milissegundo |
| BAIXO | `template.replace` interpretava `$&`, `$'`, `` $` `` | replacer function no `script/prerender.ts` |
| — | 16 vulnerabilidades (9 high) | `npm audit` em zero; `nodemailer` 9.x, `drizzle-orm` 0.45.x, `ws` removido |
| — | Borda pública só com rate-limit | honeypot no formulário |

Suíte de testes (vitest + fast-check) versionada em `tests/`: 35 testes, incluindo as propriedades INV-2 (300 runs) e INV-5.

---

## 9. Auditoria Lighthouse — evidência da Fase 6

Lighthouse 13.4.1, preset mobile padrão, Chrome headless, contra o build de produção (`npm run build && npm run start`) servido em localhost. Todas as 12 rotas indexáveis, uma execução por rota.

| Rota | Perf | A11y | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 100 |
| `/consorcio-de-imoveis/` | 98 | 100 | 100 | 100 |
| `/consorcio-de-veiculos/` | 98 | 100 | 100 | 100 |
| `/consorcio-de-caminhoes/` | 98 | 100 | 100 | 100 |
| `/consorcio-para-empresas/` | 98 | 100 | 100 | 100 |
| `/o-que-e-consorcio/` | 98 | 100 | 100 | 100 |
| `/quem-somos/` | 97 | 100 | 100 | 100 |
| `/magno-stiti-de-paula/` | 97 | 100 | 100 | 100 |
| `/perguntas-frequentes/` | 98 | 100 | 100 | 100 |
| `/simulacao-de-consorcio/` | 97 | 100 | 100 | 100 |
| `/fale-com-um-especialista/` | 97 | 100 | 100 | 100 |
| `/politica-de-privacidade/` | 97 | 100 | 100 | 100 |

**Critério de aceite da Fase 6 (Perf ≥ 90, SEO ≥ 95, A11y ≥ 95, BP ≥ 95): atendido em todas as rotas.**

Core Web Vitals na home: FCP 1,4 s · LCP 2,3 s · TBT 0 ms · CLS 0 · Speed Index 1,4 s.

JavaScript inicial: 98,2 KB gzip, contra o orçamento de 250 KB.

Ressalvas de leitura destes números:

1. **Medição local.** Sem latência de rede real, sem TLS e sem a CPU da VPS. O `Initial server response time` de 0 ms não se sustentará em produção. Repetir a auditoria com o site no ar, via PageSpeed Insights, é o que vale para o Search Console.
2. **Build sem GA4.** `VITE_GA_ID` estava vazio, então o `gtag` não foi carregado. Quando o ID for configurado, entra JavaScript de terceiro que costuma custar alguns pontos de Performance e Best Practices.
3. **A única oportunidade apontada** foi "Reduce unused JavaScript", com ~44 KiB estimados — resíduo do React que o code-splitting por rota já existente não elimina. Não compensa perseguir com a nota em 97–98.
