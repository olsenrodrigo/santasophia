import { Mail, MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { EMAIL, PHONE_DISPLAY, PHONE_HOURS, WHATSAPP_DISPLAY, whatsappUrl } from "@/seo/constants";

export function ContactChannels({ message }: { message: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-background p-6 hover:border-primary" onClick={() => trackEvent("whatsapp_click", { page: window.location.pathname, variant: "contact-channel" })}>
        <MessageCircle className="size-6 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-lg">WhatsApp</h3>
        <p className="mt-2 text-sm text-muted-foreground">{WHATSAPP_DISPLAY}</p>
      </a>
      <a href="tel:08009489095" className="rounded-xl border border-border bg-background p-6 hover:border-primary" onClick={() => trackEvent("phone_click", { page: window.location.pathname })}>
        <Phone className="size-6 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-lg">{PHONE_DISPLAY}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{PHONE_HOURS}</p>
      </a>
      <a href={`mailto:${EMAIL}`} className="rounded-xl border border-border bg-background p-6 hover:border-primary">
        <Mail className="size-6 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-lg">E-mail</h3>
        <p className="mt-2 break-all text-sm text-muted-foreground">{EMAIL}</p>
      </a>
    </div>
  );
}
