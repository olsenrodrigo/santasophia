import {
  breadcrumbJsonLd,
  organizationJsonLd,
  personJsonLd,
  serviceJsonLd,
  websiteJsonLd,
} from "./jsonld";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  h1: string;
  ogImage?: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
  noindex?: boolean;
  jsonLd: () => object[];
}

const internalSchemas = (path: string, label: string, extra: object[] = []) => [
  breadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: label, path },
  ]),
  ...extra,
];

export const routes: RouteMeta[] = [
  {
    path: "/",
    title: "Santa Sophia Consórcios | Consórcio com estratégia",
    description:
      "A Santa Sophia conecta você às melhores possibilidades em consórcio de imóveis, veículos e empresas. Atendimento consultivo com Magno Stiti de Paula em todo o Brasil.",
    h1: "Seu próximo grande passo não precisa esperar.",
    changefreq: "weekly",
    priority: 1,
    jsonLd: () => [organizationJsonLd(), websiteJsonLd()],
  },
  {
    path: "/consorcio-de-imoveis/",
    title: "Consórcio de Imóveis: casa, apto e terreno | Santa Sophia",
    description:
      "Consórcio imobiliário com planejamento: carta de crédito para comprar casa, apartamento, terreno, construir ou reformar. Fale com um especialista da Santa Sophia.",
    h1: "Consórcio de imóveis: planeje a conquista da sua casa, apartamento ou terreno",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/consorcio-de-imoveis/", "Consórcio de imóveis", [
        serviceJsonLd(
          "/consorcio-de-imoveis/",
          "Consórcio de imóveis",
          "Planejamento de consórcio para imóveis, conforme as regras da administradora e do contrato.",
        ),
      ]),
  },
  {
    path: "/consorcio-de-veiculos/",
    title: "Consórcio de Veículos: carros e motos | Santa Sophia",
    description:
      "Consórcio de carros e motos com estratégia: entenda quando o consórcio de veículos faz sentido e planeje a troca do seu carro com a Santa Sophia.",
    h1: "Consórcio de veículos: troque de carro com planejamento, não com pressa",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/consorcio-de-veiculos/", "Consórcio de veículos", [
        serviceJsonLd(
          "/consorcio-de-veiculos/",
          "Consórcio de veículos",
          "Planejamento de consórcio para carros e motos, conforme as regras da administradora e do contrato.",
        ),
      ]),
  },
  {
    path: "/consorcio-de-caminhoes/",
    title: "Consórcio de Caminhões e Veículos Pesados | Santa Sophia",
    description:
      "Consórcio de caminhões, máquinas e veículos pesados para quem trabalha: renove ou amplie sua frota com aquisição planejada. Fale com a Santa Sophia.",
    h1: "Consórcio de caminhões e veículos pesados: estrutura para quem trabalha",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/consorcio-de-caminhoes/", "Consórcio de caminhões", [
        serviceJsonLd(
          "/consorcio-de-caminhoes/",
          "Consórcio de caminhões e veículos pesados",
          "Planejamento de consórcio para caminhões e veículos pesados, conforme as regras da administradora e do contrato.",
        ),
      ]),
  },
  {
    path: "/consorcio-para-empresas/",
    title: "Consórcio para Empresas: máquinas e frota | Santa Sophia",
    description:
      "Consórcio empresarial para expansão, máquinas, equipamentos e frota. Capital planejado para a estratégia de crescimento da sua empresa. Fale com um especialista.",
    h1: "Consórcio empresarial: capital planejado para expandir sua empresa",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/consorcio-para-empresas/", "Consórcio para empresas", [
        serviceJsonLd(
          "/consorcio-para-empresas/",
          "Consórcio para empresas",
          "Planejamento de consórcio para máquinas, equipamentos, imóveis e frota, conforme as regras da administradora e do contrato.",
        ),
      ]),
  },
  {
    path: "/o-que-e-consorcio/",
    title: "O que é consórcio e como funciona? | Santa Sophia",
    description:
      "Entenda o que é consórcio, como funciona a contemplação, o lance e a carta de crédito, e como escolher um consórcio com segurança. Guia da Santa Sophia.",
    h1: "O que é consórcio e como funciona?",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () => internalSchemas("/o-que-e-consorcio/", "O que é consórcio"),
  },
  {
    path: "/quem-somos/",
    title: "Quem somos | Santa Sophia Consórcios",
    description:
      "A Santa Sophia é uma empresa especializada em soluções de crédito por meio de consórcio, com atendimento digital e consultivo para clientes em todo o Brasil.",
    h1: "Quem é a Santa Sophia?",
    changefreq: "monthly",
    priority: 0.8,
    jsonLd: () =>
      internalSchemas("/quem-somos/", "Quem somos", [organizationJsonLd()]),
  },
  {
    path: "/magno-stiti-de-paula/",
    title: "Magno Stiti de Paula — Especialista em Consórcios",
    description:
      "Magno Stiti de Paula é especialista em consórcios e referência comercial no segmento, com experiência na comercialização de consórcios do Itaú. Fale com o Magno.",
    h1: "Magno Stiti de Paula, especialista em consórcios",
    changefreq: "monthly",
    priority: 0.8,
    jsonLd: () =>
      internalSchemas("/magno-stiti-de-paula/", "Magno Stiti de Paula", [
        personJsonLd(),
      ]),
  },
  {
    path: "/perguntas-frequentes/",
    title: "Perguntas Frequentes sobre Consórcio | Santa Sophia",
    description:
      "Consórcio vale a pena? Consórcio ou financiamento? Como funciona o lance? Respostas diretas da Santa Sophia para as principais dúvidas sobre consórcio.",
    h1: "Perguntas frequentes sobre consórcio",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/perguntas-frequentes/", "Perguntas frequentes"),
  },
  {
    path: "/simulacao-de-consorcio/",
    title: "Simulação de Consórcio personalizada | Santa Sophia",
    description:
      "Solicite uma simulação de consórcio feita por um especialista: conte seu objetivo, prazo e valor, e receba uma análise personalizada da Santa Sophia.",
    h1: "Solicite sua simulação de consórcio",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/simulacao-de-consorcio/", "Simulação de consórcio"),
  },
  {
    path: "/fale-com-um-especialista/",
    title: "Fale com um Especialista em Consórcio | Santa Sophia",
    description:
      "Fale com Magno Stiti de Paula e a equipe Santa Sophia: WhatsApp, 0800 e formulário. Uma conversa séria sobre o seu próximo passo, sem pressão.",
    h1: "Fale com um especialista em consórcio",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/fale-com-um-especialista/", "Fale com um especialista"),
  },
  {
    path: "/politica-de-privacidade/",
    title: "Política de Privacidade | Santa Sophia Consórcios",
    description:
      "Conheça como a Santa Sophia Consórcios trata dados pessoais e protege a sua privacidade em conformidade com a LGPD.",
    h1: "Política de Privacidade",
    changefreq: "yearly",
    priority: 0.3,
    jsonLd: () =>
      internalSchemas("/politica-de-privacidade/", "Política de Privacidade"),
  },
  {
    path: "/404/",
    title: "Página não encontrada | Santa Sophia",
    description: "A página solicitada não foi encontrada.",
    h1: "Página não encontrada",
    noindex: true,
    jsonLd: () => internalSchemas("/404/", "Página não encontrada"),
  },
];

export const notFoundRoute = routes.find((route) => route.path === "/404/")!;

export function findRouteMeta(path: string): RouteMeta {
  const normalized = path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
  return routes.find((route) => route.path === normalized) ?? notFoundRoute;
}
