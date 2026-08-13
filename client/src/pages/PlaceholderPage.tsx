import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import type { RouteMeta } from "@/seo/routes";

export function PlaceholderPage({ route }: { route: RouteMeta }) {
  return (
    <Layout>
      <PageHero h1={route.h1} path={route.path} />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <p className="max-w-2xl text-lg text-muted-foreground">Conteúdo em preparação.</p>
        </div>
      </section>
    </Layout>
  );
}
