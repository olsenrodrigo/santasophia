import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Texto do eyebrow (especialidade)
 * - Titulo principal (use <em> para o termo em itálico/destaque)
 * - Nome e subtitulo do profissional
 * - Descricao
 * - Estatisticas (valor + label)
 * - Foto: substituir o bloco SVG pelo bloco de img comentado abaixo
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

interface HeroProps {
  scrollToSection?: (section: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const goTo = (id: string) => {
    if (scrollToSection) scrollToSection(id);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      id="hero"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(130deg, #F5F2EE 0%, #FAFAF8 60%, #EDF3F6 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 w-1/2 h-full"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(91,140,155,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Thin top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #5B8C9B 35%, #5B8C9B 65%, transparent 100%)",
            opacity: 0.3,
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ paddingTop: "5.5rem", paddingBottom: "3.5rem" }}
      >
        {/*
          Grid: 1 coluna até xl (1280px).
          A partir de xl, divide em [1fr 260px].
          Isso evita overflow horizontal em telas médias (1024-1279px).
        */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] xl:gap-12 xl:items-center">

          {/* Coluna esquerda: conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div
                aria-hidden="true"
                style={{ width: "1.75rem", height: "1px", backgroundColor: "#5B8C9B", flexShrink: 0 }}
              />
              {/* WHITELABEL: Especialidade */}
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#5B8C9B", fontFamily: "Montserrat, sans-serif" }}
              >
                Medicina Especializada
              </span>
            </div>

            {/* WHITELABEL: Headline */}
            <h1
              className="mb-4 leading-tight"
              style={{
                fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)",
                fontFamily: "Lora, Georgia, serif",
                fontWeight: 700,
                color: "#1B3A5C",
              }}
            >
              Atendimento com{" "}
              <em style={{ color: "#5B8C9B", fontStyle: "italic" }}>técnica</em>{" "}
              e cuidado
            </h1>

            {/* WHITELABEL: Nome e titulo do profissional */}
            <p
              className="text-sm font-semibold mb-1.5 tracking-wide"
              style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
            >
              Dr(a). Nome — Especialidade Médica
            </p>

            {/* WHITELABEL: Descricao */}
            <p
              className="text-sm mb-7 leading-relaxed"
              style={{ color: "#5A6A78", fontFamily: "Montserrat, sans-serif", maxWidth: "38rem" }}
            >
              Profissional com ampla experiência e formação sólida, dedicado(a) a
              oferecer um atendimento humanizado, baseado em evidências científicas e
              focado na qualidade de vida do paciente.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              {/* WHITELABEL: Botao primario */}
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                onClick={() => goTo("contact")}
                className="group flex items-center gap-2 px-6 py-3 text-white font-medium text-sm rounded-md transition-all hover:shadow-md cursor-pointer"
                style={{ backgroundColor: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
              >
                <Calendar size={15} />
                Agendar Consulta
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                onClick={() => goTo("about")}
                className="flex items-center gap-2 px-6 py-3 font-medium text-sm rounded-md border transition-all cursor-pointer"
                style={{
                  borderColor: "rgba(27,58,92,0.35)",
                  color: "#1B3A5C",
                  backgroundColor: "transparent",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Conheça o Especialista
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-x-8 gap-y-4 mt-8 pt-6 border-t"
              style={{ borderColor: "rgba(27,58,92,0.10)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* WHITELABEL: Indicadores numericos */}
              {[
                { value: "10+", label: "Anos de experiência" },
                { value: "3", label: "Especializações" },
                { value: "USP", label: "Formação acadêmica" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-xl sm:text-2xl font-bold leading-tight"
                    style={{ color: "#1B3A5C", fontFamily: "Lora, Georgia, serif" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs mt-0.5"
                    style={{ color: "#5A6A78", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Coluna direita: ilustração SVG — aparece somente em telas xl+ */}
          <motion.div
            className="hidden xl:flex items-center justify-center"
            style={{ width: "260px", height: "260px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            aria-hidden="true"
          >
            {/*
              WHITELABEL: Substituir por foto do profissional quando disponivel:

              import fotoMedico from "../assets/images/doctor-portrait.jpg";

              <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
                <img src={fotoMedico} alt="Dr(a). Nome" className="w-full h-full object-cover object-top" />
              </div>
            */}
            <svg
              viewBox="0 0 260 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle cx="130" cy="130" r="118" stroke="#1B3A5C" strokeWidth="0.7" opacity="0.09" />
              <circle cx="130" cy="130" r="92" stroke="#1B3A5C" strokeWidth="0.7" opacity="0.11" />
              <circle cx="130" cy="130" r="66" stroke="#5B8C9B" strokeWidth="1.1" opacity="0.20" />
              <circle cx="130" cy="130" r="40" stroke="#5B8C9B" strokeWidth="1.5" opacity="0.25" />
              <rect x="121" y="100" width="18" height="60" rx="5" fill="#5B8C9B" opacity="0.14" />
              <rect x="100" y="121" width="60" height="18" rx="5" fill="#5B8C9B" opacity="0.14" />
              <path
                d="M6 130 L50 130 L65 83 L84 177 L101 115 L117 130 L143 130 L157 97 L172 162 L187 130 L254 130"
                stroke="#1B3A5C"
                strokeWidth="1.1"
                opacity="0.11"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="130" cy="12" r="2.5" fill="#5B8C9B" opacity="0.28" />
              <circle cx="248" cy="130" r="2.5" fill="#5B8C9B" opacity="0.28" />
              <circle cx="130" cy="248" r="2.5" fill="#5B8C9B" opacity="0.28" />
              <circle cx="12" cy="130" r="2.5" fill="#5B8C9B" opacity="0.28" />
              <path d="M220 40 L236 40 L236 56" stroke="#1B3A5C" strokeWidth="1" opacity="0.13" fill="none" strokeLinecap="round" />
              <path d="M40 40 L24 40 L24 56" stroke="#1B3A5C" strokeWidth="1" opacity="0.13" fill="none" strokeLinecap="round" />
              <path d="M220 220 L236 220 L236 204" stroke="#1B3A5C" strokeWidth="1" opacity="0.13" fill="none" strokeLinecap="round" />
              <path d="M40 220 L24 220 L24 204" stroke="#1B3A5C" strokeWidth="1" opacity="0.13" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
