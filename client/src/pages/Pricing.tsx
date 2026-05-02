import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { config } from "@/lib/config";

const waBase = "https://wa.me/8801533262758?text=";
const enc = encodeURIComponent;

const SECTIONS = [
  {
    title: "🤖 AI Chat Tools",
    subtitle: "Official access · bKash/Nagad · Fast delivery",
    items: [
      { name: "ChatGPT Plus — Shared", price: "৳399/mo", href: "/chatgpt/plus-shared", wa: waBase + enc("Hi, I want ChatGPT Plus Shared ৳399/mo") },
      { name: "ChatGPT Plus — Premium Shared", price: "৳950/mo", href: "/chatgpt/plus-premium-shared", wa: waBase + enc("Hi, I want ChatGPT Plus Premium Shared ৳950/mo") },
      { name: "ChatGPT Plus — Personal Seat", price: "৳2,950/mo", href: "/chatgpt/plus-personal-seat", wa: waBase + enc("Hi, I want ChatGPT Plus Personal Seat ৳2,950/mo") },
      { name: "ChatGPT Business — Shared", price: "৳699/mo", href: "/chatgpt/business-shared", wa: waBase + enc("Hi, I want ChatGPT Business Shared ৳699/mo") },
      { name: "ChatGPT Business — Premium Shared", price: "৳1,299/mo", href: "/chatgpt/business-premium-shared", wa: waBase + enc("Hi, I want ChatGPT Business Premium Shared ৳1,299/mo") },
      { name: "ChatGPT Business — Personal-like", price: "৳3,899/mo", href: "/chatgpt/business-personal-like", wa: waBase + enc("Hi, I want ChatGPT Business Personal-like ৳3,899/mo") },
      { name: "ChatGPT Pro — Premium Shared", price: "৳4,500/mo", href: "/chatgpt/pro-premium-shared", wa: waBase + enc("Hi, I want ChatGPT Pro Premium Shared ৳4,500/mo") },
      { name: "Claude Pro — Shared", price: "৳599/mo", href: "/claude-plans", wa: waBase + enc("Hi, I want Claude Pro Shared ৳599/mo") },
      { name: "Google Gemini Advanced — Shared", price: "৳499/mo", href: "/gemini-plans", wa: waBase + enc("Hi, I want Gemini Advanced Shared ৳499/mo") },
      { name: "Perplexity Pro", price: "৳499/mo", href: "/perplexity-plans", wa: waBase + enc("Hi, I want Perplexity Pro ৳499/mo") },
      { name: "Grok (xAI)", price: "৳499/mo", href: "/grok-plans", wa: waBase + enc("Hi, I want Grok Access ৳499/mo") },
    ],
  },
  {
    title: "🎨 Productivity & Creative Tools",
    subtitle: "Writing, design & creative AI — bKash/Nagad accepted",
    items: [
      { name: "Grammarly Premium — Monthly", price: "৳499/mo", href: "/grammarly-plans", wa: waBase + enc("Hi, I want Grammarly Premium ৳499/mo") },
      { name: "Canva Pro — Monthly", price: "৳599/mo", href: "/canva-plans", wa: waBase + enc("Hi, I want Canva Pro ৳599/mo") },
    ],
  },
  {
    title: "💎 Bundles",
    subtitle: "Best value — multiple tools, one payment",
    items: [
      { name: "AI Tools Vault (ChatGPT + Claude + Gemini)", price: "৳1,990/mo", href: "/ai-tools-vault", wa: waBase + enc("Hi, I want AI Tools Vault ৳1,990/mo") },
    ],
  },
  {
    title: "🤝 Services",
    subtitle: "Expert 1:1 AI coaching and implementation",
    items: [
      { name: "AI Coaching Session", price: "৳799/hour", href: "/support", wa: waBase + enc("Hi, I want to book an AI Coaching Session ৳799/hr") },
      { name: "AI Ops Sprint — 1:1 Implementation (3 sessions)", price: "৳9,900 one-time", href: "/services/ai-ops-sprint", wa: waBase + enc("Hi, I want AI Ops Sprint 1:1 Implementation ৳9,900") },
    ],
  },
];

export default function Pricing() {
  usePageMeta({
    title: "All Pricing — AI Tools & Services | AI Team Premium BD",
    description: "Complete pricing for all AI tools and services. ChatGPT Plus from ৳399/mo, Claude, Gemini, Canva, Grammarly, AI Ops Sprint. Pay via bKash/Nagad.",
  });

  return (
    <Layout>
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Pricing</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}>
            সব Products & Services
          </h1>
          <p className="mt-4 mx-auto max-w-xl" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.95rem", lineHeight: 1.65 }}>
            All prices in BDT. Pay via bKash, Nagad, or Bank Transfer. No hidden fees.
          </p>
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
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <a
                        href={item.wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`button-order-${item.name.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 font-semibold text-white text-xs"
                        style={{ background: "#25D366" }}
                      >
                        <WhatsAppIcon size={12} color="#fff" /> WhatsApp
                      </a>
                      <a
                        href={config.messenger}
                        target="_blank"
                        rel="noopener noreferrer"
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
              data-testid="button-pricing-cta"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={20} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
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
