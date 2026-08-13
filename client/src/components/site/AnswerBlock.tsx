import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface AnswerBlockProps extends PropsWithChildren {
  question: string;
  className?: string;
}

export function AnswerBlock({ question, children, className }: AnswerBlockProps) {
  return (
    <aside className={cn("rounded-r-xl border-l-4 border-highlight bg-surface px-6 py-7 md:px-8", className)}>
      <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{question}</h2>
      <div className="mt-4 space-y-3 text-foreground">{children}</div>
    </aside>
  );
}
