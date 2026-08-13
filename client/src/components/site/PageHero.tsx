import symbol from "@/assets/brand/symbol.png";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeroProps {
  h1: string;
  eyebrow?: string;
  lede?: string;
  path?: string;
}

export function PageHero({ h1, eyebrow = "Santa Sophia Consórcios", lede, path }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-deep py-20 text-primary-foreground md:py-28">
      <img src={symbol} alt="" width="564" height="512" aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/2 w-96 -translate-y-1/2 opacity-10" />
      <div className="container-custom relative z-10">
        <Breadcrumbs path={path} />
        <p className="eyebrow-text mb-5 mt-8 text-highlight">{eyebrow}</p>
        <h1 className="max-w-5xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-primary-foreground">{h1}</h1>
        {lede ? <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:text-xl">{lede}</p> : null}
      </div>
    </section>
  );
}
