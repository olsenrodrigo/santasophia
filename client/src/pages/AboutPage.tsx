import equipeJpg from "@/assets/press/equipe-santa-sophia.jpg";
import equipeWebp from "@/assets/press/equipe-santa-sophia.webp";
import { CtaBand } from "@/components/site/CtaBand";
import { GeoAnswers } from "@/components/site/GeoAnswers";
import { ItauPillars } from "@/components/site/ItauPillars";
import { Layout } from "@/components/site/Layout";
import { MagnoCard } from "@/components/site/MagnoCard";
import { PageHero } from "@/components/site/PageHero";
import { PressClipping } from "@/components/site/PressClippings";
import { Reveal } from "@/components/site/Reveal";

export default function AboutPage() {
  return (
    <Layout>
      <PageHero path="/quem-somos/" h1="Quem é a Santa Sophia?" lede="Menos pressão comercial. Mais estratégia e diagnóstico." />

      <section className="section-padding-sm bg-background">
        <div className="container-custom"><GeoAnswers /></div>
      </section>

      <Reveal><section className="section-padding bg-surface">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">A experiência Santa Sophia</h2>
            <div className="mt-7 space-y-4 text-lg text-muted-foreground">
              <p>Comprar um bem de alto valor não precisa significar pagar o dobro em juros ou tomar decisões no escuro. Há 17 anos, a Santa Sophia atua como uma consultoria especializada em engenharia financeira e alavancagem de crédito.</p>
              <p>Como parceiros autorizados Itaú Consórcios, unimos a segurança da maior administradora do país a um atendimento próximo e focado em resultados. Não vendemos parcelas: analisamos seus objetivos, mapeamos os grupos mais vantajosos e acompanhamos sua jornada da contratação ao faturamento do seu bem.</p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
            <picture>
              <source srcSet={equipeWebp} type="image/webp" />
              <img
                src={equipeJpg}
                width="1280"
                height="853"
                alt="Equipe da Santa Sophia Consórcios reunida no escritório."
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </picture>
            <figcaption className="border-t border-border px-6 py-5 text-sm text-muted-foreground">Equipe Santa Sophia, Ribeirão Preto (SP).</figcaption>
          </figure>
        </div>
      </section></Reveal>

      <section className="section-padding bg-primary-deep text-primary-foreground">
        <div className="container-custom grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] text-primary-foreground">A origem do nome</h2>
            <div className="mt-7 space-y-4 text-lg text-primary-foreground/80">
              <p>A Santa Sophia nasce da união de dois pilares: o respeito ao legado familiar — uma homenagem à mãe do fundador — e a busca pela sabedoria, do grego Sophia.</p>
              <p>No mercado financeiro, sabedoria não é conhecimento teórico. É a capacidade de aplicar a matemática e a segurança jurídica para proteger o patrimônio das famílias. A Santa Sophia não foi criada para ser mais uma corretora de consórcios, e sim uma boutique de engenharia financeira.</p>
            </div>
          </div>
          <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-8 md:p-10">
            <h3 className="text-xl text-primary-foreground">Nossa missão: ser o guardião financeiro dos nossos clientes</h3>
            <p className="mt-5 text-primary-foreground/80">Protegemos famílias e investidores contra duas armadilhas:</p>
            <ul className="mt-5 space-y-4 text-primary-foreground/80">
              <li className="border-l-2 border-highlight pl-4">O ralo de juros dos financiamentos bancários tradicionais.</li>
              <li className="border-l-2 border-highlight pl-4">O amadorismo e as falsas promessas de vendedores de cotas sem preparo técnico.</li>
            </ul>
          </div>
        </div>
      </section>

      <Reveal><section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="max-w-4xl text-[clamp(1.6rem,3vw,2.4rem)]">Não vendemos sorte</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            <article className="bg-background p-7 md:p-9">
              <h3 className="text-xl">O anti-vendedor</h3>
              <p className="mt-5 text-muted-foreground">O mercado de consórcios foi manchado por promessas irreais de contemplação rápida. Aqui, a conversa é sóbria, clara e técnica: não vendemos sorte, estruturamos projetos de crédito baseados em estatística, liquidez e matemática.</p>
            </article>
            <article className="bg-background p-7 md:p-9">
              <h3 className="text-xl">Acesso direto à fonte</h3>
              <p className="mt-5 text-muted-foreground">Enquanto a maioria das corretoras vende opções de prateleira, a Santa Sophia opera com um Contrato Master Brasil junto ao Itaú Consórcios, o que permite negociar condições diretamente com a administradora e selecionar grupos com liquidez e baixa inadimplência.</p>
            </article>
          </div>
        </div>
      </section></Reveal>

      <ItauPillars />

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Blindagem jurídica e segurança</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            <article className="bg-background p-7 md:p-9">
              <h3 className="text-xl">Análise de risco</h3>
              <p className="mt-5 text-muted-foreground">Toda liberação de crédito é respaldada por análise técnica de certidões, para que o imóvel adquirido ou o projeto executado seja juridicamente perfeito.</p>
            </article>
            <article className="bg-background p-7 md:p-9">
              <h3 className="text-xl">Transparência contratual</h3>
              <p className="mt-5 text-muted-foreground">O cliente sabe quais são as regras do grupo, os custos administrativos e a probabilidade estatística do seu projeto.</p>
            </article>
          </div>
          <h3 className="mt-14 text-xl">Informação, segurança e atendimento consultivo</h3>
          <div className="mt-6 max-w-4xl space-y-4 text-muted-foreground">
            <p>A Santa Sophia atua em parceria com administradoras autorizadas pelo Banco Central, como Itaú Consórcios.</p>
            <p>O sistema de consórcios é regulado pela Lei nº 11.795/2008. Antes da contratação, devem ser observados o contrato, o regulamento do grupo e as condições da administradora.</p>
            <p>A ABAC — Associação Brasileira de Administradoras de Consórcios — também reúne informações institucionais sobre o sistema.</p>
          </div>
        </div>
      </section>

      <Reveal><section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Na mídia</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <PressClipping id="contramao-da-crise" />
            <PressClipping id="oportunidade-de-investimento" />
          </div>
        </div>
      </section></Reveal>

      <section className="section-padding bg-surface">
        <div className="container-custom grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow-text text-muted-foreground">Atendimento em todo o Brasil</p>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">De onde você estiver, seu próximo passo pode começar aqui.</h2>
          </div>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>A Santa Sophia atende clientes de diferentes regiões do Brasil por meio de atendimento digital e consultivo.</p>
            <p>Você não precisa se deslocar.</p>
            <p>Não precisa enfrentar burocracia sozinho.</p>
            <p>E não precisa entender tudo sobre consórcio antes de começar.</p>
            <p className="font-semibold text-primary"><em>A primeira conversa pode acontecer de onde você estiver.</em></p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom"><MagnoCard /></div>
      </section>

      <CtaBand title="Sua próxima conquista pode começar com uma conversa." text="Conte ao Magno o que você quer conquistar e descubra quais possibilidades podem fazer sentido para o seu momento." whatsappMessage="Olá, Magno. Conheci a Santa Sophia e quero entender quais possibilidades fazem sentido para o meu objetivo." />
    </Layout>
  );
}
