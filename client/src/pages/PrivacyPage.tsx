import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { EMAIL } from "@/seo/constants";

export default function PrivacyPage() {
  return (
    <Layout>
      <PageHero path="/politica-de-privacidade/" h1="Política de Privacidade" lede="Saiba como a Santa Sophia trata seus dados pessoais e protege a sua privacidade." />
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl space-y-12">
          <section><h2>1. Compromisso com a privacidade</h2><p className="mt-4 text-muted-foreground">A Santa Sophia trata dados pessoais em conformidade com a Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018), observando os princípios de finalidade, adequação, necessidade, transparência e segurança.</p></section>
          <section><h2>2. Dados coletados</h2><p className="mt-4 text-muted-foreground">Quando você envia um formulário, podemos coletar nome, telefone, e-mail, objetivo e a mensagem informada. Também podem ser coletados dados técnicos de navegação, como páginas acessadas, dispositivo, navegador e origem da visita.</p></section>
          <section><h2>3. Finalidades do tratamento</h2><p className="mt-4 text-muted-foreground">Os dados são utilizados para responder ao contato, prestar atendimento consultivo, analisar o objetivo informado, manter a segurança do site, aprimorar a experiência e medir o desempenho de páginas e campanhas.</p></section>
          <section><h2>4. Google Analytics 4 (GA4)</h2><p className="mt-4 text-muted-foreground">Este site pode utilizar o Google Analytics 4 (GA4) em ambiente de produção para gerar estatísticas de uso e medir eventos de conversão, como cliques nos canais de atendimento e envios de formulário. O GA4 só é carregado quando a identificação de medição está configurada.</p></section>
          <section><h2>5. Compartilhamento e armazenamento</h2><p className="mt-4 text-muted-foreground">Os dados podem ser tratados por fornecedores necessários à operação do site e do atendimento, sujeitos a deveres de segurança e confidencialidade. Não comercializamos dados pessoais. As informações são mantidas pelo período necessário ao atendimento das finalidades informadas e ao cumprimento de obrigações legais.</p></section>
          <section><h2>6. Direitos do titular</h2><p className="mt-4 text-muted-foreground">Nos termos da LGPD, o titular pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio ou eliminação quando aplicável, informação sobre compartilhamento e revogação do consentimento.</p></section>
          <section><h2>7. Contato</h2><p className="mt-4 text-muted-foreground">Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, envie uma mensagem para <a href={`mailto:${EMAIL}`} className="font-semibold text-primary hover:underline">{EMAIL}</a>.</p></section>
        </div>
      </section>
    </Layout>
  );
}
