import { ChevronDown } from "lucide-react";
import { FaqAnswer } from "./FaqAnswer";
import { WhatsAppCta } from "./WhatsAppCta";

export interface FaqItem {
  question: string;
  answer?: string;
  answerHtml?: string;
  cta?: string;
  id?: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-left marker:content-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg">{item.question}</h3>
            <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="max-w-4xl pb-6 pr-10 text-muted-foreground">
            <FaqAnswer answer={item.answerHtml ?? item.answer ?? ""} />
            {item.cta ? (
              <WhatsAppCta
                message={`Olá, Magno. Tenho uma dúvida sobre: ${item.question}`}
                label={item.cta}
                variant={`faq-${item.id ?? "accordion"}`}
                className="mt-6"
              />
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
