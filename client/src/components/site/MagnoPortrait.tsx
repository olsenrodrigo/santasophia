import symbol from "@/assets/brand/symbol.png";
import { cn } from "@/lib/utils";

interface MagnoPortraitProps {
  priority?: boolean;
  className?: string;
}

export function MagnoPortrait({ priority = false, className }: MagnoPortraitProps) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/15 bg-primary-soft", className)}>
      {/* PONTO DE TROCA DA FOTO */}
      {/*
      <img src={new URL("../../assets/brand/magno.jpg", import.meta.url).href} width="800" height="1000"
        alt="Magno Stiti de Paula, especialista em consórcios da Santa Sophia" loading={priority ? undefined : "lazy"} fetchPriority={priority ? "high" : undefined}
        className="h-full w-full object-cover object-top" />
      */}
      <div className="relative flex h-full items-center justify-center overflow-hidden p-10">
        <span className="absolute -bottom-1/4 -right-1/4 aspect-square w-4/5 rounded-full border-[2rem] border-[#FFC82B]/25" aria-hidden="true" />
        <span className="absolute -left-1/3 -top-1/3 aspect-square w-3/4 rounded-full border border-primary/10" aria-hidden="true" />
        <img src={symbol} alt="Símbolo da Santa Sophia" width="564" height="512" className="relative z-10 w-1/2 max-w-52" loading={priority ? undefined : "lazy"} />
      </div>
    </div>
  );
}
