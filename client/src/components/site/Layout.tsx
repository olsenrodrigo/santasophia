import { useEffect, type PropsWithChildren } from "react";
import { useLocation } from "wouter";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <a
        href="#conteudo"
        className="sr-only z-[100] rounded-md bg-highlight px-4 py-2 font-semibold text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
