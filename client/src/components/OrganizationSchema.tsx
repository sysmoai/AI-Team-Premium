import { config } from "@/lib/config";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Team Premium BD",
    "url": "https://aiteampremiumbd.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": config.phone,
      "contactType": "sales",
      "availableLanguage": ["Bengali", "English"]
    },
    "areaServed": "BD",
    "sameAs": [
      config.fbPage,
      config.fbGroup,
      config.instagram,
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
