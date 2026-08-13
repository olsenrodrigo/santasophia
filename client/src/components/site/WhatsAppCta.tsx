import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/seo/constants";

interface WhatsAppCtaProps {
  message: string;
  label?: string;
  variant?: string;
  className?: string;
}

export function WhatsAppCta({ message, label = "Falar com um especialista", variant = "default", className }: WhatsAppCtaProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cta px-6 py-3 font-bold text-primary transition-colors hover:bg-highlight", className)}
      onClick={() => trackEvent("whatsapp_click", { page: window.location.pathname, variant })}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      {label}
    </a>
  );
}
