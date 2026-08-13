import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/seo/constants";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl("Olá, quero falar com um especialista da Santa Sophia.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Santa Sophia pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-cta text-primary shadow-card-strong transition-transform hover:scale-105 md:bottom-7 md:right-7"
      onClick={() => trackEvent("whatsapp_click", { page: window.location.pathname, variant: "floating" })}
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
