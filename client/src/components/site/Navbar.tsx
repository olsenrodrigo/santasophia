import { ChevronDown, Menu } from "lucide-react";
import { Link } from "wouter";
import logo from "@/assets/brand/logo-horizontal.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const consortiumLinks = [
  ["Imóveis", "/consorcio-de-imoveis/"],
  ["Veículos", "/consorcio-de-veiculos/"],
  ["Caminhões e Pesados", "/consorcio-de-caminhoes/"],
  ["Empresas", "/consorcio-para-empresas/"],
] as const;

const mainLinks = [
  ["Como funciona", "/o-que-e-consorcio/"],
  ["Quem somos", "/quem-somos/"],
  ["FAQ", "/perguntas-frequentes/"],
] as const;

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-surface focus-visible:outline-ring";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="container-custom flex h-20 items-center justify-between" aria-label="Navegação principal">
        <Link href="/" aria-label="Santa Sophia Consórcios — início" className="shrink-0">
          <img src={logo} alt="Santa Sophia Consórcios" width="248" height="45" className="h-auto w-48 md:w-56" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <button type="button" className={`${navLinkClass} flex items-center gap-1`} aria-haspopup="true">
              Consórcios
              <ChevronDown className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden="true" />
            </button>
            <div className="invisible absolute left-0 top-full w-64 translate-y-2 rounded-xl border border-border bg-background p-2 shadow-card transition-transform group-focus-within:visible group-focus-within:translate-y-0 group-hover:visible group-hover:translate-y-0">
              {consortiumLinks.map(([label, href]) => (
                <Link key={href} href={href} className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface hover:text-primary">
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

        <Sheet>
          <SheetTrigger asChild>
            <button type="button" className="inline-flex size-11 items-center justify-center rounded-md border border-border text-primary lg:hidden" aria-label="Abrir menu">
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[min(90vw,24rem)] overflow-y-auto border-border">
            <SheetHeader>
              <SheetTitle className="text-left text-primary">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-1">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Consórcios</p>
              {consortiumLinks.map(([label, href]) => (
                <SheetClose asChild key={href}>
                  <Link href={href} className={navLinkClass}>{label}</Link>
                </SheetClose>
              ))}
              <div className="my-3 border-t border-border" />
              {mainLinks.map(([label, href]) => (
                <SheetClose asChild key={href}>
                  <Link href={href} className={navLinkClass}>{label}</Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link href="/fale-com-um-especialista/" className="mt-4 rounded-md bg-cta px-4 py-3 text-center font-bold text-primary">
                  Falar com um especialista
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
