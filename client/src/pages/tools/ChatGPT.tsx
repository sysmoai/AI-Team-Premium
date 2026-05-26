import { MessageSquare } from "lucide-react";
import { chatgptPlans } from "@/lib/plans";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { Layout } from "@/components/layout/Layout";
import { Clock, Check, MessageCircle } from "lucide-react";
import { config } from "@/lib/config";
import { PriceCompare } from "@/components/PriceCompare";


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "chatgpt",
  "category": "chat",
  "priceBdt": 399,
  "priceLabel": "৳399/mo",
  "model": "GPT-5 + o4-mini reasoning",
  "contextWindow": "128K tokens",
  "multimodal": "Text, image, voice, files",
  "banglaQuality": "⭐⭐⭐⭐ (very good)",
  "speed": "Fast (sub-second first token)",
  "accuracy": "⭐⭐⭐⭐⭐",
  "pricingTier": "Mainstream",
  "brand": "OpenAI",
  "tagline": "The most popular AI assistant",
  "toolPath": "/tools/chatgpt",
  "iconName": "Sparkles",
  "accent": "#10A37F",
  "bestUseCase": "All-rounder for students, freelancers, business",
  "bestFor": [
    "General-purpose Q&A and brainstorming",
    "Image generation (DALL-E 3 included)",
    "Custom GPTs and the GPT Store",
    "Voice conversations (Advanced Voice Mode)",
    "Plugin & code-interpreter workflows"
  ],
  "weaknesses": [
    "Shorter context window than Claude / Gemini",
    "Stricter content filters than Grok"
  ]
} as const;

export default function ChatGPT() {
  usePageMeta({
    title: "ChatGPT Plus & Business Subscriptions",
    description: "Official ChatGPT Plus, Business and Pro subscriptions in Bangladesh. ৳399 to ৳4,500/mo. bKash & Nagad accepted. Instant delivery.",
  });

  return (
    <Layout>
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <div className="inline-flex items-center justify-center rounded-2xl mb-6" style={{ width: 64, height: 64, background: `#16A34A15` }}>
            <MessageSquare size={32} color="#16A34A" strokeWidth={1.8} />
          </div>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15 }}>
            ChatGPT <span style={{ color: "#16A34A" }}>in Bangladesh</span>
          </h1>
          <p className="mt-4 mx-auto max-w-xl" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.95rem", lineHeight: 1.65 }}>
            Official ChatGPT Plus, Business and Pro subscriptions. Instant delivery via WhatsApp. Pay with bKash/Nagad.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatgptPlans.map((plan) => (
              <div
                key={plan.slug}
                className="relative flex flex-col rounded-2xl p-7"
                style={{
                  background: BRAND.white,
                  border: plan.badge === "Most Popular" ? `2px solid ${BRAND.blue}` : "1px solid rgba(37,99,235,0.06)",
                  boxShadow: plan.badge === "Most Popular" ? "0 8px 32px rgba(37,99,235,0.12)" : undefined,
                }}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-white"
                    style={{ background: plan.color === 'blue' ? BRAND.blue : plan.color === 'purple' ? '#7C3AED' : plan.color === 'green' ? '#16A34A' : plan.color === 'orange' ? '#F59E0B' : '#EF4444', fontSize: "0.68rem", fontWeight: 600 }}
                  >
                    {plan.badge}
                  </span>
                )}
                <p style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.78rem", fontWeight: 600, marginBottom: 4 }}>{plan.title}</p>
                <p style={{ color: BRAND.navy, fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
                  {plan.priceLabel}
                </p>
                <p className="mt-2 flex items-center gap-1.5" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.82rem" }}>
                  {plan.tier} • {plan.seats} Seats
                </p>
                <p className="mt-1 flex items-center gap-1.5" style={{ color: BRAND.blue, fontSize: "0.75rem", fontWeight: 500 }}>
                  <Clock size={12} /> {plan.deliverySLA}
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  <li className="flex items-start gap-2" style={{ fontSize: "0.82rem", color: BRAND.navy, opacity: 0.6 }}>
                    <Check size={14} color={BRAND.blue} className="mt-0.5 shrink-0" strokeWidth={3} /> {plan.deviceRule}
                  </li>
                  <li className="flex items-start gap-2" style={{ fontSize: "0.82rem", color: BRAND.navy, opacity: 0.6 }}>
                    <Check size={14} color={BRAND.blue} className="mt-0.5 shrink-0" strokeWidth={3} /> {plan.warranty}
                  </li>
                  <li className="flex items-start gap-2" style={{ fontSize: "0.82rem", color: BRAND.navy, opacity: 0.6 }}>
                    <Check size={14} color={BRAND.blue} className="mt-0.5 shrink-0" strokeWidth={3} /> {plan.duration} access
                  </li>
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(plan.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`button-wa-${plan.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full py-3 transition-all"
                    style={{
                      background: "#25D366",
                      color: BRAND.white,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <WhatsAppIcon size={14} color="#fff" /> Order on WhatsApp
                  </a>
                  <a
                    href={config.messenger}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`button-msg-${plan.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full py-2.5 transition-all"
                    style={{
                      background: "#0084FF",
                      color: BRAND.white,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <MessageCircle size={13} color="#fff" /> Or Messenger
                  </a>
                </div>
                <PriceCompare
                  toolName="ChatGPT"
                  planLabel={plan.title}
                  planPriceBDT={plan.priceLabel}
                  accentColor={plan.color === 'blue' ? BRAND.blue : plan.color === 'purple' ? '#7C3AED' : plan.color === 'green' ? '#16A34A' : plan.color === 'orange' ? '#F59E0B' : '#EF4444'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
