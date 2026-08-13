import { Layout } from "@/components/site/Layout";
import type { RouteMeta } from "@/seo/routes";

export function PlaceholderPage({ route }: { route: RouteMeta }) {
  return (
    <Layout>
      <main className="flex min-h-screen items-center bg-primary-deep px-6 py-24 text-primary-foreground">
        <div className="container-custom">
          <p className="eyebrow-text mb-4 text-highlight">Santa Sophia Consórcios</p>
          <h1 className="max-w-5xl text-balance text-4xl text-primary-foreground md:text-6xl">
            {route.h1}
          </h1>
        </div>
      </main>
    </Layout>
  );
}
