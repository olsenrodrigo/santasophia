import {
  breadcrumbJsonLd,
  organizationJsonLd,
  personJsonLd,
  serviceJsonLd,
  websiteJsonLd,
} from "./jsonld";
import { faqByCategory, faqEntries, faqSchemaItems } from "@/content/faq";
import { faqPageJsonLd } from "./jsonld";

export interface RouteMeta {
  path: string;
  page: RoutePage;
  title: string;
  description: string;
  h1: string;
  breadcrumbLabel: string;
  ogImage?: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
  noindex?: boolean;
  jsonLd: () => object[];
}

export type RoutePage =
  | "home"
  | "real-estate"
  | "vehicles"
  | "trucks"
  | "business"
  | "guide"
  | "about"
  | "magno"
  | "faq"
  | "simulation"
  | "contact"
  | "privacy"
  | "not-found";

const internalSchemas = (path: string, extra: object[] = []) => [
  breadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: findRouteMeta(path).breadcrumbLabel, path },
  ]),
  ...extra,
];

export const routes: RouteMeta[] = [
  {
    path: "/",
    page: "home",
    title: "Santa Sophia Consórcios | Consórcio com estratégia",
    description:
      "A Santa Sophia conecta você às melhores possibilidades em consórcio de imóveis, veículos e empresas. Atendimento consultivo com Magno Stiti de Paula em todo o Brasil.",
    h1: "Seu próximo grande passo não precisa esperar.",
    breadcrumbLabel: "Início",
    changefreq: "weekly",
    priority: 1,
    jsonLd: () => [organizationJsonLd(), websiteJsonLd()],
  },
  {
    path: "/consorcio-de-imoveis/",
    page: "real-estate",
    ogImage: "/og/consorcio-de-imoveis.jpg",
    title: "Consórcio de Imóveis: casa, apto e terreno | Santa Sophia",
    description:
      "Consórcio imobiliário com planejamento: carta de crédito para comprar casa, apartamento, terreno, construir ou reformar. Fale com um especialista da Santa Sophia.",
    h1: "Consórcio de imóveis: planeje a conquista da sua casa, apartamento ou terreno",
    breadcrumbLabel: "Consórcio de imóveis",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/consorcio-de-imoveis/", [
        serviceJsonLd(
          "/consorcio-de-imoveis/",
          "Consórcio de imóveis",
          "Planejamento de consórcio para imóveis, conforme as regras da administradora e do contrato.",
        ),
      ]),
  },
  {
    path: "/consorcio-de-veiculos/",
    page: "vehicles",
    ogImage: "/og/consorcio-de-veiculos.jpg",
    title: "Consórcio de Veículos: carros e motos | Santa Sophia",
    description:
      "Consórcio de carros e motos com planejamento: entenda a modalidade e avalie uma carta de crédito para carro com a Santa Sophia.",
    h1: "Consórcio de veículos: troque de carro com planejamento, não com pressa",
    breadcrumbLabel: "Consórcio de veículos",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/consorcio-de-veiculos/", [
        serviceJsonLd(
          "/consorcio-de-veiculos/",
          "Consórcio de veículos",
          "Planejamento de consórcio para carros e motos, conforme as regras da administradora e do contrato.",
        ),
      ]),
  },
  {
    path: "/consorcio-de-caminhoes/",
    page: "trucks",
    ogImage: "/og/consorcio-de-caminhoes.jpg",
    title: "Consórcio de Caminhões e Veículos Pesados | Santa Sophia",
    description:
      "Consórcio de caminhões, máquinas e veículos pesados para quem trabalha: renove ou amplie sua frota com aquisição planejada. Fale com a Santa Sophia.",
    h1: "Consórcio de caminhões e veículos pesados: estrutura para quem trabalha",
    breadcrumbLabel: "Consórcio de caminhões",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/consorcio-de-caminhoes/", [
        serviceJsonLd(
          "/consorcio-de-caminhoes/",
          "Consórcio de caminhões e veículos pesados",
          "Planejamento de consórcio para caminhões e veículos pesados, conforme as regras da administradora e do contrato.",
        ),
      ]),
  },
  {
    path: "/consorcio-para-empresas/",
    page: "business",
    ogImage: "/og/consorcio-para-empresas.jpg",
    title: "Consórcio para Empresas: máquinas e frota | Santa Sophia",
    description:
      "Consórcio empresarial para expansão, máquinas, equipamentos e frota. Capital planejado para a estratégia de crescimento da sua empresa. Fale com um especialista.",
    h1: "Consórcio empresarial: capital planejado para expandir sua empresa",
    breadcrumbLabel: "Consórcio para empresas",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/consorcio-para-empresas/", [
        serviceJsonLd(
          "/consorcio-para-empresas/",
          "Consórcio para empresas",
          "Planejamento de consórcio para máquinas, equipamentos, imóveis e frota, conforme as regras da administradora e do contrato.",
        ),
      ]),
  },
  {
    path: "/o-que-e-consorcio/",
    page: "guide",
    ogImage: "/og/o-que-e-consorcio.jpg",
    title: "O que é consórcio e como funciona? | Santa Sophia",
    description:
      "Entenda o que é consórcio, como funciona a contemplação, o lance e a carta de crédito, e como escolher um consórcio com segurança. Guia da Santa Sophia.",
    h1: "O que é consórcio e como funciona?",
    breadcrumbLabel: "O que é consórcio",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () => internalSchemas("/o-que-e-consorcio/", [faqPageJsonLd(faqSchemaItems(faqByCategory("consorcio")))]),
  },
  {
    path: "/quem-somos/",
    page: "about",
    ogImage: "/og/quem-somos.jpg",
    title: "Quem somos | Santa Sophia Consórcios",
    description:
      "A Santa Sophia é uma empresa especializada em soluções de crédito por meio de consórcio, com atendimento digital e consultivo para clientes em todo o Brasil.",
    h1: "Quem é a Santa Sophia?",
    breadcrumbLabel: "Quem somos",
    changefreq: "monthly",
    priority: 0.8,
    jsonLd: () =>
      internalSchemas("/quem-somos/", [organizationJsonLd()]),
  },
  {
    path: "/magno-stiti-de-paula/",
    page: "magno",
    ogImage: "/og/magno-stiti-de-paula.jpg",
    title: "Magno Stiti de Paula — Especialista em Consórcios",
    description:
      "Magno Stiti de Paula é especialista em consórcios e referência comercial no segmento, com experiência na comercialização de consórcios do Itaú. Fale com o Magno.",
    h1: "Magno Stiti de Paula, especialista em consórcios",
    breadcrumbLabel: "Magno Stiti de Paula",
    changefreq: "monthly",
    priority: 0.8,
    jsonLd: () =>
      internalSchemas("/magno-stiti-de-paula/", [
        personJsonLd(),
      ]),
  },
  {
    path: "/perguntas-frequentes/",
    page: "faq",
    ogImage: "/og/perguntas-frequentes.jpg",
    title: "Perguntas Frequentes sobre Consórcio | Santa Sophia",
    description:
      "Consórcio vale a pena? Consórcio ou financiamento? Como funciona o lance? Respostas diretas da Santa Sophia para as principais dúvidas sobre consórcio.",
    h1: "Perguntas frequentes sobre consórcio",
    breadcrumbLabel: "Perguntas frequentes",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/perguntas-frequentes/", [faqPageJsonLd(faqSchemaItems(faqEntries))]),
  },
  {
    path: "/simulacao-de-consorcio/",
    page: "simulation",
    ogImage: "/og/simulacao-de-consorcio.jpg",
    title: "Simulação de Consórcio personalizada | Santa Sophia",
    description:
      "Para simular consórcio, conte seu objetivo, prazo e valor. Um especialista da Santa Sophia prepara uma análise conforme as condições disponíveis.",
    h1: "Solicite sua simulação de consórcio",
    breadcrumbLabel: "Simulação de consórcio",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/simulacao-de-consorcio/"),
  },
  {
    path: "/fale-com-um-especialista/",
    page: "contact",
    ogImage: "/og/fale-com-um-especialista.jpg",
    title: "Fale com um Especialista em Consórcio | Santa Sophia",
    description:
      "Fale com Magno Stiti de Paula, consultor de consórcio, por WhatsApp, 0800 ou formulário antes de contratar consórcio.",
    h1: "Fale com um especialista em consórcio",
    breadcrumbLabel: "Fale com um especialista",
    changefreq: "monthly",
    priority: 0.9,
    jsonLd: () =>
      internalSchemas("/fale-com-um-especialista/"),
  },
  {
    path: "/politica-de-privacidade/",
    page: "privacy",
    title: "Política de Privacidade | Santa Sophia Consórcios",
    description:
      "Conheça como a Santa Sophia Consórcios trata dados pessoais e protege a sua privacidade em conformidade com a LGPD.",
    h1: "Política de Privacidade",
    breadcrumbLabel: "Política de Privacidade",
    changefreq: "yearly",
    priority: 0.3,
    jsonLd: () =>
      internalSchemas("/politica-de-privacidade/"),
  },
  {
    path: "/404/",
    page: "not-found",
    title: "Página não encontrada | Santa Sophia",
    description: "A página solicitada não foi encontrada.",
    h1: "Página não encontrada",
    breadcrumbLabel: "Página não encontrada",
    noindex: true,
    jsonLd: () => internalSchemas("/404/"),
  },
];

export const notFoundRoute = routes.find((route) => route.path === "/404/")!;

export function findRouteMeta(path: string): RouteMeta {
  const normalized = path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
  return routes.find((route) => route.path === normalized) ?? notFoundRoute;
}
