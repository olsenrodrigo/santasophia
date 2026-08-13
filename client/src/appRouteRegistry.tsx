import type { ComponentType } from "react";
import AboutPage from "@/pages/AboutPage";
import ConsortiumGuide from "@/pages/ConsortiumGuide";
import ContactPage from "@/pages/ContactPage";
import FaqPage from "@/pages/FaqPage";
import Home from "@/pages/Home";
import MagnoPage from "@/pages/MagnoPage";
import NotFound from "@/pages/not-found";
import PrivacyPage from "@/pages/PrivacyPage";
import { BusinessPage, RealEstatePage, TrucksPage, VehiclesPage } from "@/pages/SegmentPage";
import { routes, type RoutePage } from "@/seo/routes";

function SimulationPage() {
  return <ContactPage simulation />;
}

const componentsByPage: Record<RoutePage, ComponentType> = {
  home: Home,
  "real-estate": RealEstatePage,
  vehicles: VehiclesPage,
  trucks: TrucksPage,
  business: BusinessPage,
  guide: ConsortiumGuide,
  about: AboutPage,
  magno: MagnoPage,
  faq: FaqPage,
  simulation: SimulationPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  "not-found": NotFound,
};

export const appRouteRegistry = routes.map((route) => ({
  path: route.path,
  Component: componentsByPage[route.page],
}));
