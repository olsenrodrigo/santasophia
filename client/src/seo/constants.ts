export const SITE_NAME = "Santa Sophia Consórcios";
export const SITE_URL = "https://santasophiaconsorcios.com.br";
export const PHONE_DISPLAY = "0800 948 9095";
export const PHONE_E164 = "+558009489095";
export const PHONE_HOURS = "seg a sex, 8h às 20h";
export const WHATSAPP_DISPLAY = "(16) 99197-2435";
export const WHATSAPP_E164 = "+5516991972435";
export const WHATSAPP_BASE_URL = "https://wa.me/5516991972435";
export const EMAIL = "contato@santasophiaconsorcios.com.br";
export const INSTAGRAM = "https://www.instagram.com/santasophiaconsorcios/";
export const DEFAULT_OG_IMAGE = "/opengraph.jpg";

export function absUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
