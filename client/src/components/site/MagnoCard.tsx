import { Link } from "wouter";
import symbol from "@/assets/brand/symbol.png";
import { WhatsAppCta } from "./WhatsAppCta";

export function MagnoCard({ showProfileLink = true }: { showProfileLink?: boolean }) {
  return (
    <article className="grid overflow-hidden rounded-xl bg-primary-deep text-primary-foreground md:grid-cols-[minmax(16rem,0.8fr)_1.2fr]">
      <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-primary-soft p-10">
        {/* PONTO DE TROCA: quando client/src/assets/brand/magno.jpg estiver disponível,
            importe o arquivo e substitua somente esta imagem do símbolo pela foto real. */}
        <img src={symbol} alt="Símbolo da Santa Sophia" width="564" height="512" className="w-48" loading="lazy" />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12">
        <p className="eyebrow-text text-highlight">Especialista em Consórcios</p>
        <h2 className="mt-3 text-3xl text-primary-foreground">Magno Stiti de Paula</h2>
        <p className="mt-5 text-primary-foreground/80">Magno Stiti de Paula atua no mercado de consórcios e construiu uma trajetória de destaque comercial no segmento.</p>
        <p className="mt-3 text-primary-foreground/80">Com experiência na comercialização de consórcios do Itaú, Magno tornou-se conhecido pela capacidade de entender o objetivo de cada cliente e transformar uma conversa sobre parcela em uma conversa sobre estratégia.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppCta message="Olá, Magno. Quero entender qual estratégia de consórcio faz sentido para o meu objetivo." label="Falar com o Magno" variant="magno-card" />
          {showProfileLink ? <Link href="/magno-stiti-de-paula/" className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary-foreground/40 px-6 py-3 font-semibold text-primary-foreground hover:border-highlight hover:text-highlight">Conheça o Magno</Link> : null}
        </div>
      </div>
    </article>
  );
}
