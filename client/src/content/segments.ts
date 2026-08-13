import { Building2, Car, Coins, Home, Truck, type LucideIcon } from "lucide-react";

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
    title: "Crédito",
    description: "Para quem busca uma estratégia de aquisição baseada em planejamento e organização financeira.",
    href: "/o-que-e-consorcio/",
    icon: Coins,
  },
];
