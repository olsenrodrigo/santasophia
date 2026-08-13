import { CtaBand } from "@/components/site/CtaBand";
import { GeoAnswers } from "@/components/site/GeoAnswers";
import { Layout } from "@/components/site/Layout";
import { MagnoPortrait } from "@/components/site/MagnoPortrait";
import { MethodSteps } from "@/components/site/MethodSteps";
import { PageHero } from "@/components/site/PageHero";
import { SegmentCards } from "@/components/site/SegmentCards";
import { segments } from "@/content/segments";

export default function MagnoPage() {
  return (
    <Layout>
      <PageHero path="/magno-stiti-de-paula/" h1="Magno Stiti de Paula, especialista em consórcios" lede="Por trás de uma grande decisão financeira, você merece falar com alguém que entende do jogo." />
      <section className="section-padding bg-background">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-[minmax(18rem,0.75fr)_1.25fr] lg:gap-20">
          <MagnoPortrait priority className="mx-auto lg:mx-0" />
          <div>
            <p className="eyebrow-text text-muted-foreground">Especialista em Consórcios</p>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">Atendimento que começa pelo objetivo do cliente.</h2>
            <div className="mt-7 space-y-4 text-lg text-muted-foreground">
              <p>Magno Stiti de Paula atua no mercado de consórcios e construiu uma trajetória de destaque comercial no segmento.</p>
              <p>Com experiência na comercialização de consórcios do Itaú, Magno tornou-se conhecido pela capacidade de entender o objetivo de cada cliente e transformar uma conversa sobre parcela em uma conversa sobre estratégia.</p>
              <p>Porque vender uma carta de crédito é fácil.</p>
              <p><em>Difícil é entender o que o cliente realmente precisa.</em></p>
              <p>É isso que diferencia o atendimento da Santa Sophia.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-primary-deep text-primary-foreground">
        <div className="container-custom">
          <h2 className="max-w-3xl text-[clamp(1.6rem,3vw,2.4rem)] text-primary-foreground">Uma conversa sobre estratégia, não apenas sobre parcela.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Menos pressão.", "Mais diagnóstico."],
              ["Menos promessa.", "Mais estratégia."],
              ["Menos “fechar uma venda”.", "Mais construir uma decisão."],
            ].map(([less, more]) => (
              <p key={less} className="flex min-h-36 flex-col justify-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
                <span className="text-primary-foreground/70">{less}</span>
                <span className="mt-2 text-xl font-bold text-[#FFC82B]">{more}</span>
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-background">
        <div className="container-custom">
          <p className="eyebrow-text text-muted-foreground">Método consultivo</p>
          <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">Como é o atendimento</h2>
          <div className="mt-6 max-w-3xl space-y-3 text-lg text-muted-foreground">
            <p>Não vendemos uma parcela.</p>
            <p className="font-semibold text-primary">Construímos uma estratégia de compra.</p>
            <p>Porque duas pessoas podem contratar o mesmo valor de crédito e ter experiências completamente diferentes.</p>
            <p>A diferença está no planejamento.</p>
          </div>
          <div className="mt-12"><MethodSteps /></div>
          <div className="mt-12 max-w-3xl space-y-3 text-lg">
            <p><em>Consórcio não precisa ser complicado.</em></p>
            <p>Complicado é tomar uma decisão financeira importante sem entender o que está fazendo.</p>
          </div>
        </div>
      </section>
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <p className="eyebrow-text text-muted-foreground">Soluções de crédito e consórcio</p>
          <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">Em que o Magno pode ajudar</h2>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">O objetivo muda. A estratégia também.</p>
          <div className="mt-10"><SegmentCards items={segments} /></div>
        </div>
      </section>
      <section className="section-padding bg-background">
        <div className="container-custom"><GeoAnswers only={["magno", "contato-magno"]} /></div>
      </section>
      <CtaBand title="Fale diretamente com o Magno." text="Conte o que você pretende comprar, qual é o seu objetivo e em quanto tempo gostaria de realizar. Só uma conversa séria sobre o próximo passo." whatsappMessage="Olá, Magno. Quero falar diretamente com você sobre uma estratégia de consórcio para o meu objetivo." label="QUERO FALAR COM O MAGNO" />
    </Layout>
  );
}
