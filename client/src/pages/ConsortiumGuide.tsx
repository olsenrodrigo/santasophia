import { ComplianceNote } from "@/components/site/ComplianceNote";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqContent } from "@/components/site/FaqContent";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { faqByCategory } from "@/content/faq";

export default function ConsortiumGuide() {
  const items = faqByCategory("consorcio");
  return (
    <Layout>
      <PageHero path="/o-que-e-consorcio/" h1="O que é consórcio e como funciona?" lede="Entenda a contemplação, o lance, a carta de crédito e os pontos que precisam ser avaliados antes da contratação." />
      <section className="section-padding bg-background"><div className="container-custom"><FaqContent items={items} /></div></section>
      <section className="section-padding bg-surface">
        <div className="container-custom"><h2 className="max-w-4xl text-[clamp(1.6rem,3vw,2.4rem)]">Três verdades que pouca gente te conta sobre consórcio</h2><div className="mt-10 grid gap-8 md:grid-cols-3"><article><h3>1. A menor parcela nem sempre é a melhor estratégia.</h3><p className="mt-4 text-muted-foreground">Uma parcela pode parecer ótima no papel e não fazer sentido para o seu objetivo. O que importa é o conjunto: <em>crédito + prazo + planejamento + objetivo.</em></p></article><article><h3>2. Consórcio não é dinheiro <span>rápido.</span></h3><p className="mt-4 text-muted-foreground">É planejamento. Se você precisa de crédito imediatamente, existem outras soluções financeiras que podem fazer mais sentido.</p></article><article><h3>3. A melhor decisão não começa na simulação.</h3><p className="mt-4 text-muted-foreground">Começa na conversa. Porque <em>o crédito é o meio.</em> O seu objetivo é o que importa.</p></article></div></div>
      </section>
      <CtaBand title="Ainda ficou com dúvida?" text="Você não precisa entender tudo sobre consórcio antes de conversar com um especialista. Conte para o Magno o que você quer comprar, quanto pretende investir e em quanto tempo gostaria de realizar. A partir dessas informações, você poderá entender quais possibilidades podem fazer sentido para o seu planejamento." whatsappMessage="Olá, Magno. Quero tirar uma dúvida e entender se o consórcio faz sentido para o meu planejamento." />
      <section className="section-padding-sm bg-background"><div className="container-custom"><p className="font-semibold text-primary">Santa Sophia — Consórcio com estratégia. Crédito com propósito.</p><ComplianceNote className="mt-5" /></div></section>
    </Layout>
  );
}
