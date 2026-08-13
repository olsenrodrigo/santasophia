# Deploy na VPS (Hostinger)

Runbook do primeiro deploy e das atualizações seguintes. Os arquivos deste diretório são modelos: copie-os para os caminhos do sistema, não aponte o systemd nem o Nginx para dentro do repositório.

| Arquivo | Destino na VPS |
|---|---|
| `santasophia.service` | `/etc/systemd/system/santasophia.service` |
| `nginx.conf` | `/etc/nginx/sites-available/santasophia` |
| `../.env.example` | base para `/var/www/santasophia/.env` |

O runbook assume instalação em `/var/www/santasophia`, aplicação rodando na porta `5000` e domínio `santasophiaconsorcios.com.br`. Ajuste os três se o seu caso for outro.

## Pré-requisitos

- Ubuntu com acesso root por SSH.
- Node.js 20 ou superior (`node -v` para confirmar).
- Nginx e certbot instalados.
- DNS do domínio já apontando para o IP da VPS — o certbot valida por HTTP e falha se o DNS ainda não propagou.

## Primeiro deploy

**1. Usuário de serviço e diretório.** A aplicação não roda como root.

```bash
sudo adduser --system --group --home /var/www/santasophia santasophia
sudo -u santasophia git clone https://github.com/olsenrodrigo/santasophia.git /var/www/santasophia
```

**2. Variáveis de ambiente.** Precisa existir antes do build: as variáveis `VITE_` entram no bundle.

```bash
sudo -u santasophia cp /var/www/santasophia/.env.example /var/www/santasophia/.env
sudo -u santasophia nano /var/www/santasophia/.env     # preencher
sudo chmod 600 /var/www/santasophia/.env
```

Defina no mínimo `PORT=5000` e `TRUST_PROXY=1`. `VITE_GA_ID` fica vazio até o cliente fornecer o ID do GA4.

**3. Build.**

```bash
cd /var/www/santasophia
sudo -u santasophia npm ci
sudo -u santasophia npm run check
sudo -u santasophia npm run build
```

**4. Diretório de dados.** Sem `DATABASE_URL`, os contatos vão para um arquivo JSONL. O `ProtectSystem=strict` da unit bloqueia escrita em todo lugar exceto neste caminho.

```bash
sudo -u santasophia mkdir -p /var/www/santasophia/data
sudo chmod 750 /var/www/santasophia/data
```

Esse diretório contém dado pessoal de leads. Não o inclua em backup público nem o exponha via Nginx (ele não é servido: o Express só publica `dist/public`).

**5. Serviço.**

```bash
sudo cp /var/www/santasophia/deploy/santasophia.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now santasophia
sudo systemctl status santasophia
curl -sI http://127.0.0.1:5000/ | head -1     # espera-se HTTP/1.1 200 OK
```

**6. Nginx e TLS.**

```bash
sudo cp /var/www/santasophia/deploy/nginx.conf /etc/nginx/sites-available/santasophia
sudo ln -s /etc/nginx/sites-available/santasophia /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

sudo certbot --nginx -d santasophiaconsorcios.com.br -d www.santasophiaconsorcios.com.br
```

O certbot reescreve o server block adicionando o TLS e o redirect de `:80` para `:443`. Confirme a renovação automática com `sudo certbot renew --dry-run`.

## Atualizações

```bash
cd /var/www/santasophia
sudo -u santasophia git pull
sudo -u santasophia npm ci
sudo -u santasophia npm run check && sudo -u santasophia npm run build
sudo systemctl restart santasophia
```

Rodar o `build` antes do `restart` deixa uma janela de segundos em que o `dist/` novo convive com o processo velho. Para um site institucional isso é aceitável; se incomodar, faça build em diretório paralelo e troque por symlink.

**Mudou uma variável `VITE_`?** Reiniciar não basta — refaça o build. Elas são incorporadas ao JavaScript no momento da compilação.

## Verificação pós-deploy

```bash
curl -sI https://santasophiaconsorcios.com.br/                      # 200
curl -sI https://santasophiaconsorcios.com.br/consorcio-de-imoveis  # 301 com barra final
curl -sI https://santasophiaconsorcios.com.br/rota-inexistente      # 404
curl -s  https://santasophiaconsorcios.com.br/sitemap.xml | grep -c "<loc>"   # 12
curl -s  https://santasophiaconsorcios.com.br/ | grep -o "<h1[^>]*>[^<]*"     # H1 sem JS
```

Teste o formulário de contato de ponta a ponta e confirme se o e-mail chegou. Sem `SMTP_USER` configurado ele responde `201` e grava no JSONL sem notificar ninguém — o sucesso na tela não prova que o lead foi entregue.

## Diagnóstico

```bash
sudo journalctl -u santasophia -f          # log da aplicação
sudo journalctl -u santasophia -n 100      # últimas 100 linhas
sudo tail -f /var/log/nginx/error.log      # log do proxy
```

- **`502 Bad Gateway`**: o Node caiu ou está em outra porta. Confira `systemctl status santasophia` e se `PORT` no `.env` bate com o `proxy_pass`.
- **Serviço não sobe, log cita `EACCES` em `data/`**: o `ReadWritePaths` da unit e o dono do diretório precisam concordar.
- **Rate-limit bloqueando visitantes legítimos**: falta `TRUST_PROXY=1` no `.env` ou os cabeçalhos `X-Forwarded-For` no Nginx.
- **Alteração no site não aparece**: build não rodou, ou é variável `VITE_` que exige rebuild.
