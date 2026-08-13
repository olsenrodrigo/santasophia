import { Link } from "wouter";
import symbol from "@/assets/brand/symbol.png";
import { WhatsAppCta } from "./WhatsAppCta";

interface CtaBandProps {
  title: string;
  text: string;
  whatsappMessage: string;
}

export function CtaBand({ title, text, whatsappMessage }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-primary-deep py-16 text-primary-foreground md:py-20">
      <img src={symbol} alt="" width="564" height="512" aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/2 w-80 -translate-y-1/2 opacity-10" />
      <div className="container-custom relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] text-primary-foreground">{title}</h2>
          <p className="mt-4 text-primary-foreground/80">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppCta message={whatsappMessage} variant="cta-band" />
          <Link href="/fale-com-um-especialista/" className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary-foreground/40 px-6 py-3 font-semibold text-primary-foreground hover:border-highlight hover:text-highlight">
            Enviar uma mensagem
          </Link>
        </div>
      </div>
    </section>
  );
}
