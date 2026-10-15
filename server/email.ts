import nodemailer from "nodemailer";

/**
 * Entrega dos leads do formulário.
 *
 * Dois caminhos, nesta ordem:
 *   1. **Resend**, se `RESEND_API_KEY` estiver definida — HTTP puro, sem porta SMTP.
 *   2. **SMTP** via nodemailer, se `SMTP_USER` estiver definida.
 *
 * O lead já foi gravado por `routes.ts` antes de chegar aqui: uma falha de envio
 * não custa o contato, só o aviso.
 *
 * Remetente: o Resend só entrega de domínio verificado na conta. O domínio da
 * Santa Sophia não está verificado lá, então o padrão sai de `sintetiza.ai` (que
 * está) e o `reply_to` aponta para o visitante — responder no cliente de e-mail
 * fala direto com ele. Para enviar do domínio próprio, verificar o domínio no
 * Resend e sobrescrever `MAIL_FROM`.
 */

const REMETENTE_PADRAO = "Site Santa Sophia Consórcios <nao-responda@sintetiza.ai>";
const DESTINO_PADRAO = "leads@santasophiaconsorcios.com.br";

interface ContactData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const destino = () => process.env.CONTACT_EMAIL || DESTINO_PADRAO;
const remetente = () => process.env.MAIL_FROM || REMETENTE_PADRAO;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildMessage(data: ContactData) {
  const safe = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    email: escapeHtml(data.email),
    message: escapeHtml(data.message),
  };

  const subject = `Novo contato pelo site — ${data.name}`;
  const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #E2E6F0;border-radius:12px">
        <h2 style="color:#0A1D62;margin-bottom:24px">Nova mensagem para a Santa Sophia</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top;width:100px">Nome</td><td style="padding:8px 12px">${safe.name}</td></tr>
          <tr style="background:#F5F7FC"><td style="padding:8px 12px;font-weight:bold;vertical-align:top">Telefone</td><td style="padding:8px 12px">${safe.phone}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">E-mail</td><td style="padding:8px 12px"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
          <tr style="background:#F5F7FC"><td style="padding:8px 12px;font-weight:bold;vertical-align:top">Mensagem</td><td style="padding:8px 12px;white-space:pre-line">${safe.message}</td></tr>
        </table>
        <p style="margin-top:24px;font-size:12px;color:#51607F">Enviado pelo formulário do site Santa Sophia Consórcios.</p>
      </div>
    `;
  const text = [
    "Nova mensagem para a Santa Sophia",
    "",
    `Nome: ${data.name}`,
    `Telefone: ${data.phone}`,
    `E-mail: ${data.email}`,
    "",
    "Mensagem:",
    data.message,
    "",
    "— Enviado pelo formulário do site Santa Sophia Consórcios.",
  ].join("\n");

  return { subject, html, text };
}

async function viaResend(data: ContactData) {
  const { subject, html, text } = buildMessage(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: remetente(),
      to: [destino()],
      reply_to: data.email,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const detalhe = await res.text().catch(() => "");
    throw new Error(`Resend respondeu ${res.status}: ${detalhe.slice(0, 300)}`);
  }
}

async function viaSmtp(data: ContactData, smtpUser: string) {
  const { subject, html, text } = buildMessage(data);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM || `"Santa Sophia Consórcios" <${smtpUser}>`,
    to: destino(),
    replyTo: data.email,
    subject,
    html,
    text,
  });
}

export async function sendContactEmail(data: ContactData) {
  if (process.env.RESEND_API_KEY) {
    await viaResend(data);
    console.info("Contato enviado por e-mail via Resend.");
    return;
  }

  const smtpUser = process.env.SMTP_USER;
  if (smtpUser) {
    await viaSmtp(data, smtpUser);
    console.info("Contato enviado por e-mail via SMTP.");
    return;
  }

  console.info("RESEND_API_KEY e SMTP_USER ausentes; contato salvo sem envio de e-mail.");
}
