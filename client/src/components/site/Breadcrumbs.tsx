import { Link, useLocation } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { findRouteMeta } from "@/seo/routes";

export function Breadcrumbs({ path }: { path?: string }) {
  const [location] = useLocation();
  const route = findRouteMeta(path ?? location);

  if (route.path === "/") return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-primary-foreground/70">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="hover:text-primary-foreground">Início</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primary-foreground/50" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-primary-foreground">{route.breadcrumbLabel}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
