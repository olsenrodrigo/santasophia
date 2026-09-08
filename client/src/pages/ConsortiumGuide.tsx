import { CtaBand } from "@/components/site/CtaBand";
import { FaqContent } from "@/components/site/FaqContent";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { FAQ_DISCLAIMER, faqByCategory } from "@/content/faq";

const mistakes = [
  {
    title: "Administradora com poucas opções de grupos",
    description:
      "Com poucos grupos na modalidade que você precisa, as chances ficam limitadas e, se precisar compor o crédito com mais de uma cota, você concorre consigo mesmo.",
  },
  {
    title: "Taxa “barata” sem fundo de reserva",
    description:
      "Sem fundo de reserva, o grupo fica desprotegido contra inadimplência e as contemplações travam. No Itaú, o fundo é devolvido ao final, corrigido.",
  },
  {
    title: "Lance embutido acima de 30%",
    description:
      "Limites altos inflam os lances do grupo e empurram a média para patamares que só se alcançam com muito dinheiro do bolso.",
  },
  {
    title: "Promessa de contemplação ou data garantida",
    description:
      "É prática ilícita. A Santa Sophia trabalha com estatística, leitura do grupo e transparência contratual — nunca com promessa.",
  },
  {
    title: "Contratação sem critério",
    description:
      "Vender para quem não consegue faturar o bem depois de contemplado trava o crédito do grupo inteiro. A pré-análise cadastral evita isso.",
  },
];

export default function ConsortiumGuide() {
  const items = faqByCategory("consorcio");
  return (
    <Layout>
      <PageHero path="/o-que-e-consorcio/" h1="O que é consórcio e como funciona?" lede="Entenda a contemplação, o lance, a carta de crédito e os pontos que precisam ser avaliados antes da contratação." />
      <section className="section-padding bg-background"><div className="container-custom"><FaqContent items={items} /></div></section>
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <h2 className="max-w-4xl text-[clamp(1.6rem,3vw,2.4rem)]">5 erros que colocam o consorciado numa fria</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mistakes.map((mistake, index) => (
              <li key={mistake.title} className="border-t-4 border-primary bg-background p-7">
                <span className="font-heading text-4xl font-extrabold text-primary/60" aria-hidden="true">{`0${index + 1}`}</span>
                <h3 className="mt-4 text-lg">{mistake.title}</h3>
                <p className="mt-3 text-muted-foreground">{mistake.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-padding bg-background">
        <div className="container-custom"><h2 className="max-w-4xl text-[clamp(1.6rem,3vw,2.4rem)]">Três verdades que pouca gente te conta sobre consórcio</h2><div className="mt-10 grid gap-8 md:grid-cols-3"><article><h3>1. A menor parcela nem sempre é a melhor estratégia.</h3><p className="mt-4 text-muted-foreground">Uma parcela pode parecer ótima no papel e não fazer sentido para o seu objetivo. O que importa é o conjunto: <em>crédito + prazo + planejamento + objetivo.</em></p></article><article><h3>2. Consórcio não é dinheiro rápido.</h3><p className="mt-4 text-muted-foreground">É planejamento. Se você precisa de crédito imediatamente, existem outras soluções financeiras que podem fazer mais sentido.</p></article><article><h3>3. A melhor decisão não começa na simulação.</h3><p className="mt-4 text-muted-foreground">Começa na conversa. Porque <em>o crédito é o meio.</em> O seu objetivo é o que importa.</p></article></div></div>
      </section>
      <CtaBand title="Ainda ficou com dúvida?" text="Você não precisa entender tudo sobre consórcio antes de conversar com um especialista. Conte para o Magno o que você quer comprar, quanto pretende investir e em quanto tempo gostaria de realizar. A partir dessas informações, você poderá entender quais possibilidades podem fazer sentido para o seu planejamento." whatsappMessage="Olá, Magno. Quero tirar uma dúvida e entender se o consórcio faz sentido para o meu planejamento." label="QUERO FALAR COM O MAGNO" />
      <section className="section-padding-sm bg-background"><div className="container-custom"><p className="font-semibold text-primary">Santa Sophia — Consórcio com estratégia. Crédito com propósito.</p><p className="mt-5 text-xs leading-relaxed text-muted-foreground">{FAQ_DISCLAIMER}</p></div></section>
    </Layout>
  );
}
