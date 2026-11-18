import { Layout } from "@/components/layout/Layout";
import { PRICING_SECTIONS, PRICING_SUMMARY } from "@shared/pricing-table.js";

import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

const waBase = "https://wa.me/8801533262758?text=";
const enc = encodeURIComponent;

// Cycle 5: no price, delivery time or payment-method list appears here unless the
// eligibility layer produced it. Every product is currently enquiry-only, so the
// answers describe the process, not an offer.
// Typed as nullable: the generated literal is `null` while no product may display a price.
const PRICE_FROM = PRICING_SUMMARY.priceFrom as number | null;
const HAS_PRICES = PRICE_FROM != null;
const PRICING_FAQS = [
  { q: "How much do the AI subscriptions cost?", a: HAS_PRICES ? `Published plans start at ৳${PRICE_FROM!.toLocaleString("en-US")}/month. The current price is confirmed on WhatsApp before you pay.` : "We do not publish fixed prices at the moment. Ask on WhatsApp: we confirm availability, the approved access model and the current price before you pay anything." },
  { q: "How do I order?", a: "Message us on WhatsApp (+880 1533-262758) with the product you are considering. We confirm the offer first; payment instructions are shared only after that." },
  { q: "Which payment methods can I use?", a: "Payment methods are confirmed for each order on WhatsApp. Never send money before the offer has been confirmed to you." },
];

// The pricing table is generated from the catalog by `npm run gen:pricing`.
//
// It used to be 49 hand-written rows and every price had drifted — and each row
// carried the price twice, once in the table and once inside the prefilled
// WhatsApp message, so a customer messaged us quoting a figure we do not charge.
// Adobe CC read ৳499 against ৳190, Poe ৳799 against ৳3,440, Kling ৳599 against
// ৳270. It also listed a "ChatGPT Go — Shared" that has no catalog product at
// all, and omitted 80 products that do.
const SECTIONS = PRICING_SECTIONS;

export default function Pricing() {
  usePageMeta({
    title: HAS_PRICES
      ? `AI Tools Pricing in Bangladesh — Plans from ৳${PRICE_FROM!.toLocaleString("en-US")}/mo`
      : "AI Subscriptions in Bangladesh — Plans & Availability",
    description: HAS_PRICES
      ? `${PRICING_SUMMARY.rows} plans from ৳${PRICE_FROM!.toLocaleString("en-US")}/mo. Availability and current prices are confirmed on WhatsApp before any payment.`
      : `${PRICING_SUMMARY.rows} AI subscription plans listed. Availability and current prices are confirmed on WhatsApp before any payment.`,
    path: "/pricing",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} />
      <FAQSchema items={PRICING_FAQS} />
      {HAS_PRICES && (
        <ProductSchema
          name={`AI Tools Pricing Bangladesh — Plans from ৳${PRICE_FROM!.toLocaleString("en-US")}/mo`}
          description={`${PRICING_SUMMARY.rows} plans from ৳${PRICE_FROM!.toLocaleString("en-US")}/mo. Availability and current prices are confirmed before payment.`}
          path="/pricing"
          priceBDT={PRICE_FROM!}
          category="AI Subscription"
        />
      )}
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Pricing</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}>
            সব Products & Services
          </h1>
          <p className="mt-4 mx-auto max-w-xl" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.95rem", lineHeight: 1.65 }}>
            All prices in BDT. Pay via bKash, Nagad, or Bank Transfer. No hidden fees.{" "}
            <Link href="/refund-policy" style={{ color: BRAND.blue }}>Refund Policy →</Link>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "pricing-hero")}
              data-testid="button-pricing-hero-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white text-sm"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={16} color="#fff" /> Ask on WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick(undefined, "pricing-hero")}
              data-testid="button-pricing-hero-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white text-sm"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={16} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>

      <section className="pb-8" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="rounded-2xl p-5 md:p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              <strong>AI Team Premium</strong> lists {PRICING_SUMMARY.rows} AI subscription plans for Bangladesh.{" "}
              {HAS_PRICES ? `Published plans start at ৳${PRICE_FROM!.toLocaleString("en-US")}/month. ` : "Prices are not published at the moment. "}
              Availability, the approved access model and the current price are confirmed on WhatsApp before you pay.
            </p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section key={section.title} className="py-16 border-b" style={{ borderColor: "rgba(37,99,235,0.06)" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-10">
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: "1.4rem", fontWeight: 700 }}>{section.title}</h2>
              <p className="mt-1 text-slate-900/70 dark:text-slate-300" style={{ fontSize: "0.85rem" }}>{section.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col rounded-2xl p-6 transition-all"
                  style={{
                    background: BRAND.white,
                    border: "1px solid rgba(37,99,235,0.08)",
                    boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                  }}
                >
                  <p className="font-semibold flex-1" style={{ color: BRAND.navy, fontSize: "0.92rem", lineHeight: 1.4 }}>{item.name}</p>
                  <p className="mt-3 font-extrabold" style={{ color: BRAND.blue, fontSize: "1.2rem" }}>{item.price}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <a
                        href={item.waText}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick(item.name, undefined, item.canOrder ? item.price : "", "pricing-card")}
                        data-testid={`button-order-${item.name.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 font-semibold text-white text-xs"
                        style={{ background: "#25D366" }}
                      >
                        <WhatsAppIcon size={12} color="#fff" /> {item.canOrder ? "Order on WhatsApp" : "Ask on WhatsApp"}
                      </a>
                      <a
                        href={item.href}
                        data-testid={`button-details-${item.name.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
                        className="inline-flex items-center justify-center gap-1 rounded-full px-3 py-2.5 text-xs font-semibold border transition-all"
                        style={{ borderColor: "rgba(37,99,235,0.15)", color: BRAND.blue }}
                      >
                        Details <ArrowUpRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h2 style={{ color: BRAND.navy, fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.2 }} className="mb-2">
            কোন product নিবেন বুঝতে পারছেন না?
          </h2>
          <p className="mb-8" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.95rem" }}>
            WhatsApp বা Messenger-এ জিজ্ঞেস করুন — আমরা সঠিক plan বেছে দেব।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "pricing-cta")}
              data-testid="button-pricing-cta-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white text-sm"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={16} color="#fff" /> Chat on WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick(undefined, "pricing-cta")}
              data-testid="button-pricing-cta-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white text-sm"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={16} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}