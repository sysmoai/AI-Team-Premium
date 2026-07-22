import { config } from "@/lib/config";

const SITE_URL = "https://aiteampremium.com";

export function OrganizationSchema() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "AI Team Premium",
      "alternateName": ["AITP", "AI Team Premium Bangladesh"],
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.png`,
        "width": 512,
        "height": 512,
      },
      "description":
        "AI Team Premium (AITP) is Bangladesh's premium provider of AI subscriptions — ChatGPT Plus, Pro, Team, Claude Pro, Gemini Advanced, Canva Pro, Grammarly, Midjourney and more — payable in BDT via bKash and Nagad with 5-15 minute delivery and a 30-day replacement warranty.",
      "foundingDate": "2024",
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
        "ChatGPT Plus Bangladesh",
        "ChatGPT Pro Bangladesh",
        "ChatGPT Team Bangladesh",
        "Claude Pro Bangladesh",
        "Gemini Advanced Bangladesh",
        "Canva Pro Bangladesh",
        "Grammarly Premium Bangladesh",
        "Midjourney Bangladesh",
        "Perplexity Pro Bangladesh",
        "GitHub Copilot Bangladesh",
        "AI tools bKash payment",
        "AI subscription Nagad",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      "name": "AI Team Premium",
      "image": `${SITE_URL}/favicon.png`,
      "url": SITE_URL,
      "telephone": config.phone,
      "priceRange": "৳399–৳24,999",
      "currenciesAccepted": "BDT",
      "paymentAccepted": "bKash, Nagad, Rocket, Bank Transfer",
      "areaServed": { "@type": "Country", "name": "Bangladesh" },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BD",
        "addressRegion": "Dhaka",
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "23:00",
      },

    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "AI Team Premium",
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
