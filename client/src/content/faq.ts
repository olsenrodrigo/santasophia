export type FaqCategory = "consorcio" | "imoveis" | "veiculos" | "empresas" | "contratacao";

export interface FaqEntry {
  id: string;
  category: FaqCategory;
  question: string;
  answerHtml: string;
  cta?: string;
}

export type FaqAnswerBlock =
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: Array<{ title: string; detail?: string }> };

export function parseFaqAnswer(answer: string): FaqAnswerBlock[] {
  const paragraphs = answer.trim().split(/\n{2,}/);
  const blocks: FaqAnswerBlock[] = [];

  for (let index = 0; index < paragraphs.length; index += 1) {
    const lines = paragraphs[index].split("\n").map((line) => line.trim()).filter(Boolean);
    const orderedMatch = lines[0]?.match(/^\d+\.\s+(.+)$/);

    if (orderedMatch) {
      const items: Array<{ title: string; detail?: string }> = [];
      while (index < paragraphs.length) {
        const itemLines = paragraphs[index].split("\n").map((line) => line.trim()).filter(Boolean);
        const match = itemLines[0]?.match(/^\d+\.\s+(.+)$/);
        if (!match) break;
        items.push({
          title: match[1],
          detail: itemLines.slice(1).join(" ") || undefined,
        });
        index += 1;
      }
      index -= 1;
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const isSemicolonList =
      lines.length >= 3 &&
      lines.slice(0, -1).every((line) => line.endsWith(";")) &&
      /[.;]$/.test(lines.at(-1) ?? "");

    if (isSemicolonList) {
      blocks.push({ type: "unordered-list", items: lines });
      continue;
    }

    blocks.push({ type: "paragraph", text: lines.join("\n") });
  }

  return blocks;
}

export const faqCategoryLabels: Record<FaqCategory, string> = {
  consorcio: "Consórcio",
  imoveis: "Imóveis",
  veiculos: "Veículos",
  empresas: "Empresas",
  contratacao: "Contratação e pós-venda",
};

export const FAQ_DISCLAIMER =
  "As condições, taxas, prazos, critérios de contemplação, reajustes e formas de utilização do crédito variam conforme a administradora, o grupo e o contrato. A contemplação não é garantida nem necessariamente imediata. Consulte as condições aplicáveis antes da contratação.";

export const faqEntries: FaqEntry[] = [
  {
    id: "o-que-e-consorcio",
    category: "consorcio",
    question: "O que é consórcio e como funciona?",
    answerHtml: `O consórcio é uma forma de aquisição planejada de bens e serviços. Pessoas com objetivos semelhantes participam de um grupo e contribuem mensalmente para formar um fundo comum, utilizado para contemplar os participantes conforme as regras do grupo.

A contemplação pode acontecer por sorteio ou lance, de acordo com as condições previstas no contrato. Quando contemplado, o consorciado recebe o direito ao crédito para adquirir o bem ou serviço dentro da categoria contratada.

Na prática, o consórcio pode ser uma alternativa para quem não precisa necessariamente adquirir o bem de forma imediata e prefere trabalhar com planejamento.

Quer entender se essa estratégia faz sentido para o seu objetivo?`,
    cta: "Falar com o Magno",
  },
  {
    id: "consorcio-vale-a-pena",
    category: "consorcio",
    question: "Consórcio vale a pena?",
    answerHtml: `Pode valer a pena para quem busca planejamento para uma aquisição e consegue esperar a contemplação de acordo com as regras do grupo.

Mas não existe uma resposta única.

Tudo depende do seu objetivo, prazo, capacidade de pagamento, valor de crédito desejado e necessidade de utilização do bem.

Se você precisa do bem imediatamente, por exemplo, é importante comparar o consórcio com outras alternativas, como financiamento. Já para quem pode se planejar, o consórcio pode ser uma ferramenta interessante.

A melhor pergunta não é simplesmente:

“Consórcio vale a pena?”

É:

“Consórcio faz sentido para o meu momento e para o que eu quero conquistar?”

É exatamente isso que a Santa Sophia ajuda você a analisar.`,
    cta: "Quero analisar meu objetivo",
  },
  {
    id: "consorcio-ou-financiamento",
    category: "consorcio",
    question: "Consórcio ou financiamento?",
    answerHtml: `Consórcio e financiamento são modalidades diferentes.

No financiamento, uma instituição concede crédito para a aquisição de um bem, normalmente com cobrança de juros e condições definidas no contrato. No consórcio, o participante integra um grupo e contribui para um fundo comum, podendo ser contemplado por sorteio ou lance.

A principal diferença prática está no momento em que você precisa do bem e na estratégia financeira que pretende utilizar.

Se você precisa comprar imediatamente, o financiamento pode ser uma alternativa a ser analisada.

Se consegue planejar a aquisição e esperar a contemplação conforme as regras do grupo, o consórcio pode fazer sentido.

Por isso, não existe simplesmente “o melhor”.

Existe a solução mais adequada ao seu objetivo.`,
  },
  {
    id: "como-funciona-contemplacao",
    category: "consorcio",
    question: "Como funciona a contemplação?",
    answerHtml: `A contemplação é o momento em que o consorciado recebe a atribuição do crédito para aquisição do bem ou serviço previsto no contrato.

Ela pode ocorrer por:

Sorteio: conforme as regras estabelecidas para o grupo.

Lance: o consorciado oferece um lance e, seguindo os critérios previstos no contrato e havendo recursos, pode ser contemplado.

É importante entender que entrar em um consórcio não significa ter garantia de contemplação imediata. O Banco Central recomenda atenção especial a esse ponto antes da contratação.

Por isso, qualquer estratégia de contemplação deve considerar as regras específicas do grupo escolhido.`,
  },
  {
    id: "carta-de-credito",
    category: "consorcio",
    question: "O que é carta de crédito?",
    answerHtml: `A carta de crédito representa o valor de crédito a que o consorciado contemplado tem direito, dentro das condições estabelecidas pelo contrato.

Depois da contemplação e do cumprimento dos procedimentos exigidos pela administradora, o crédito pode ser utilizado para adquirir o bem ou serviço previsto na categoria do consórcio.

Por exemplo, em um consórcio imobiliário, a carta pode ser utilizada para aquisição de um imóvel dentro das regras aplicáveis.

Em um consórcio de veículos, pode ser utilizada para aquisição de veículo conforme a categoria contratada.

Importante: o crédito não significa dinheiro liberado automaticamente na conta. A utilização segue os procedimentos e critérios da administradora.`,
  },
  {
    id: "como-funciona-lance",
    category: "consorcio",
    question: "Como funciona o lance?",
    answerHtml: `O lance é uma forma de tentar antecipar a contemplação.

O consorciado oferece um valor conforme as regras do grupo. Os critérios de oferta, apuração e desempate devem estar previstos no contrato.

Existem diferentes modalidades de lance, incluindo o lance embutido, quando permitido, em que parte do próprio crédito é utilizada para compor o lance.

O lance vencedor não significa necessariamente receber o valor integral da carta sem alterações. No caso do lance embutido, por exemplo, o valor utilizado é deduzido do crédito disponibilizado.

Por isso, antes de fazer um lance, é importante analisar:

as regras do grupo;
o valor disponível;
o objetivo da aquisição;
o impacto sobre o crédito;
e a capacidade financeira do cliente.

Não existe lance que garanta contemplação em qualquer grupo.`,
  },
  {
    id: "como-escolher-consorcio",
    category: "consorcio",
    question: "Como escolher um consórcio?",
    answerHtml: `Escolher um consórcio não deveria começar pela pergunta:

“Qual tem a menor parcela?”

Começa pelo seu objetivo.

Antes de contratar, analise:

1. O valor do crédito
Qual é o bem ou serviço que você pretende adquirir?

2. O prazo
Quanto tempo você está disposto a esperar?

3. A parcela
O valor cabe confortavelmente no seu planejamento?

4. As condições do contrato
Quais são as taxas, critérios de contemplação, reajustes e demais condições?

5. A administradora
Verifique se a administradora está autorizada pelo Banco Central e leia atentamente o contrato e o regulamento do grupo. O próprio Banco Central recomenda essas verificações antes da adesão.

Na Santa Sophia, o objetivo é justamente ajudar você a olhar para o conjunto, e não apenas para o valor da parcela.`,
    cta: "Falar com um especialista",
  },
  {
    id: "comprar-imovel",
    category: "imoveis",
    question: "Como comprar imóvel por consórcio?",
    answerHtml: `O primeiro passo é definir o objetivo e o valor aproximado do imóvel que você deseja adquirir.

A partir daí, você pode avaliar uma modalidade de consórcio imobiliário compatível com seu planejamento.

Após a contemplação e o cumprimento das exigências da administradora, o crédito pode ser utilizado para aquisição do imóvel conforme as regras do contrato.

O Banco Central informa que, em consórcios referenciados em imóveis, podem ser adquiridos imóveis construídos ou na planta, inclusive terrenos, além de haver possibilidade de construção ou reforma, observadas as condições aplicáveis.

O ponto mais importante é:

Você não precisa começar sabendo qual consórcio contratar. Precisa começar sabendo qual imóvel quer conquistar.

A Santa Sophia ajuda a transformar esse objetivo em uma estratégia.`,
  },
  {
    id: "consorcio-imovel-vale-a-pena",
    category: "imoveis",
    question: "Consórcio de imóvel vale a pena?",
    answerHtml: `Pode valer a pena para quem deseja adquirir um imóvel e consegue trabalhar com planejamento.

O consórcio pode ser especialmente interessante para quem não precisa necessariamente comprar o imóvel imediatamente e prefere estruturar sua aquisição ao longo do tempo.

Mas é fundamental analisar o cenário individualmente.

Compare:

prazo;
valor da carta;
parcelas;
custos;
reajustes;
regras de contemplação;
necessidade de compra imediata;
capacidade de pagamento.

Se você precisa do imóvel agora, talvez outra modalidade seja mais adequada.

Se pode planejar, o consórcio pode ser uma alternativa a ser considerada.

A resposta está no seu objetivo, não em uma fórmula pronta.`,
  },
  {
    id: "comprar-apartamento",
    category: "imoveis",
    question: "Posso comprar apartamento com consórcio?",
    answerHtml: `Sim. O consórcio imobiliário pode ser utilizado para aquisição de imóvel, inclusive apartamento, observadas as regras do contrato e da administradora.

O Banco Central estabelece que o consórcio referenciado em bem imóvel pode permitir a aquisição de imóvel construído ou na planta.

Depois da contemplação, o consorciado pode escolher o fornecedor e o bem dentro da categoria contratada, respeitando os procedimentos da administradora.

Se o seu objetivo é comprar um apartamento, o primeiro passo é definir:

quanto você pretende investir e em quanto tempo deseja realizar a compra.`,
    cta: "Quero planejar meu apartamento",
  },
  {
    id: "comprar-terreno",
    category: "imoveis",
    question: "Posso comprar terreno?",
    answerHtml: `Sim. O Banco Central prevê que, em consórcio referenciado em imóvel, pode ser possível adquirir terreno, observadas as condições do contrato e as regras da administradora.

Isso pode ser interessante para quem tem um projeto de construção e quer planejar primeiro a aquisição do terreno.

Antes de contratar, porém, é importante verificar as condições específicas da administradora e do grupo.

Quer saber como estruturar esse planejamento?`,
    cta: "Falar com o Magno",
  },
  {
    id: "construcao-reforma",
    category: "imoveis",
    question: "Posso utilizar consórcio para construção?",
    answerHtml: `Sim. Em consórcios referenciados em imóveis, o Banco Central prevê a possibilidade de utilização para construção ou reforma, respeitadas as regras aplicáveis e as condições do contrato.

Isso significa que o consórcio pode fazer parte de um planejamento que envolva não apenas a compra de um imóvel pronto, mas também um projeto de construção.

Como existem critérios específicos para utilização do crédito, o ideal é analisar o projeto antes de escolher a modalidade.`,
  },
  {
    id: "consorcio-carro-vale-a-pena",
    category: "veiculos",
    question: "Consórcio de carro vale a pena?",
    answerHtml: `Pode valer a pena para quem deseja comprar um carro, mas não precisa necessariamente adquiri-lo de forma imediata.

A grande questão é o planejamento.

Se você pode esperar a contemplação conforme as regras do grupo, o consórcio pode ser uma alternativa a ser comparada com outras formas de aquisição.

Se precisa do carro imediatamente, é importante analisar outras opções.

Não escolha apenas pela parcela.

Considere:

valor do crédito;
prazo;
custos;
reajustes;
regras de contemplação;
sua capacidade mensal de pagamento;
e quando você realmente precisa do veículo.

O melhor consórcio é aquele que conversa com o seu objetivo.`,
  },
  {
    id: "consorcio-ou-financiamento-carro",
    category: "veiculos",
    question: "Consórcio ou financiamento de carro?",
    answerHtml: `A diferença começa pelo momento da aquisição.

No financiamento, o crédito é concedido para a compra do veículo e a operação normalmente envolve juros e garantias conforme o contrato.

No consórcio, você participa de um grupo e concorre à contemplação por sorteio ou lance.

Por isso:

Precisa do carro imediatamente?
O financiamento pode ser uma alternativa a analisar.

Pode planejar a compra?
O consórcio pode fazer sentido.

A escolha deve considerar o custo total, o prazo, sua capacidade financeira e a urgência da aquisição.`,
  },
  {
    id: "consorcio-caminhao",
    category: "veiculos",
    question: "Como funciona consórcio de caminhão?",
    answerHtml: `O consórcio de caminhão segue a lógica geral do sistema de consórcios: o participante integra um grupo, realiza os pagamentos previstos e pode ser contemplado por sorteio ou lance, conforme as regras do contrato.

Para empresas e profissionais que dependem do veículo para trabalhar, o planejamento é especialmente importante.

Antes de escolher, é preciso considerar:

valor do caminhão;
prazo;
parcela;
capacidade financeira;
necessidade de substituição ou expansão da frota;
estratégia de contemplação;
condições da administradora.

A modalidade pode ser utilizada para veículos automotores, conforme a categoria e o contrato.`,
  },
  {
    id: "consorcio-veiculos-pesados",
    category: "veiculos",
    question: "Como funciona consórcio de veículos pesados?",
    answerHtml: `Veículos pesados podem fazer parte de modalidades de consórcio destinadas a veículos automotores, observadas as categorias e condições do contrato.

O Banco Central também inclui veículos automotores, máquinas e equipamentos entre os bens que podem ser adquiridos por meio de consórcio, de acordo com a categoria contratada.

Para quem utiliza o veículo como ferramenta de trabalho, a decisão precisa considerar muito mais do que a parcela.

É necessário analisar:

Quanto custa o veículo?

Quanto posso investir mensalmente?

Quando preciso dele?

Quero renovar ou ampliar minha frota?

Qual estratégia de contemplação faz sentido?

A Santa Sophia pode ajudar a organizar essas perguntas antes da contratação.`,
  },
  {
    id: "consorcio-empresas-vale-a-pena",
    category: "empresas",
    question: "Consórcio para empresas vale a pena?",
    answerHtml: `Pode ser uma alternativa interessante para empresas que conseguem planejar suas aquisições e querem estruturar a compra de bens como veículos, máquinas, equipamentos ou imóveis.

O Banco Central prevê, conforme a categoria do contrato, a aquisição de veículos automotores, máquinas e equipamentos, além de bens imóveis.

Para uma empresa, entretanto, a pergunta não deveria ser apenas:

“Qual é a parcela?”

Mas:

“Como essa aquisição se encaixa na estratégia de crescimento da empresa?”

Por isso, é importante analisar fluxo de caixa, prazo, necessidade do ativo e objetivo da aquisição antes de tomar uma decisão.`,
  },
  {
    id: "consorcio-expansao",
    category: "empresas",
    question: "Como usar consórcio para expansão?",
    answerHtml: `O consórcio pode fazer parte do planejamento de expansão de uma empresa quando existe uma necessidade futura de aquisição de ativos, como:

veículos;
caminhões;
máquinas;
equipamentos;
imóveis.

A ideia é transformar uma aquisição que poderia ser feita de forma improvisada em um projeto planejado.

Por exemplo:

Uma empresa sabe que pretende ampliar sua frota no futuro.

Em vez de esperar chegar o momento da compra para buscar uma solução, pode avaliar antecipadamente uma estratégia de aquisição por consórcio.

Naturalmente, a adequação depende do prazo, fluxo de caixa, objetivo e condições do grupo.`,
  },
  {
    id: "maquinas-e-equipamentos",
    category: "empresas",
    question: "Consórcio para máquinas e equipamentos: como funciona?",
    answerHtml: `O Banco Central prevê a possibilidade de aquisição de máquinas e equipamentos por meio de consórcio, conforme a categoria referenciada no contrato.

Para uma empresa, isso pode ser utilizado dentro de um planejamento de aquisição de ativos.

Antes da contratação, é importante definir:

qual equipamento será adquirido;
valor aproximado;
prazo desejado;
capacidade mensal de pagamento;
necessidade de contemplação;
condições do grupo;
regras de utilização do crédito.

O objetivo é fazer com que o consórcio seja uma ferramenta dentro da estratégia financeira da empresa — e não simplesmente mais uma despesa mensal.`,
  },
  {
    id: "aquisicao-caminhoes",
    category: "empresas",
    question: "Consórcio para aquisição de caminhões: vale a pena?",
    answerHtml: `Pode fazer sentido para empresas e profissionais que planejam adquirir ou renovar caminhões e conseguem trabalhar com um horizonte de médio ou longo prazo.

A categoria de veículos automotores está entre as possibilidades previstas para consórcio, de acordo com o contrato e a modalidade.

Para tomar uma decisão, é importante analisar:

1. O valor do caminhão

2. A parcela que cabe no caixa

3. O prazo do planejamento

4. A necessidade de contemplação

5. O impacto da aquisição na operação

6. As regras do grupo

7. Os custos e condições do contrato

Para uma empresa, o caminhão não é apenas um bem.

É uma ferramenta de geração de receita.

Por isso, a estratégia de aquisição precisa considerar o negócio como um todo.`,
  },
  {
    id: "quais-bens",
    category: "imoveis",
    question: "Quais bens posso adquirir com o consórcio Itaú?",
    answerHtml: `Imóveis urbanos (residenciais, comerciais e terrenos), construção e reforma estrutural, veículos leves novos ou usados, motos (inclusive elétricas), e veículos pesados como caminhões, vans, ônibus e implementos rodoviários. Também é possível usar o crédito para quitar um financiamento já existente em seu nome.`,
  },
  {
    id: "construir-terreno-proprio",
    category: "imoveis",
    question: "Posso construir em terreno próprio com o consórcio?",
    answerHtml: `Sim. Com terreno quitado, projeto aprovado e alvará, o crédito contemplado é liberado integralmente na conta do consorciado, sem reembolso por etapas de obra. O terreno fica alienado em garantia até a quitação.`,
  },
  {
    id: "quitar-financiamento",
    category: "imoveis",
    question: "Posso usar o consórcio para quitar meu financiamento?",
    answerHtml: `Sim. A carta de crédito do consórcio imobiliário pode quitar um financiamento ativo em seu nome, substituindo os juros bancários pela taxa de administração diluída. A vantagem depende do saldo, do prazo e do grupo — e é avaliada caso a caso.`,
  },
  {
    id: "fgts-lance",
    category: "imoveis",
    question: "Posso usar o FGTS para dar um lance?",
    answerHtml: `Sim, exclusivamente em cartas de imóvel residencial e seguindo as regras da Caixa Econômica Federal, incluindo a exigência de não possuir outro imóvel em seu nome. É necessário comprovar o saldo em até 5 dias úteis após a contemplação.`,
  },
  {
    id: "tempo-contemplacao",
    category: "consorcio",
    question: "Quanto tempo leva para eu ser contemplado?",
    answerHtml: `Não há prazo garantido: a contemplação depende de sorteio mensal ou da oferta de um lance vencedor em assembleia. Todos os participantes em dia com as parcelas são contemplados até o encerramento do grupo — a estratégia de lance pode ajudar a antecipar esse momento.`,
  },
  {
    id: "taxa-administracao",
    category: "consorcio",
    question: "O que é a taxa de administração?",
    answerHtml: `É o percentual cobrado sobre o valor da carta de crédito para remunerar a administradora pela gestão do grupo. Está descrita no contrato e é diluída ao longo das parcelas — sem surpresas. O percentual varia por grupo e prazo; um especialista informa o valor vigente.`,
  },
  {
    id: "parcela-muda",
    category: "consorcio",
    question: "Minha parcela pode mudar ao longo do consórcio?",
    answerHtml: `Sim. As parcelas são reajustadas periodicamente para preservar o poder de compra do grupo. Em imóveis, o reajuste segue o INCC no mês de aniversário do grupo; em veículos, pode seguir a tabela FIPE/FIAT, o IPCA ou uma taxa pré-fixada, conforme definido em contrato.`,
  },
  {
    id: "composicao-parcela",
    category: "consorcio",
    question: "O que compõe o valor da minha parcela?",
    answerHtml: `Fundo comum (o valor da carta de crédito), fundo de reserva (garantia de segurança financeira do grupo, devolvido ao final se não utilizado), taxa de administração e, opcionalmente, seguro prestamista.`,
  },
  {
    id: "lance-embutido",
    category: "consorcio",
    question: "O que é lance embutido?",
    answerHtml: `É a possibilidade de usar parte da própria carta de crédito como lance, sem desembolsar esse valor do bolso. No Itaú, o lance embutido é limitado a 30% do crédito, um limite que protege o grupo e mantém as médias de lance equilibradas. O valor embutido é abatido da carta na contemplação.`,
  },
  {
    id: "lance-fixo",
    category: "consorcio",
    question: "Como funciona o lance fixo?",
    answerHtml: `É uma modalidade em que o percentual do lance é definido pelo regulamento do grupo, e a contemplação entre os que ofertam o lance fixo pode ocorrer por sorteio. Pode ser combinado com lance embutido e recursos próprios ou FGTS, conforme as regras do grupo.`,
  },
  {
    id: "quem-pode-contratar",
    category: "contratacao",
    question: "Quem pode contratar um consórcio?",
    answerHtml: `Qualquer pessoa maior de 18 anos (ou emancipada), correntista Itaú ou não, com o crédito aprovado em análise. Pessoas jurídicas também podem contratar.`,
  },
  {
    id: "como-simular",
    category: "contratacao",
    question: "Como faço uma simulação?",
    answerHtml: `Preencha o formulário no site com seus dados e o bem que deseja adquirir. Um especialista da Santa Sophia entra em contato para apresentar as melhores opções de carta de crédito e grupo para o seu perfil, sem compromisso.`,
  },
  {
    id: "preciso-ser-itau",
    category: "contratacao",
    question: "Preciso ser cliente do Itaú para contratar?",
    answerHtml: `Não. Correntistas podem contratar pelo app ou site do Itaú; quem não é correntista contrata por meio da simulação com um especialista Santa Sophia, representante autorizado Itaú Consórcios.`,
  },
  {
    id: "direto-itau-ou-santa-sophia",
    category: "contratacao",
    question: "Qual a diferença entre contratar direto com o Itaú ou com a Santa Sophia?",
    answerHtml: `A Santa Sophia é representante autorizada Itaú Consórcios: você tem exatamente a mesma solidez, as mesmas condições contratuais e a mesma segurança do Itaú, somadas a um atendimento consultivo, próximo e especializado, que te ajuda a escolher o grupo, a estratégia de lance e o momento certo de agir — do início ao fim da sua jornada.`,
  },
  {
    id: "fui-contemplado",
    category: "contratacao",
    question: "Fui contemplado — e agora?",
    answerHtml: `Você recebe uma carta e um e-mail (e, em caso de lance, também um telegrama) com a confirmação. É preciso efetuar o pagamento do lance, quando aplicável, em até 5 dias úteis, passar por nova análise de crédito e enviar a documentação necessária para dar início ao processo de compra do bem.`,
  },
  {
    id: "posso-cancelar",
    category: "contratacao",
    question: "Posso cancelar meu consórcio?",
    answerHtml: `Sim. Nos primeiros 7 dias após a contratação, o cancelamento garante a devolução integral do valor pago. Após esse prazo, o valor contribuído ao fundo comum é devolvido por meio de sorteios de desistentes ou no encerramento do grupo, descontadas eventuais multas contratuais.`,
  },
  {
    id: "alternativas-cancelamento",
    category: "contratacao",
    question: "Existem alternativas ao cancelamento?",
    answerHtml: `Sim — você pode reduzir o valor da carta de crédito, transferir a cota para outra pessoa interessada (cessão de cota) ou revender a cota por meio de um parceiro especializado. A Santa Sophia pode te orientar sobre a opção mais vantajosa para o seu caso.`,
  },
  {
    id: "seguro-prestamista",
    category: "contratacao",
    question: "O que é o seguro prestamista?",
    answerHtml: `É um seguro opcional, diluído nas parcelas, que quita o saldo devedor em caso de morte ou invalidez permanente do consorciado, entregando o bem ou o crédito à família. Deve ser avaliado caso a caso.`,
  },
];

export function faqByCategory(category: FaqCategory): FaqEntry[] {
  return faqEntries.filter((entry) => entry.category === category);
}

export function faqByIds(...ids: string[]): FaqEntry[] {
  return ids.map((id) => {
    const entry = faqEntries.find((item) => item.id === id);
    if (!entry) throw new Error(`FAQ não encontrado: ${id}`);
    return entry;
  });
}

export function faqSchemaItems(entries: FaqEntry[] = faqEntries) {
  return entries.map(({ question, answerHtml }) => ({ question, answer: answerHtml }));
}

/**
 * Perguntas exibidas em cada página de segmento — fonte única consumida tanto
 * pelas páginas quanto pelo JSON-LD FAQPage, para que o schema nunca declare
 * uma pergunta que não está visível na página (exigência do Google).
 *
 * `items` são as perguntas da categoria, exibidas na íntegra como H2 + resposta.
 * `related` são perguntas de outras categorias, no accordion do rodapé da página.
 */
export const segmentFaq = {
  "real-estate": {
    items: [
      "comprar-imovel",
      "consorcio-imovel-vale-a-pena",
      "comprar-apartamento",
      "comprar-terreno",
      "construcao-reforma",
      "construir-terreno-proprio",
      "quitar-financiamento",
    ],
    related: ["como-funciona-contemplacao", "como-funciona-lance", "como-escolher-consorcio"],
  },
  construction: {
    items: [],
    related: ["construcao-reforma", "fgts-lance", "como-funciona-contemplacao"],
  },
  payoff: {
    items: [],
    related: ["consorcio-ou-financiamento", "como-funciona-lance", "carta-de-credito"],
  },
  leverage: {
    items: [],
    related: ["carta-de-credito", "como-funciona-contemplacao", "posso-cancelar"],
  },
  vehicles: {
    items: ["consorcio-carro-vale-a-pena", "consorcio-ou-financiamento-carro"],
    related: ["carta-de-credito", "como-funciona-lance", "como-escolher-consorcio"],
  },
  trucks: {
    items: ["consorcio-caminhao", "consorcio-veiculos-pesados", "aquisicao-caminhoes"],
    related: ["como-funciona-contemplacao", "carta-de-credito", "como-escolher-consorcio"],
  },
  business: {
    items: ["consorcio-empresas-vale-a-pena", "consorcio-expansao", "maquinas-e-equipamentos"],
    related: ["como-funciona-contemplacao", "como-funciona-lance", "como-escolher-consorcio"],
  },
} as const;

export type SegmentFaqKey = keyof typeof segmentFaq;

export function segmentFaqItems(key: SegmentFaqKey): FaqEntry[] {
  return faqByIds(...segmentFaq[key].items);
}

export function segmentFaqRelated(key: SegmentFaqKey): FaqEntry[] {
  return faqByIds(...segmentFaq[key].related);
}

/** Tudo que a página de segmento exibe — base do FAQPage JSON-LD. */
export function segmentFaqAll(key: SegmentFaqKey): FaqEntry[] {
  return [...segmentFaqItems(key), ...segmentFaqRelated(key)];
}
