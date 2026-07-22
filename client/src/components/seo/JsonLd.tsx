const SITE_URL = "https://aiteampremium.com";

interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": `${SITE_URL}${it.path.startsWith("/") ? it.path : `/${it.path}`}`,
    })),
  };
  return <JsonLd data={data} />;
}

export interface FaqItem {
  q: string;
  a: string;
}

export function FAQSchema({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
  return <JsonLd data={data} />;
}

export interface ProductSchemaProps {
  name: string;
  description: string;
  path: string;
  priceBDT: number | string;
  image?: string;
  brand?: string;
  category?: string;
  rating?: { value: string; count: string };
}

export function ProductSchema({
  name,
  description,
  path,
  priceBDT,
  image,
  brand = "AI Team Premium",
  category = "AI Subscription",
  rating,
}: ProductSchemaProps) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const data: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "url": url,
    "category": category,
    "brand": { "@type": "Brand", "name": brand },
    "image": image || `${SITE_URL}/favicon.png`,
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "BDT",
      "price": String(priceBDT).replace(/[^0-9.]/g, ""),
      "availability": "https://schema.org/InStock",
      "areaServed": "BD",
      "seller": { "@type": "Organization", "name": "AI Team Premium" },
    },
  };
  if (rating) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": rating.value,
      "reviewCount": rating.count,
      "bestRating": "5",
      "worstRating": "1",
    };
  }
  return <JsonLd data={data} />;
}
