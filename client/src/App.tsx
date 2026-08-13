import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { usePageMeta } from "@/seo/usePageMeta";

const Home = lazy(() => import("@/pages/Home"));
const ConsortiumGuide = lazy(() => import("@/pages/ConsortiumGuide"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const MagnoPage = lazy(() => import("@/pages/MagnoPage"));
const NotFound = lazy(() => import("@/pages/not-found"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const RealEstatePage = lazy(() => import("@/pages/SegmentPage").then((module) => ({ default: module.RealEstatePage })));
const VehiclesPage = lazy(() => import("@/pages/SegmentPage").then((module) => ({ default: module.VehiclesPage })));
const TrucksPage = lazy(() => import("@/pages/SegmentPage").then((module) => ({ default: module.TrucksPage })));
const BusinessPage = lazy(() => import("@/pages/SegmentPage").then((module) => ({ default: module.BusinessPage })));

export function AppRoutes() {
  usePageMeta();

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Carregando página" />}>
      <Switch>
        <Route path="/" nest={false}><Home /></Route>
        <Route path="/consorcio-de-imoveis/"><RealEstatePage /></Route>
        <Route path="/consorcio-de-veiculos/"><VehiclesPage /></Route>
        <Route path="/consorcio-de-caminhoes/"><TrucksPage /></Route>
        <Route path="/consorcio-para-empresas/"><BusinessPage /></Route>
        <Route path="/o-que-e-consorcio/"><ConsortiumGuide /></Route>
        <Route path="/perguntas-frequentes/"><FaqPage /></Route>
        <Route path="/quem-somos/"><AboutPage /></Route>
        <Route path="/magno-stiti-de-paula/"><MagnoPage /></Route>
        <Route path="/simulacao-de-consorcio/"><ContactPage simulation /></Route>
        <Route path="/fale-com-um-especialista/"><ContactPage /></Route>
        <Route path="/politica-de-privacidade/"><PrivacyPage /></Route>
        <Route path="/404/"><NotFound /></Route>
        <Route><NotFound /></Route>
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return <AppRoutes />;
}
