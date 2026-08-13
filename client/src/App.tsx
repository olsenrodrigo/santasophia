import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import ConsortiumGuide from "@/pages/ConsortiumGuide";
import FaqPage from "@/pages/FaqPage";
import { BusinessPage, RealEstatePage, TrucksPage, VehiclesPage } from "@/pages/SegmentPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import MagnoPage from "@/pages/MagnoPage";
import NotFound from "@/pages/not-found";
import PrivacyPage from "@/pages/PrivacyPage";
import { usePageMeta } from "@/seo/usePageMeta";

export function AppRoutes() {
  usePageMeta();

  return (
    <Switch>
      <Route path="/" nest={false}>
        <Home />
      </Route>
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
  );
}

export default function App() {
  return <AppRoutes />;
}
