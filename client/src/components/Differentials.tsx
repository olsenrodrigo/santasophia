import { motion } from "framer-motion";
import { GraduationCap, Eye, Heart, Globe } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Titulo e subtitulo
 * - Cards de diferenciais (icone, titulo, descricao)
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

export default function Differentials() {
  /* WHITELABEL: Diferenciais do profissional */
  const differentials = [
    {
      icon: GraduationCap,
      title: "Formação de excelência",
      description:
        "Formação acadêmica sólida em universidade de referência, com especializações e atualização contínua na área de atuação.",
    },
    {
      icon: Eye,
      title: "Decisão com responsabilidade",
      description:
        "Cada indicação é feita com critério, evitando excessos e priorizando o que realmente é necessário para o paciente.",
    },
    {
      icon: Heart,
      title: "Cuidado individualizado e contínuo",
      description:
        "Acompanhamento próximo em todas as etapas, da primeira consulta ao pós-operatório ou seguimento de longo prazo.",
    },
    {
      icon: Globe,
      title: "Abordagem integrada da saúde",
      description:
        "Visão que considera não apenas a doença, mas o paciente como um todo, incluindo hábitos, estilo de vida e qualidade de vida.",
    },
  ];

  return (
    <section id="differentials" className="py-14 md:py-20" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered header com linha decorativa */}
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
              Por que escolher
            </span>
            <div style={{ height: "1px", width: "3rem", backgroundColor: "#5B8C9B", opacity: 0.5 }} />
          </div>

          {/* WHITELABEL: Titulo */}
          <h2
            className="mb-3 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
          >
            Diferenciais do Atendimento
          </h2>

          {/* WHITELABEL: Subtitulo */}
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "#5A6A78", fontFamily: "Montserrat, sans-serif" }}
          >
            Um cuidado que vai além do diagnóstico.
          </p>
        </motion.div>

        {/* Differentials — layout alternado horizontal */}
        <div className="max-w-4xl mx-auto divide-y" style={{ borderColor: "rgba(27,58,92,0.08)" }}>
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col sm:flex-row gap-5 py-8 first:pt-0 last:pb-0"
            >
              {/* Number + icon */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 flex-shrink-0" style={{ width: "4.5rem" }}>
                <span
                  className="text-3xl font-bold leading-none"
                  style={{ color: "rgba(91,140,155,0.25)", fontFamily: "Lora, Georgia, serif" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(91,140,155,0.10)" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "#5B8C9B" }} />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#1B3A5C", fontFamily: "Lora, Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
