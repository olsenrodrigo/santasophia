import {
  Building2,
  Car,
  Coins,
  HardHat,
  Home,
  Landmark,
  TrendingUp,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface Segment {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export const segments: Segment[] = [
  {
    title: "Imóveis",
    description: "Para comprar sua casa, apartamento, terreno ou realizar um projeto imobiliário.",
    href: "/consorcio-de-imoveis/",
    icon: Home,
  },
  {
    title: "Construção e reforma",
    description: "Para construir em terreno próprio ou reformar, com o crédito liberado integralmente na sua conta.",
    href: "/construcao-e-reforma/",
    icon: HardHat,
  },
  {
    title: "Quitação de financiamento",
    description: "Para quem já paga um financiamento e quer trocar juros por taxa de administração.",
    href: "/quitacao-de-financiamento/",
    icon: Landmark,
  },
  {
    title: "Veículos",
    description: "Para trocar de carro ou adquirir um veículo de acordo com seu planejamento.",
    href: "/consorcio-de-veiculos/",
    icon: Car,
  },
  {
    title: "Veículos pesados",
    description: "Para quem precisa investir em caminhões, máquinas e estrutura para trabalhar.",
    href: "/consorcio-de-caminhoes/",
    icon: Truck,
  },
  {
    title: "Empresas",
    description: "Para empresários que precisam de capital planejado para expansão, equipamentos ou novos projetos.",
    href: "/consorcio-para-empresas/",
    icon: Building2,
  },
  {
    title: "Alavancagem financeira",
    description: "Para quem quer usar o consórcio como estratégia patrimonial, com orientação e sem promessa de retorno.",
    href: "/alavancagem-financeira/",
    icon: TrendingUp,
  },
  {
    title: "Crédito",
    description: "Para quem busca uma estratégia de aquisição baseada em planejamento e organização financeira.",
    href: "/o-que-e-consorcio/",
    icon: Coins,
  },
];
