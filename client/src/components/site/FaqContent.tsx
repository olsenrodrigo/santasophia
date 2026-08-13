import type { FaqEntry } from "@/content/faq";
import { WhatsAppCta } from "./WhatsAppCta";

export function FaqContent({ items }: { items: FaqEntry[] }) {
  return (
    <div className="space-y-14">
      {items.map((item) => (
        <article key={item.id} id={item.id} className="scroll-mt-28">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">{item.question}</h2>
          <div className="mt-5 max-w-4xl whitespace-pre-line text-muted-foreground">{item.answerHtml}</div>
          {item.cta ? <WhatsAppCta message={`Olá, Magno. Tenho uma dúvida sobre: ${item.question}`} label={item.cta} variant={`faq-${item.id}`} className="mt-6" /> : null}
        </article>
      ))}
    </div>
  );
}
