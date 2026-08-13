import { useEffect } from "react";
import { useLocation } from "wouter";
import { absUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "./constants";
import { findRouteMeta } from "./routes";

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
}

export function usePageMeta() {
  const [location] = useLocation();

  useEffect(() => {
    const route = findRouteMeta(location);
    const canonical = absUrl(route.path);
    document.title = route.title;
    setMeta('meta[name="description"]', "content", route.description);
    setMeta('meta[property="og:title"]', "content", route.title);
    setMeta('meta[property="og:description"]', "content", route.description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:image"]', "content", absUrl(route.ogImage ?? DEFAULT_OG_IMAGE));
    setMeta('meta[name="twitter:title"]', "content", route.title);
    setMeta('meta[name="twitter:description"]', "content", route.description);

    const canonicalElement = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    canonicalElement?.setAttribute("href", canonical);

    setMeta('meta[property="og:site_name"]', "content", SITE_NAME);
  }, [location]);
}
