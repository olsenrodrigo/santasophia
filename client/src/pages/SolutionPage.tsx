import type { ReactNode } from "react";
import { Link } from "wouter";
import { AnswerBlock } from "@/components/site/AnswerBlock";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Layout } from "@/components/site/Layout";
import { MethodSteps } from "@/components/site/MethodSteps";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { FAQ_DISCLAIMER, segmentFaqRelated, type SegmentFaqKey } from "@/content/faq";

interface SolutionPageProps {
  path: string;
  h1: string;
  lede: string;
  /** Aviso destacado antes do resumo — usado na página de alavancagem. */
  notice?: string;
  summaryQuestion: string;
  summary: string[];
  children: ReactNode;
  message: string;
  faqKey: SegmentFaqKey;
  showMethod?: boolean;
}

/**
 * Casca comum das três páginas de solução (construção e reforma, quitação de
 * financiamento e alavancagem): PageHero → resumo extraível → seções H2 →
 * CtaBand → perguntas relacionadas + disclaimer. O `<h1>` continua saindo
 * exclusivamente do `PageHero`.
 */
function SolutionPage({
  path,
  h1,
  lede,
  notice,
  summaryQuestion,
  summary,
  children,
  message,
  faqKey,
  showMethod,
}: SolutionPageProps) {
  return (
    <Layout>
      <PageHero path={path} h1={h1} lede={lede} />
      <section className="section-padding-sm bg-background">
        <div className="container-custom space-y-8">
          {notice ? (
            <p className="rounded-xl border border-highlight bg-highlight/10 px-6 py-5 text-sm leading-relaxed text-foreground md:px-8">
              {notice}
            </p>
          ) : null}
          <AnswerBlock question={summaryQuestion}>
            {summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AnswerBlock>
        </div>
      </section>
      <Reveal>
        <section className="section-padding bg-surface">
          <div className="container-custom space-y-14">{children}</div>
        </section>
      </Reveal>
      {showMethod ? (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Construímos uma estratégia de compra.</h2>
            <div className="mt-10">
              <MethodSteps />
            </div>
          </div>
        </section>
      ) : null}
      <CtaBand
        title="Seu planejamento pode começar com uma conversa."
        text="Conte seu objetivo para a equipe Santa Sophia e entenda quais possibilidades podem fazer sentido para o seu momento."
        whatsappMessage={message}
      />
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <h2 className="text-2xl">Perguntas relacionadas</h2>
          <div className="mt-7">
            <FaqAccordion items={segmentFaqRelated(faqKey)} />
          </div>
          <div className="mt-10 flex flex-wrap gap-5 text-sm font-bold text-primary">
            <Link href="/consorcio-de-imoveis/" className="hover:underline">Consórcio de imóveis</Link>
            <Link href="/o-que-e-consorcio/" className="hover:underline">Entenda como funciona o consórcio</Link>
            <Link href="/perguntas-frequentes/" className="hover:underline">Veja todas as perguntas frequentes</Link>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">{FAQ_DISCLAIMER}</p>
        </div>
      </section>
    </Layout>
  );
}

export function ConstructionPage() {
  return (
    <SolutionPage
      path="/construcao-e-reforma/"
      h1="Construção e reforma: o crédito integral na sua conta, no seu ritmo"
      lede="Da compra do terreno à casa pronta: o crédito imobiliário sem a armadilha dos juros."
      summaryQuestion="Construção e reforma por consórcio, em resumo"
      summary={[
        "Com o consórcio imobiliário Itaú é possível construir em terreno próprio ou reformar. Após a contemplação, a aprovação do projeto e o alvará, o crédito é liberado integralmente na conta corrente do consorciado.",
        "Você constrói por empreitada, no seu ritmo, sem depender de reembolsos condicionados a vistorias por etapa.",
      ]}
      message="Olá, Magno. Quero entender como construir ou reformar usando consórcio."
      faqKey="construction"
      showMethod
    >
      <article>
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Formato Itaú: 100% do crédito na conta</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          <div className="bg-background p-7 md:p-8">
            <h3 className="text-xl">100% do dinheiro na conta</h3>
            <p className="mt-4 text-muted-foreground">Após a contemplação, aprovação do projeto e alvará, o crédito é liberado integralmente na sua conta corrente.</p>
          </div>
          <div className="bg-background p-7 md:p-8">
            <h3 className="text-xl">Sem reembolso picado</h3>
            <p className="mt-4 text-muted-foreground">Você não depende de vistorias de engenharia a cada etapa da obra. Negocie materiais à vista e mantenha a equipe focada.</p>
          </div>
        </div>
      </article>

      <article className="border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">O que é preciso</h2>
        <ul className="ml-5 mt-6 max-w-4xl list-disc space-y-3 text-muted-foreground marker:text-primary">
          <li>Terreno próprio e quitado, que fica alienado em garantia;</li>
          <li>Projeto aprovado na prefeitura;</li>
          <li>Alvará de construção expedido;</li>
          <li>Cadastro aprovado na análise de crédito após a contemplação.</li>
        </ul>
      </article>

      <article className="border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Construir para vender</h2>
        <p className="mt-6 max-w-4xl text-muted-foreground">Uma estratégia usada por construtores e investidores: entregar o imóvel pronto e transferir o consórcio ao comprador final, com custo menor que um financiamento novo, conforme as regras de cessão da administradora.</p>
      </article>

      <article className="border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">FGTS na construção</h2>
        <p className="mt-6 max-w-4xl text-muted-foreground">O FGTS pode ser usado para ofertar lance ou complementar o crédito em imóvel residencial, seguindo as regras da Caixa Econômica Federal, inclusive na construção em terreno próprio.</p>
        <Link href="/perguntas-frequentes/#imoveis" className="mt-5 inline-block font-bold text-primary hover:underline">Veja as perguntas sobre FGTS e imóveis</Link>
      </article>
    </SolutionPage>
  );
}

export function PayoffPage() {
  return (
    <SolutionPage
      path="/quitacao-de-financiamento/"
      h1="Quitação de financiamento imobiliário: troque os juros por uma taxa de administração"
      lede="Troque os juros do seu financiamento por uma taxa de consórcio e reduza o custo total do imóvel."
      summaryQuestion="Dá para quitar financiamento com consórcio?"
      summary={[
        "Sim. A carta de crédito do consórcio imobiliário pode ser usada para quitar um financiamento ativo em seu nome. Você substitui os juros do financiamento pela taxa de administração do consórcio, diluída nas parcelas.",
        "O ganho depende do saldo devedor, do prazo restante e das condições do grupo — por isso a análise é feita caso a caso por um especialista.",
      ]}
      message="Olá, Magno. Tenho um financiamento imobiliário e quero avaliar a quitação por consórcio."
      faqKey="payoff"
    >
      <article>
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Como funciona, passo a passo</h2>
        <ol className="ml-5 mt-6 max-w-4xl list-decimal space-y-4 text-muted-foreground marker:font-bold marker:text-primary">
          <li className="pl-1">Diagnóstico do financiamento atual: saldo, prazo, taxa e garantia.</li>
          <li className="pl-1">Contratação de uma cota compatível com o saldo devedor.</li>
          <li className="pl-1">Estratégia de lance para antecipar a contemplação, conforme o histórico do grupo.</li>
          <li className="pl-1">Com a carta contemplada, quitação do financiamento e transferência da garantia para o consórcio.</li>
        </ol>
      </article>

      <article className="border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Para quem faz sentido</h2>
        <p className="mt-6 max-w-4xl text-muted-foreground">Para quem tem um financiamento em andamento, consegue planejar a operação e quer reduzir o custo total do imóvel. Não é solução para quem precisa do crédito imediatamente.</p>
      </article>
    </SolutionPage>
  );
}

export function LeveragePage() {
  return (
    <SolutionPage
      path="/alavancagem-financeira/"
      h1="Alavancagem financeira: quando o consórcio é estratégia, não só compra"
      lede="Uma estratégia de patrimônio, renda e proteção — com orientação e sem promessa de retorno."
      notice="Consórcio não é investimento com rentabilidade garantida. As estratégias abaixo são possibilidades de uso do crédito contemplado, sujeitas às regras da administradora, do grupo e do contrato. Nenhum resultado é prometido."
      summaryQuestion="O que é alavancagem financeira com consórcio?"
      summary={[
        "É usar o crédito do consórcio como ferramenta de estratégia patrimonial, e não apenas para comprar um bem. Isso inclui adquirir um imóvel para locação, ceder uma cota contemplada a terceiros ou manter o crédito no grupo enquanto ele é atualizado.",
        "Cada caminho tem regras próprias e riscos. A Santa Sophia orienta qual faz sentido para o seu momento.",
      ]}
      message="Olá, Magno. Quero entender as estratégias de alavancagem com consórcio."
      faqKey="leverage"
    >
      <article>
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Três caminhos</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-3">
          <div className="bg-background p-7 md:p-8">
            <h3 className="text-xl">Renda com aluguel</h3>
            <p className="mt-4 text-muted-foreground">Comprar um imóvel urbano pelo consórcio e colocá-lo para locação. O aluguel pode cobrir parte ou a totalidade das parcelas, conforme o mercado e o imóvel.</p>
          </div>
          <div className="bg-background p-7 md:p-8">
            <h3 className="text-xl">Cessão de cota contemplada</h3>
            <p className="mt-4 text-muted-foreground">Quem é contemplado e não usa o crédito pode ceder a cota a outro interessado, com as regras de transferência da administradora. É uma operação de mercado, com valor e prazo variáveis.</p>
          </div>
          <div className="bg-background p-7 md:p-8">
            <h3 className="text-xl">Crédito contemplado mantido no grupo</h3>
            <p className="mt-4 text-muted-foreground">Enquanto a carta contemplada não é usada, o saldo é atualizado conforme as regras da administradora. Sem promessa de rentabilidade.</p>
          </div>
        </div>
      </article>

      <article className="border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Cotas contempladas</h2>
        <p className="mt-6 max-w-4xl text-muted-foreground">A compra e venda de cotas já contempladas é uma alternativa para quem quer usar o crédito sem esperar sorteio ou lance. O custo é maior que o de um consórcio em formação, e a Santa Sophia conecta quem quer vender a quem busca antecipar o objetivo.</p>
        <WhatsAppCta
          message="Olá, Magno. Quero conhecer as cotas contempladas disponíveis."
          label="Quero conhecer cotas contempladas disponíveis"
          variant="leverage-cotas"
          className="mt-6"
        />
      </article>

      <article className="border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Seguro prestamista (MIP)</h2>
        <p className="mt-6 max-w-4xl text-muted-foreground">Opcional na adesão. Em caso de morte ou invalidez permanente, o seguro quita o saldo devedor e o bem ou crédito fica com a família. O custo é diluído nas parcelas e deve ser avaliado caso a caso.</p>
      </article>
    </SolutionPage>
  );
}
