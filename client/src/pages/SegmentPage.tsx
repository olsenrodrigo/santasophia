import { Link } from "wouter";
import { AnswerBlock } from "@/components/site/AnswerBlock";
import { ComplianceNote } from "@/components/site/ComplianceNote";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { FaqContent } from "@/components/site/FaqContent";
import { Layout } from "@/components/site/Layout";
import { MethodSteps } from "@/components/site/MethodSteps";
import { PageHero } from "@/components/site/PageHero";
import { faqByIds, type FaqEntry } from "@/content/faq";

interface SegmentPageProps {
  path: string;
  h1: string;
  lede: string;
  items: FaqEntry[];
  message: string;
  children?: React.ReactNode;
  showMethod?: boolean;
}

function SegmentPage({ path, h1, lede, items, message, children, showMethod }: SegmentPageProps) {
  return (
    <Layout>
      <PageHero path={path} h1={h1} lede={lede} />
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <AnswerBlock question={items[0].question}>
            <p className="whitespace-pre-line">{items[0].answerHtml}</p>
          </AnswerBlock>
        </div>
      </section>
      <section className="section-padding bg-surface">
        <div className="container-custom"><FaqContent items={items} />{children}</div>
      </section>
      {showMethod ? (
        <section className="section-padding bg-background">
          <div className="container-custom"><h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Construímos uma estratégia de compra.</h2><div className="mt-10"><MethodSteps /></div></div>
        </section>
      ) : null}
      <CtaBand title="Seu planejamento pode começar com uma conversa." text="Conte seu objetivo para a equipe Santa Sophia e entenda quais possibilidades podem fazer sentido para o seu momento." whatsappMessage={message} />
      <section className="section-padding-sm bg-background">
        <div className="container-custom"><h2 className="text-2xl">Perguntas relacionadas</h2><div className="mt-7"><FaqAccordion items={items} /></div><div className="mt-10 flex flex-wrap gap-5 text-sm font-bold text-primary"><Link href="/o-que-e-consorcio/" className="hover:underline">Entenda como funciona o consórcio</Link><Link href="/perguntas-frequentes/" className="hover:underline">Veja todas as perguntas frequentes</Link></div><ComplianceNote className="mt-10" /></div>
      </section>
    </Layout>
  );
}

export function RealEstatePage() {
  const items = faqByIds("comprar-imovel", "consorcio-imovel-vale-a-pena", "comprar-apartamento", "comprar-terreno", "construcao-reforma");
  return <SegmentPage path="/consorcio-de-imoveis/" h1="Consórcio de imóveis: planeje a conquista da sua casa, apartamento ou terreno" lede="Para comprar sua casa, apartamento, terreno ou realizar um projeto imobiliário." items={items} message="Olá, Magno. Quero planejar a aquisição de um imóvel por consórcio." showMethod />;
}

export function VehiclesPage() {
  const items = faqByIds("consorcio-carro-vale-a-pena", "consorcio-ou-financiamento-carro");
  return (
    <SegmentPage path="/consorcio-de-veiculos/" h1="Consórcio de veículos: troque de carro com planejamento, não com pressa" lede="Para trocar de carro ou adquirir um veículo de acordo com seu planejamento." items={items} message="Olá, Magno. Quero planejar a aquisição ou troca de um veículo por consórcio.">
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Consórcio de motos</h2>
        <div className="mt-5 max-w-4xl space-y-4 text-muted-foreground">
          <p>O consórcio de motos segue a lógica da aquisição planejada: o participante integra um grupo e pode ser contemplado por sorteio ou lance, conforme as regras do contrato.</p>
          <p>Antes de contratar, é importante analisar o valor do crédito, o prazo, os custos, os reajustes, a capacidade mensal de pagamento e quando você realmente precisa da moto.</p>
          <p>A modalidade adequada depende da categoria contratada e das condições da administradora. A escolha deve começar pelo seu objetivo, e não apenas pelo valor da parcela.</p>
        </div>
      </article>
    </SegmentPage>
  );
}

export function TrucksPage() {
  const items = faqByIds("consorcio-caminhao", "consorcio-veiculos-pesados", "aquisicao-caminhoes");
  return <SegmentPage path="/consorcio-de-caminhoes/" h1="Consórcio de caminhões e veículos pesados: estrutura para quem trabalha" lede="Para quem precisa investir em caminhões, máquinas e estrutura para trabalhar." items={items} message="Olá, Magno. Quero planejar a aquisição ou renovação de caminhões e veículos pesados." />;
}

export function BusinessPage() {
  const items = faqByIds("consorcio-empresas-vale-a-pena", "consorcio-expansao", "maquinas-e-equipamentos");
  return (
    <SegmentPage path="/consorcio-para-empresas/" h1="Consórcio empresarial: capital planejado para expandir sua empresa" lede="Para empresários que precisam de capital planejado para expansão, equipamentos ou novos projetos." items={items} message="Olá, Magno. Quero analisar uma estratégia de consórcio para a minha empresa.">
      <article className="mt-14 border-t border-border pt-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Consórcio para frota</h2>
        <p className="mt-5 max-w-4xl text-muted-foreground">O planejamento de uma frota deve considerar o fluxo de caixa, o prazo, a necessidade dos veículos e o impacto da aquisição na operação. Para caminhões e veículos pesados, veja também as condições e os pontos de análise específicos dessa categoria.</p>
        <Link href="/consorcio-de-caminhoes/" className="mt-5 inline-block font-bold text-primary hover:underline">Conheça o consórcio de caminhões e veículos pesados</Link>
      </article>
    </SegmentPage>
  );
}
