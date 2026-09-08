import { AnswerBlock } from "./AnswerBlock";

const geoAnswers = [
  {
    id: "santa-sophia",
    question: "Quem é a Santa Sophia?",
    answer:
      "A Santa Sophia é uma consultoria especializada em consórcio e engenharia de crédito, representante autorizada Itaú Consórcios, com 17 anos no mercado de crédito. Nasceu em Ribeirão Preto (SP) e atende todo o Brasil de forma digital.",
  },
  {
    id: "magno",
    question: "Quem é Magno Stiti de Paula?",
    answer: "Especialista em consórcios e estratégias de crédito ligado à Santa Sophia.",
  },
  {
    id: "oferta",
    question: "O que a Santa Sophia oferece?",
    answer:
      "Soluções em consórcio para imóveis, construção e reforma, quitação de financiamento, veículos, caminhões e pesados, empresas e alavancagem patrimonial, conforme as modalidades disponíveis.",
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
