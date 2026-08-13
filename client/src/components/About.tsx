import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Briefcase, IdCard, Building2 } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Nome e titulo do medico
 * - Biografia completa
 * - Lista de credenciais
 * - Foto do profissional (substituir bloco de placeholder)
 * - Indicadores numericos
 * - Frase de posicionamento
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

export default function About() {
  /* WHITELABEL: Credenciais do profissional */
  const credentials = [
    { icon: Briefcase, text: "X anos de experiência médica" },
    { icon: Award, text: "Título de Especialista em [área]" },
    { icon: BookOpen, text: "Subespecialização em [área]" },
    { icon: GraduationCap, text: "Formado(a) pela [universidade]" },
    { icon: Building2, text: "Atendimento em centros de referência" },
    { icon: IdCard, text: "CRM XXXXXX/UF" },
  ];

  return (
    <section id="about" className="py-14 md:py-20" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: "2rem", height: "1px", backgroundColor: "#5B8C9B", flexShrink: 0 }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#5B8C9B", fontFamily: "Montserrat, sans-serif" }}
              >
                Sobre o Especialista
              </span>
            </div>

            {/* WHITELABEL: Nome do profissional */}
            <h2
              className="mb-1 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
            >
              Dr(a). Nome Sobrenome
            </h2>

            <p
              className="text-base mb-7 font-medium"
              style={{ color: "#5B8C9B", fontFamily: "Montserrat, sans-serif" }}
            >
              {/* WHITELABEL: Subtitulo / especialidade */}
              Medicina com propósito, técnica e humanidade
            </p>

            {/* WHITELABEL: Paragrafos de biografia */}
            <div className="space-y-4 mb-8">
              <p className="leading-relaxed" style={{ color: "#3C4A58" }}>
                <strong style={{ color: "#1B3A5C" }}>Dr(a). Nome Sobrenome</strong> é médico(a) especialista em{" "}
                <strong style={{ color: "#1B3A5C" }}>[especialidade]</strong>, com sólida formação acadêmica e
                atuação focada em um cuidado responsável, atualizado e individualizado.
              </p>
              <p className="leading-relaxed" style={{ color: "#3C4A58" }}>
                Formado(a) pela <strong style={{ color: "#1B3A5C" }}>[universidade]</strong>, realizou residência
                médica em <strong style={{ color: "#1B3A5C" }}>[especialidade]</strong> e subespecialização em{" "}
                <strong style={{ color: "#1B3A5C" }}>[área]</strong>. Possui ampla experiência clínica e cirúrgica.
              </p>
              <p className="leading-relaxed" style={{ color: "#3C4A58" }}>
                Com <strong style={{ color: "#1B3A5C" }}>X anos de atuação</strong>, trabalha com atenção às
                particularidades de cada caso, priorizando o diálogo, a clareza das informações e a tomada de
                decisão compartilhada com o paciente.
              </p>
            </div>

            {/* Credentials grid */}
            <div className="grid sm:grid-cols-2 gap-2.5">
              {credentials.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg p-3 border"
                  style={{ borderColor: "rgba(27,58,92,0.10)", backgroundColor: "rgba(91,140,155,0.04)" }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: "rgba(91,140,155,0.10)" }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: "#5B8C9B" }} />
                  </div>
                  <span
                    className="text-sm font-medium leading-tight"
                    style={{ color: "#1C2B39", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Photo / placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* WHITELABEL: Substituir por foto do profissional */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ aspectRatio: "4/5", background: "linear-gradient(160deg, #EEF4F7 0%, #E0EBF0 100%)", maxHeight: "480px" }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(91,140,155,0.15)" }}
                >
                  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#5B8C9B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-center" style={{ color: "#5B8C9B", fontFamily: "Montserrat, sans-serif" }}>
                  Foto do(a) Profissional
                </p>
                <p className="text-xs text-center mt-1" style={{ color: "#8A9BAB", fontFamily: "Montserrat, sans-serif" }}>
                  Substituir por foto profissional
                </p>
              </div>
            </div>

            {/* Credential badge — dentro do fluxo, não absoluto */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 bg-white rounded-lg p-4 mt-4 border"
              style={{ borderColor: "rgba(27,58,92,0.08)" }}
            >
              <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1B3A5C" }}>
                <Award className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}>CRM XXXXXX/UF</p>
                <p className="text-xs" style={{ color: "#5A6A78", fontFamily: "Montserrat, sans-serif" }}>Especialista Certificado</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 pt-12 border-t"
          style={{ borderColor: "rgba(27,58,92,0.10)" }}
        >
          {/* WHITELABEL: Indicadores numericos */}
          {[
            { value: "X anos", label: "de experiência na especialidade" },
            { value: "N especializações", label: "Área 1, Área 2, Área 3" },
            { value: "Formação", label: "Universidade de referência" },
          ].map((item, index) => (
            <div key={index} className="text-center md:text-left">
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "#1B3A5C", fontFamily: "Lora, Georgia, serif" }}
              >
                {item.value}
              </div>
              <div className="text-sm" style={{ color: "#5A6A78", fontFamily: "Montserrat, sans-serif" }}>
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Positioning quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 py-12 px-8 md:px-16 text-center border-t border-b"
          style={{ borderColor: "rgba(27,58,92,0.10)" }}
        >
          {/* WHITELABEL: Frase de posicionamento */}
          <blockquote
            className="text-2xl md:text-3xl font-bold italic max-w-3xl mx-auto mb-8 leading-relaxed"
            style={{ color: "#1B3A5C", fontFamily: "Lora, Georgia, serif" }}
          >
            "Frase de posicionamento do profissional aqui."
          </blockquote>
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3.5 text-white rounded-md font-medium hover:shadow-md transition-all cursor-pointer"
            style={{ backgroundColor: "#1B3A5C", fontFamily: "Montserrat, sans-serif", fontSize: "0.875rem" }}
          >
            Agendar minha consulta
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
