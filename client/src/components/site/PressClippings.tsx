import magnoAndreJpg from "@/assets/press/revide-magno-andre.jpg";
import magnoAndreWebp from "@/assets/press/revide-magno-andre.webp";
import contramaoJpg from "@/assets/press/revide-na-contramao-da-crise.jpg";
import contramaoWebp from "@/assets/press/revide-na-contramao-da-crise.webp";
import oportunidadeJpg from "@/assets/press/revide-oportunidade-de-investimento.jpg";
import oportunidadeWebp from "@/assets/press/revide-oportunidade-de-investimento.webp";

interface Clipping {
  jpg: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

/**
 * Recortes reais de reportagens da revista Revide (Ribeirão Preto, 2016–2018).
 * As legendas citam veículo, cidade e ano — não reproduzem o texto da matéria.
 * Os recortes foram cortados acima do rodapé das páginas originais para não
 * publicar endereço físico.
 */
export const pressClippings = {
  "contramao-da-crise": {
    jpg: contramaoJpg,
    webp: contramaoWebp,
    width: 1400,
    height: 1124,
    alt: "Recorte da reportagem “Na contramão da crise”, publicada na revista Revide.",
    caption: "Revista Revide, Ribeirão Preto — “Na contramão da crise” (2017)",
  },
  "oportunidade-de-investimento": {
    jpg: oportunidadeJpg,
    webp: oportunidadeWebp,
    width: 1400,
    height: 1157,
    alt: "Recorte da reportagem “Oportunidade de investimento”, publicada na revista Revide.",
    caption: "Revista Revide, Ribeirão Preto — “Oportunidade de investimento” (2016)",
  },
  "magno-revide": {
    jpg: magnoAndreJpg,
    webp: magnoAndreWebp,
    width: 1400,
    height: 1025,
    alt: "Recorte de reportagem da revista Revide com foto de Magno Stiti de Paula.",
    caption: "Revista Revide, Ribeirão Preto (2017).",
  },
} satisfies Record<string, Clipping>;

export type PressClippingId = keyof typeof pressClippings;

export function PressClipping({ id }: { id: PressClippingId }) {
  const { jpg, webp, width, height, alt, caption } = pressClippings[id];

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
      <picture>
        <source srcSet={webp} type="image/webp" />
        <img
          src={jpg}
          width={width}
          height={height}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </picture>
      <figcaption className="border-t border-border px-6 py-5 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
