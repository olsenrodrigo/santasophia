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

## Variáveis de ambiente

- `VITE_GA_ID`: ID de medição do Google Analytics 4, por exemplo `G-XXXXXXXXXX`. O GA4 só é carregado no build de produção quando esta variável existe.
- `VITE_GSC_VERIFICATION`: token de verificação do Google Search Console inserido nas páginas durante o build.
- `DATABASE_URL`: conexão PostgreSQL usada para armazenar contatos. Sem ela, os contatos são gravados em `data/contact-messages.jsonl`.
- `SMTP_HOST`: host do servidor SMTP. O padrão é `smtp.gmail.com`.
- `SMTP_PORT`: porta SMTP. O padrão é `587`.
- `SMTP_USER`: usuário e remetente SMTP. Sem esta variável, o contato é salvo sem envio de e-mail.
- `SMTP_PASS`: senha ou token do usuário SMTP.
- `CONTACT_EMAIL`: destinatário dos formulários. O padrão é `contato@santasophiaconsorcios.com.br`.

Variáveis iniciadas por `VITE_` são incorporadas ao build. Portanto, devem estar configuradas antes de executar `npm run build`.

## Foto do Magno

O site usa o símbolo da Santa Sophia como fallback gráfico. Quando a foto aprovada estiver disponível:

1. salve-a como `client/src/assets/brand/magno.jpg`;
2. abra `client/src/components/site/MagnoCard.tsx`;
3. siga o comentário `PONTO DE TROCA`, importando a foto e substituindo apenas a imagem do símbolo;
4. mantenha dimensões explícitas, texto alternativo descritivo e `loading="lazy"`.

Não use foto de banco de imagens ou imagem não aprovada.
