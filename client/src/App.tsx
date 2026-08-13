import { Route, Switch } from "wouter";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { notFoundRoute, routes } from "@/seo/routes";
import { usePageMeta } from "@/seo/usePageMeta";

export function AppRoutes() {
  usePageMeta();

  return (
    <Switch>
      {routes.map((route) => (
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
