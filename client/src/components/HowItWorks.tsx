import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Titulo e descricao da secao
 * - Topicos de conteudo educativo (titulo + descricao)
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

export default function HowItWorks() {
  /* WHITELABEL: Topicos de conteudo educativo */
  const topics = [
    {
      title: "Tópico educativo 1",
      description: "Descrição breve sobre o tema, explicando ao paciente de forma acessível e clara.",
    },
    {
      title: "Tópico educativo 2",
      description: "Descrição breve sobre o tema, explicando ao paciente de forma acessível e clara.",
    },
    {
      title: "Tópico educativo 3",
      description: "Descrição breve sobre o tema, explicando ao paciente de forma acessível e clara.",
    },
    {
      title: "Tópico educativo 4",
      description: "Descrição breve sobre o tema, explicando ao paciente de forma acessível e clara.",
    },
    {
      title: "Tópico educativo 5",
      description: "Descrição breve sobre o tema, explicando ao paciente de forma acessível e clara.",
    },
    {
      title: "Tópico educativo 6",
      description: "Descrição breve sobre o tema, explicando ao paciente de forma acessível e clara.",
    },
  ];

  return (
    <section id="how-it-works" className="py-14 md:py-20" style={{ backgroundColor: "#FFFFFF" }}>
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
              Conteúdo Educativo
            </span>
          </div>
          {/* WHITELABEL: Titulo */}
          <h2
            className="mb-3 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
          >
            O que você precisa saber
          </h2>
          {/* WHITELABEL: Descricao */}
          <p
            className="text-base max-w-2xl"
            style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
          >
            Informação de qualidade para cuidar melhor da sua saúde.
          </p>
        </motion.div>

        {/* Topics grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="group flex flex-col gap-4 p-6 rounded-lg border bg-white transition-shadow hover:shadow-sm"
              style={{ borderColor: "rgba(27,58,92,0.08)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-2xl font-bold leading-none"
                  style={{ color: "rgba(91,140,155,0.30)", fontFamily: "Lora, Georgia, serif" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: "rgba(91,140,155,0.10)" }}
                >
                  <BookOpen className="w-4 h-4" style={{ color: "#5B8C9B" }} />
                </div>
              </div>

              <div>
                <h4
                  className="text-base font-bold mb-2"
                  style={{ color: "#1B3A5C", fontFamily: "Lora, Georgia, serif" }}
                >
                  {topic.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
                >
                  {topic.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
