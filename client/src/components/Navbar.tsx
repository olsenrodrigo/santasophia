import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

/*
 * WHITELABEL V2: Personalizar
 * - Logo (texto ou imagem)
 * - Menu items (labels e ids)
 * - Links sociais (WhatsApp, Instagram, email)
 * - Cores: #1B3A5C (navy), #5B8C9B (teal)
 */

interface NavbarProps {
  activeSection?: string;
  scrollToSection?: (section: string) => void;
}

export default function Navbar({ activeSection = "hero", scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* WHITELABEL: Ajustar itens do menu */
  const menuItems = [
    { id: "about", label: "Sobre" },
    { id: "services", label: "Especialidades" },
    { id: "treatments", label: "Tratamentos" },
    { id: "differentials", label: "Diferenciais" },
    { id: "locations", label: "Consultório" },
    { id: "faq", label: "Depoimentos" },
    { id: "contact", label: "Contato" },
  ];

  const handleNav = (id: string) => {
    if (scrollToSection) scrollToSection(id);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: isScrolled ? "rgba(250,250,248,0.96)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled ? "0 1px 0 rgba(0,0,0,0.07)" : "none",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.5rem]">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center cursor-pointer select-none"
            onClick={() => handleNav("hero")}
          >
            {/* WHITELABEL: Substituir por <img> com logo */}
            <span
              className="font-bold text-lg"
              style={{ fontFamily: "Lora, Georgia, serif", color: "#1B3A5C" }}
            >
              Dr(a).{" "}
              <span style={{ color: "#5B8C9B" }}>Nome</span>
            </span>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index }}
                onClick={() => handleNav(item.id)}
                className="relative text-[13px] font-medium transition-colors cursor-pointer"
                style={{
                  color: activeSection === item.id ? "#5B8C9B" : "#1B3A5C",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: "#5B8C9B" }}
                  />
                )}
              </motion.button>
            ))}

            {/* Social icons */}
            <div className="flex items-center gap-3.5 ml-1 pl-4 border-l" style={{ borderColor: "rgba(27,58,92,0.12)" }}>
              {/* WHITELABEL: Substituir links sociais */}
              <a href="#contact" className="transition-opacity hover:opacity-60" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1B3A5C">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1B3A5C">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="mailto:contato@seusite.com.br" className="transition-opacity hover:opacity-60" aria-label="E-mail">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: "#1B3A5C" }}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="lg:hidden py-4 border-t"
            style={{ borderColor: "rgba(27,58,92,0.1)", backgroundColor: "rgba(250,250,248,0.98)" }}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="block w-full text-left px-4 py-3 text-sm font-medium cursor-pointer"
                style={{
                  color: activeSection === item.id ? "#5B8C9B" : "#1B3A5C",
                  backgroundColor: activeSection === item.id ? "rgba(91,140,155,0.07)" : "transparent",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
