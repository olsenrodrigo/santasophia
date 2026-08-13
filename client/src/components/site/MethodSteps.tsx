const methodSteps = [
  {
    number: "01",
    title: "Entender",
    description: "Primeiro, entendemos o que você quer comprar, seu momento financeiro e seu objetivo.",
  },
  {
    number: "02",
    title: "Estruturar",
    description: "Depois, avaliamos possibilidades de crédito, prazo e condições que façam sentido para o seu planejamento.",
  },
  {
    number: "03",
    title: "Acompanhar",
    description: "E você não fica sozinho depois da contratação. A ideia é ter alguém ao seu lado para orientar a jornada e ajudar você a tomar decisões melhores.",
  },
];

export function MethodSteps() {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {methodSteps.map((step) => (
        <li key={step.number} className="border-t border-border pt-6">
          <span className="font-heading text-5xl font-extrabold text-primary/15" aria-hidden="true">{step.number}</span>
          <h3 className="mt-5 text-xl uppercase tracking-wide">{step.title}</h3>
          <p className="mt-3 text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
