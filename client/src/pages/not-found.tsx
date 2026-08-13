import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";

export default function NotFound() {
  return (
    <Layout>
      <PageHero path="/404/" h1="Página não encontrada" lede="O endereço informado não corresponde a uma página disponível." />
      <section className="section-padding bg-background"><div className="container-custom text-center"><h2 className="text-2xl">Vamos encontrar o caminho certo.</h2><p className="mx-auto mt-5 max-w-xl text-muted-foreground">Volte ao início para conhecer as possibilidades de consórcio ou fale com a equipe Santa Sophia.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary-soft"><ArrowLeft className="size-5" aria-hidden="true" />Voltar ao início</Link></div></section>
    </Layout>
  );
}
