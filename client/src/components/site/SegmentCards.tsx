import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { segments, type Segment } from "@/content/segments";

export function SegmentCards({ items = segments }: { items?: Segment[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
      {items.map(({ title, description, href, icon: Icon }) => (
        <Link key={href} href={href} className="group flex min-h-72 flex-col bg-background p-6 transition-colors hover:bg-surface">
          <span className="mb-8 inline-flex size-12 items-center justify-center rounded-full bg-primary text-highlight">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <h3 className="text-xl">{title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{description}</p>
          <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-bold text-primary">Conheça <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
        </Link>
      ))}
    </div>
  );
}
