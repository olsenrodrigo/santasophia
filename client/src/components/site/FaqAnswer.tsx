import { parseFaqAnswer } from "@/content/faq";
import { cn } from "@/lib/utils";

export function FaqAnswer({ answer, className }: { answer: string; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {parseFaqAnswer(answer).map((block, index) => {
        if (block.type === "unordered-list") {
          return (
            <ul key={index} className="ml-5 list-disc space-y-2 marker:text-primary">
              {block.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={index} className="ml-5 list-decimal space-y-3 marker:font-bold marker:text-primary">
              {block.items.map((item) => (
                <li key={item.title} className="pl-1">
                  <strong className="text-foreground">{item.title}</strong>
                  {item.detail ? <span className="mt-1 block">{item.detail}</span> : null}
                </li>
              ))}
            </ol>
          );
        }

        return <p key={index} className="whitespace-pre-line">{block.text}</p>;
      })}
    </div>
  );
}
