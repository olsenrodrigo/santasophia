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

O alvo de produção é uma VPS com Node.js 20+, Nginx como proxy reverso e certificado Let's Encrypt.

Como as variáveis `VITE_` são incorporadas ao bundle, **o build precisa rodar depois de o `.env` existir**. Trocar um valor `VITE_` exige novo `npm run build`.

```bash
# na VPS, dentro do diretório da aplicação
git pull
npm ci
# criar/editar .env antes do build (ver "Variáveis de ambiente")
npm run check && npm run build
sudo systemctl restart santasophia
```

Pontos de atenção:

- **`TRUST_PROXY`**: defina como `1` quando houver Nginx ou CDN à frente. Sem isso o rate-limit de `/api/contact` enxerga o IP do proxy e todos os visitantes dividem o mesmo balde.
- **Escrita em `data/`**: sem `DATABASE_URL`, os contatos vão para `data/contact-messages.jsonl`. O usuário do serviço precisa de permissão de escrita nesse diretório, que contém dado pessoal — mantenha-o fora de backups públicos e do controle de versão (já está no `.gitignore`).
- **Nginx**: encaminhe para `http://127.0.0.1:5000` preservando `X-Forwarded-For` e `X-Forwarded-Proto`.
- **Processo**: use uma unit systemd (ou PM2) com `Restart=always` e `EnvironmentFile` apontando para o `.env`.

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

## Foto do Magno

A foto aprovada já está integrada em `client/src/components/site/MagnoPortrait.tsx`, servida como `<picture>` com WebP e JPEG a partir de `client/src/assets/brand/`. O componente define dimensões explícitas, texto alternativo descritivo, `loading="lazy"` na home e `fetchpriority="high"` na página do Magno.

O original tem 300×375, o que fixa o `max-w-[300px]` do componente: acima disso a imagem amolece em tela retina. Se um original em resolução maior for fornecido, substitua os dois arquivos em `assets/brand/` e relaxe esse limite.

Não use foto de banco de imagens ou imagem não aprovada.
