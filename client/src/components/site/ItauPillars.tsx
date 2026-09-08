import { Layers, Percent, ShieldCheck, UserCheck } from "lucide-react";
import { ItauSeal } from "./ItauSeal";

const pillars = [
  {
    icon: UserCheck,
    title: "Pré-análise cadastral antes da contratação",
    description:
      "Verificamos a aprovação de crédito antes de você entrar no grupo. Isso mantém a inadimplência baixa e os lances mais competitivos para todos.",
  },
  {
    icon: Layers,
    title: "Grupos selecionados e acompanhados",
    description:
      "Acesso a uma das maiores carteiras de grupos do país, com leitura do histórico de assembleias antes de indicar onde você entra.",
  },
  {
    icon: Percent,
    title: "Lance embutido consciente, de até 30%",
    description:
      "Parte da própria carta pode compor o seu lance, dentro de um limite que não infla artificialmente os resultados do grupo.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e transparência",
    description:
      "Contratos regulados pelo Banco Central, sem juros, com fundo de reserva devolvido ao final do grupo e suporte da nossa equipe em toda a jornada.",
  },
];

/**
 * "Por que Santa Sophia + Itaú?" — seção reutilizada na home e em /quem-somos/.
 * A parceria é um pilar de posicionamento, não apenas uma credencial de rodapé.
 */
export function ItauPillars() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow-text text-muted-foreground">Por que Santa Sophia + Itaú?</p>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">A inteligência que protege e acelera a sua conquista.</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Como parceiros autorizados Itaú Consórcios, unimos a segurança de uma das maiores administradoras do país a um atendimento próximo e focado em resultado.
            </p>
          </div>
          <ItauSeal className="w-[200px] shrink-0" />
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, description }) => (
            <article key={title} className="bg-background p-7 md:p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-highlight">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl">{title}</h3>
              <p className="mt-3 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-4xl text-xs leading-relaxed text-muted-foreground">
          Condições conforme regulamento do grupo e contrato de participação. A contemplação ocorre por sorteio ou lance e não tem prazo garantido.
        </p>
      </div>
    </section>
  );
}
