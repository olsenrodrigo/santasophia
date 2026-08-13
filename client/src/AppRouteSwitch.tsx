import { Route, Switch } from "wouter";
import { appRouteRegistry } from "@/appRouteRegistry";
import NotFound from "@/pages/not-found";

export function AppRouteSwitch() {
  return (
    <Switch>
      {appRouteRegistry.map(({ path, Component }) => (
        <Route key={path} path={path} nest={path === "/" ? false : undefined}>
          <Component />
        </Route>
      ))}
      <Route><NotFound /></Route>
    </Switch>
  );
}
