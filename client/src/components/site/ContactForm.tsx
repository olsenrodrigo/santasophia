import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  phone: z.string().trim().min(8, "Informe um telefone válido."),
  email: z.string().trim().email("Informe um e-mail válido."),
  objective: z.enum(["Imóveis", "Veículos", "Pesados", "Empresas", "Outro"]),
  message: z.string().trim().min(2, "Conte brevemente o seu objetivo."),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const defaultValues: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  objective: "Imóveis",
  message: "",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("idle");
    try {
      await apiRequest("POST", "/api/contact", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: `Objetivo: ${data.objective}\n\n${data.message}`,
      });
      trackEvent("form_submit", { page: window.location.pathname, objective: data.objective });
      setStatus("success");
      reset(defaultValues);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-xl border border-border bg-background p-6 shadow-card md:p-8" noValidate>
      <div>
        <Label htmlFor="contact-name">Nome</Label>
        <Input id="contact-name" autoComplete="name" className="mt-2" aria-invalid={Boolean(errors.name)} {...register("name")} />
        {errors.name ? <p className="mt-1 text-sm text-destructive">{errors.name.message}</p> : null}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="contact-phone">Telefone</Label>
          <Input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" className="mt-2" aria-invalid={Boolean(errors.phone)} {...register("phone")} />
          {errors.phone ? <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="contact-email">E-mail</Label>
          <Input id="contact-email" type="email" autoComplete="email" className="mt-2" aria-invalid={Boolean(errors.email)} {...register("email")} />
          {errors.email ? <p className="mt-1 text-sm text-destructive">{errors.email.message}</p> : null}
        </div>
      </div>
      <div>
        <Label htmlFor="contact-objective">Objetivo</Label>
        <Controller
          name="objective"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="contact-objective" className="mt-2 w-full"><SelectValue placeholder="Selecione seu objetivo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Imóveis">Imóveis</SelectItem>
                <SelectItem value="Veículos">Veículos</SelectItem>
                <SelectItem value="Pesados">Caminhões e veículos pesados</SelectItem>
                <SelectItem value="Empresas">Empresas</SelectItem>
                <SelectItem value="Outro">Outro objetivo</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="contact-message">Mensagem</Label>
        <Textarea id="contact-message" rows={5} className="mt-2" aria-invalid={Boolean(errors.message)} placeholder="Conte o que você quer conquistar e em quanto tempo gostaria de realizar." {...register("message")} />
        {errors.message ? <p className="mt-1 text-sm text-destructive">{errors.message.message}</p> : null}
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
