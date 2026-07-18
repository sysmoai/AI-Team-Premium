import { config, SITE_URL } from "@/lib/config";

export function OrganizationSchema() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "AI Team Premium BD",
      "alternateName": ["AITPBD", "AI Team Premium Bangladesh"],
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.png`,
        "width": 512,
        "height": 512,
      },
      "description":
        "AI Team Premium BD (AITPBD) provides AI subscription access, setup assistance, and Bangla support for customers in Bangladesh.",
      "areaServed": {
        "@type": "Country",
        "name": "Bangladesh",
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BD",
        "addressRegion": "Dhaka",
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": config.phone,
          "contactType": "sales",
          "availableLanguage": ["Bengali", "English"],
          "areaServed": "BD",
        },
        {
          "@type": "ContactPoint",
          "telephone": config.phone,
          "contactType": "customer support",
          "availableLanguage": ["Bengali", "English"],
          "areaServed": "BD",
        },
      ],
      "sameAs": [config.fbPage, config.fbGroup, config.instagram],
      "knowsAbout": [
        "ChatGPT subscriptions in Bangladesh",
        "Claude subscriptions in Bangladesh",
        "Google AI subscriptions in Bangladesh",
        "Canva subscriptions in Bangladesh",
        "AI tools with local payment support",
        "AI setup and Bangla support",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      "name": "AI Team Premium BD",
      "image": `${SITE_URL}/favicon.png`,
      "url": SITE_URL,
      "telephone": config.phone,
      "currenciesAccepted": "BDT",
      "paymentAccepted": "bKash, Nagad, Bank Transfer",
      "areaServed": { "@type": "Country", "name": "Bangladesh" },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BD",
        "addressRegion": "Dhaka",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "AI Team Premium BD",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "inLanguage": ["en", "bn"],
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
