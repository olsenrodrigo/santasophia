# Plano v2 — complementar o site com os insumos de agosto/setembro de 2026

Base: site v1 no ar localmente (13 rotas, copy v1 aprovada, Lighthouse 97–100). Este plano **complementa**, não reescreve: tudo que a v1 já tem continua, salvo onde este documento diz explicitamente "substituir".

Insumos analisados (todos copiados para `docs/copy/insumos-2026-09/`):

| Insumo | O que trouxe de novo |
|---|---|
| `Santa_Sophia_Copy_FAQ_Jornada.docx` (ago/2026, versão do zip) | Bloco "COPYS ATUALIZADAS E OTIMIZADAS PARA O SITE": hero novo, "Por que Santa Sophia + Itaú" (4 pilares), 4 páginas de solução (imóveis/construção, quitação de financiamento, veículos/pesados, alavancagem/seguro), FAQ Itaú com 18 perguntas, copy do site antigo (motos, pesados, cotas contempladas, "como simular"). |
| `GUIA DE POSICIONAMENTO E MARCA` (docx, 25/08/2026) | Origem do nome (homenagem à mãe do fundador + Sophia = sabedoria), missão "guardião patrimonial", pilares "anti-vendedor" e "acesso direto à fonte" (Contrato Master Brasil Itaú), método em 3 alavancagens, blindagem jurídica, estrutura recomendada de páginas. |
| `gemini-code-…md` (manual estratégico / RAG v2) | 17 anos, nascida em Ribeirão Preto, atendimento digital no Brasil todo; diferenciais Itaú (pré-análise cadastral, lance embutido limitado a 30%, fundo de reserva devolvido); portfólio completo (rural, galpões, máquinas estacionárias, agro, aeronaves sob comitê); construção em terreno próprio com 100% do crédito na conta; reajustes INCC / FIPE / IPCA; prazos (imóveis até 240 meses, veículos 12 a 120); "5 erros que te colocam numa fria". |
| Imagens | Selo "Consórcio Itaú. Representante Autorizado" (versão para fundo claro e para fundo escuro); foto vertical do Magno em 853×1280 (substitui a de 300×375); foto da equipe; três recortes de matérias da revista Revide (Ribeirão Preto, 2016–2018). |
| Backup WordPress 2022 | CNPJ 05.046.442/0001-92; posts de blog de 2020 ("5 fatores", "FGTS para construção", "Vantagens de construir pelo consórcio Itaú"); confirma que o site antigo era todo de fotos de banco de imagem (não reaproveitar). |
| Vídeo "Feed Consórcio construção" (55 MB, 1080×1080) | **Não usar.** Marca antiga ("Santa Sophia Negócios Imobiliários", logo magenta) e promessa "sem juros em tempo recorde", que contraria a regra de nunca prometer prazo. Fica registrado aqui para o cliente decidir se regrava. |

## Decisões que continuam valendo (do PLANO v1)

1. CTA primário: WhatsApp `(16) 99197-2435` com mensagem por página.
2. **Nenhum endereço físico** em lugar nenhum (nem nos recortes de revista — por isso foram cortados acima do rodapé). "Nascida em Ribeirão Preto" é permitido: é origem, não endereço.
3. Dados institucionais só os aprovados (0800, WhatsApp, e-mail, Instagram). CNPJ pode entrar no rodapé em texto pequeno — é dado público e reforça credibilidade.
4. Compliance Lei 11.795 / BACEN: **nenhuma promessa de prazo de contemplação, nenhuma rentabilidade numérica, nenhuma taxa de administração ou parcela em número.** O `.docx` traz "1,1% ao mês", "retornos de 150% a 400%", "juros de 8,5% a 15%", "economize até 20 anos": **não publicar esses números**. O que é regra de produto publicada pela própria administradora pode entrar com a ressalva "conforme regras do grupo": lance embutido de até 30%, prazos de até 240 meses (imóveis) e de 12 a 120 meses (veículos), fundo de reserva devolvido ao final, 7 dias para desistência com devolução integral, pagamento do lance em até 5 dias úteis.
5. Copy v1 aprovada continua literal onde não houver substituição explícita.

## Decisões novas

| Decisão | Motivo |
|---|---|
| Hero da home passa a usar a headline do `.docx` ("Construa e alavanque seu patrimônio…") e o H1 v1 ("Seu próximo grande passo não precisa esperar.") vira o H2 logo abaixo. | O `.docx` é o material mais recente do cliente e se intitula "copys atualizadas e otimizadas para o site". A frase v1 continua na página para não perder a promessa emocional aprovada. |
| Parceria Itaú sobe de "credencial no rodapé" para pilar visível: selo no hero, faixa de confiança, seção "Por que Santa Sophia + Itaú", selo no rodapé. | Guia de posicionamento: "A Vantagem Injusta (Contrato Master Brasil Itaú)" e "Acesso direto à fonte". Santa Sophia é representante autorizada — o selo é da própria administradora. |
| Três rotas novas: `/construcao-e-reforma/`, `/quitacao-de-financiamento/`, `/alavancagem-financeira/`. | São as três soluções que o `.docx` e o guia pedem como páginas próprias e que hoje não existem. "Cotas contempladas" e "seguro prestamista" entram como seções da página de alavancagem, não como rotas. |
| Texto "rentabilidade média de 1,1% ao mês" e "150% a 400%" **fora do site**. | Publicidade de consórcio como investimento com retorno é vedada pela autorregulação ABAC e expõe o representante. A página de alavancagem fala em "estratégia possível", nunca em promessa. |
| Foto do Magno: substituir `magno.jpg/webp` pela vertical de 853×1066 e relaxar o `max-w-[300px]` do `MagnoPortrait` para `max-w-[420px]`. | Resolução 2,8× maior. Comentário do componente e README precisam ser atualizados. |
| Foto da equipe entra em `/quem-somos/` **sem nomear ninguém**. | É de 2019; não sabemos quem ainda está na empresa. Legenda genérica: "Equipe Santa Sophia, Ribeirão Preto". |
| Recortes da Revide entram como "Na mídia" em `/quem-somos/` e `/magno-stiti-de-paula/`. | Prova social real (2016–2018). Legenda cita veículo, cidade e ano; não reproduz o texto da matéria. |
| Magno: "bacharel em Direito e administrador de empresas", nunca "advogado". | A matéria diz "advogado", mas o próprio Magno relata não ter prestado a OAB. Publicar "advogado" seria afirmação falsa. |
| Trajetória do Magno com 17 anos de mercado de crédito, começo em administradora de consórcio ligada a montadora, sócio-fundador de correspondente Caixa em 2011, atendimento digital de onde estiver. | Fatos relatados pelo próprio Magno e confirmados pela matéria de 2016 ("sete anos" em 2016 = 2009). Sem números de contemplação (não verificáveis). |
| Select de objetivo do formulário ganha as opções do guia: moradia / construção ou reforma / quitação de financiamento / veículo / pesados e frota / empresa / alavancagem patrimonial. | Guia: "Formulário de qualificação: pergunta de entrada para identificar se o cliente busca moradia, obra ou investimento patrimonial." |

---

## 1. Rotas (registro `client/src/seo/routes.ts`)

Adicionar três rotas, todas `changefreq: monthly`, `priority: 0.9`, com `Service` + `BreadcrumbList` + `FAQPage` (subset) no JSON-LD e imagem OG própria (gerar em `client/public/og/` no mesmo padrão navy das existentes — ver `scripts` ou gerar via Pillow com o mesmo layout: fundo `#061240`, logo `logo-stacked-white.png`, título em Plus Jakarta Sans 700 branca, faixa amarela).

| URL | Title (≤60c) | Meta description | H1 |
|---|---|---|---|
| `/construcao-e-reforma/` | Consórcio para Construção e Reforma \| Santa Sophia | Construa ou reforme com consórcio Itaú: crédito liberado integralmente na conta após a contemplação, sem reembolso por etapas. Fale com a Santa Sophia. | Construção e reforma: o crédito integral na sua conta, no seu ritmo |
| `/quitacao-de-financiamento/` | Quitação de Financiamento com Consórcio \| Santa Sophia | Use a carta de crédito do consórcio imobiliário para quitar um financiamento ativo e trocar juros por taxa de administração. Análise com um especialista da Santa Sophia. | Quitação de financiamento imobiliário: troque os juros por uma taxa de administração |
| `/alavancagem-financeira/` | Alavancagem Financeira com Consórcio \| Santa Sophia | Estratégias de alavancagem patrimonial com consórcio: imóvel para locação, cessão de cota contemplada e seguro prestamista. Sem promessa de retorno. Fale com a Santa Sophia. | Alavancagem financeira: quando o consórcio é estratégia, não só compra |

Página/tipo: `RoutePage` ganha `"construction" | "payoff" | "leverage"`. Breadcrumb labels: "Construção e reforma", "Quitação de financiamento", "Alavancagem financeira".

Navbar — dropdown "Consórcios" passa a ter 7 itens em duas colunas no desktop: Imóveis · Construção e reforma · Quitação de financiamento · Veículos · Caminhões e pesados · Empresas · Alavancagem financeira. Footer: coluna "Consórcios" com os 7.

`llms.txt` e `sitemap.xml` (gerado) refletem as 15 rotas indexáveis.

## 2. Home — o que muda

**Hero (substituir os títulos; manter a lista de bens, os parágrafos e o Magno):**

- Eyebrow: `Santa Sophia Consórcios · Representante autorizada Itaú Consórcios`
- H1: `Construa e alavanque seu patrimônio com a solidez do Itaú e a inteligência da Santa Sophia.`
- H2 (logo abaixo, tipografia menor): `Seu próximo grande passo não precisa esperar.`
- Parágrafo-lede (novo, do `.docx`): `Esqueça os juros abusivos do financiamento tradicional. Tenha acesso às melhores estratégias de consórcio do mercado, prazos de até 240 meses e um plano desenhado sob medida para o seu momento de vida.`
- Chips de bens (manter) + acrescentar chips `Construção` e `Reforma`.
- Parágrafos v1 (manter): "O que muda tudo…", "É como você decide…", "A Santa Sophia conecta…", "E quem conduz essa jornada é Magno…".
- CTAs: primário WhatsApp `Falar com Magno Stiti` (variant `home-hero`); secundário link para `/simulacao-de-consorcio/` com texto `Simular meu plano ideal`.
- Selo Itaú (versão branca, `selo-itau-representante-branco`) no canto do hero, largura ~220px, `alt="Consórcio Itaú. Representante Autorizado"`.

**Faixa de confiança (nova, logo abaixo do hero, fundo `surface`, 4 itens em linha com ícone lucide):**
`17 anos no mercado de crédito` · `Representante autorizada Itaú Consórcios` · `Atendimento digital em todo o Brasil` · `Sistema regulado pelo Banco Central (Lei 11.795/2008)`

**AnswerBlock "Quem é a Santa Sophia?" (substituir o texto):**
`A Santa Sophia é uma consultoria especializada em consórcio e engenharia de crédito, representante autorizada Itaú Consórcios. Há 17 anos no mercado de crédito, nasceu em Ribeirão Preto (SP) e atende clientes de todo o Brasil de forma digital e consultiva.`
`Oferece soluções em consórcio para imóveis, construção e reforma, quitação de financiamento, veículos, caminhões e pesados, empresas e alavancagem patrimonial, conforme as modalidades disponíveis.`

**Seção nova "Por que Santa Sophia + Itaú?" (inserir depois de "Por que a Santa Sophia?", fundo claro, 4 cards com ícone):**
- Título: `A inteligência que protege e acelera a sua conquista.`
- Lede: `Como parceiros autorizados Itaú Consórcios, unimos a segurança de uma das maiores administradoras do país a um atendimento próximo e focado em resultado.`
- Card 1 — `Pré-análise cadastral antes da contratação`: `Verificamos a aprovação de crédito antes de você entrar no grupo. Isso mantém a inadimplência baixa e os lances mais competitivos para todos.`
- Card 2 — `Grupos selecionados e acompanhados`: `Acesso a uma das maiores carteiras de grupos do país, com leitura do histórico de assembleias antes de indicar onde você entra.`
- Card 3 — `Lance embutido consciente, de até 30%`: `Parte da própria carta pode compor o seu lance, dentro de um limite que não infla artificialmente os resultados do grupo.`
- Card 4 — `Segurança e transparência`: `Contratos regulados pelo Banco Central, sem juros, com fundo de reserva devolvido ao final do grupo e suporte da nossa equipe em toda a jornada.`
- Nota de rodapé da seção (texto pequeno): `Condições conforme regulamento do grupo e contrato de participação. A contemplação ocorre por sorteio ou lance e não tem prazo garantido.`

**Cards de segmento (`content/segments.ts`):** passar de 5 para 8 cards — Imóveis, Construção e reforma (ícone `HardHat`), Quitação de financiamento (`Landmark` ou `BadgePercent`), Veículos, Veículos pesados, Empresas, Alavancagem financeira (`TrendingUp`), Crédito (mantém, aponta para `/o-que-e-consorcio/`). Descrições novas:
- Construção e reforma: `Para construir em terreno próprio ou reformar, com o crédito liberado integralmente na sua conta.`
- Quitação de financiamento: `Para quem já paga um financiamento e quer trocar juros por taxa de administração.`
- Alavancagem financeira: `Para quem quer usar o consórcio como estratégia patrimonial, com orientação e sem promessa de retorno.`

Os demais blocos da home ficam como estão (O problema, Método, Por que a Santa Sophia, Magno, "Não sei se consórcio é para mim", Três verdades, CTA band, Brasil, FAQ resumido, CTA final).

## 3. `/quem-somos/` — reescrever

Ordem das seções:

1. PageHero — H1 `Quem é a Santa Sophia?`; lede: `Menos pressão comercial. Mais estratégia e diagnóstico.`
2. AnswerBlock GEO (substituir a resposta de "santa-sophia" em `GeoAnswers`): `A Santa Sophia é uma consultoria especializada em consórcio e engenharia de crédito, representante autorizada Itaú Consórcios, com 17 anos no mercado de crédito. Nasceu em Ribeirão Preto (SP) e atende todo o Brasil de forma digital.` Manter os outros GEO answers (oferta atualizada para citar construção, quitação e alavancagem).
3. Seção "A experiência Santa Sophia" (texto do `.docx`, literal):
   `Comprar um bem de alto valor não precisa significar pagar o dobro em juros ou tomar decisões no escuro. Há 17 anos, a Santa Sophia atua como uma consultoria especializada em engenharia financeira e alavancagem de crédito.`
   `Como parceiros autorizados Itaú Consórcios, unimos a segurança da maior administradora do país a um atendimento próximo e focado em resultados. Não vendemos parcelas: analisamos seus objetivos, mapeamos os grupos mais vantajosos e acompanhamos sua jornada da contratação ao faturamento do seu bem.`
   Ao lado: foto da equipe (`press/equipe-santa-sophia`), legenda `Equipe Santa Sophia, Ribeirão Preto (SP).`
4. Seção "A origem do nome" (fundo navy, do guia):
   `A Santa Sophia nasce da união de dois pilares: o respeito ao legado familiar — uma homenagem à mãe do fundador — e a busca pela sabedoria, do grego Sophia.`
   `No mercado financeiro, sabedoria não é conhecimento teórico. É a capacidade de aplicar a matemática e a segurança jurídica para proteger o patrimônio das famílias. A Santa Sophia não foi criada para ser mais uma corretora de consórcios, e sim uma boutique de engenharia financeira.`
   Subtítulo `Nossa missão: ser o guardião financeiro dos nossos clientes` + dois itens: `O ralo de juros dos financiamentos bancários tradicionais.` · `O amadorismo e as falsas promessas de vendedores de cotas sem preparo técnico.` (introduzidos por "Protegemos famílias e investidores contra duas armadilhas:")
5. Seção "Não vendemos sorte" (dois pilares do guia, cards lado a lado):
   - `O anti-vendedor` — `O mercado de consórcios foi manchado por promessas irreais de contemplação rápida. Aqui, a conversa é sóbria, clara e técnica: não vendemos sorte, estruturamos projetos de crédito baseados em estatística, liquidez e matemática.`
   - `Acesso direto à fonte` — `Enquanto a maioria das corretoras vende opções de prateleira, a Santa Sophia opera com um Contrato Master Brasil junto ao Itaú Consórcios, o que permite negociar condições diretamente com a administradora e selecionar grupos com liquidez e baixa inadimplência.`
6. Seção "Por que Santa Sophia + Itaú?" — reutilizar o componente da home.
7. Seção "Blindagem jurídica e segurança" (do guia):
   `Análise de risco: toda liberação de crédito é respaldada por análise técnica de certidões, para que o imóvel adquirido ou o projeto executado seja juridicamente perfeito.`
   `Transparência contratual: o cliente sabe quais são as regras do grupo, os custos administrativos e a probabilidade estatística do seu projeto.`
   Manter o parágrafo v1 sobre Banco Central / Lei 11.795 / ABAC.
8. Seção "Na mídia" — dois recortes (`revide-na-contramao-da-crise`, `revide-oportunidade-de-investimento`) em cards com legenda: `Revista Revide, Ribeirão Preto — "Na contramão da crise" (2017)` e `Revista Revide, Ribeirão Preto — "Oportunidade de investimento" (2016)`. Imagens com `loading="lazy"`, `width/height`, alt descritivo.
9. Seção "Atendimento em todo o Brasil" (manter v1).
10. `MagnoCard` + CtaBand (manter).

## 4. `/magno-stiti-de-paula/` — complementar

- Manter tudo da v1. Trocar a foto (automático via `MagnoPortrait`).
- Inserir, logo após o bloco do retrato, a seção "Trajetória" (fundo `surface`), com uma linha do tempo de 4 marcos:
  - `Início no consórcio` — `Começou no mercado de consórcios ainda jovem, em uma administradora ligada a uma montadora, onde aprendeu as regras do sistema por dentro.`
  - `Formação` — `Bacharel em Direito e administrador de empresas, especializou-se em crédito imobiliário — a base da leitura jurídica e financeira que faz de cada operação.`
  - `Santa Sophia, Ribeirão Preto` — `Fundou a Santa Sophia em Ribeirão Preto (SP), atendendo famílias, investidores e construtoras. Em 2011, foi sócio-fundador de um correspondente Caixa que se tornou referência no interior paulista.`
  - `Consultoria digital para todo o Brasil` — `Hoje concentra a atuação no crédito por consórcio, como representante autorizado Itaú Consórcios, com atendimento 100% digital de onde o cliente estiver.`
- Seção "Na mídia" com o recorte `revide-magno-andre` (foto) e legenda `Revista Revide, Ribeirão Preto (2017).`
- `personJsonLd`: acrescentar `alumniOf` não (sem dado), acrescentar `hasOccupation` opcional não. Apenas ampliar `knowsAbout` com "Construção e reforma por consórcio", "Quitação de financiamento imobiliário", "Alavancagem patrimonial", "Crédito imobiliário".

## 5. Páginas de segmento existentes — complementar (sem remover o que existe)

`/consorcio-de-imoveis/`: antes do FAQ, seção "O que dá para fazer com a carta de crédito imobiliária" com lista: `Imóveis residenciais, comerciais, industriais e rurais;` `Terrenos, lotes, chácaras e fazendas;` `Construção e reforma estrutural, incluindo custos de documentação (ITBI, escritura e registro);` `Quitação de financiamento imobiliário em andamento;` `Galpões, sedes empresariais e salas comerciais.` + parágrafo: `A carta de crédito é corrigida anualmente pelo INCC, o que preserva o poder de compra do grupo até a contemplação. Prazos de até 240 meses, conforme o grupo.` + links para `/construcao-e-reforma/` e `/quitacao-de-financiamento/`. Também um AnswerBlock "Financiamento libera 100%?": `No financiamento bancário, o crédito costuma ficar limitado a uma parte do valor do imóvel e a uma parte menor ainda no caso de terrenos. No consórcio imobiliário, a carta pode cobrir até 100% do valor do projeto, conforme as regras do grupo e a avaliação do bem.`

`/consorcio-de-veiculos/`: ampliar o H2 "Consórcio de motos" com `Das scooters elétricas urbanas às motos de alta cilindrada, novas ou usadas.` e acrescentar H2 "Como a parcela acompanha o bem": `As parcelas acompanham a valorização do bem pela tabela FIPE (ou FIAT, para veículos da montadora), pelo IPCA ou por taxa pré-fixada, conforme as condições do grupo. Prazos de 12 a 120 meses.` e H2 "Faturamento": `Após a contemplação e a aprovação do cadastro, o faturamento do veículo costuma ser ágil — em muitos casos em até 48 horas úteis após a formalização, conforme a administradora.`

`/consorcio-de-caminhoes/`: acrescentar H2 "Agronegócio e maquinário": `Tratores, colheitadeiras e máquinas agrícolas também podem ser adquiridos por consórcio, assim como vans, ônibus, implementos rodoviários e frotas de entrega. Aeronaves e embarcações dependem de aprovação em comitê da administradora.`

`/consorcio-para-empresas/`: acrescentar H2 "Máquinas estacionárias e expansão": `Injetoras, sopradoras, linhas de produção e outros equipamentos fixos ao piso fabril entram na modalidade imobiliária, com alienação do bem em garantia. Filiais, galpões e sedes também. Alavancagem de CPF e CNPJ, conforme análise da administradora.`

`/o-que-e-consorcio/`: acrescentar seção "5 erros que colocam o consorciado numa fria" (lista ordenada, do manual, sem citar concorrentes pelo nome):
1. `Administradora com poucas opções de grupos` — `Com poucos grupos na modalidade que você precisa, as chances ficam limitadas e, se precisar compor o crédito com mais de uma cota, você concorre consigo mesmo.`
2. `Taxa "barata" sem fundo de reserva` — `Sem fundo de reserva, o grupo fica desprotegido contra inadimplência e as contemplações travam. No Itaú, o fundo é devolvido ao final, corrigido.`
3. `Lance embutido acima de 30%` — `Limites altos inflam os lances do grupo e empurram a média para patamares que só se alcançam com muito dinheiro do bolso.`
4. `Promessa de contemplação ou data garantida` — `É prática ilícita. A Santa Sophia trabalha com estatística, leitura do grupo e transparência contratual — nunca com promessa.`
5. `Contratação sem critério` — `Vender para quem não consegue faturar o bem depois de contemplado trava o crédito do grupo inteiro. A pré-análise cadastral evita isso.`

## 6. Páginas novas — copy integral

### `/construcao-e-reforma/`
- PageHero: H1 acima; lede `Da compra do terreno à casa pronta: o crédito imobiliário sem a armadilha dos juros.`
- AnswerBlock "Construção e reforma por consórcio, em resumo": `Com o consórcio imobiliário Itaú é possível construir em terreno próprio ou reformar. Após a contemplação, a aprovação do projeto e o alvará, o crédito é liberado integralmente na conta corrente do consorciado.` / `Você constrói por empreitada, no seu ritmo, sem depender de reembolsos condicionados a vistorias por etapa.`
- H2 `Formato Itaú: 100% do crédito na conta` — dois cards: `100% do dinheiro na conta` (`Após a contemplação, aprovação do projeto e alvará, o crédito é liberado integralmente na sua conta corrente.`) e `Sem reembolso picado` (`Você não depende de vistorias de engenharia a cada etapa da obra. Negocie materiais à vista e mantenha a equipe focada.`)
- H2 `O que é preciso` — lista: `Terreno próprio e quitado, que fica alienado em garantia;` `Projeto aprovado na prefeitura;` `Alvará de construção expedido;` `Cadastro aprovado na análise de crédito após a contemplação.`
- H2 `Construir para vender` — `Uma estratégia usada por construtores e investidores: entregar o imóvel pronto e transferir o consórcio ao comprador final, com custo menor que um financiamento novo, conforme as regras de cessão da administradora.`
- H2 `FGTS na construção` — `O FGTS pode ser usado para ofertar lance ou complementar o crédito em imóvel residencial, seguindo as regras da Caixa Econômica Federal, inclusive na construção em terreno próprio.` + link para FAQ.
- MethodSteps (reuso), CtaBand (mensagem: `Olá, Magno. Quero entender como construir ou reformar usando consórcio.`), FaqAccordion relacionado (`construcao-reforma`, `fgts-lance`, `como-funciona-contemplacao`) + disclaimer.

### `/quitacao-de-financiamento/`
- Lede: `Troque os juros do seu financiamento por uma taxa de consórcio e reduza o custo total do imóvel.`
- AnswerBlock "Dá para quitar financiamento com consórcio?": `Sim. A carta de crédito do consórcio imobiliário pode ser usada para quitar um financiamento ativo em seu nome. Você substitui os juros do financiamento pela taxa de administração do consórcio, diluída nas parcelas.` / `O ganho depende do saldo devedor, do prazo restante e das condições do grupo — por isso a análise é feita caso a caso por um especialista.`
- H2 `Como funciona, passo a passo` (lista ordenada): `Diagnóstico do financiamento atual: saldo, prazo, taxa e garantia.` `Contratação de uma cota compatível com o saldo devedor.` `Estratégia de lance para antecipar a contemplação, conforme o histórico do grupo.` `Com a carta contemplada, quitação do financiamento e transferência da garantia para o consórcio.`
- H2 `Para quem faz sentido` — `Para quem tem um financiamento em andamento, consegue planejar a operação e quer reduzir o custo total do imóvel. Não é solução para quem precisa do crédito imediatamente.`
- CtaBand (`Olá, Magno. Tenho um financiamento imobiliário e quero avaliar a quitação por consórcio.`), FAQ relacionado (`consorcio-ou-financiamento`, `como-funciona-lance`, `carta-de-credito`), disclaimer.

### `/alavancagem-financeira/`
- Lede: `Uma estratégia de patrimônio, renda e proteção — com orientação e sem promessa de retorno.`
- ComplianceNote específico no topo (caixa amarela): `Consórcio não é investimento com rentabilidade garantida. As estratégias abaixo são possibilidades de uso do crédito contemplado, sujeitas às regras da administradora, do grupo e do contrato. Nenhum resultado é prometido.`
- AnswerBlock "O que é alavancagem financeira com consórcio?": `É usar o crédito do consórcio como ferramenta de estratégia patrimonial, e não apenas para comprar um bem. Isso inclui adquirir um imóvel para locação, ceder uma cota contemplada a terceiros ou manter o crédito no grupo enquanto ele é atualizado.` / `Cada caminho tem regras próprias e riscos. A Santa Sophia orienta qual faz sentido para o seu momento.`
- H2 `Três caminhos` — cards:
  - `Renda com aluguel` — `Comprar um imóvel urbano pelo consórcio e colocá-lo para locação. O aluguel pode cobrir parte ou a totalidade das parcelas, conforme o mercado e o imóvel.`
  - `Cessão de cota contemplada` — `Quem é contemplado e não usa o crédito pode ceder a cota a outro interessado, com as regras de transferência da administradora. É uma operação de mercado, com valor e prazo variáveis.`
  - `Crédito contemplado mantido no grupo` — `Enquanto a carta contemplada não é usada, o saldo é atualizado conforme as regras da administradora. Sem promessa de rentabilidade.`
- H2 `Cotas contempladas` — `A compra e venda de cotas já contempladas é uma alternativa para quem quer usar o crédito sem esperar sorteio ou lance. O custo é maior que o de um consórcio em formação, e a Santa Sophia conecta quem quer vender a quem busca antecipar o objetivo.` CTA `Quero conhecer cotas contempladas disponíveis` (WhatsApp).
- H2 `Seguro prestamista (MIP)` — `Opcional na adesão. Em caso de morte ou invalidez permanente, o seguro quita o saldo devedor e o bem ou crédito fica com a família. O custo é diluído nas parcelas e deve ser avaliado caso a caso.`
- CtaBand (`Olá, Magno. Quero entender as estratégias de alavancagem com consórcio.`), FAQ relacionado (`carta-de-credito`, `como-funciona-contemplacao`, `posso-cancelar`), disclaimer.

## 7. FAQ — acrescentar 18 perguntas do FAQ Itaú (`content/faq.ts`)

Nova categoria `FaqCategory`: acrescentar `"contratacao"` (label "Contratação e pós-venda"). Novas entradas (id · categoria · pergunta · resposta), copy do `.docx`, com ajuste só onde havia número comercial:

1. `quais-bens` · imoveis · `Quais bens posso adquirir com o consórcio Itaú?` · `Imóveis urbanos (residenciais, comerciais e terrenos), construção e reforma estrutural, veículos leves novos ou usados, motos (inclusive elétricas), e veículos pesados como caminhões, vans, ônibus e implementos rodoviários. Também é possível usar o crédito para quitar um financiamento já existente em seu nome.`
2. `quem-pode-contratar` · contratacao · `Quem pode contratar um consórcio?` · `Qualquer pessoa maior de 18 anos (ou emancipada), correntista Itaú ou não, com o crédito aprovado em análise. Pessoas jurídicas também podem contratar.`
3. `como-simular` · contratacao · `Como faço uma simulação?` · `Preencha o formulário no site com seus dados e o bem que deseja adquirir. Um especialista da Santa Sophia entra em contato para apresentar as melhores opções de carta de crédito e grupo para o seu perfil, sem compromisso.`
4. `preciso-ser-itau` · contratacao · `Preciso ser cliente do Itaú para contratar?` · `Não. Correntistas podem contratar pelo app ou site do Itaú; quem não é correntista contrata por meio da simulação com um especialista Santa Sophia, representante autorizado Itaú Consórcios.`
5. `tempo-contemplacao` · consorcio · `Quanto tempo leva para eu ser contemplado?` · `Não há prazo garantido: a contemplação depende de sorteio mensal ou da oferta de um lance vencedor em assembleia. Todos os participantes em dia com as parcelas são contemplados até o encerramento do grupo — a estratégia de lance pode ajudar a antecipar esse momento.`
6. `taxa-administracao` · consorcio · `O que é a taxa de administração?` · `É o percentual cobrado sobre o valor da carta de crédito para remunerar a administradora pela gestão do grupo. Está descrita no contrato e é diluída ao longo das parcelas — sem surpresas. O percentual varia por grupo e prazo; um especialista informa o valor vigente.`
7. `parcela-muda` · consorcio · `Minha parcela pode mudar ao longo do consórcio?` · `Sim. As parcelas são reajustadas periodicamente para preservar o poder de compra do grupo. Em imóveis, o reajuste segue o INCC no mês de aniversário do grupo; em veículos, pode seguir a tabela FIPE/FIAT, o IPCA ou uma taxa pré-fixada, conforme definido em contrato.`
8. `composicao-parcela` · consorcio · `O que compõe o valor da minha parcela?` · `Fundo comum (o valor da carta de crédito), fundo de reserva (garantia de segurança financeira do grupo, devolvido ao final se não utilizado), taxa de administração e, opcionalmente, seguro prestamista.`
9. `fgts-lance` · imoveis · `Posso usar o FGTS para dar um lance?` · `Sim, exclusivamente em cartas de imóvel residencial e seguindo as regras da Caixa Econômica Federal, incluindo a exigência de não possuir outro imóvel em seu nome. É necessário comprovar o saldo em até 5 dias úteis após a contemplação.`
10. `fui-contemplado` · contratacao · `Fui contemplado — e agora?` · `Você recebe uma carta e um e-mail (e, em caso de lance, também um telegrama) com a confirmação. É preciso efetuar o pagamento do lance, quando aplicável, em até 5 dias úteis, passar por nova análise de crédito e enviar a documentação necessária para dar início ao processo de compra do bem.`
11. `posso-cancelar` · contratacao · `Posso cancelar meu consórcio?` · `Sim. Nos primeiros 7 dias após a contratação, o cancelamento garante a devolução integral do valor pago. Após esse prazo, o valor contribuído ao fundo comum é devolvido por meio de sorteios de desistentes ou no encerramento do grupo, descontadas eventuais multas contratuais.`
12. `alternativas-cancelamento` · contratacao · `Existem alternativas ao cancelamento?` · `Sim — você pode reduzir o valor da carta de crédito, transferir a cota para outra pessoa interessada (cessão de cota) ou revender a cota por meio de um parceiro especializado. A Santa Sophia pode te orientar sobre a opção mais vantajosa para o seu caso.`
13. `direto-itau-ou-santa-sophia` · contratacao · `Qual a diferença entre contratar direto com o Itaú ou com a Santa Sophia?` · `A Santa Sophia é representante autorizada Itaú Consórcios: você tem exatamente a mesma solidez, as mesmas condições contratuais e a mesma segurança do Itaú, somadas a um atendimento consultivo, próximo e especializado, que te ajuda a escolher o grupo, a estratégia de lance e o momento certo de agir — do início ao fim da sua jornada.`
14. `lance-embutido` · consorcio · `O que é lance embutido?` · `É a possibilidade de usar parte da própria carta de crédito como lance, sem desembolsar esse valor do bolso. No Itaú, o lance embutido é limitado a 30% do crédito, um limite que protege o grupo e mantém as médias de lance equilibradas. O valor embutido é abatido da carta na contemplação.`
15. `lance-fixo` · consorcio · `Como funciona o lance fixo?` · `É uma modalidade em que o percentual do lance é definido pelo regulamento do grupo, e a contemplação entre os que ofertam o lance fixo pode ocorrer por sorteio. Pode ser combinado com lance embutido e recursos próprios ou FGTS, conforme as regras do grupo.`
16. `seguro-prestamista` · contratacao · `O que é o seguro prestamista?` · `É um seguro opcional, diluído nas parcelas, que quita o saldo devedor em caso de morte ou invalidez permanente do consorciado, entregando o bem ou o crédito à família. Deve ser avaliado caso a caso.`
17. `construir-terreno-proprio` · imoveis · `Posso construir em terreno próprio com o consórcio?` · `Sim. Com terreno quitado, projeto aprovado e alvará, o crédito contemplado é liberado integralmente na conta do consorciado, sem reembolso por etapas de obra. O terreno fica alienado em garantia até a quitação.`
18. `quitar-financiamento` · imoveis · `Posso usar o consórcio para quitar meu financiamento?` · `Sim. A carta de crédito do consórcio imobiliário pode quitar um financiamento ativo em seu nome, substituindo os juros bancários pela taxa de administração diluída. A vantagem depende do saldo, do prazo e do grupo — e é avaliada caso a caso.`

Manter `FAQ_DISCLAIMER`. Atualizar `segmentFaq` para as novas rotas (`construction`, `payoff`, `leverage`) e ampliar `real-estate.items` com `construir-terreno-proprio` e `quitar-financiamento`. A página `/perguntas-frequentes/` ganha a âncora "Contratação e pós-venda".

## 8. Rodapé, contato, SEO

- Rodapé: selo Itaú branco (largura 180px) ao lado do logo; linha de CNPJ `Santa Sophia Consórcios · CNPJ 05.046.442/0001-92 · Representante autorizada Itaú Consórcios` no bloco de direitos reservados.
- `organizationJsonLd`: `foundingDate: "2009"`, `slogan: "Consórcio com estratégia. Crédito com propósito."`, `description` (a mesma do AnswerBlock), `knowsAbout` (lista de serviços), `memberOf` **não** (sem confirmação de ABAC). `Person`: acrescentar `description` curta.
- `ContactForm`: novas opções do select — `Moradia (casa, apartamento, terreno)`, `Construção ou reforma`, `Quitação de financiamento`, `Veículo (carro ou moto)`, `Caminhões, pesados e frota`, `Empresa (máquinas, equipamentos, expansão)`, `Alavancagem patrimonial`, `Outro objetivo`. Valor concatenado na mensagem como hoje.
- `/simulacao-de-consorcio/`: adicionar lista ordenada "Como funciona a simulação" (do `.docx`): `Preencha o formulário com seus dados de contato.` `Escolha o tipo de bem ou objetivo.` `Informe o valor de crédito ou de parcela que cabe no seu planejamento.` `Receba de um especialista a comparação das cartas e grupos mais adequados ao seu perfil.` `Decida com calma — a contratação só acontece com você acompanhado.`
- `llms.txt`: reescrever a linha-resumo com a nova descrição, listar as 15 rotas e citar Itaú, 17 anos, Ribeirão Preto, construção, quitação, alavancagem.
- README: seção "Foto do Magno" atualizada (nova origem 853×1280, limite 420px), lista de rotas, nota sobre os assets de imprensa e o vídeo não usado.

## 9. Critérios de aceite

1. `npm run check` limpo; `npm test` verde (atualizar `tests/unit/seo.test.ts` para 15 rotas indexáveis e `faq.test.ts` para as novas categorias).
2. `npm run build && npm run start`: cada rota nova responde 200 com H1 único, `<title>`, canonical, ≥1 JSON-LD; `sitemap.xml` com 15 `<loc>`.
3. `grep -rniE "dinheiro r[áa]pido" dist/public --include='*.html' | grep -viE "não é dinheiro r[áa]pido"` vazio; `grep -rniE "1,1% ao m|150%|400%|tempo recorde|contempla[çc][ãa]o garantida" dist/public --include='*.html'` vazio.
4. Nenhum endereço (grep por `Mantiqueira`, `Vergueiro`, `Ipanema`, `CEP`) no build.
5. Contraste: amarelo/laranja nunca como texto sobre branco (mesmas regras da v1).
6. Lighthouse mobile nas 3 rotas novas e na home ≥ 90/95/95/95.

## 10. Evidência de execução (08/09/2026)

`npm run check` limpo · `npm test` 39/39 · build com JS inicial de 110 KB gzip (orçamento 250 KB) · sitemap com 15 rotas · 301 nas rotas sem barra · 404 real · greps de compliance da seção 9 vazios.

Lighthouse 13.4.1, mobile, build de produção em localhost:

| Rota | Perf | A11y | BP | SEO |
|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 |
| `/construcao-e-reforma/` | 97 | 100 | 100 | 100 |
| `/quitacao-de-financiamento/` | 95 | 100 | 100 | 100 |
| `/alavancagem-financeira/` | 97 | 100 | 100 | 100 |
| `/quem-somos/` | 96 | 100 | 100 | 100 |

Desvios registrados na implementação: as OG novas usam o logo horizontal (consistência com as 11 existentes); a frase v1 "Você não precisa ter todo o dinheiro hoje…" ficou como primeiro parágrafo do hero; `/quem-somos/` perdeu a seção v1 "Porque crédito sem estratégia é apenas crédito" (continua na home); o lede de `/quitacao-de-financiamento/` trocou "economize anos de parcelas" por "reduza o custo total do imóvel" (compliance). Os recortes da Revide são imagens de imprensa de 2016–2017 e mostram, em texto pequeno, taxas citadas pela revista na época; não são afirmação do site.
