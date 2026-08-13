import { Route, Switch } from "wouter";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import Home from "@/pages/Home";
import ConsortiumGuide from "@/pages/ConsortiumGuide";
import FaqPage from "@/pages/FaqPage";
import { BusinessPage, RealEstatePage, TrucksPage, VehiclesPage } from "@/pages/SegmentPage";
import { notFoundRoute, routes } from "@/seo/routes";
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
      {routes.filter((route) => !["/", "/consorcio-de-imoveis/", "/consorcio-de-veiculos/", "/consorcio-de-caminhoes/", "/consorcio-para-empresas/", "/o-que-e-consorcio/", "/perguntas-frequentes/"].includes(route.path)).map((route) => (
        <Route key={route.path} path={route.path}>
          <PlaceholderPage route={route} />
        </Route>
      ))}
      <Route>
        <PlaceholderPage route={notFoundRoute} />
      </Route>
    </Switch>
  );
}

export default function App() {
  return <AppRoutes />;
}
