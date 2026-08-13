import { motion } from "framer-motion";
import { Stethoscope, Activity, AlertCircle, Scissors } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Titulo e descricao da secao
 * - Lista de tratamentos/procedimentos
 * - Icones adequados a especialidade
 * - Nota de rodape
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

export default function Treatments() {
  /* WHITELABEL: Lista de tratamentos */
  const treatments = [
    { icon: Stethoscope, text: "Tratamento ou procedimento 1" },
    { icon: Activity, text: "Tratamento ou procedimento 2" },
    { icon: Scissors, text: "Tratamento ou procedimento 3" },
    { icon: Stethoscope, text: "Tratamento ou procedimento 4" },
    { icon: Activity, text: "Tratamento ou procedimento 5" },
    { icon: Scissors, text: "Tratamento ou procedimento 6" },
  ];

  return (
    <section id="treatments" className="py-14 md:py-20" style={{ backgroundColor: "#F0EDE9" }}>
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
              Tratamentos
            </span>
          </div>
          {/* WHITELABEL: Titulo */}
          <h2
            className="mb-3 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
          >
            Tratamentos e Procedimentos
          </h2>
          {/* WHITELABEL: Descricao */}
          <p
            className="text-base max-w-2xl"
            style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
          >
            Procedimentos realizados com técnicas atualizadas, visando precisão e melhor recuperação.
          </p>
        </motion.div>

        {/* Treatments grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mb-10">
          {treatments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 bg-white rounded-md px-5 py-4 border"
              style={{ borderColor: "rgba(27,58,92,0.08)" }}
            >
              <div
                className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center"
                style={{ backgroundColor: "rgba(91,140,155,0.10)" }}
              >
                <item.icon className="w-4 h-4" style={{ color: "#5B8C9B" }} />
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
              >
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Nota informativa */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-3 max-w-3xl p-5 rounded-md border"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", borderColor: "rgba(91,140,155,0.20)" }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#5B8C9B" }} />
          {/* WHITELABEL: Nota */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
          >
            A indicação de tratamento é feita após avaliação médica criteriosa, sempre com decisão
            compartilhada e orientação clara ao paciente.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
