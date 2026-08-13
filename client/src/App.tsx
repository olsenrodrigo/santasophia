import { Route, Switch } from "wouter";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import Home from "@/pages/Home";
import { notFoundRoute, routes } from "@/seo/routes";
import { usePageMeta } from "@/seo/usePageMeta";

export function AppRoutes() {
  usePageMeta();

  return (
    <Switch>
      <Route path="/" nest={false}>
        <Home />
      </Route>
      {routes.filter((route) => route.path !== "/").map((route) => (
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
