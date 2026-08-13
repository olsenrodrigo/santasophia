import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Titulo e descricao da secao
 * - Lista de especialidades/servicos
 * - CTA text
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

export default function Services() {
  /* WHITELABEL: Lista de servicos oferecidos */
  const services = [
    "Serviço ou especialidade 1",
    "Serviço ou especialidade 2",
    "Serviço ou especialidade 3",
    "Serviço ou especialidade 4",
    "Serviço ou especialidade 5",
    "Serviço ou especialidade 6",
    "Serviço ou especialidade 7",
    "Serviço ou especialidade 8",
    "Serviço ou especialidade 9",
  ];

  return (
    <section id="services" className="py-14 md:py-20" style={{ backgroundColor: "#F0EDE9" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — left-aligned para variar do padrao centrado */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: "2rem", height: "1px", backgroundColor: "#5B8C9B", flexShrink: 0 }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#5B8C9B", fontFamily: "Montserrat, sans-serif" }}
              >
                Especialidades
              </span>
            </div>
            {/* WHITELABEL: Titulo */}
            <h2
              className="leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
            >
              Especialidades e Serviços
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-end"
          >
            {/* WHITELABEL: Descricao */}
            <p
              className="text-base leading-relaxed max-w-xl"
              style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
            >
              Atendimento completo com foco em diagnóstico preciso, prevenção e qualidade de vida.
              Cada consulta é conduzida com atenção individualizada e baseada em evidências.
            </p>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="flex items-center gap-3 bg-white rounded-md px-4 py-3.5 border"
              style={{ borderColor: "rgba(27,58,92,0.08)" }}
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#5B8C9B" }} />
              <span
                className="text-sm font-medium"
                style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
              >
                {service}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA — mais simples e elegante */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 pt-10 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ borderColor: "rgba(27,58,92,0.12)" }}
        >
          <div>
            {/* WHITELABEL: CTA titulo */}
            <h3
              className="text-xl md:text-2xl font-bold mb-1"
              style={{ color: "#1B3A5C", fontFamily: "Lora, Georgia, serif" }}
            >
              Sua saúde não pode esperar
            </h3>
            {/* WHITELABEL: CTA descricao */}
            <p className="text-sm" style={{ color: "#5A6A78", fontFamily: "Montserrat, sans-serif" }}>
              Atendimento particular com consultas dedicadas e orientação clara.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="flex-shrink-0 px-7 py-3.5 text-white rounded-md font-medium hover:shadow-md transition-all cursor-pointer text-sm"
            style={{ backgroundColor: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Agendar Consulta
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
