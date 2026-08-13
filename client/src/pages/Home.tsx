import { ArrowRight, Building2, Car, Home as HomeIcon, Truck, Wrench } from "lucide-react";
import { Link } from "wouter";
import symbol from "@/assets/brand/symbol.png";
import { AnswerBlock } from "@/components/site/AnswerBlock";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Layout } from "@/components/site/Layout";
import { MagnoPortrait } from "@/components/site/MagnoPortrait";
import { MethodSteps } from "@/components/site/MethodSteps";
import { Reveal } from "@/components/site/Reveal";
import { SegmentCards } from "@/components/site/SegmentCards";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";

const homeFaq = [
  {
    question: "Consórcio é financiamento?",
    answer: "Não. São modalidades diferentes de aquisição de crédito e possuem características próprias. Por isso, é importante entender qual solução é adequada ao seu objetivo antes de contratar.",
  },
  {
    question: "Posso usar o crédito para comprar um imóvel?",
    answer: "Dependendo da modalidade e das regras da administradora, a carta de crédito pode ser utilizada para diferentes finalidades relacionadas à categoria contratada.",
  },
  {
    question: "Posso comprar carro?",
    answer: "Sim, existem modalidades de consórcio destinadas à aquisição de veículos, conforme as regras do grupo e da administradora.",
  },
  {
    question: "Existe garantia de\u00a0contemplação imediata?",
    answer: "Não. A contemplação segue as regras do grupo, podendo ocorrer por sorteio ou lance, conforme as condições da administradora.",
  },
  {
    question: "Preciso entender de consórcio para conversar com vocês?",
    answer: "Não.\n\nEssa é justamente a função de um atendimento especializado: explicar as possibilidades de forma clara para que você possa decidir com consciência.",
  },
];

const goals = [
  [HomeIcon, "Casa"],
  [Building2, "Apartamento"],
  [Car, "Carro"],
  [Truck, "Caminhão"],
  [Wrench, "Equipamentos"],
] as const;

const whatsappMessage = "Olá, Magno. Quero entender qual estratégia de consórcio faz sentido para o meu objetivo.";

export default function Home() {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-primary-deep py-20 text-primary-foreground md:py-28">
        <img src={symbol} alt="" width="564" height="512" aria-hidden="true" className="pointer-events-none absolute -right-28 top-1/2 hidden w-[32rem] -translate-y-1/2 opacity-10 md:block" />
        <div className="container-custom relative z-10">
          <p className="eyebrow-text text-highlight">Santa Sophia Consórcios</p>
          <h1 className="mt-5 max-w-5xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-primary-foreground">Seu próximo grande passo não precisa esperar.</h1>
          <h2 className="mt-6 max-w-4xl text-xl leading-relaxed text-primary-foreground md:text-2xl">Você não precisa ter todo o dinheiro hoje para começar a construir o que quer amanhã.</h2>
          <ul className="mt-8 flex max-w-5xl flex-wrap gap-3" aria-label="Possibilidades de planejamento">
            {goals.map(([Icon, label]) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-4 py-2 text-sm font-semibold">
                <Icon className="size-4 text-highlight" aria-hidden="true" />{label}
              </li>
            ))}
            <li className="rounded-full border border-primary-foreground/25 px-4 py-2 text-sm font-semibold">Expansão da empresa</li>
            <li className="rounded-full border border-primary-foreground/25 px-4 py-2 text-sm font-semibold">Investimentos</li>
          </ul>
          <div className="mt-9 max-w-3xl space-y-4 text-lg text-primary-foreground/85">
            <p>O que muda tudo não é apenas quanto dinheiro você tem.</p>
            <p>É <em>como você decide usar o dinheiro que tem.</em></p>
            <p>A Santa Sophia conecta você às melhores possibilidades em consórcio, com atendimento consultivo e estratégias personalizadas para transformar crédito em poder de compra.</p>
            <p><em>E quem conduz essa jornada é Magno Stiti de Paula, especialista em consórcios e referência comercial no segmento.</em></p>
          </div>
          <h2 className="mt-10 text-xl text-primary-foreground">Fale com o Magno e descubra qual estratégia faz sentido para você.</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppCta message={whatsappMessage} label="Quero falar com um especialista" variant="home-hero" />
            <Link href="/fale-com-um-especialista/" className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary-foreground/40 px-6 py-3 font-semibold text-primary-foreground hover:border-highlight hover:text-highlight">Enviar uma mensagem</Link>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <AnswerBlock question="Quem é a Santa Sophia?">
            <p>A Santa Sophia é uma empresa especializada em soluções de crédito por meio de consórcio.</p>
            <p>Oferece soluções em consórcio para imóveis, veículos e empresas, conforme as modalidades disponíveis, com atendimento digital e consultivo para clientes de diferentes regiões do Brasil.</p>
            <Link href="/quem-somos/" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">Conheça a Santa Sophia <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </AnswerBlock>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow-text text-muted-foreground">Uma nova perspectiva</p>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">O problema não é você não ter dinheiro.</h2>
            <h3 className="mt-5 text-xl">Talvez você só esteja tentando comprar do jeito errado.</h3>
          </div>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>Durante muito tempo, ensinaram que para comprar um imóvel você precisava juntar dinheiro durante anos.</p>
            <p>Que para trocar de carro precisava financiar.</p>
            <p>Que para expandir uma empresa precisava esperar o caixa permitir.</p>
            <p>Que grandes conquistas só acontecem quando sobra dinheiro.</p>
            <p>Mas existe outra possibilidade:</p>
            <p className="font-semibold text-primary"><em>planejar antes de comprar.</em></p>
            <p>O consórcio pode ser uma ferramenta para quem quer organizar uma aquisição de médio ou longo prazo, com planejamento e poder de compra.</p>
            <p>E é justamente aí que entra a Santa Sophia.</p>
          </div>
        </div>
      </section>

      <Reveal><section className="section-padding bg-background">
        <div className="container-custom">
          <p className="eyebrow-text text-muted-foreground">Nosso método</p>
          <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">Não vendemos uma parcela.</h2>
          <h3 className="mt-4 text-xl">Construímos uma estratégia de compra.</h3>
          <div className="mt-6 max-w-3xl space-y-3 text-muted-foreground">
            <p>Porque duas pessoas podem contratar o mesmo valor de crédito e ter experiências completamente diferentes.</p>
            <p>A diferença está no planejamento.</p>
          </div>
          <div className="mt-12"><MethodSteps /></div>
          <div className="mt-12 max-w-3xl space-y-3 text-lg">
            <p><em>Consórcio não precisa ser complicado.</em></p>
            <p>Complicado é tomar uma decisão financeira importante sem entender o que está fazendo.</p>
          </div>
        </div>
      </section></Reveal>

      <section className="section-padding bg-primary-deep text-primary-foreground">
        <div className="container-custom max-w-5xl">
          <p className="eyebrow-text text-highlight">Por que a Santa Sophia?</p>
          <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] text-primary-foreground">Porque crédito sem estratégia é apenas crédito.</h2>
          <div className="mt-8 space-y-4 text-lg text-primary-foreground/80">
            <p>Estratégia transforma crédito em oportunidade.</p>
            <p>A Santa Sophia nasceu para tornar o consórcio mais simples, mais transparente e mais próximo da realidade de quem precisa tomar uma grande decisão.</p>
            <p>Aqui, você não precisa entender todas as regras, taxas, possibilidades e caminhos antes de conversar conosco.</p>
            <p><em>Você só precisa nos contar onde quer chegar.</em></p>
            <p>A partir daí, nós ajudamos a construir o caminho.</p>
          </div>
        </div>
      </section>

      <Reveal><section className="section-padding bg-primary-deep text-primary-foreground">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-[minmax(18rem,0.75fr)_1.25fr] lg:gap-20">
          <MagnoPortrait className="mx-auto lg:mx-0" />
          <div>
            <p className="eyebrow-text text-highlight">E quem é Magno Stiti de Paula?</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(1.6rem,3vw,2.4rem)] text-primary-foreground">Por trás de uma grande decisão financeira, você merece falar com alguém que entende do jogo.</h2>
            <div className="mt-7 space-y-4 text-lg text-primary-foreground/80">
              <p>Magno Stiti de Paula atua no mercado de consórcios e construiu uma trajetória de destaque comercial no segmento.</p>
              <p>Com experiência na comercialização de consórcios do Itaú, Magno tornou-se conhecido pela capacidade de entender o objetivo de cada cliente e transformar uma conversa sobre parcela em uma conversa sobre estratégia.</p>
              <p>Porque vender uma carta de crédito é fácil.</p>
              <p><em>Difícil é entender o que o cliente realmente precisa.</em></p>
              <p>É isso que diferencia o atendimento da Santa Sophia.</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Princípios do atendimento de Magno">
              {[
                ["Menos pressão.", "Mais diagnóstico."],
                ["Menos promessa.", "Mais estratégia."],
                ["Menos “fechar uma venda”.", "Mais construir uma decisão."],
              ].map(([less, more]) => (
                <p key={less} className="flex min-h-32 flex-col justify-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5">
                  <span className="text-primary-foreground/70">{less}</span>
                  <span className="mt-2 text-lg font-bold text-[#FFC82B]">{more}</span>
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppCta message={whatsappMessage} label="Falar com o Magno" variant="home-magno-highlight" />
              <Link href="/magno-stiti-de-paula/" className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary-foreground/40 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:border-highlight hover:text-highlight">Conheça a trajetória</Link>
            </div>
          </div>
        </div>
      </section></Reveal>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Para que você quer ter poder de compra?</h2>
          <div className="mt-10"><SegmentCards /></div>
          <div className="mt-8 text-center text-lg font-semibold"><p><em>O objetivo muda.</em></p><p><em>A estratégia também.</em></p></div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">“Mas eu não sei se consórcio é para mim.”</h2>
            <p className="mt-6 text-2xl font-bold text-primary">Ótimo.</p>
            <p className="mt-3 text-lg">É exatamente por isso que você deveria conversar com um especialista.</p>
            <p className="mt-3 text-muted-foreground">A Santa Sophia não acredita que todo mundo precisa do mesmo produto.</p>
          </div>
          <div>
            <p className="font-semibold">Antes de falar em carta de crédito, precisamos entender:</p>
            <ul className="mt-6 space-y-3 text-lg text-primary">
              <li><em>O que você quer comprar?</em></li>
              <li><em>Quando pretende comprar?</em></li>
              <li><em>Quanto consegue investir mensalmente?</em></li>
              <li><em>Qual é o seu objetivo financeiro?</em></li>
            </ul>
            <p className="mt-6 text-muted-foreground">A resposta dessas perguntas é muito mais importante do que simplesmente escolher uma parcela.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <h2 className="max-w-4xl text-[clamp(1.6rem,3vw,2.4rem)]">Três verdades que pouca gente te conta sobre consórcio</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <article className="border-t-4 border-primary bg-background p-7"><h3 className="text-xl">1. A menor parcela nem sempre é a melhor estratégia.</h3><p className="mt-5 text-muted-foreground">Uma parcela pode parecer ótima no papel e não fazer sentido para o seu objetivo.</p><p className="mt-3">O que importa é o conjunto:</p><p className="mt-2 font-semibold"><em>crédito + prazo + planejamento + objetivo.</em></p></article>
            <article className="border-t-4 border-primary bg-background p-7"><h3 className="text-xl">2. Consórcio não é dinheiro rápido.</h3><p className="mt-5 font-semibold">É planejamento.</p><p className="mt-3 text-muted-foreground">Se você precisa de crédito imediatamente, existem outras soluções financeiras que podem fazer mais sentido.</p><p className="mt-3 text-muted-foreground">Agora, se você consegue planejar sua aquisição, o consórcio pode se tornar uma ferramenta poderosa dentro da sua estratégia.</p></article>
            <article className="border-t-4 border-primary bg-background p-7"><h3 className="text-xl">3. A melhor decisão não começa na simulação.</h3><p className="mt-5 font-semibold">Começa na conversa.</p><p className="mt-3 text-muted-foreground">Antes de colocar números na tela, precisamos entender o que você pretende fazer com eles.</p><p className="mt-3">Porque <em>o crédito é o meio.</em></p><p className="mt-2">O seu objetivo é o que importa.</p></article>
          </div>
        </div>
      </section>

      <CtaBand title="Você não precisa decidir agora." text="Mas pode descobrir agora o que é possível. Converse com o Magno. Conte o que você pretende comprar, qual é o seu objetivo e em quanto tempo gostaria de realizar. A equipe da Santa Sophia vai analisar seu cenário e apresentar as possibilidades que façam sentido para você. Sem promessa de contemplação. Sem fórmula mágica. Sem pressão. Só uma conversa séria sobre o próximo passo." whatsappMessage={whatsappMessage} label="QUERO FALAR COM O MAGNO" />

      <section className="section-padding bg-background">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div><p className="eyebrow-text text-muted-foreground">Atendimento em todo o Brasil</p><h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">De onde você estiver, seu próximo passo pode começar aqui.</h2></div>
          <div className="space-y-4 text-lg text-muted-foreground"><p>A Santa Sophia atende clientes de diferentes regiões do Brasil por meio de atendimento digital e consultivo.</p><p>Você não precisa se deslocar.</p><p>Não precisa enfrentar burocracia sozinho.</p><p>E não precisa entender tudo sobre consórcio antes de começar.</p><p className="font-semibold text-primary"><em>A primeira conversa pode acontecer de onde você estiver.</em></p></div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow-text text-muted-foreground">Dúvidas comuns</p><h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">Perguntas frequentes</h2></div><Link href="/perguntas-frequentes/" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">Ver todas as perguntas <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
          <div className="mt-10"><FaqAccordion items={homeFaq} /></div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-4xl text-[clamp(1.6rem,3vw,2.4rem)]">A sua próxima conquista pode começar com uma conversa.</h2>
          <div className="mx-auto mt-7 max-w-3xl space-y-3 text-lg text-muted-foreground"><p>Você pode continuar esperando o momento perfeito.</p><p>Ou pode começar a planejar.</p><p><em>A diferença entre os dois é uma decisão.</em></p></div>
          <h3 className="mt-8 text-xl">Fale agora com Magno Stiti de Paula.</h3>
          <div className="mt-5 space-y-1"><p>Conte seu objetivo.</p><p>Receba uma análise.</p><p>Entenda suas possibilidades.</p><p>E descubra se existe uma estratégia de consórcio que faça sentido para você.</p></div>
          <WhatsAppCta message={whatsappMessage} label="Quero falar com um especialista" variant="home-final" className="mt-8" />
        </div>
      </section>
    </Layout>
  );
}
