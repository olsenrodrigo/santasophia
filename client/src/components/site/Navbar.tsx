import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Link } from "wouter";
import logo from "@/assets/brand/logo-horizontal.png";

const consortiumLinks = [
  ["Imóveis", "/consorcio-de-imoveis/"],
  ["Veículos", "/consorcio-de-veiculos/"],
  ["Caminhões e Pesados", "/consorcio-de-caminhoes/"],
  ["Empresas", "/consorcio-para-empresas/"],
] as const;

const mainLinks = [
  ["Como funciona", "/o-que-e-consorcio/"],
  ["Quem somos", "/quem-somos/"],
  ["O especialista", "/magno-stiti-de-paula/"],
  ["FAQ", "/perguntas-frequentes/"],
] as const;

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-surface focus-visible:outline-ring";

export function Navbar() {
  const [consortiumOpen, setConsortiumOpen] = useState(false);
  const consortiumMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!consortiumMenuRef.current?.contains(event.target as Node)) setConsortiumOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setConsortiumOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeMobileMenu(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.closest("details")?.removeAttribute("open");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="container-custom flex h-20 items-center justify-between" aria-label="Navegação principal">
        <Link href="/" aria-label="Santa Sophia Consórcios — início" className="shrink-0">
          <img src={logo} alt="Santa Sophia Consórcios" width="248" height="45" className="h-auto w-48 md:w-56" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <div
            ref={consortiumMenuRef}
            className="group relative"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setConsortiumOpen(false);
            }}
          >
            <button
              type="button"
              className={`${navLinkClass} flex items-center gap-1`}
              aria-haspopup="true"
              aria-expanded={consortiumOpen}
              aria-controls="menu-consorcios"
              onClick={() => setConsortiumOpen((open) => !open)}
              onFocus={() => setConsortiumOpen(true)}
            >
              Consórcios
              <ChevronDown className={`size-4 transition-transform group-hover:rotate-180 ${consortiumOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <div id="menu-consorcios" className={`${consortiumOpen ? "visible translate-y-0" : "invisible translate-y-2"} absolute left-0 top-full w-64 rounded-xl border border-border bg-background p-2 shadow-card transition-transform group-hover:visible group-hover:translate-y-0`}>
              {consortiumLinks.map(([label, href]) => (
                <Link key={href} href={href} className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface hover:text-primary" onClick={() => setConsortiumOpen(false)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          {mainLinks.map(([label, href]) => (
            <Link key={href} href={href} className={navLinkClass}>
              {label}
            </Link>
          ))}
          <Link
            href="/fale-com-um-especialista/"
            className="ml-3 rounded-md bg-cta px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-highlight"
          >
            Falar com um especialista
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="inline-flex size-11 cursor-pointer list-none items-center justify-center rounded-md border border-border text-primary marker:content-none" aria-label="Abrir menu">
              <Menu className="size-6" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-14 w-[min(88vw,24rem)] rounded-xl border border-border bg-background p-5 shadow-card-strong">
            <p className="mb-5 font-heading text-lg font-bold text-primary">Menu</p>
            <div className="flex flex-col gap-1">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Consórcios</p>
              {consortiumLinks.map(([label, href]) => (
                <Link key={href} href={href} className={navLinkClass} onClick={closeMobileMenu}>{label}</Link>
              ))}
              <div className="my-3 border-t border-border" />
              {mainLinks.map(([label, href]) => (
                <Link key={href} href={href} className={navLinkClass} onClick={closeMobileMenu}>{label}</Link>
              ))}
              <Link href="/fale-com-um-especialista/" className="mt-4 rounded-md bg-cta px-4 py-3 text-center font-bold text-primary" onClick={closeMobileMenu}>Falar com um especialista</Link>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
