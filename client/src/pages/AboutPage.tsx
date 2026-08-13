import { CtaBand } from "@/components/site/CtaBand";
import { GeoAnswers } from "@/components/site/GeoAnswers";
import { Layout } from "@/components/site/Layout";
import { MagnoCard } from "@/components/site/MagnoCard";
import { PageHero } from "@/components/site/PageHero";

export default function AboutPage() {
  return (
    <Layout>
      <PageHero path="/quem-somos/" h1="Quem é a Santa Sophia?" lede="Empresa especializada em soluções de crédito por meio de consórcio, com atendimento digital e consultivo em todo o Brasil." />
      <section className="section-padding bg-background"><div className="container-custom"><GeoAnswers /></div></section>
      <section className="section-padding bg-primary-deep text-primary-foreground">
        <div className="container-custom grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div><p className="eyebrow-text text-highlight">Por que a Santa Sophia?</p><h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] text-primary-foreground">Porque crédito sem estratégia é apenas crédito.</h2></div>
          <div className="space-y-4 text-lg text-primary-foreground/80"><p>Estratégia transforma crédito em oportunidade.</p><p>A Santa Sophia nasceu para tornar o consórcio mais simples, mais transparente e mais próximo da realidade de quem precisa tomar uma grande decisão.</p><p>Aqui, você não precisa entender todas as regras, taxas, possibilidades e caminhos antes de conversar conosco.</p><p><em>Você só precisa nos contar onde quer chegar.</em></p><p>A partir daí, nós ajudamos a construir o caminho.</p></div>
        </div>
      </section>
      <section className="section-padding bg-background">
        <div className="container-custom grid gap-10 lg:grid-cols-2 lg:gap-20"><div><p className="eyebrow-text text-muted-foreground">Atendimento em todo o Brasil</p><h2 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">De onde você estiver, seu próximo passo pode começar aqui.</h2></div><div className="space-y-4 text-lg text-muted-foreground"><p>A Santa Sophia atende clientes de diferentes regiões do Brasil por meio de atendimento digital e consultivo.</p><p>Você não precisa se deslocar.</p><p>Não precisa enfrentar burocracia sozinho.</p><p>E não precisa entender tudo sobre consórcio antes de começar.</p><p className="font-semibold text-primary"><em>A primeira conversa pode acontecer de onde você estiver.</em></p></div></div>
      </section>
      <section className="section-padding bg-surface"><div className="container-custom"><h2 className="text-[clamp(1.6rem,3vw,2.4rem)]">Informação, segurança e atendimento consultivo</h2><div className="mt-6 max-w-4xl space-y-4 text-muted-foreground"><p>A Santa Sophia atua em parceria com administradoras autorizadas pelo Banco Central, como Itaú Consórcios.</p><p>O sistema de consórcios é regulado pela Lei nº 11.795/2008. Antes da contratação, devem ser observados o contrato, o regulamento do grupo e as condições da administradora.</p><p>A ABAC — Associação Brasileira de Administradoras de Consórcios — também reúne informações institucionais sobre o sistema.</p></div><div className="mt-12"><MagnoCard /></div></div></section>
      <CtaBand title="Sua próxima conquista pode começar com uma conversa." text="Conte ao Magno o que você quer conquistar e descubra quais possibilidades podem fazer sentido para o seu momento." whatsappMessage="Olá, Magno. Conheci a Santa Sophia e quero entender quais possibilidades fazem sentido para o meu objetivo." />
    </Layout>
  );
}
