import { Layout } from "@/components/layout/Layout";
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
  { q: "What is the cheapest AI subscription price in Bangladesh from AI Team Premium?", a: "ChatGPT Plus Shared costs ৳499/month — the cheapest plan available. Pay in BDT via bKash, Nagad, Rocket or Bank Transfer, and get access within 5–15 minutes." },
  { q: "How do I order and what payment methods are accepted?", a: "Message on WhatsApp (+880 1533-262758), pick a plan from the pricing list, pay via bKash, Nagad, Rocket or Bank Transfer, and receive access within 5–15 minutes (shared plans) or up to 6 hours (bundles)." },
  { q: "Does AI Team Premium accept bKash and Nagad for all plans?", a: "Yes. Every AI subscription and service from AI Team Premium — from ChatGPT Plus at ৳399/mo to AI Ops Sprint at ৳9,900 — is payable in BDT via bKash, Nagad, Rocket or Bank Transfer. No international credit card required." },
  { q: "What is included in the AI Tools Vault bundle?", a: "The AI Tools Vault (৳1,990/month) includes shared access to ChatGPT Plus, Claude Pro, and Gemini Advanced — three top AI tools in one plan, with priority setup and a single WhatsApp support channel." },
];

const SECTIONS = [
  {
    title: "🤖 AI Chat & Research Tools",
    subtitle: "Genuine access · bKash/Nagad · 5–15 min delivery",
    items: [
      { name: "ChatGPT Plus — Shared", price: "৳499/mo", delivery: "5–15 min", href: "/chatgpt/plus-shared", wa: waBase + enc("Hi, I want ChatGPT Plus Shared ৳399/mo") },
      { name: "ChatGPT Plus — Premium Shared", price: "৳999/mo", delivery: "5–15 min", href: "/chatgpt/plus-premium-shared", wa: waBase + enc("Hi, I want ChatGPT Plus Premium Shared ৳950/mo") },
      { name: "ChatGPT Plus — Personal Seat", price: "৳2,990/mo", delivery: "2–4 hr", href: "/chatgpt/plus-personal-seat", wa: waBase + enc("Hi, I want ChatGPT Plus Personal Seat ৳2,950/mo") },
      { name: "ChatGPT Team — Shared", price: "৳1,799/mo", delivery: "5–15 min", href: "/chatgpt/business-shared", wa: waBase + enc("Hi, I want ChatGPT Team Shared ৳699/mo") },
      { name: "ChatGPT Team — Premium Shared", price: "৳2,299/mo", delivery: "5–15 min", href: "/chatgpt/business-premium-shared", wa: waBase + enc("Hi, I want ChatGPT Team Premium Shared ৳1,299/mo") },
      { name: "ChatGPT Team — Personal-like", price: "৳3,990/mo", delivery: "2–4 hr", href: "/chatgpt/business-personal-like", wa: waBase + enc("Hi, I want ChatGPT Team Personal-like ৳3,899/mo") },
      { name: "ChatGPT Pro — Premium Shared", price: "৳4,990/mo", delivery: "5–15 min", href: "/chatgpt/pro-premium-shared", wa: waBase + enc("Hi, I want ChatGPT Pro Premium Shared ৳4,500/mo") },
      { name: "Claude Pro — Shared", price: "৳599/mo", delivery: "5–15 min", href: "/claude-plans", wa: waBase + enc("Hi, I want Claude Pro Shared ৳599/mo") },
      { name: "Claude Pro — Personal", price: "৳2,990/mo", delivery: "2–4 hr", href: "/claude-plans", wa: waBase + enc("Hi, I want Claude Pro Personal ৳2,500/mo") },
      { name: "Gemini Advanced — Shared", price: "৳599/mo", delivery: "5–15 min", href: "/gemini-plans", wa: waBase + enc("Hi, I want Gemini Advanced Shared ৳499/mo") },
      { name: "Gemini Advanced — Personal", price: "৳2,990/mo", delivery: "2–4 hr", href: "/gemini-plans", wa: waBase + enc("Hi, I want Gemini Advanced Personal ৳1,800/mo") },
      { name: "Perplexity Pro — Shared", price: "৳599/mo", delivery: "5–15 min", href: "/perplexity-plans", wa: waBase + enc("Hi, I want Perplexity Pro Shared ৳499/mo") },
      { name: "SuperGrok — Shared (Unlimited Aurora images)", price: "৳699/mo", delivery: "5–15 min", href: "/tools/supergrok", wa: waBase + enc("Hi, I want SuperGrok Shared ৳499/mo") },
      { name: "SuperGrok — Personal Seat", price: "৳4,990/mo", delivery: "2–4 hr", href: "/tools/supergrok", wa: waBase + enc("Hi, I want SuperGrok Personal ৳3,990/mo") },
      { name: "Google AI Pro — Shared (Gemini 2.5 + NotebookLM)", price: "৳599/mo", delivery: "5–15 min", href: "/tools/google-ai-pro", wa: waBase + enc("Hi, I want Google AI Pro Shared ৳449/mo") },
      { name: "Google AI Pro — Personal (2TB Drive)", price: "৳2,990/mo", delivery: "2–4 hr", href: "/tools/google-ai-pro", wa: waBase + enc("Hi, I want Google AI Pro Personal ৳1,299/mo") },
    ],
  },
  {
    title: "🖼️ AI Image Generation",
    subtitle: "Create stunning visuals with AI — bKash/Nagad accepted",
    items: [
      { name: "Midjourney — Shared", price: "৳1,199/mo", delivery: "5–15 min", href: "/tools/midjourney", wa: waBase + enc("Hi, I want Midjourney Shared ৳1,200/mo") },
      { name: "Leonardo AI — Shared (8,500 tokens)", price: "৳499/mo", delivery: "5–15 min", href: "/tools/leonardo", wa: waBase + enc("Hi, I want Leonardo AI Shared ৳349/mo") },
      { name: "Leonardo AI — Personal (25,000 tokens)", price: "৳1,990/mo", delivery: "2–4 hr", href: "/tools/leonardo", wa: waBase + enc("Hi, I want Leonardo AI Personal ৳1,299/mo") },
    ],
  },
  {
    title: "🎬 AI Video Generation",
    subtitle: "Professional AI video tools — bKash/Nagad accepted",
    items: [
      { name: "Runway ML Standard — Shared (625 credits)", price: "৳899/mo", delivery: "5–15 min", href: "/tools/runway", wa: waBase + enc("Hi, I want Runway ML Standard Shared ৳899/mo") },
      { name: "Runway ML Pro — Shared (2,250 credits)", price: "৳1,799/mo", delivery: "5–15 min", href: "/tools/runway", wa: waBase + enc("Hi, I want Runway ML Pro Shared ৳1,799/mo") },
      { name: "Kling AI Pro — Shared (660 credits)", price: "৳599/mo", delivery: "5–15 min", href: "/tools/kling", wa: waBase + enc("Hi, I want Kling AI Pro Shared ৳599/mo") },
      { name: "Kling AI Premier — Shared (3,000 credits)", price: "৳1,499/mo", delivery: "5–15 min", href: "/tools/kling", wa: waBase + enc("Hi, I want Kling AI Premier Shared ৳1,499/mo") },
    ],
  },
  {
    title: "✍️ Writing, Productivity & Office AI",
    subtitle: "Boost your work with AI writing and productivity tools",
    items: [
      { name: "Grammarly Premium — Monthly", price: "৳399/mo", delivery: "2–4 hr", href: "/grammarly-plans", wa: waBase + enc("Hi, I want Grammarly Premium ৳499/mo") },
      { name: "Canva Pro — Monthly", price: "৳399/mo", delivery: "2–4 hr", href: "/canva-plans", wa: waBase + enc("Hi, I want Canva Pro ৳599/mo") },
      { name: "ElevenLabs Voice AI", price: "৳699/mo", delivery: "5–15 min", href: "/tools/elevenlabs", wa: waBase + enc("Hi, I want ElevenLabs Voice AI ৳699/mo") },
      { name: "Notion AI — Team Seat", price: "৳450/mo", delivery: "5–15 min", href: "/tools/notion", wa: waBase + enc("Hi, I want Notion AI ৳450/mo") },
      { name: "GitHub Copilot — Private", price: "৳1,200/mo", delivery: "2–4 hr", href: "/tools/copilot", wa: waBase + enc("Hi, I want GitHub Copilot ৳1,200/mo") },
      { name: "Microsoft 365 + Copilot — Shared", price: "৳899/mo", delivery: "2–4 hr", href: "/tools/microsoft365", wa: waBase + enc("Hi, I want Microsoft 365 Copilot Shared ৳899/mo") },
      { name: "LinkedIn Premium Career", price: "৳999/mo", delivery: "2–4 hr", href: "/tools/linkedin", wa: waBase + enc("Hi, I want LinkedIn Premium Career ৳999/mo") },
      { name: "LinkedIn Premium Business", price: "৳1,800/mo", delivery: "2–4 hr", href: "/tools/linkedin", wa: waBase + enc("Hi, I want LinkedIn Premium Business ৳1,800/mo") },
    ],
  },
  {
    title: "💎 Bundles",
    subtitle: "Best value — multiple tools, one payment",
    items: [
      { name: "AI Tools Vault (ChatGPT + Claude + Gemini)", price: "৳1,990/mo", delivery: "6 hr", href: "/ai-tools-vault", wa: waBase + enc("Hi, I want AI Tools Vault ৳1,990/mo") },
    ],
  },
  {
    title: "🤝 AI Training & Services",
    subtitle: "Expert 1:1 AI coaching and implementation",
    items: [
      { name: "AI Coaching Session", price: "৳799/hour", delivery: "5–15 min", href: "/support", wa: waBase + enc("Hi, I want to book an AI Coaching Session ৳799/hr") },
      { name: "Student Smart Study Pack", price: "৳1,999 one-time", delivery: "5–15 min", href: "/support", wa: waBase + enc("Hi, I want the Student Smart Study Pack ৳1,999") },
      { name: "Student Pro Pack", price: "৳3,999 one-time", delivery: "5–15 min", href: "/support", wa: waBase + enc("Hi, I want the Student Pro Pack ৳3,999") },
      { name: "Freelancer Fast Pack", price: "৳4,999 one-time", delivery: "5–15 min", href: "/support", wa: waBase + enc("Hi, I want the Freelancer Fast Pack ৳4,999") },
      { name: "Freelancer Agency Pack", price: "৳9,999 one-time", delivery: "5–15 min", href: "/support", wa: waBase + enc("Hi, I want the Freelancer Agency Pack ৳9,999") },
      { name: "Business AI Setup Pack", price: "৳12,999 one-time", delivery: "2–4 hr", href: "/support", wa: waBase + enc("Hi, I want the Business AI Setup Pack ৳12,999") },
      { name: "360 AI Solution", price: "৳24,999+", delivery: "2–4 hr", href: "/support", wa: waBase + enc("Hi, I want the 360 AI Solution ৳24,999+") },
      { name: "AI Ops Sprint — 1:1 Implementation (3 sessions)", price: "৳9,900 one-time", delivery: "2–4 hr", href: "/services/ai-ops-sprint", wa: waBase + enc("Hi, I want AI Ops Sprint 1:1 Implementation ৳9,900") },
    ],
  },
];

export default function Pricing() {
  usePageMeta({
    title: "AI Tools Pricing in Bangladesh — All Plans from ৳399/mo",
    description: "Complete BDT pricing for all AI tools and services from AI Team Premium. ChatGPT Plus ৳399/mo, Claude, Gemini, Canva, Grammarly, AI Ops Sprint. Pay via bKash/Nagad.",
    path: "/pricing",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} />
      <FAQSchema items={PRICING_FAQS} />
      <ProductSchema
        name="AI Tools Pricing Bangladesh — All Plans from ৳399/mo"
        description="Complete BDT pricing for AI subscriptions and services from AI Team Premium. ChatGPT Plus ৳399/mo, Claude Pro, Gemini Advanced, Canva Pro, Grammarly, AI Ops Sprint. Pay via bKash/Nagad."
        path="/pricing"
        priceBDT={399}
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
              <strong>AI Team Premium</strong> offers AI subscriptions in Bangladesh starting at <strong>৳399/month</strong> (ChatGPT Plus Shared) up to <strong>৳9,900</strong> (AI Ops Sprint 1:1 implementation). All prices are in BDT, payable via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>. Shared plans deliver in 5–15 minutes. No international credit card required.
            </p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section key={section.title} className="py-16 border-b" style={{ borderColor: "rgba(37,99,235,0.06)" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-10">
              <h2 style={{ color: BRAND.navy, fontSize: "1.4rem", fontWeight: 700 }}>{section.title}</h2>
              <p className="mt-1" style={{ color: BRAND.navy, opacity: 0.45, fontSize: "0.85rem" }}>{section.subtitle}</p>
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
                        href={item.wa}
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
                        href={config.messenger}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackMessengerClick(item.name, "pricing-card")}
                        data-testid={`button-msg-${item.name.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 font-semibold text-white text-xs"
                        style={{ background: "#0084FF" }}
                      >
                        <MessageCircle size={12} color="#fff" /> Messenger
                      </a>
                    </div>
                    {item.href && (
                      <Link
                        href={item.href}
                        className="inline-flex items-center justify-center gap-1 rounded-full py-2 font-medium text-xs"
                        style={{ color: BRAND.blue, border: `1px solid rgba(37,99,235,0.2)` }}
                      >
                        Details <ArrowUpRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-20" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">কোন product নিবেন বুঝতে পারছেন না?</h2>
          <p className="text-white/50 mb-8">WhatsApp বা Messenger-এ জিজ্ঞেস করুন — আমরা সঠিক plan বেছে দেব।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "pricing-bottom-cta")}
              data-testid="button-pricing-cta"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={20} color="#fff" /> Chat on WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick(undefined, "pricing-bottom-cta")}
              data-testid="button-pricing-cta-messenger"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={20} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
