import nodemailer from "nodemailer";

interface ContactData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendContactEmail(data: ContactData) {
  const smtpUser = process.env.SMTP_USER;
  if (!smtpUser) {
    console.info("SMTP_USER ausente; contato salvo sem envio de e-mail.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: process.env.SMTP_PASS,
    },
  });
  const to = process.env.CONTACT_EMAIL || "contato@santasophiaconsorcios.com.br";
  const safe = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    email: escapeHtml(data.email),
    message: escapeHtml(data.message),
  };

  await transporter.sendMail({
    from: `"Santa Sophia Consórcios" <${smtpUser}>`,
    to,
    replyTo: data.email,
    subject: `Novo contato pelo site — ${data.name}`,
    html: `
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
    `,
  });
}
