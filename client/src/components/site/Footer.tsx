import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { Link } from "wouter";
import logo from "@/assets/brand/logo-horizontal-white.png";
import { EMAIL, INSTAGRAM, PHONE_DISPLAY, PHONE_HOURS, WHATSAPP_BASE_URL, WHATSAPP_DISPLAY } from "@/seo/constants";
import { trackEvent } from "@/lib/analytics";
import { ComplianceNote } from "./ComplianceNote";

const footerGroups = [
  {
    title: "Consórcios",
    links: [
      ["Imóveis", "/consorcio-de-imoveis/"],
      ["Veículos", "/consorcio-de-veiculos/"],
      ["Caminhões e Pesados", "/consorcio-de-caminhoes/"],
      ["Empresas", "/consorcio-para-empresas/"],
    ],
  },
  {
    title: "Conheça",
    links: [
      ["Como funciona", "/o-que-e-consorcio/"],
      ["Quem somos", "/quem-somos/"],
      ["Magno Stiti de Paula", "/magno-stiti-de-paula/"],
      ["Perguntas frequentes", "/perguntas-frequentes/"],
    ],
  },
  {
    title: "Atendimento",
    links: [
      ["Simulação de consórcio", "/simulacao-de-consorcio/"],
      ["Fale com um especialista", "/fale-com-um-especialista/"],
      ["Política de Privacidade", "/politica-de-privacidade/"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="container-custom grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="md:col-span-2">
          <img src={logo} alt="Santa Sophia Consórcios" width="248" height="45" className="mb-6 h-auto w-56" loading="lazy" />
          <p className="max-w-sm text-sm text-primary-foreground/80">Consórcio com estratégia. Crédito com propósito.</p>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/80">Atendimento para clientes em todo o Brasil.</p>
          <div className="mt-6 flex gap-3">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram da Santa Sophia" className="rounded-md border border-primary-foreground/30 p-2.5 text-highlight hover:border-highlight">
              <Instagram className="size-5" aria-hidden="true" />
            </a>
            <a href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent("Olá, quero falar com um especialista da Santa Sophia.")}`} target="_blank" rel="noreferrer" aria-label="WhatsApp da Santa Sophia" className="rounded-md border border-primary-foreground/30 p-2.5 text-highlight hover:border-highlight" onClick={() => trackEvent("whatsapp_click", { page: window.location.pathname, variant: "footer-icon" })}>
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-highlight">{group.title}</p>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              {group.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-primary-foreground">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-custom grid gap-6 py-8 text-sm md:grid-cols-3">
          <a href="tel:08009489095" className="flex items-start gap-3 text-primary-foreground/85 hover:text-primary-foreground" onClick={() => trackEvent("phone_click", { page: window.location.pathname })}>
            <Phone className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
            <span><strong className="block text-primary-foreground">{PHONE_DISPLAY}</strong>{PHONE_HOURS}</span>
          </a>
          <a href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent("Olá, quero falar com um especialista da Santa Sophia.")}`} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-primary-foreground/85 hover:text-primary-foreground" onClick={() => trackEvent("whatsapp_click", { page: window.location.pathname, variant: "footer-contact" })}>
            <MessageCircle className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
            <span><strong className="block text-primary-foreground">WhatsApp</strong>{WHATSAPP_DISPLAY}</span>
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 break-all text-primary-foreground/85 hover:text-primary-foreground">
            <Mail className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
            <span><strong className="block text-primary-foreground">E-mail</strong>{EMAIL}</span>
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-custom py-8">
          <p className="mb-4 text-xs text-primary-foreground/70">Sistema de consórcios regulado pelo Banco Central do Brasil e pela Lei nº 11.795/2008. Consulte administradoras autorizadas. Informações institucionais: ABAC.</p>
          <ComplianceNote className="text-primary-foreground/70" />
          <p className="mt-6 text-xs text-primary-foreground/60">Santa Sophia Consórcios. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
