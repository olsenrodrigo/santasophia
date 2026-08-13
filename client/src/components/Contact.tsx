import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, MapPin, Phone, Mail } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Informacoes de contato (endereco, telefone, email)
 * - Placeholder da mensagem
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erro ao enviar");
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: MapPin, label: "Endereço", lines: ["Rua Exemplo, 123", "Sala 456 — Bairro", "Cidade/UF"] },
    { icon: Phone, label: "Contato", lines: ["Telefone: (XX) XXXX-XXXX", "WhatsApp: (XX) XXXXX-XXXX"] },
    { icon: Mail, label: "E-mail", lines: ["contato@seusite.com.br"] },
  ];

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid rgba(27,58,92,0.14)",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontFamily: "Montserrat, sans-serif",
    color: "#1B3A5C",
    backgroundColor: "#FAFAF8",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="py-14 md:py-20" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: "2rem", height: "1px", backgroundColor: "#5B8C9B", flexShrink: 0 }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#5B8C9B", fontFamily: "Montserrat, sans-serif" }}
            >
              Entre em Contato
            </span>
          </div>
          <h2
            className="mb-3 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
          >
            Agende sua Consulta
          </h2>
          {/* WHITELABEL: Descricao */}
          <p
            className="text-base max-w-xl"
            style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
          >
            Atendimento particular. Entre em contato para agendar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl">

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* WHITELABEL: Informacoes de contato */}
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-lg p-5 border"
                style={{ borderColor: "rgba(27,58,92,0.08)" }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: "rgba(91,140,155,0.12)" }}
                >
                  <info.icon className="w-4 h-4" style={{ color: "#5B8C9B" }} />
                </div>
                <div>
                  <p
                    className="font-semibold mb-1 text-sm"
                    style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {info.label}
                  </p>
                  {info.lines.map((line, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed"
                      style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-8 md:p-10 border" style={{ borderColor: "rgba(27,58,92,0.08)" }}>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-14 h-14 mb-4" style={{ color: "#5B8C9B" }} />
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: "#1B3A5C", fontFamily: "Lora, Georgia, serif" }}
                  >
                    Mensagem Enviada!
                  </h4>
                  <p
                    className="mb-6 text-sm"
                    style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Entraremos em contato em breve.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 rounded-md border font-medium text-sm transition-colors cursor-pointer"
                    style={{ borderColor: "rgba(27,58,92,0.20)", color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                        style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                      >
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={inputStyle}
                        placeholder="Seu nome"
                        onFocus={(e) => (e.target.style.borderColor = "#5B8C9B")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,92,0.14)")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                        style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                      >
                        Telefone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={inputStyle}
                        placeholder="(XX) XXXXX-XXXX"
                        onFocus={(e) => (e.target.style.borderColor = "#5B8C9B")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,92,0.14)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                      style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      placeholder="seu@email.com"
                      onFocus={(e) => (e.target.style.borderColor = "#5B8C9B")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,92,0.14)")}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                      style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                    >
                      Mensagem
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ ...inputStyle, resize: "none" }}
                      placeholder="Como podemos ajudá-lo(a)?"
                      onFocus={(e) => (e.target.style.borderColor = "#5B8C9B")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,92,0.14)")}
                    />
                  </div>

                  {status === "error" && (
                    <p
                      className="text-sm"
                      style={{ color: "#dc2626", fontFamily: "Montserrat, sans-serif" }}
                    >
                      Ocorreu um erro ao enviar. Tente novamente.
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-8 py-3.5 text-white rounded-md font-medium flex items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer disabled:opacity-70 text-sm"
                    style={{ backgroundColor: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {status === "loading" ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                    ) : (
                      <>Enviar Mensagem <Send size={16} /></>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
