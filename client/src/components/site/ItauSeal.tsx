import seloDarkPng from "@/assets/brand/selo-itau-representante.png";
import seloDarkWebp from "@/assets/brand/selo-itau-representante.webp";
import seloWhitePng from "@/assets/brand/selo-itau-representante-branco.png";
import seloWhiteWebp from "@/assets/brand/selo-itau-representante-branco.webp";
import { cn } from "@/lib/utils";

export const ITAU_SEAL_ALT = "Consórcio Itaú. Representante Autorizado";

interface ItauSealProps {
  /**
   * Cor do fundo em que o selo será exibido. `dark` (navy) usa a arte branca;
   * `light` usa a arte original, de traço escuro. O selo é da própria
   * administradora — a Santa Sophia é representante autorizada.
   */
  on?: "light" | "dark";
  /** Classe de largura (ex.: `w-[220px]`). A altura acompanha por `h-auto`. */
  className?: string;
  priority?: boolean;
}

export function ItauSeal({ on = "light", className, priority = false }: ItauSealProps) {
  const webp = on === "dark" ? seloWhiteWebp : seloDarkWebp;
  const png = on === "dark" ? seloWhitePng : seloDarkPng;

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={png}
        width="1043"
        height="297"
        alt={ITAU_SEAL_ALT}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        className={cn("h-auto w-[200px]", className)}
      />
    </picture>
  );
}
