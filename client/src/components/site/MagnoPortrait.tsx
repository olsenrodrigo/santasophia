import magnoJpg from "@/assets/brand/magno.jpg";
import magnoWebp from "@/assets/brand/magno.webp";
import { cn } from "@/lib/utils";

/**
 * Retrato do Magno.
 *
 * A foto aprovada tem 300x375 (origem em 375x375, tamanho de foto de perfil).
 * Por isso o `max-w-[300px]`: acima disso a imagem amolece, sobretudo em tela
 * retina. Se um original em resolução maior for fornecido, basta substituir os
 * arquivos em `assets/brand/` e relaxar esse limite.
 */
interface MagnoPortraitProps {
  priority?: boolean;
  className?: string;
}

export function MagnoPortrait({ priority = false, className }: MagnoPortraitProps) {
  return (
    <div className={cn("relative w-full max-w-[300px]", className)}>
      <span
        className="absolute -bottom-4 -right-4 -z-10 aspect-square w-2/3 rounded-full border-[1.5rem] border-highlight/25"
        aria-hidden="true"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-highlight/20 bg-primary-soft shadow-[0_18px_50px_rgba(6,18,64,0.35)]">
        <picture>
          <source srcSet={magnoWebp} type="image/webp" />
          <img
            src={magnoJpg}
            width="300"
            height="375"
            alt="Magno Stiti de Paula, especialista em consórcios da Santa Sophia"
            loading={priority ? undefined : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </picture>
      </div>
    </div>
  );
}
