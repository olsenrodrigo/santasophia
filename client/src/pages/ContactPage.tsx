import { ComplianceNote } from "@/components/site/ComplianceNote";
import { ContactChannels } from "@/components/site/ContactChannels";
import { ContactForm } from "@/components/site/ContactForm";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";

interface ContactPageProps {
  simulation?: boolean;
}

const simulationSteps = [
  "Preencha o formulário com seus dados de contato.",
  "Escolha o tipo de bem ou objetivo.",
  "Informe o valor de crédito ou de parcela que cabe no seu planejamento.",
  "Receba de um especialista a comparação das cartas e grupos mais adequados ao seu perfil.",
  "Decida com calma — a contratação só acontece com você acompanhado.",
];

export default function ContactPage({ simulation = false }: ContactPageProps) {
  const message = simulation ? "Olá, quero solicitar uma simulação personalizada de consórcio." : "Olá, quero falar com um especialista em consórcio.";
  return (
    <Layout>
      <PageHero path={simulation ? "/simulacao-de-consorcio/" : "/fale-com-um-especialista/"} h1={simulation ? "Solicite sua simulação de consórcio" : "Fale com um especialista em consórcio"} lede={simulation ? "Conte seu objetivo para receber uma análise personalizada, elaborada por um especialista conforme as condições da administradora e da modalidade disponível." : "Uma conversa séria sobre o seu próximo passo, sem pressão."} />
      <section className="section-padding bg-surface">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div><p className="eyebrow-text text-muted-foreground">Atendimento consultivo</p><h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">Conte onde você quer chegar.</h2><div className="mt-6 space-y-4 text-muted-foreground"><p>{simulation ? "A simulação não exibe valores genéricos. A equipe Santa Sophia analisa o objetivo informado e apresenta as possibilidades que façam sentido, conforme as condições aplicáveis." : "Antes de falar em carta de crédito, precisamos entender o que você quer comprar, quando pretende comprar e qual é o seu objetivo financeiro."}</p><p>Você não precisa entender tudo sobre consórcio antes de começar.</p></div></div>
          <ContactForm />
        </div>
      </section>
      {simulation ? (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Como funciona a simulação</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
              {simulationSteps.map((step, index) => (
                <li key={step} className="border-t border-border pt-6">
                  <span className="font-heading text-4xl font-extrabold text-primary/60" aria-hidden="true">{`0${index + 1}`}</span>
                  <p className="mt-4 text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
      <section className={`section-padding ${simulation ? "bg-surface" : "bg-background"}`}><div className="container-custom"><h2 className="mb-8 text-[clamp(1.6rem,3vw,2.4rem)]">Escolha seu canal de atendimento</h2><ContactChannels message={message} /></div></section>
      <section className="section-padding bg-primary-deep text-primary-foreground"><div className="container-custom max-w-4xl text-center"><h2 className="text-[clamp(1.6rem,3vw,2.4rem)] text-primary-foreground">Você não precisa decidir agora.</h2><p className="mt-5 text-lg text-primary-foreground/80">Mas pode descobrir agora o que é possível.</p><p className="mt-4 text-primary-foreground/80">Sem promessa de contemplação. Sem fórmula mágica. Sem pressão.</p><p className="mt-4 font-semibold text-primary-foreground"><em>Só uma conversa séria sobre o próximo passo.</em></p></div></section>
      <section className="section-padding-sm bg-background"><div className="container-custom"><ComplianceNote /></div></section>
    </Layout>
  );
}
