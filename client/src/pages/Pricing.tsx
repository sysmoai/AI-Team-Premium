import { Layout } from "@/components/layout/Layout";
import { PRICING_SECTIONS, PRICING_SUMMARY } from "@shared/pricing-table.js";
import { BUNDLE_PRICES } from "@shared/bundle-prices.js";
import catalogForPricing from "../data/products-catalog.json";

// ChatGPT is named directly in the copy below, so its entry price is read from
// the catalog rather than typed. It was ৳499 in four places against ৳350.
const CHATGPT_FROM = Math.min(
  ...(catalogForPricing as { brand: string; price: number; priceOnRequest?: boolean }[])
    .filter((p) => p.brand === "ChatGPT" && p.price > 0 && !p.priceOnRequest)
    .map((p) => p.price)
);
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import { ArrowUpRight, MessageCircle, Clock } from "lucide-react";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

const waBase = "https://wa.me/8801533262758?text=";
const enc = encodeURIComponent;

const PRICING_FAQS = [
  // Was "ChatGPT Plus Shared costs ৳499/month — the cheapest plan available":
  // wrong price, and wrong claim. ৳350 is ChatGPT's entry tier, not the catalog
  // floor, which is ৳190. Both figures are derived now.
  { q: "What is the cheapest AI subscription price in Bangladesh from AI Team Premium?", a: `Plans start at ৳${PRICING_SUMMARY.priceFrom.toLocaleString("en-US")}/month, and ChatGPT Plus Shared is ৳${CHATGPT_FROM.toLocaleString("en-US")}/month. Pay in BDT via bKash, Nagad, Rocket or Bank Transfer, and get access within 5–15 minutes.`},
  { q: "How do I order and what payment methods are accepted?", a: "Message on WhatsApp (+880 1533-262758), pick a plan from the pricing list, pay via bKash, Nagad, Rocket or Bank Transfer, and receive access within 5–15 minutes (shared plans) or up to 6 hours (bundles)." },
  { q: "Does AI Team Premium accept bKash and Nagad for all plans?", a: `Yes. Every AI subscription and service from AI Team Premium — from ৳${PRICING_SUMMARY.priceFrom.toLocaleString("en-US")}/mo up to AI Ops Sprint at ৳9,900 — is payable in BDT via bKash, Nagad, Rocket or Bank Transfer. No international credit card required.` },
  { q: "What is included in the AI Tools Vault bundle?", a: `The AI Tools Vault (৳${BUNDLE_PRICES.vault.toLocaleString("en-US")}/month) includes shared access to ChatGPT Plus, Claude Pro, and Gemini Advanced — three top AI tools in one plan, with priority setup and a single WhatsApp support channel.` },
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
    title: `AI Tools Pricing in Bangladesh — All Plans from ৳${PRICING_SUMMARY.priceFrom.toLocaleString("en-US")}/mo`,
    description: `Complete BDT pricing for all AI tools and services from AI Team Premium. ${PRICING_SUMMARY.rows} plans from ৳${PRICING_SUMMARY.priceFrom.toLocaleString("en-US")}/mo — ChatGPT Plus, Claude, Gemini, Canva, Grammarly, AI Ops Sprint. Pay via bKash/Nagad.`,
    path: "/pricing",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} />
      <FAQSchema items={PRICING_FAQS} />
      <ProductSchema
        name={`AI Tools Pricing Bangladesh — All Plans from ৳${PRICING_SUMMARY.priceFrom.toLocaleString("en-US")}/mo`}
        description={`Complete BDT pricing for AI subscriptions and services from AI Team Premium. ${PRICING_SUMMARY.rows} plans from ৳${PRICING_SUMMARY.priceFrom.toLocaleString("en-US")}/mo — ChatGPT Plus, Claude Pro, Gemini Advanced, Canva Pro, Grammarly, AI Ops Sprint. Pay via bKash/Nagad.`}
        path="/pricing"
        priceBDT={PRICING_SUMMARY.priceFrom}
        category="AI Subscription"
      />
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
              <WhatsAppIcon size={16} color="#fff" /> Order on WhatsApp
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
              <strong>AI Team Premium</strong> offers {PRICING_SUMMARY.rows} AI subscription plans in Bangladesh starting at{" "}
              <strong>৳{PRICING_SUMMARY.priceFrom.toLocaleString("en-US")}/month</strong>, with AI Ops Sprint 1:1 implementation at <strong>৳9,900</strong>. All prices are in BDT, payable via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>. Shared plans deliver in 5–15 minutes. No international credit card required.
            </p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section key={section.title} className="py-16 border-b" style={{ borderColor: "rgba(37,99,235,0.06)" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-10">
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: "1.4rem", fontWeight: 700 }}>{section.title}</h2>
              <p className="mt-1 text-slate-900/45 dark:text-slate-300" style={{ fontSize: "0.85rem" }}>{section.subtitle}</p>
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
                  <p className="mt-1 flex items-center gap-1" style={{ color: BRAND.navy, opacity: 0.45, fontSize: "0.75rem" }}>
                    <Clock size={11} /> Delivery: {item.delivery}
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <a
                        href={item.waText}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick(item.name, undefined, item.price, "pricing-card")}
                        data-testid={`button-order-${item.name.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 font-semibold text-white text-xs"
                        style={{ background: "#25D366" }}
                      >
                        <WhatsAppIcon size={12} color="#fff" /> Order on WhatsApp
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