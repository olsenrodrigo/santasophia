import { CtaBand } from "@/components/site/CtaBand";
import { GeoAnswers } from "@/components/site/GeoAnswers";
import { Layout } from "@/components/site/Layout";
import { MagnoCard } from "@/components/site/MagnoCard";
import { PageHero } from "@/components/site/PageHero";

export default function MagnoPage() {
  return (
    <Layout>
      <PageHero path="/magno-stiti-de-paula/" h1="Magno Stiti de Paula, especialista em consórcios" lede="Por trás de uma grande decisão financeira, você merece falar com alguém que entende do jogo." />
      <section className="section-padding bg-background"><div className="container-custom"><MagnoCard /></div></section>
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl"><h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">E quem é Magno Stiti de Paula?</h2><div className="mt-7 space-y-4 text-lg text-muted-foreground"><p>Magno Stiti de Paula atua no mercado de consórcios e construiu uma trajetória de destaque comercial no segmento.</p><p>Com experiência na comercialização de consórcios do Itaú, Magno tornou-se conhecido pela capacidade de entender o objetivo de cada cliente e transformar uma conversa sobre parcela em uma conversa sobre estratégia.</p><p>Porque vender uma carta de crédito é fácil.</p><p><em>Difícil é entender o que o cliente realmente precisa.</em></p><p>É isso que diferencia o atendimento da Santa Sophia.</p><p>Menos pressão.</p><p>Mais diagnóstico.</p><p>Menos promessa.</p><p>Mais estratégia.</p><p>Menos “fechar uma venda”.</p><p>Mais construir uma decisão.</p></div></div>
      </section>
      <section className="section-padding bg-background"><div className="container-custom"><GeoAnswers /></div></section>
      <CtaBand title="Fale diretamente com o Magno." text="Conte o que você pretende comprar, qual é o seu objetivo e em quanto tempo gostaria de realizar. Só uma conversa séria sobre o próximo passo." whatsappMessage="Olá, Magno. Quero falar diretamente com você sobre uma estratégia de consórcio para o meu objetivo." />
    </Layout>
  );
}
