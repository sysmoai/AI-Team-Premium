import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { config } from "@/lib/config";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function AISubscriptions() {
  usePageMeta({ title: "AI Subscriptions in Bangladesh — Browse Current Catalog", description: "Browse current AI subscription options for Bangladesh. Access model, price, availability, fulfillment timing and support terms are confirmed before purchase.", path: "/ai-subscriptions" });
  const cards = [
    { title: "Browse the current catalog", body: "Use the catalog as the current storefront reference. Offers that are not cleared for public sale stay price-on-request or unavailable.", href: "/all-products", cta: "View all products" },
    { title: "Compare before choosing", body: "Compare tool capabilities and intended use before deciding. Provider features and plan packaging can change over time.", href: "/compare", cta: "Compare tools" },
    { title: "Confirm before payment", body: "We confirm the access model, current price, availability, fulfillment timing and applicable support terms before you pay.", href: "/contact", cta: "Contact us" },
  ];
  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "AI Subscriptions", path: "/ai-subscriptions" }]} />
      <section className="py-24" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="uppercase mb-3" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.16em", fontWeight: 700 }}>Current catalog</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.9rem,5vw,3rem)", fontWeight: 800 }}>AI subscriptions for Bangladesh</h1>
          <p className="mt-5 mx-auto max-w-2xl" style={{ color: BRAND.navy, opacity: 0.65, lineHeight: 1.8 }}>Explore current options without relying on fixed public delivery, warranty or availability promises. Commercial terms are confirmed for the specific offer before purchase.</p>
          <div className="grid md:grid-cols-3 gap-5 mt-12 text-left">
            {cards.map((card) => (
              <div key={card.title} className="rounded-2xl p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,.08)" }}>
                <h2 style={{ color: BRAND.navy, fontWeight: 700 }}>{card.title}</h2>
                <p className="mt-3" style={{ color: BRAND.navy, opacity: 0.6, lineHeight: 1.7, fontSize: "0.9rem" }}>{card.body}</p>
                <Link href={card.href} className="inline-flex mt-5 font-semibold" style={{ color: BRAND.blue, textDecoration: "none" }}>{card.cta}</Link>
              </div>
            ))}
          </div>
          <a href={config.whatsappGeneral} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "ai-subscriptions-safe-hub")} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 mt-10 font-semibold text-white" style={{ background: "#25D366", textDecoration: "none" }}><WhatsAppIcon size={17} color="#fff" /> Ask on WhatsApp</a>
        </div>
      </section>
    </Layout>
  );
}
