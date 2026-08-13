import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-left font-heading text-lg font-bold text-primary marker:content-none">
            {item.question}
            <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="max-w-4xl whitespace-pre-line pb-6 pr-10 text-muted-foreground">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
