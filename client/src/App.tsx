import { AppRouteSwitch } from "@/AppRouteSwitch";
import { usePageMeta } from "@/seo/usePageMeta";

export function AppRoutes() {
  usePageMeta();
  return <AppRouteSwitch />;
}

export default function App() {
  return <AppRoutes />;
}
