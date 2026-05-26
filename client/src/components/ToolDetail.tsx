import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Clock, MessageCircle, ShieldCheck, Zap, CreditCard, Headphones, ChevronDown, Image, Video } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";
import { PriceCompare } from "@/components/PriceCompare";
import { LastVerifiedStamp } from "@/components/LastVerifiedStamp";
import { useState } from "react";

interface ToolPlan {
  label: string;
  price: string;
  period: string;
  delivery: string;
  type: string;
  specs: { label: string; value: string }[];
}

interface SpecTableRow {
  label: string;
  free: string;
  pro: string;
  premium?: string;
}

interface SpecTable {
  title: string;
  emoji: string;
  tier2Label?: string;
  tier3Label?: string;
  rows: SpecTableRow[];
}

interface UseCase {
  emoji: string;
  title: string;
  who: string;
  makes: string;
  timeSaved: string;
  prompt: string;
}

interface CompetitorRow {
  feature: string;
  thisProduct: string;
  chatgpt: string;
  claude: string;
  gemini: string;
}

interface PromptWorkflow {
  step: number;
  label: string;
  prompt: string;
  result: string;
}

interface DeepDiveSection {
  type: "image" | "video";
  intro: string;
  workflows: PromptWorkflow[];
  tips: string[];
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
  specTables?: SpecTable[];
  useCases?: UseCase[];
  competitorRows?: CompetitorRow[];
  extendedFaqs?: { q: string; a: string }[];
  deepDive?: DeepDiveSection;
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
  "SuperGrok": "/tools/supergrok",
  "GitHub Copilot": "/tools/copilot",
  "AI Tools Vault": "/tools/vault",
  "Google AI Pro": "/tools/google-ai-pro",
  "Leonardo AI": "/tools/leonardo",
  "Runway ML": "/tools/runway",
  "Kling AI": "/tools/kling",
};

const TRUST_ITEMS = [
  { icon: CreditCard, label: "bKash / Nagad" },
  { icon: Zap, label: "5–15 min delivery" },
  { icon: ShieldCheck, label: "30-day warranty" },
  { icon: Headphones, label: "Bangla + English support" },
];

export function ToolDetail({ name, tagline, description, accentColor, icon: Icon, features, plans, path: pathProp, specTables, useCases, competitorRows, extendedFaqs, deepDive }: ToolDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const path = pathProp || TOOL_PATH_BY_NAME[name] || `/tools/${name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
  usePageMeta({ title: `${name} Bangladesh — bKash/Nagad`, description, path });

  const minPrice = plans.length
    ? Math.min(...plans.map((p) => parseInt(p.price.replace(/[^0-9]/g, ""), 10) || 9999))
    : 0;
  const cheapestPlan = plans.find((p) => parseInt(p.price.replace(/[^0-9]/g, ""), 10) === minPrice) || plans[0];

  const autoFaqs = [
    { q: `How much does ${name} cost in Bangladesh?`, a: `${name} starts at ${cheapestPlan?.price || "৳399"}${cheapestPlan?.period || "/mo"} from AI Team Premium BD, payable in BDT via bKash or Nagad. No international card needed.` },
    { q: `How do I buy ${name} with bKash or Nagad?`, a: `Message AI Team Premium BD on WhatsApp (+880 1533-262758) with the plan you want. We confirm price, share the bKash/Nagad number privately, and deliver login or invite details within ${cheapestPlan?.delivery || "5–15 minutes"}.` },
    { q: `Is ${name} from AI Team Premium BD official?`, a: `Yes. AI Team Premium BD provides official ${name} subscriptions sourced through legitimate channels. No cracked or fake access — fully working features and a 30-day replacement warranty.` },
    { q: `Can I use ${name} in Bangla?`, a: "Yes. Most premium AI tools sold by AI Team Premium BD — including ChatGPT, Claude, and Gemini — generate high-quality Bangla responses. Our support team also assists in Bangla and English." },
  ];
  const toolFaqs = extendedFaqs ? [...autoFaqs, ...extendedFaqs] : autoFaqs;

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

      />
      <FAQSchema items={toolFaqs} />

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${BRAND.navy} 0%, #1a2d5a 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, background: accentColor, opacity: 0.07, borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -60, width: 320, height: 320, background: BRAND.blue, opacity: 0.05, borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none" }} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24 text-center">
          <div className="inline-flex items-center justify-center rounded-3xl mb-7" style={{ width: 88, height: 88, background: `${accentColor}1A`, border: `1.5px solid ${accentColor}38` }}>
            <Icon size={44} color={accentColor} strokeWidth={1.4} />
          </div>
          <h1 style={{ color: BRAND.white, fontSize: "clamp(1.9rem, 4.5vw, 3.1rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.022em" }}>
            {name}{" "}
            <span style={{ color: accentColor }}>{tagline}</span>
          </h1>
          <p className="mt-5 mx-auto max-w-lg" style={{ color: "rgba(255,255,255,0.52)", fontSize: "1.02rem", lineHeight: 1.75 }}>
            {description}
          </p>
          <div className="mt-5 flex justify-center">
            <LastVerifiedStamp toolName={name} />
          </div>
          <div className="mt-8 mx-auto max-w-2xl rounded-2xl p-5 text-left" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${accentColor}28` }}>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.93rem", lineHeight: 1.72 }}>
              <strong style={{ color: BRAND.white }}>{name}</strong> is available in Bangladesh from AI Team Premium BD starting at{" "}
              <strong style={{ color: accentColor }}>{cheapestPlan?.price}{cheapestPlan?.period}</strong>, payable via{" "}
              <strong style={{ color: BRAND.white }}>bKash, Nagad or Bank Transfer</strong> — no international card required. Delivery in{" "}
              <strong style={{ color: BRAND.white }}>{cheapestPlan?.delivery}</strong> with a 30-day replacement warranty and Bangla + English WhatsApp support.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(name)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-tool-order-whatsapp"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all"
              style={{ background: "#25D366", color: "#fff", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
            >
              <WhatsAppIcon size={17} color="#fff" />
              Order on WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-tool-order-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 transition-all"
              style={{ background: "#0084FF", color: "#fff", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
            >
              <MessageCircle size={17} color="#fff" />
              Messenger
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, background: `linear-gradient(to top, ${BRAND.white}, transparent)` }} />
      </section>

      {/* TRUST BAR */}
      <section className="py-5">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4 px-6 py-5" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.07)" }}>
            {TRUST_ITEMS.map(({ icon: TIcon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="flex-shrink-0 inline-flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: `${BRAND.blue}14` }}>
                  <TIcon size={15} color={BRAND.blue} strokeWidth={2} />
                </div>
                <span style={{ color: BRAND.navy, fontSize: "0.8rem", fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES + PLANS */}
      <section className="py-16 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Features */}
            <div>
              <h2 className="mb-7" style={{ color: BRAND.navy, fontSize: "1.45rem", fontWeight: 700 }}>What's Included</h2>
              <div className="grid gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3 rounded-xl p-4 transition-all" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.06)" }}>
                    <div className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5" style={{ width: 24, height: 24, background: `${accentColor}18` }}>
                      <Check size={13} color={accentColor} strokeWidth={3} />
                    </div>
                    <span style={{ color: BRAND.navy, fontSize: "0.9rem", fontWeight: 500, lineHeight: 1.45 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plans */}
            <div>
              <h2 className="mb-7" style={{ color: BRAND.navy, fontSize: "1.45rem", fontWeight: 700 }}>Choose a Plan</h2>
              <div className="space-y-5">
                {plans.map((plan, idx) => (
                  <div
                    key={plan.label}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      boxShadow: idx === 0 ? `0 8px 32px ${accentColor}1E` : "0 2px 12px rgba(37,99,235,0.05)",
                      border: idx === 0 ? `1.5px solid ${accentColor}42` : "1px solid rgba(37,99,235,0.09)",
                    }}
                  >
                    <div style={{ height: 4, background: idx === 0 ? `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` : "rgba(37,99,235,0.1)" }} />
                    <div className="p-7" style={{ background: BRAND.white }}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 style={{ color: BRAND.navy, fontSize: "1.02rem", fontWeight: 600 }}>{plan.label}</h3>
                        <span
                          className="rounded-full px-3 py-0.5"
                          style={{ background: idx === 0 ? accentColor : "#64748b", color: "#fff", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.05em" }}
                        >
                          {plan.type}
                        </span>
                      </div>
                      <p style={{ color: BRAND.navy, fontSize: "2.3rem", fontWeight: 800, lineHeight: 1 }}>
                        {plan.price}
                        <span style={{ fontSize: "0.82rem", fontWeight: 400, opacity: 0.42 }}>{plan.period}</span>
                      </p>
                      <p className="mt-2.5 flex items-center gap-1.5" style={{ color: accentColor, fontSize: "0.78rem", fontWeight: 600 }}>
                        <Clock size={13} /> {plan.delivery}
                      </p>
                      <div className="mt-4 pt-4 space-y-2" style={{ borderTop: "1px solid rgba(37,99,235,0.07)" }}>
                        {plan.specs.map((s) => (
                          <div key={s.label} className="flex items-center justify-between" style={{ fontSize: "0.82rem" }}>
                            <span style={{ color: BRAND.navy, opacity: 0.45 }}>{s.label}</span>
                            <span style={{ color: BRAND.navy, fontWeight: 500 }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex gap-2.5">
                        <a
                          href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(name)}+${plan.type}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`button-plan-${plan.type.toLowerCase()}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 transition-all"
                          style={{ background: "#25D366", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                        >
                          <WhatsAppIcon size={13} color="#fff" /> Order on WhatsApp
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
                      <PriceCompare
                        toolName={name}
                        planLabel={plan.label}
                        planPriceBDT={plan.price}
                        accentColor={accentColor}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-TIER SPEC TABLES (optional) */}
      {specTables && specTables.length > 0 && (
        <section className="py-16" style={{ background: BRAND.sky }}>
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="text-center mb-3" style={{ color: BRAND.navy, fontSize: "1.5rem", fontWeight: 700 }}>
              Full Feature Breakdown
            </h2>
            <p className="text-center mb-10" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.9rem" }}>
              Compare Free · Shared · Personal tiers side by side
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {specTables.map((table) => {
                const hasThreeTiers = table.rows.some((r) => r.premium !== undefined);
                const tier2 = table.tier2Label || "Shared / Pro";
                const tier3 = table.tier3Label || "Personal";
                return (
                  <div key={table.title} className="rounded-2xl overflow-hidden" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
                    <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${accentColor}0D`, borderBottom: `1px solid ${accentColor}18` }}>
                      <span style={{ fontSize: "1.25rem" }}>{table.emoji}</span>
                      <h3 style={{ color: BRAND.navy, fontSize: "0.95rem", fontWeight: 700 }}>{table.title}</h3>
                    </div>
                    <table className="w-full" style={{ borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(37,99,235,0.06)" }}>
                          <th className="text-left px-5 py-2.5" style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", width: hasThreeTiers ? "36%" : "42%" }}>Feature</th>
                          <th className="text-center px-2 py-2.5" style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Free</th>
                          <th className="text-center px-2 py-2.5" style={{ color: accentColor, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{tier2}</th>
                          {hasThreeTiers && (
                            <th className="text-center px-2 py-2.5" style={{ color: "#7C3AED", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{tier3}</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, i) => (
                          <tr key={row.label} style={{ borderBottom: i < table.rows.length - 1 ? "1px solid rgba(37,99,235,0.05)" : "none" }}>
                            <td className="px-5 py-3" style={{ color: BRAND.navy, fontSize: "0.8rem", fontWeight: 500 }}>{row.label}</td>
                            <td className="px-2 py-3 text-center" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.78rem" }}>{row.free}</td>
                            <td className="px-2 py-3 text-center" style={{ color: accentColor, fontSize: "0.78rem", fontWeight: 600 }}>{row.pro}</td>
                            {hasThreeTiers && (
                              <td className="px-2 py-3 text-center" style={{ color: "#7C3AED", fontSize: "0.78rem", fontWeight: 600 }}>{row.premium ?? "—"}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* IMAGE / VIDEO GEN DEEP DIVE (optional) */}
      {deepDive && (
        <section className="py-16" style={{ background: BRAND.white }}>
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center rounded-2xl" style={{ width: 44, height: 44, background: `${accentColor}15`, border: `1.5px solid ${accentColor}30` }}>
                {deepDive.type === "image" ? <Image size={22} color={accentColor} strokeWidth={1.5} /> : <Video size={22} color={accentColor} strokeWidth={1.5} />}
              </div>
              <h2 style={{ color: BRAND.navy, fontSize: "1.5rem", fontWeight: 700 }}>
                {deepDive.type === "image" ? "Image Generation Deep Dive" : "Video Generation Deep Dive"}
              </h2>
            </div>
            <p className="text-center mb-12 mx-auto max-w-2xl" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.92rem", lineHeight: 1.7 }}>
              {deepDive.intro}
            </p>

            {/* Step-by-step workflows */}
            <div className="space-y-5 mb-12">
              {deepDive.workflows.map((wf) => (
                <div key={wf.step} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(37,99,235,0.07)" }}>
                  <div className="flex items-center gap-4 px-6 py-4" style={{ background: `${accentColor}08`, borderBottom: `1px solid ${accentColor}12` }}>
                    <div className="flex-shrink-0 inline-flex items-center justify-center rounded-full text-white text-sm font-bold" style={{ width: 32, height: 32, background: accentColor, fontSize: "0.82rem" }}>
                      {wf.step}
                    </div>
                    <h3 style={{ color: BRAND.navy, fontSize: "0.95rem", fontWeight: 700 }}>{wf.label}</h3>
                  </div>
                  <div className="px-6 py-5 grid md:grid-cols-2 gap-6" style={{ background: BRAND.white }}>
                    <div>
                      <p style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Prompt</p>
                      <div className="rounded-xl px-4 py-3" style={{ background: "#0F172A05", border: "1px solid rgba(37,99,235,0.08)", fontFamily: "monospace" }}>
                        <p style={{ color: BRAND.navy, fontSize: "0.8rem", lineHeight: 1.6 }}>{wf.prompt}</p>
                      </div>
                    </div>
                    <div>
                      <p style={{ color: accentColor, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Result</p>
                      <div className="rounded-xl px-4 py-3" style={{ background: `${accentColor}07`, border: `1px solid ${accentColor}18` }}>
                        <p style={{ color: BRAND.navy, fontSize: "0.82rem", lineHeight: 1.65 }}>{wf.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro tips */}
            <div className="rounded-2xl p-7" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.07)" }}>
              <h3 className="mb-5" style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 700 }}>
                {deepDive.type === "image" ? "🎨" : "🎬"} Pro Tips for Bangladeshi Creators
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {deepDive.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}>
                    <div className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5" style={{ width: 22, height: 22, background: `${accentColor}15` }}>
                      <Check size={12} color={accentColor} strokeWidth={3} />
                    </div>
                    <span style={{ color: BRAND.navy, fontSize: "0.82rem", lineHeight: 1.55 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* USE CASES (optional) */}
      {useCases && useCases.length > 0 && (
        <section className="py-16" style={{ background: deepDive ? BRAND.sky : BRAND.white }}>
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="text-center mb-3" style={{ color: BRAND.navy, fontSize: "1.5rem", fontWeight: 700 }}>
              Real Use Cases — What You Can Make
            </h2>
            <p className="text-center mb-12" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.92rem" }}>
              Concrete examples for students, freelancers and businesses in Bangladesh
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {useCases.map((uc) => (
                <div key={uc.title} className="rounded-2xl p-6" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.07)" }}>
                  <div className="text-3xl mb-3">{uc.emoji}</div>
                  <h3 className="mb-2" style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 700 }}>{uc.title}</h3>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-start gap-2">
                      <span style={{ color: BRAND.blue, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0, paddingTop: 2 }}>WHO</span>
                      <span style={{ color: BRAND.navy, opacity: 0.65, fontSize: "0.8rem" }}>{uc.who}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: BRAND.blue, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0, paddingTop: 2 }}>MAKES</span>
                      <span style={{ color: BRAND.navy, fontSize: "0.8rem", fontWeight: 500 }}>{uc.makes}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: accentColor, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0, paddingTop: 2 }}>SAVES</span>
                      <span style={{ color: accentColor, fontSize: "0.8rem", fontWeight: 600 }}>{uc.timeSaved}</span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl px-4 py-3" style={{ background: `${accentColor}0A`, border: `1px solid ${accentColor}18` }}>
                    <p style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>EXAMPLE PROMPT</p>
                    <p style={{ color: BRAND.navy, fontSize: "0.78rem", fontStyle: "italic", lineHeight: 1.5 }}>&ldquo;{uc.prompt}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPETITOR TABLE (optional) */}
      {competitorRows && competitorRows.length > 0 && (
        <section className="py-16" style={{ background: BRAND.sky }}>
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="text-center mb-10" style={{ color: BRAND.navy, fontSize: "1.5rem", fontWeight: 700 }}>
              {name} vs Competitors — Who Wins Where?
            </h2>
            <div className="rounded-2xl overflow-x-auto" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
              <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ background: `${accentColor}0D`, borderBottom: `1.5px solid ${accentColor}22` }}>
                    <th className="text-left px-6 py-4" style={{ color: BRAND.navy, fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Feature</th>
                    <th className="px-4 py-4 text-center" style={{ color: accentColor, fontSize: "0.78rem", fontWeight: 700 }}>{name}</th>
                    <th className="px-4 py-4 text-center" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.78rem", fontWeight: 700 }}>ChatGPT</th>
                    <th className="px-4 py-4 text-center" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.78rem", fontWeight: 700 }}>Claude</th>
                    <th className="px-4 py-4 text-center" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.78rem", fontWeight: 700 }}>Gemini</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorRows.map((row, i) => (
                    <tr key={row.feature} style={{ borderBottom: i < competitorRows.length - 1 ? "1px solid rgba(37,99,235,0.05)" : "none" }}>
                      <td className="px-6 py-3.5" style={{ color: BRAND.navy, fontSize: "0.85rem", fontWeight: 600 }}>{row.feature}</td>
                      <td className="px-4 py-3.5 text-center" style={{ color: accentColor, fontSize: "0.82rem", fontWeight: 600 }}>{row.thisProduct}</td>
                      <td className="px-4 py-3.5 text-center" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.82rem" }}>{row.chatgpt}</td>
                      <td className="px-4 py-3.5 text-center" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.82rem" }}>{row.claude}</td>
                      <td className="px-4 py-3.5 text-center" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.82rem" }}>{row.gemini}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQ ACCORDION */}
      <section className="py-16" style={{ background: competitorRows ? BRAND.white : BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="mb-8 text-center" style={{ color: BRAND.navy, fontSize: "1.4rem", fontWeight: 700 }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {toolFaqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.07)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  style={{ cursor: "pointer", background: "none", border: "none" }}
                  data-testid={`faq-toggle-${i}`}
                >
                  <span style={{ color: BRAND.navy, fontSize: "0.92rem", fontWeight: 600, flex: 1 }}>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    color={BRAND.blue}
                    style={{
                      flexShrink: 0,
                      marginLeft: 12,
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5" style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.88rem", lineHeight: 1.65 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="py-20" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to order {name}?</h2>
          <p className="text-white/50 mb-8">WhatsApp বা Messenger-এ মেসেজ করুন — ৫ মিনিটে সাড়া পাবেন।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(name)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-tool-final-cta-whatsapp"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={20} color="#fff" /> Order on WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-tool-final-cta-messenger"
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
