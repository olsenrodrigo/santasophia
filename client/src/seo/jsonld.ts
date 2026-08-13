import {
  absUrl,
  EMAIL,
  INSTAGRAM,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_E164,
} from "./constants";

const organizationReference = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService"],
    "@id": `${SITE_URL}/#organization`,
    name: "Santa Sophia",
    alternateName: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: absUrl("/favicon-512.png"),
    telephone: PHONE_E164,
    email: EMAIL,
    areaServed: "BR",
    sameAs: [INSTAGRAM],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_E164,
        contactType: "customer service",
        areaServed: "BR",
        availableLanguage: "Portuguese",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "20:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: WHATSAPP_E164,
        contactType: "sales",
        areaServed: "BR",
        availableLanguage: "Portuguese",
      },
    ],
    employee: {
      "@type": "Person",
      name: "Magno Stiti de Paula",
      jobTitle: "Especialista em Consórcios",
      url: absUrl("/magno-stiti-de-paula/"),
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/magno-stiti-de-paula/#person`,
    name: "Magno Stiti de Paula",
    jobTitle: "Especialista em Consórcios",
    worksFor: organizationReference,
    knowsAbout: ["Consórcios", "Carta de crédito", "Planejamento de compra"],
    url: absUrl("/magno-stiti-de-paula/"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "pt-BR",
    publisher: organizationReference,
  };
}

export function serviceJsonLd(path: string, serviceType: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absUrl(path)}#service`,
    name: serviceType,
    serviceType,
    description,
    url: absUrl(path),
    areaServed: "BR",
    provider: organizationReference,
  };
}

export interface FaqSchemaItem {
  question: string;
  answer: string;
}

export function faqPageJsonLd(items: FaqSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export interface BreadcrumbSchemaItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}
