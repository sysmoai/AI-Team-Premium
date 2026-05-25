import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Clock, ArrowUpRight, MessageCircle } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";

interface ToolPlan {
  label: string;
  price: string;
  period: string;
  delivery: string;
  type: string;
  specs: { label: string; value: string }[];
}

interface ToolDetailProps {
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  icon: LucideIcon;
  features: string[];
  plans: ToolPlan[];
  path?: string;
}

const TOOL_PATH_BY_NAME: Record<string, string> = {
  "ChatGPT": "/tools/chatgpt",
  "Claude Pro": "/tools/claude",
  "Gemini Advanced": "/tools/gemini",
  "Grammarly Premium": "/tools/grammarly",
  "Canva Pro": "/tools/canva",
  "Midjourney": "/tools/midjourney",
  "Perplexity Pro": "/tools/perplexity",
  "Grok Premium": "/tools/grok",
  "GitHub Copilot": "/tools/copilot",
  "AI Tools Vault": "/tools/vault",
};

export function ToolDetail({ name, tagline, description, accentColor, icon: Icon, features, plans, path: pathProp }: ToolDetailProps) {
  const path = pathProp || TOOL_PATH_BY_NAME[name] || `/tools/${name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
  usePageMeta({ title: `${name} Bangladesh — bKash/Nagad`, description, path });

  const minPrice = plans.length
    ? Math.min(...plans.map((p) => parseInt(p.price.replace(/[^0-9]/g, ""), 10) || 9999))
    : 0;
  const cheapestPlan = plans.find((p) => parseInt(p.price.replace(/[^0-9]/g, ""), 10) === minPrice) || plans[0];

  const toolFaqs = [
    { q: `How much does ${name} cost in Bangladesh?`, a: `${name} starts at ${cheapestPlan?.price || "৳399"}${cheapestPlan?.period || "/mo"} from AI Team Premium BD, payable in BDT via bKash or Nagad. No international card needed.` },
    { q: `How do I buy ${name} with bKash or Nagad?`, a: `Message AI Team Premium BD on WhatsApp (+880 1533-262758) with the plan you want. We confirm price, share the bKash/Nagad number privately, and deliver login or invite details within ${cheapestPlan?.delivery || "5–15 minutes"}.` },
    { q: `Is ${name} from AI Team Premium BD official?`, a: `Yes. AI Team Premium BD provides official ${name} subscriptions sourced through legitimate channels. No cracked or fake access — fully working features and a 30-day replacement warranty.` },
    { q: `Can I use ${name} in Bangla?`, a: "Yes. Most premium AI tools sold by AI Team Premium BD — including ChatGPT, Claude, and Gemini — generate high-quality Bangla responses. Our support team also assists in Bangla and English." },
  ];

  return (
    <Layout>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "AI Subscriptions", path: "/ai-subscriptions" },
          { name, path },
        ]}
      />
      <ProductSchema
        name={`${name} Bangladesh`}
        description={description}
        path={path}
        priceBDT={minPrice || 399}
        category="AI Subscription"
        rating={{ value: "4.9", count: "84" }}
      />
      <FAQSchema items={toolFaqs} />
      
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <div className="inline-flex items-center justify-center rounded-2xl mb-6" style={{ width: 64, height: 64, background: `${accentColor}15` }}>
            <Icon size={32} color={accentColor} strokeWidth={1.8} />
          </div>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15 }}>
            {name} <span style={{ color: accentColor }}>{tagline}</span>
          </h1>
          <p className="mt-4 mx-auto max-w-xl" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.95rem", lineHeight: 1.65 }}>
            {description}
          </p>
          {/* DIRECT ANSWER BLOCK (GEO) */}
          <div className="mt-8 mx-auto max-w-2xl rounded-xl p-5 text-left" style={{ background: BRAND.white, border: `1px solid ${accentColor}25` }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              <strong>{name}</strong> is available in Bangladesh from AI Team Premium BD starting at <strong>{cheapestPlan?.price}{cheapestPlan?.period}</strong>, payable in BDT via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>, with <strong>{cheapestPlan?.delivery}</strong> delivery, Bangla + English WhatsApp support, and a 30-day replacement warranty — no international credit card required.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="mb-6" style={{ color: BRAND.navy, fontSize: "1.4rem", fontWeight: 700 }}>Features</h2>
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check size={16} color={accentColor} strokeWidth={3} />
                    <span style={{ color: BRAND.navy, fontSize: "0.92rem", fontWeight: 500 }}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-tool-order-whatsapp"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 transition-all"
                  style={{ background: "#25D366", color: "#fff", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none" }}
                >
                  <WhatsAppIcon size={16} color="#fff" />
                  Order on WhatsApp
                </a>
                <a
                  href={config.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-tool-order-messenger"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 transition-all"
                  style={{ background: "#0084FF", color: "#fff", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none" }}
                >
                  <MessageCircle size={16} color="#fff" />
                  Messenger
                </a>
              </div>
            </div>

            <div className="space-y-5">
              {plans.map((plan) => (
                <div
                  key={plan.label}
                  className="rounded-2xl p-7"
                  style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)", boxShadow: "0 2px 12px rgba(37,99,235,0.04)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 style={{ color: BRAND.navy, fontSize: "1.05rem", fontWeight: 600 }}>{plan.label}</h3>
                    <span className="rounded-full px-2.5 py-0.5 text-white" style={{ background: accentColor, fontSize: "0.65rem", fontWeight: 600 }}>
                      {plan.type}
                    </span>
                  </div>
                  <p style={{ color: BRAND.navy, fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
                    {plan.price}<span style={{ fontSize: "0.85rem", fontWeight: 400, opacity: 0.5 }}>{plan.period}</span>
                  </p>
                  <p className="mt-2 flex items-center gap-1.5" style={{ color: accentColor, fontSize: "0.78rem", fontWeight: 500 }}>
                    <Clock size={13} /> {plan.delivery}
                  </p>
                  <div className="mt-4 pt-4 space-y-2" style={{ borderTop: "1px solid rgba(37,99,235,0.06)" }}>
                    {plan.specs.map((s) => (
                      <div key={s.label} className="flex items-center justify-between" style={{ fontSize: "0.82rem" }}>
                        <span style={{ color: BRAND.navy, opacity: 0.45 }}>{s.label}</span>
                        <span style={{ color: BRAND.navy, fontWeight: 500 }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <a
                      href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(name)}+${plan.type}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-plan-${plan.type.toLowerCase()}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 transition-all"
                      style={{ background: "#25D366", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <WhatsAppIcon size={13} color="#fff" /> WhatsApp
                    </a>
                    <a
                      href={config.messenger}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-plan-messenger-${plan.type.toLowerCase()}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 transition-all"
                      style={{ background: "#0084FF", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <MessageCircle size={13} color="#fff" /> Messenger
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}