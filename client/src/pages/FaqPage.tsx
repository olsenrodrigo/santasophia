import { CtaBand } from "@/components/site/CtaBand";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { FAQ_DISCLAIMER, faqByCategory, faqCategoryLabels, type FaqCategory } from "@/content/faq";

const categories: FaqCategory[] = ["consorcio", "imoveis", "veiculos", "empresas"];

export default function FaqPage() {
  return (
    <Layout>
      <PageHero path="/perguntas-frequentes/" h1="Perguntas frequentes sobre consórcio" lede="Respostas diretas para entender o sistema de consórcios e avaliar as possibilidades conforme o seu objetivo." />
      <nav aria-label="Categorias do FAQ" className="border-b border-border bg-background"><div className="container-custom flex flex-wrap gap-3 py-5">{categories.map((category) => <a key={category} href={`#${category}`} className="rounded-full bg-surface px-4 py-2 text-sm font-bold text-primary hover:bg-highlight">{faqCategoryLabels[category]}</a>)}</div></nav>
      <section className="section-padding bg-background">
        <div className="container-custom space-y-20">
          {categories.map((category) => (
            <section key={category} id={category} className="scroll-mt-28">
              <p className="eyebrow-text text-muted-foreground">Perguntas sobre</p>
              <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)]">{faqCategoryLabels[category]}</h2>
              <div className="mt-8"><FaqAccordion items={faqByCategory(category)} /></div>
            </section>
          ))}
        </div>
      </section>
      <CtaBand title="Ainda ficou com dúvida?" text="Você não precisa entender tudo sobre consórcio antes de conversar com um especialista. Conte para o Magno o que você quer comprar, quanto pretende investir e em quanto tempo gostaria de realizar. A partir dessas informações, você poderá entender quais possibilidades podem fazer sentido para o seu planejamento." whatsappMessage="Olá, Magno. Ainda tenho uma dúvida sobre consórcio e quero falar com um especialista." />
      <section className="section-padding-sm bg-background"><div className="container-custom"><p className="font-semibold text-primary">Santa Sophia — Consórcio com estratégia. Crédito com propósito.</p><p className="mt-5 text-xs leading-relaxed text-muted-foreground">{FAQ_DISCLAIMER}</p></div></section>
    </Layout>
  );
}
