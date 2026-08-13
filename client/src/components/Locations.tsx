import { motion } from "framer-motion";
import { MapPin, Clock, Users, Shield } from "lucide-react";

/*
 * WHITELABEL V2: Personalizar
 * - Titulo e descricao
 * - Features do consultorio
 * - Endereco completo
 * - Embed do Google Maps
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

export default function Locations() {
  /* WHITELABEL: Caracteristicas do consultorio */
  const features = [
    { icon: Shield, text: "Ambiente acolhedor e confortável" },
    { icon: Clock, text: "Consultas com tempo dedicado a cada paciente" },
    { icon: Users, text: "Equipe preparada para suporte em agendamentos" },
  ];

  return (
    <section id="locations" className="py-14 md:py-20" style={{ backgroundColor: "#F0EDE9" }}>
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
              Consultório
            </span>
          </div>
          {/* WHITELABEL: Titulo */}
          <h2
            className="mb-3 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
          >
            Consultório
          </h2>
          {/* WHITELABEL: Descricao */}
          <p
            className="text-base max-w-xl"
            style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
          >
            Um espaço pensado para oferecer conforto, privacidade e tranquilidade.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl">

          {/* Left: Features + address */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Feature list */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-4 bg-white rounded-md px-5 py-4 border"
                  style={{ borderColor: "rgba(27,58,92,0.08)" }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: "rgba(91,140,155,0.10)" }}
                  >
                    <feature.icon className="w-4 h-4" style={{ color: "#5B8C9B" }} />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 border"
              style={{ borderColor: "rgba(27,58,92,0.08)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: "#1B3A5C" }}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p
                    className="font-semibold mb-2"
                    style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif", fontSize: "0.875rem" }}
                  >
                    Endereço
                  </p>
                  {/* WHITELABEL: Endereco */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#4A5A68", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Rua Exemplo, 123<br />
                    Sala 456 — Bairro<br />
                    Cidade/UF
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: "rgba(27,58,92,0.08)", minHeight: "420px" }}
          >
            {/* WHITELABEL: Substituir pelo embed do Google Maps */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ minHeight: "420px", backgroundColor: "#EEF4F7" }}
            >
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 mx-auto mb-4" style={{ color: "#5B8C9B", opacity: 0.4 }} />
                <p
                  className="font-medium"
                  style={{ color: "#1B3A5C", fontFamily: "Montserrat, sans-serif", fontSize: "0.875rem" }}
                >
                  Google Maps
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "#5A6A78", fontFamily: "Montserrat, sans-serif" }}
                >
                  Substituir pelo embed do mapa
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
