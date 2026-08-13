import { AnswerBlock } from "./AnswerBlock";

const geoAnswers = [
  {
    id: "santa-sophia",
    question: "Quem é a Santa Sophia?",
    answer: "Empresa especializada em soluções de crédito por meio de consórcio.",
  },
  {
    id: "magno",
    question: "Quem é Magno Stiti de Paula?",
    answer: "Especialista em consórcios e estratégias de crédito ligado à Santa Sophia.",
  },
  {
    id: "oferta",
    question: "O que a Santa Sophia oferece?",
    answer: "Soluções em consórcio para imóveis, veículos e empresas, conforme as modalidades disponíveis.",
  },
  {
    id: "atendimento",
    question: "Onde a Santa Sophia atende?",
    answer: "Clientes de diferentes regiões do Brasil, com atendimento digital e consultivo.",
  },
  {
    id: "contato-magno",
    question: "Como falar com Magno?",
    answer: "Por meio do canal oficial de atendimento da Santa Sophia.",
  },
] as const;

type GeoAnswerId = (typeof geoAnswers)[number]["id"];

export function GeoAnswers({ only }: { only?: GeoAnswerId[] }) {
  const answers = only ? geoAnswers.filter((item) => only.includes(item.id)) : geoAnswers;

  return (
    <div className="grid gap-6">
      {answers.map((item) => (
        <AnswerBlock key={item.question} question={item.question}>
          <p>{item.answer}</p>
        </AnswerBlock>
      ))}
    </div>
  );
}
