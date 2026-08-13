declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, parameters: Record<string, string> = {}) {
  if (typeof window !== "undefined") {
    window.gtag?.("event", name, parameters);
  }
}
