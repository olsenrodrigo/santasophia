import { Link } from "wouter";
import { AnswerBlock } from "@/components/site/AnswerBlock";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { FaqContent } from "@/components/site/FaqContent";
import { Layout } from "@/components/site/Layout";
import { MethodSteps } from "@/components/site/MethodSteps";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { segmentFaqItems, segmentFaqRelated, type FaqEntry } from "@/content/faq";

interface SegmentPageProps {
  path: string;
  h1: string;
  lede: string;
  items: FaqEntry[];
  message: string;
  summaryQuestion: string;
  summary: string[];
  relatedItems: FaqEntry[];
  children?: React.ReactNode;
  showMethod?: boolean;
}

function SegmentPage({ path, h1, lede, items, message, summaryQuestion, summary, relatedItems, children, showMethod }: SegmentPageProps) {
  return (
    <Layout>
      <PageHero path={path} h1={h1} lede={lede} />
      <Reveal><section className="section-padding-sm bg-background">
        <div className="container-custom">
          <AnswerBlock question={summaryQuestion}>
            {summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </AnswerBlock>
        </div>
      </section></Reveal>
      <Reveal><section className="section-padding bg-surface">
        <div className="container-custom"><FaqContent items={items} />{children}</div>
      </section></Reveal>
      {showMethod ? (
        <section className="section-padding bg-background">
          <div className="container-custom"><h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Construímos uma estratégia de compra.</h2><div className="mt-10"><MethodSteps /></div></div>
        </section>
      ) : null}
      <CtaBand title="Seu planejamento pode começar com uma conversa." text="Conte seu objetivo para a equipe Santa Sophia e entenda quais possibilidades podem fazer sentido para o seu momento." whatsappMessage={message} />
      <section className="section-padding-sm bg-background">
        <div className="container-custom"><h2 className="text-2xl">Perguntas relacionadas</h2><div className="mt-7"><FaqAccordion items={relatedItems} /></div><div className="mt-10 flex flex-wrap gap-5 text-sm font-bold text-primary"><Link href="/o-que-e-consorcio/" className="hover:underline">Entenda como funciona o consórcio</Link><Link href="/perguntas-frequentes/" className="hover:underline">Veja todas as perguntas frequentes</Link></div></div>
      </section>
    </Layout>
  );
}

export function RealEstatePage() {
  const items = segmentFaqItems("real-estate");
  return (
    <SegmentPage path="/consorcio-de-imoveis/" h1="Consórcio de imóveis: planeje a conquista da sua casa, apartamento ou terreno" lede="Para comprar sua casa, apartamento, terreno ou realizar um projeto imobiliário." items={items} summaryQuestion="Consórcio de imóveis, em resumo" summary={["O consórcio imobiliário permite planejar a aquisição de casa, apartamento ou terreno conforme a categoria contratada.", "A utilização do crédito depende da contemplação, das regras do contrato e dos procedimentos da administradora."]} relatedItems={segmentFaqRelated("real-estate")} message="Olá, Magno. Quero planejar a aquisição de um imóvel por consórcio." showMethod>
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">O que dá para fazer com a carta de crédito imobiliária</h2>
        <ul className="ml-5 mt-6 max-w-4xl list-disc space-y-3 text-muted-foreground marker:text-primary">
          <li>Imóveis residenciais, comerciais, industriais e rurais;</li>
          <li>Terrenos, lotes, chácaras e fazendas;</li>
          <li>Construção e reforma estrutural, incluindo custos de documentação (ITBI, escritura e registro);</li>
          <li>Quitação de financiamento imobiliário em andamento;</li>
          <li>Galpões, sedes empresariais e salas comerciais.</li>
        </ul>
        <p className="mt-6 max-w-4xl text-muted-foreground">A carta de crédito é corrigida anualmente pelo INCC, o que preserva o poder de compra do grupo até a contemplação. Prazos de até 240 meses, conforme o grupo.</p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold text-primary">
          <Link href="/construcao-e-reforma/" className="hover:underline">Consórcio para construção e reforma</Link>
          <Link href="/quitacao-de-financiamento/" className="hover:underline">Quitação de financiamento com consórcio</Link>
        </div>
      </article>
      <AnswerBlock question="Financiamento libera 100%?" className="mt-14 bg-background">
        <p>No financiamento bancário, o crédito costuma ficar limitado a uma parte do valor do imóvel e a uma parte menor ainda no caso de terrenos. No consórcio imobiliário, a carta pode cobrir até 100% do valor do projeto, conforme as regras do grupo e a avaliação do bem.</p>
      </AnswerBlock>
    </SegmentPage>
  );
}

export function VehiclesPage() {
  const items = segmentFaqItems("vehicles");
  return (
    <SegmentPage path="/consorcio-de-veiculos/" h1="Consórcio de veículos: troque de carro com planejamento, não com pressa" lede="Para trocar de carro ou adquirir um veículo de acordo com seu planejamento." items={items} summaryQuestion="Consórcio de veículos, em resumo" summary={["O consórcio de veículos é uma modalidade de aquisição planejada para quem pode aguardar a contemplação segundo as regras do grupo.", "A escolha deve considerar o objetivo, a necessidade do veículo e as condições do contrato."]} relatedItems={segmentFaqRelated("vehicles")} message="Olá, Magno. Quero planejar a aquisição ou troca de um veículo por consórcio.">
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Consórcio de motos</h2>
        <div className="mt-5 max-w-4xl space-y-4 text-muted-foreground">
          <p>Das scooters elétricas urbanas às motos de alta cilindrada, novas ou usadas.</p>
          <p>O consórcio de motos segue a lógica da aquisição planejada: o participante integra um grupo e pode ser contemplado por sorteio ou lance, conforme as regras do contrato.</p>
          <p>Antes de contratar, é importante analisar o valor do crédito, o prazo, os custos, os reajustes, a capacidade mensal de pagamento e quando você realmente precisa da moto.</p>
          <p>A modalidade adequada depende da categoria contratada e das condições da administradora. A escolha deve começar pelo seu objetivo, e não apenas pelo valor da parcela.</p>
        </div>
      </article>
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Como a parcela acompanha o bem</h2>
        <p className="mt-5 max-w-4xl text-muted-foreground">As parcelas acompanham a valorização do bem pela tabela FIPE (ou FIAT, para veículos da montadora), pelo IPCA ou por taxa pré-fixada, conforme as condições do grupo. Prazos de 12 a 120 meses.</p>
      </article>
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Faturamento</h2>
        <p className="mt-5 max-w-4xl text-muted-foreground">Após a contemplação e a aprovação do cadastro, o faturamento do veículo costuma ser ágil — em muitos casos em até 48 horas úteis após a formalização, conforme a administradora.</p>
      </article>
    </SegmentPage>
  );
}

export function TrucksPage() {
  const items = segmentFaqItems("trucks");
  return (
    <SegmentPage path="/consorcio-de-caminhoes/" h1="Consórcio de caminhões e veículos pesados: estrutura para quem trabalha" lede="Para quem precisa investir em caminhões, máquinas e estrutura para trabalhar." items={items} summaryQuestion="Consórcio de caminhões, em resumo" summary={["Caminhões e veículos pesados podem integrar modalidades de consórcio para veículos automotores, de acordo com a categoria contratada.", "O planejamento deve considerar a operação, a capacidade financeira e as condições específicas do grupo."]} relatedItems={segmentFaqRelated("trucks")} message="Olá, Magno. Quero planejar a aquisição ou renovação de caminhões e veículos pesados.">
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Agronegócio e maquinário</h2>
        <p className="mt-5 max-w-4xl text-muted-foreground">Tratores, colheitadeiras e máquinas agrícolas também podem ser adquiridos por consórcio, assim como vans, ônibus, implementos rodoviários e frotas de entrega. Aeronaves e embarcações dependem de aprovação em comitê da administradora.</p>
      </article>
    </SegmentPage>
  );
}

export function BusinessPage() {
  const items = segmentFaqItems("business");
  return (
    <SegmentPage path="/consorcio-para-empresas/" h1="Consórcio empresarial: capital planejado para expandir sua empresa" lede="Para empresários que precisam de capital planejado para expansão, equipamentos ou novos projetos." items={items} summaryQuestion="Consórcio para empresas, em resumo" summary={["Empresas podem avaliar o consórcio no planejamento de aquisições futuras de veículos, máquinas, equipamentos ou imóveis.", "A adequação depende do fluxo de caixa, do prazo, do objetivo e das condições do grupo e do contrato."]} relatedItems={segmentFaqRelated("business")} message="Olá, Magno. Quero analisar uma estratégia de consórcio para a minha empresa.">
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Consórcio para frota</h2>
        <p className="mt-5 max-w-4xl text-muted-foreground">O planejamento de uma frota deve considerar o fluxo de caixa, o prazo, a necessidade dos veículos e o impacto da aquisição na operação. Para caminhões e veículos pesados, veja também as condições e os pontos de análise específicos dessa categoria.</p>
        <Link href="/consorcio-de-caminhoes/" className="mt-5 inline-block font-bold text-primary hover:underline">Conheça o consórcio de caminhões e veículos pesados</Link>
      </article>
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Máquinas estacionárias e expansão</h2>
        <p className="mt-5 max-w-4xl text-muted-foreground">Injetoras, sopradoras, linhas de produção e outros equipamentos fixos ao piso fabril entram na modalidade imobiliária, com alienação do bem em garantia. Filiais, galpões e sedes também. Alavancagem de CPF e CNPJ, conforme análise da administradora.</p>
      </article>
    </SegmentPage>
  );
}
