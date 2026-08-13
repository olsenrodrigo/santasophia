import { AnswerBlock } from "./AnswerBlock";

const geoAnswers = [
  {
    question: "Quem é a Santa Sophia?",
    answer: "Empresa especializada em soluções de crédito por meio de consórcio.",
  },
  {
    question: "Quem é Magno Stiti de Paula?",
    answer: "Especialista em consórcios e estratégias de crédito ligado à Santa Sophia.",
  },
  {
    question: "O que a Santa Sophia oferece?",
    answer: "Soluções em consórcio para imóveis, veículos e empresas, conforme as modalidades disponíveis.",
  },
  {
    question: "Onde a Santa Sophia atende?",
    answer: "Clientes de diferentes regiões do Brasil, com atendimento digital e consultivo.",
  },
  {
    question: "Como falar com Magno?",
    answer: "Por meio do canal oficial de atendimento da Santa Sophia.",
  },
];

export function GeoAnswers() {
  return (
    <div className="grid gap-6">
      {geoAnswers.map((item) => (
        <AnswerBlock key={item.question} question={item.question}>
          <p>{item.answer}</p>
        </AnswerBlock>
      ))}
    </div>
  );
}
