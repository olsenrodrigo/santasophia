declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (!import.meta.env.PROD || typeof window === "undefined") return;

  const measurementId = import.meta.env.VITE_GA_ID?.trim();
  if (!measurementId || window.gtag) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.defer = true;
  document.head.appendChild(script);
}

export function trackEvent(name: string, parameters: Record<string, string> = {}) {
  if (typeof window !== "undefined") {
    window.gtag?.("event", name, parameters);
  }
}
