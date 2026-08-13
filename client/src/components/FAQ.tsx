import { motion } from "framer-motion";
import { Star } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Depoimentos de pacientes (texto, nome, tipo de atendimento)
 * - CTA de agendamento
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

export default function FAQ() {
  /* WHITELABEL: Depoimentos */
  const testimonials = [
    {
      text: "Depoimento de paciente 1. Descreva a experiência positiva com o atendimento.",
      name: "Paciente",
      detail: "Tipo de atendimento",
      initial: "P",
    },
    {
      text: "Depoimento de paciente 2. Descreva a experiência positiva com o atendimento.",
      name: "Paciente",
      detail: "Tipo de atendimento",
      initial: "P",
    },
    {
      text: "Depoimento de paciente 3. Descreva a experiência positiva com o atendimento.",
      name: "Paciente",
      detail: "Tipo de atendimento",
      initial: "P",
    },
  ];

  return (
    <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: "#EEF4F7" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div style={{ height: "1px", width: "3rem", backgroundColor: "#5B8C9B", opacity: 0.5 }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#5B8C9B", fontFamily: "Montserrat, sans-serif" }}
            >
              Depoimentos
            </span>
            <div style={{ height: "1px", width: "3rem", backgroundColor: "#5B8C9B", opacity: 0.5 }} />
          </div>

          <h2
            className="mb-3 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
          >
            O que dizem os pacientes
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "#5A6A78", fontFamily: "Montserrat, sans-serif" }}
          >
            {/* WHITELABEL: Subtitulo */}
            Histórias reais de quem confiou seu cuidado ao(à) Dr(a). Nome.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-7 border relative"
              style={{ borderColor: "rgba(27,58,92,0.08)" }}
            >
              {/* Oversized quote mark */}
              <div
                className="text-7xl leading-none font-bold mb-1"
                style={{ color: "rgba(91,140,155,0.15)", fontFamily: "Georgia, serif", lineHeight: 1 }}
              >
                &ldquo;
              </div>

              <p
                className="text-sm leading-relaxed mb-6 -mt-3"
                style={{ color: "#3C4A58", fontFamily: "Montserrat, sans-serif" }}
              >
                {item.text}
              </p>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 fill-current" style={{ color: "#5B8C9B" }} />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: "#1B3A5C", fontFamily: "Lora, Georgia, serif" }}
                >
                  {item.initial}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#5B8C9B", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA — navy background */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl px-10 py-12 text-center text-white"
          style={{ backgroundColor: "#1B3A5C" }}
        >
          {/* WHITELABEL: CTA titulo */}
          <h3
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "#FFFFFF", fontFamily: "Lora, Georgia, serif" }}
          >
            Pronto(a) para cuidar da sua saúde?
          </h3>
          <div
            className="flex flex-wrap justify-center gap-3 mb-8 text-sm"
            style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Montserrat, sans-serif" }}
          >
            <span>Atendimento particular</span>
            <span style={{ opacity: 0.4 }}>·</span>
            {/* WHITELABEL: Localizacao */}
            <span>Localização em São Paulo</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="px-7 py-3.5 rounded-md font-medium hover:shadow-lg transition-all cursor-pointer text-sm"
            style={{ backgroundColor: "#5B8C9B", color: "#FFFFFF", fontFamily: "Montserrat, sans-serif" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Agendar consulta agora
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
