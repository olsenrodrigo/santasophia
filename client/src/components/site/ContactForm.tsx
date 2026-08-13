import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const objective = String(fields.get("objective") ?? "");

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fields.get("name") ?? ""),
          phone: String(fields.get("phone") ?? ""),
          email: String(fields.get("email") ?? ""),
          message: `Objetivo: ${objective}\n\n${String(fields.get("message") ?? "")}`,
          website: String(fields.get("website") ?? ""),
        }),
      });
      if (!response.ok) throw new Error(`Falha no envio: ${response.status}`);

      trackEvent("form_submit", { page: window.location.pathname, objective });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-border bg-background p-6 shadow-card md:p-8">
      {/*
        Honeypot: invisível e fora da ordem de tabulação para quem usa o site;
        bots que preenchem tudo caem nele e o servidor descarta o envio.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Não preencha este campo</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <Label htmlFor="contact-name">Nome</Label>
        <Input id="contact-name" name="name" autoComplete="name" minLength={2} required className="mt-2" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="contact-phone">Telefone</Label>
          <Input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" minLength={8} required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="contact-email">E-mail</Label>
          <Input id="contact-email" name="email" type="email" autoComplete="email" required className="mt-2" />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-objective">Objetivo</Label>
        <select id="contact-objective" name="objective" defaultValue="Imóveis" required className="mt-2 flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <option value="Imóveis">Imóveis</option>
          <option value="Veículos">Veículos</option>
          <option value="Pesados">Caminhões e veículos pesados</option>
          <option value="Empresas">Empresas</option>
          <option value="Outro">Outro objetivo</option>
        </select>
      </div>
      <div>
        <Label htmlFor="contact-message">Mensagem</Label>
        <Textarea id="contact-message" name="message" rows={5} minLength={2} required className="mt-2" placeholder="Conte o que você quer conquistar e em quanto tempo gostaria de realizar." />
      </div>
      <Button type="submit" disabled={isSubmitting} className="min-h-12 w-full bg-cta font-bold text-primary hover:bg-highlight md:w-auto">
        {isSubmitting ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : <Send className="size-5" aria-hidden="true" />}
        {isSubmitting ? "Enviando..." : "Enviar para análise"}
      </Button>
      <div aria-live="polite">
        {status === "success" ? <p className="rounded-md bg-surface p-4 font-medium text-primary">Mensagem enviada. A equipe Santa Sophia entrará em contato pelos dados informados.</p> : null}
        {status === "error" ? <p className="rounded-md border border-destructive p-4 text-destructive">Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.</p> : null}
      </div>
    </form>
  );
}
