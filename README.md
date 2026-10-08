# Santa Sophia Consórcios

Site institucional pré-renderizado da Santa Sophia Consórcios, desenvolvido com React, Vite, Tailwind CSS e Express.

## Desenvolvimento

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
npm run dev
```

O servidor de desenvolvimento usa a porta `5000`. Para validar a versão estática de produção:

```bash
npm run build
npm run start
```

Use `PORT` para alterar a porta do servidor, por exemplo `PORT=5055 npm run start`.

## Deploy

1. Instale as dependências com `npm ci`.
2. Configure as variáveis de ambiente necessárias.
3. Execute `npm run check` e `npm run build`.
4. Inicie a aplicação com `npm run start`.

O build gera o servidor em `dist/index.cjs` e uma página HTML pré-renderizada por rota em `dist/public/`. O processo Node precisa ter permissão de escrita em `data/` quando `DATABASE_URL` não estiver configurada.

O servidor escuta em `0.0.0.0` na porta `PORT` (padrão `5000`). Em produção ele fica atrás de um proxy reverso, que termina o TLS e encaminha para essa porta.

### VPS (Hostinger)

O alvo de produção é uma VPS com Node.js 20+, Nginx como proxy reverso e certificado Let's Encrypt. O runbook completo — primeiro deploy, atualização, verificação e diagnóstico — está em [`deploy/README.md`](deploy/README.md), junto com a unit systemd e o server block do Nginx prontos para copiar.

Atualização, em resumo:

```bash
cd /var/www/santasophia
sudo -u santasophia git pull
sudo -u santasophia npm ci
sudo -u santasophia npm run check && sudo -u santasophia npm run build
sudo systemctl restart santasophia
```

Como as variáveis `VITE_` são incorporadas ao bundle, **o build precisa rodar depois de o `.env` existir**. Trocar um valor `VITE_` exige novo `npm run build` — reiniciar o serviço não basta.

## Variáveis de ambiente

Todas são opcionais: o site sobe sem nenhuma delas, degradando funcionalidade de forma previsível.

- `PORT`: porta do servidor HTTP. O padrão é `5000`.
- `TRUST_PROXY`: número de proxies confiáveis à frente da aplicação. Defina `1` atrás de Nginx ou CDN para o rate-limit enxergar o IP real do visitante.
- `VITE_GA_ID`: ID de medição do Google Analytics 4, por exemplo `G-XXXXXXXXXX`. O GA4 só é carregado no build de produção quando esta variável existe. **Ainda não configurado** — sem ele o site não tem analytics.
- `VITE_GSC_VERIFICATION`: token de verificação do Google Search Console inserido nas páginas durante o build. **Não é necessário neste projeto**: a verificação do domínio é feita por registro DNS. A variável continua suportada caso a verificação por meta tag venha a ser preferida.
- `DATABASE_URL`: conexão PostgreSQL usada para armazenar contatos. Sem ela, os contatos são gravados em `data/contact-messages.jsonl`.
- `SMTP_HOST`: host do servidor SMTP. O padrão é `smtp.gmail.com`.
- `SMTP_PORT`: porta SMTP. O padrão é `587`.
- `SMTP_USER`: usuário e remetente SMTP. Sem esta variável, o contato é salvo sem envio de e-mail.
- `SMTP_PASS`: senha ou token do usuário SMTP.
- `CONTACT_EMAIL`: destinatário dos formulários. O padrão é `contato@santasophiaconsorcios.com.br`.

Variáveis iniciadas por `VITE_` são incorporadas ao build. Portanto, devem estar configuradas antes de executar `npm run build`.

## Auditoria de compliance

A frase aprovada “Consórcio não é dinheiro rápido” é uma negação informativa. A auditoria exclui somente essa formulação e continua apontando ocorrências afirmativas:

```bash
grep -rniE "dinheiro r[áa]pido" dist/public --include='*.html' | grep -viE "não é dinheiro r[áa]pido"
```

## Rotas

O registro único das rotas é `client/src/seo/routes.ts`. Ele alimenta o roteador (`client/src/appRouteRegistry.tsx`), o pré-render e o `sitemap.xml`. São 16 rotas: 15 indexáveis e `/404/` com `noindex`. Todas usam barra final, inclusive nos links internos.

| URL | Página |
|---|---|
| `/` | Home |
| `/consorcio-de-imoveis/` | Consórcio de imóveis |
| `/construcao-e-reforma/` | Construção e reforma |
| `/quitacao-de-financiamento/` | Quitação de financiamento |
| `/consorcio-de-veiculos/` | Consórcio de veículos |
| `/consorcio-de-caminhoes/` | Consórcio de caminhões e pesados |
| `/consorcio-para-empresas/` | Consórcio para empresas |
| `/alavancagem-financeira/` | Alavancagem financeira |
| `/o-que-e-consorcio/` | Guia do sistema de consórcios |
| `/quem-somos/` | Quem somos |
| `/magno-stiti-de-paula/` | Magno Stiti de Paula |
| `/perguntas-frequentes/` | Hub de FAQ |
| `/simulacao-de-consorcio/` | Simulação |
| `/fale-com-um-especialista/` | Contato |
| `/politica-de-privacidade/` | Privacidade |
| `/404/` | Página não encontrada (noindex) |

Cada rota indexável tem uma imagem OpenGraph 1200×630 em `client/public/og/`, no mesmo padrão navy: fundo `#061240` com o arco do símbolo em marca-d'água, logo horizontal branco, filete `#FFC82B`, título em Plus Jakarta Sans e assinatura amarela.

## URLs do site antigo

Antes deste site o domínio hospedava um WordPress, e o Google continua rastreando o que conheceu dele. `server/legacy.ts` responde essas URLs em produção:

- **301** para a página nova quando há equivalente (ex.: `/consorcio-imoveis/` → `/consorcio-de-imoveis/`, posts antigos sobre construção → `/construcao-e-reforma/`);
- **410** para o que não volta: `/wp-*`, feeds, `/author/`, `/search/`, `?s=`/`?p=`, páginas demo do tema e `cgi-sys/`.

Além disso, `/404/` acessada direto responde 404 (não 200) e `/rota/index.html` redireciona para `/rota/`. Os casos estão em `tests/api/legacy.api.test.ts`. Ao descobrir outra URL antiga no Search Console, acrescente-a em `REDIRECTS` ou nos padrões de 410.

## Foto do Magno

A foto aprovada já está integrada em `client/src/components/site/MagnoPortrait.tsx`, servida como `<picture>` com WebP e JPEG a partir de `client/src/assets/brand/`. O componente define dimensões explícitas, texto alternativo descritivo, `loading="lazy"` na home e `fetchpriority="high"` na página do Magno.

O arquivo atual tem 853×1066 (recorte 4:5 do original vertical entregue em setembro de 2026, que substituiu a versão de 300×375). Com essa resolução o retrato suporta o `max-w-[420px]` do componente sem amolecer em tela retina. Se a origem mudar de novo, substitua `magno.jpg` e `magno.webp` em `assets/brand/` e reavalie o limite junto com o `width`/`height` do `img`.

Não use foto de banco de imagens ou imagem não aprovada.

## Selo Itaú e assets de imprensa

`client/src/assets/brand/selo-itau-representante.{png,webp}` (traço escuro, para fundo claro) e `selo-itau-representante-branco.{png,webp}` (para fundo navy) são o selo "Consórcio Itaú. Representante Autorizado", da própria administradora. O componente `ItauSeal` escolhe a arte pela prop `on="light" | "dark"` e mantém o mesmo texto alternativo.

`client/src/assets/press/` guarda a foto da equipe e três recortes de reportagens da revista Revide (Ribeirão Preto, 2016–2018):

- `equipe-santa-sophia.{jpg,webp}` — usada em `/quem-somos/` com legenda genérica. A foto é de 2019 e **ninguém é nomeado**: não se sabe quem segue na empresa.
- `revide-na-contramao-da-crise.{jpg,webp}` e `revide-oportunidade-de-investimento.{jpg,webp}` — seção "Na mídia" de `/quem-somos/`.
- `revide-magno-andre.{jpg,webp}` — seção "Na mídia" de `/magno-stiti-de-paula/`.

As legendas citam veículo, cidade e ano; não reproduzem o texto das matérias. Os recortes foram cortados acima do rodapé das páginas originais porque ali havia endereço físico, que o cliente decidiu não publicar em lugar nenhum.

O vídeo "Feed Consórcio construção" recebido junto com esses insumos **não é usado**: traz a marca antiga ("Santa Sophia Negócios Imobiliários", logo magenta) e a promessa "sem juros em tempo recorde", que contraria a regra de nunca prometer prazo de contemplação. Fica registrado aqui caso o cliente decida regravar.
