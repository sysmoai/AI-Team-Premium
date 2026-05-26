import { Link, useParams, useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema, FAQSchema, JsonLd } from "@/components/seo/JsonLd";
import { COMPARE_TOOLS, POPULAR_PAIRS, parseComparePair, recommend, type CompareTool } from "@/lib/tool-compare";
import { config } from "@/lib/config";
import { Check, ArrowRight, Trophy, Sparkles, Scale } from "lucide-react";

export default function ComparePage() {
  const { slug } = useParams<{ slug?: string }>();
  const [, setLocation] = useLocation();

  if (!slug) return <ComparisonHub onPick={(s) => setLocation(`/compare/${s}`)} />;
  const pair = parseComparePair(slug);
  if (!pair) return <ComparisonNotFound slug={slug} />;
  return <ComparisonDetail a={pair.a} b={pair.b} slug={slug} />;
}

function ComparisonNotFound({ slug }: { slug: string }) {
  usePageMeta({
    title: "Comparison not found | AITPBD",
    description: "We don't have this AI tool comparison yet. Browse popular comparisons from AI Team Premium BD.",
    path: `/compare/${slug}`,
  });
  return (
    <Layout>
      <section className="py-24" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 800 }}>Comparison not found</h1>
          <p className="mt-3" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem" }}>
            We don't have a <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>{slug}</code> comparison.
            Slugs must look like <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>tool-a-vs-tool-b</code>.
          </p>
          <Link href="/compare" data-testid="link-back-hub" className="mt-6 inline-block rounded-xl px-5 py-2.5" style={{ background: BRAND.blue, color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>
            Browse all comparisons →
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function ComparisonHub({ onPick }: { onPick: (slug: string) => void }) {
  usePageMeta({
    title: "Compare AI Tools — ChatGPT vs Claude vs Gemini in Bangladesh | AITPBD",
    description: "Side-by-side AI tool comparisons. ChatGPT vs Claude, Midjourney vs Leonardo, Runway vs Kling and more — pick the right premium AI for your Bangladesh workflow.",
    path: "/compare",
  });
  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Compare AI Tools", path: "/compare" }]} />
      <section className="py-16" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p style={{ color: "#7DD3FC", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>Compare AI Tools</p>
          <h1 className="mt-4" style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.1 }}>
            Which AI tool is right for you?
          </h1>
          <p className="mt-5 mx-auto max-w-2xl" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Side-by-side spec, price and use-case comparisons of every premium AI tool we sell in Bangladesh. Pick a popular comparison below.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <h2 className="mb-6" style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>Popular comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POPULAR_PAIRS.map(([a, b]) => {
              const ta = COMPARE_TOOLS[a];
              const tb = COMPARE_TOOLS[b];
              if (!ta || !tb) return null;
              const slug = `${a}-vs-${b}`;
              return (
                <button
                  key={slug}
                  onClick={() => onPick(slug)}
                  data-testid={`button-pair-${slug}`}
                  className="text-left rounded-xl p-4 transition-all"
                  style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.12)" }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ color: BRAND.navy, fontWeight: 700, fontSize: "0.95rem" }}>
                      {ta.name} <span style={{ color: BRAND.navy, opacity: 0.45 }}>vs</span> {tb.name}
                    </span>
                    <ArrowRight size={16} color={BRAND.blue} />
                  </div>
                  <p className="mt-2" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.78rem" }}>
                    {ta.priceFromLabel} vs {tb.priceFromLabel}
                  </p>
                </button>
              );
            })}
          </div>
          <h2 className="mt-12 mb-4" style={{ color: BRAND.navy, fontSize: "1.05rem", fontWeight: 700 }}>Build your own comparison</h2>
          <p style={{ color: BRAND.navy, opacity: 0.65, fontSize: "0.9rem" }}>
            Any URL like <code style={{ background: BRAND.sky, padding: "2px 6px", borderRadius: 4 }}>/compare/<i>tool-a</i>-vs-<i>tool-b</i></code> works.
            Available tools: {Object.values(COMPARE_TOOLS).map((t) => t.slug).join(", ")}.
          </p>
        </div>
      </section>
    </Layout>
  );
}

function ToolHead({ tool, isWinner }: { tool: CompareTool; isWinner: boolean }) {
  const Icon = tool.icon;
  return (
    <div className="rounded-2xl p-6 text-center relative" style={{ background: "#fff", border: `2px solid ${isWinner ? tool.accent : "rgba(37,99,235,0.08)"}` }}>
      {isWinner && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-3 py-1" style={{ background: tool.accent, color: "#fff", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.05em" }}>
          <Trophy size={11} /> RECOMMENDED
        </div>
      )}
      <div className="inline-flex items-center justify-center rounded-2xl mb-3" style={{ width: 56, height: 56, background: `${tool.accent}15`, border: `1.5px solid ${tool.accent}38` }}>
        <Icon size={28} color={tool.accent} strokeWidth={1.6} />
      </div>
      <h3 style={{ color: BRAND.navy, fontSize: "1.15rem", fontWeight: 700 }}>{tool.name}</h3>
      <p style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.78rem", marginTop: 2 }}>by {tool.brand}</p>
      <p className="mt-2" style={{ color: BRAND.navy, opacity: 0.7, fontSize: "0.82rem", lineHeight: 1.5 }}>{tool.tagline}</p>
      <div className="mt-4 rounded-lg py-2" style={{ background: `${tool.accent}10` }}>
        <span style={{ color: tool.accent, fontSize: "1.4rem", fontWeight: 800 }}>{tool.priceFromLabel}</span>
      </div>
      <Link
        href={tool.toolPath}
        data-testid={`link-tool-${tool.slug}`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
        style={{ border: "1px solid rgba(15,23,42,0.15)", color: BRAND.navy, background: "#fff" }}
      >
        View {tool.name} →
      </Link>
    </div>
  );
}

function specRows(a: CompareTool, b: CompareTool) {
  return [
    { label: "Starting price (BDT)", a: a.priceFromLabel, b: b.priceFromLabel },
    { label: "Underlying AI model", a: a.specs.model, b: b.specs.model },
    { label: "Context window", a: a.specs.contextWindow, b: b.specs.contextWindow },
    { label: "Inputs supported", a: a.specs.multimodal, b: b.specs.multimodal },
    { label: "Bangla language quality", a: a.specs.banglaQuality, b: b.specs.banglaQuality },
    { label: "Speed", a: a.specs.speed, b: b.specs.speed },
    { label: "Overall accuracy", a: a.specs.accuracy, b: b.specs.accuracy },
    { label: "Best use case", a: a.specs.bestUseCase, b: b.specs.bestUseCase },
    { label: "Pricing tier", a: a.specs.pricingTier, b: b.specs.pricingTier },
  ];
}

function ComparisonDetail({ a, b, slug }: { a: CompareTool; b: CompareTool; slug: string }) {
  const rec = recommend(a, b);
  const winner: CompareTool | null = rec.kind === "winner" ? (rec.winnerSlug === a.slug ? a : b) : null;
  const title = `${a.name} vs ${b.name} in Bangladesh — Price, Features, Verdict | AITPBD`;
  const description = `Side-by-side comparison of ${a.name} (${a.priceFromLabel}) and ${b.name} (${b.priceFromLabel}). Specs, Bangla quality, best use cases and which to buy from AI Team Premium BD.`;
  usePageMeta({ title, description, path: `/compare/${slug}` });

  const faqs = [
    { q: `Which is better: ${a.name} or ${b.name}?`, a: rec.reason },
    { q: `What is the price difference between ${a.name} and ${b.name} in Bangladesh?`, a: `From AI Team Premium BD, ${a.name} starts at ${a.priceFromLabel} and ${b.name} starts at ${b.priceFromLabel}. Both are payable via bKash or Nagad with 5–15 minute delivery and a 30-day replacement warranty.` },
    { q: `Can I use ${a.name} and ${b.name} in Bangla?`, a: `${a.name}: ${a.specs.banglaQuality}. ${b.name}: ${b.specs.banglaQuality}.` },
    { q: `How do I buy ${a.name} or ${b.name} in Bangladesh?`, a: `Message AI Team Premium BD on WhatsApp (+880 1533-262758) with the tool and plan you want. We send the bKash/Nagad number privately, confirm payment, and deliver login or invite details within 5–15 minutes.` },
  ];

  const rows = specRows(a, b);

  return (
    <Layout>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Compare AI Tools", path: "/compare" },
          { name: `${a.name} vs ${b.name}`, path: `/compare/${slug}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ComparisonPage",
          "name": `${a.name} vs ${b.name}`,
          "about": [
            { "@type": "Product", "name": a.name, "brand": a.brand },
            { "@type": "Product", "name": b.name, "brand": b.brand },
          ],
        }}
      />

      {/* HERO */}
      <section style={{ background: BRAND.navy }} className="py-14">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <Link href="/compare" data-testid="link-back-compare" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem" }}>
            ← All comparisons
          </Link>
          <h1 className="mt-3" style={{ color: "#fff", fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)", fontWeight: 800, lineHeight: 1.1 }}>
            <span style={{ color: a.accent }}>{a.name}</span>{" "}
            <span style={{ color: "rgba(255,255,255,0.4)" }}>vs</span>{" "}
            <span style={{ color: b.accent }}>{b.name}</span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.98rem", lineHeight: 1.65 }}>
            Side-by-side comparison from AI Team Premium BD — specs, prices in BDT, Bangla support and a recommended pick for Bangladeshi users.
          </p>
        </div>
      </section>

      {/* HEADER CARDS */}
      <section className="py-10" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ToolHead tool={a} isWinner={winner?.slug === a.slug} />
          <ToolHead tool={b} isWinner={winner?.slug === b.slug} />
        </div>
      </section>

      {/* RECOMMENDATION */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          {winner ? (
            <div className="rounded-2xl p-6" style={{ background: `${winner.accent}08`, border: `1.5px solid ${winner.accent}30` }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} color={winner.accent} />
                <h2 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>Our pick: {winner.name}</h2>
              </div>
              <p style={{ color: BRAND.navy, opacity: 0.78, fontSize: "0.95rem", lineHeight: 1.65 }}>{rec.reason}</p>
              <a
                href={`${config.whatsappUrl}?text=${encodeURIComponent(`Hi AITPBD — I read your ${a.name} vs ${b.name} comparison. Please send pricing for ${winner.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-whatsapp-winner"
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5"
                style={{ background: "#25D366", color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}
              >
                <WhatsAppIcon size={16} /> Get {winner.name} on WhatsApp
              </a>
            </div>
          ) : (
            <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1.5px solid rgba(37,99,235,0.18)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Scale size={18} color={BRAND.blue} />
                <h2 style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>It depends on your goal</h2>
              </div>
              <p style={{ color: BRAND.navy, opacity: 0.78, fontSize: "0.95rem", lineHeight: 1.65 }}>{rec.reason}</p>
              <a
                href={`${config.whatsappUrl}?text=${encodeURIComponent(`Hi AITPBD — I read your ${a.name} vs ${b.name} comparison. Please help me pick the right one for my use case.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-whatsapp-advice"
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5"
                style={{ background: "#25D366", color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}
              >
                <WhatsAppIcon size={16} /> Ask AITPBD which is right for you
              </a>
            </div>
          )}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-10" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <h2 className="mb-5" style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>Spec-by-spec breakdown</h2>
          <div className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.08)" }}>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: BRAND.navy }}>
                    <th className="text-left px-4 py-3" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Feature</th>
                    <th className="text-left px-4 py-3" style={{ color: a.accent, fontSize: "0.85rem", fontWeight: 700 }}>{a.name}</th>
                    <th className="text-left px-4 py-3" style={{ color: b.accent, fontSize: "0.85rem", fontWeight: 700 }}>{b.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.label} style={{ borderTop: "1px solid rgba(37,99,235,0.06)", background: i % 2 === 0 ? "#fff" : "#fafbff" }} data-testid={`row-spec-${r.label.toLowerCase().replace(/\s+/g, "-")}`}>
                      <td className="px-4 py-3" style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 600 }}>{r.label}</td>
                      <td className="px-4 py-3" style={{ color: BRAND.navy, opacity: 0.8, fontSize: "0.85rem" }}>{r.a}</td>
                      <td className="px-4 py-3" style={{ color: BRAND.navy, opacity: 0.8, fontSize: "0.85rem" }}>{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* BEST FOR / WEAKNESSES */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[a, b].map((t) => (
            <div key={t.slug} className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.08)" }}>
              <h3 style={{ color: t.accent, fontSize: "1rem", fontWeight: 700 }}>{t.name} — best for</h3>
              <ul className="mt-3 space-y-2">
                {t.bestFor.map((b1) => (
                  <li key={b1} className="flex items-start gap-2" style={{ color: BRAND.navy, opacity: 0.78, fontSize: "0.86rem", lineHeight: 1.55 }}>
                    <Check size={14} color={t.accent} className="mt-1 flex-shrink-0" /> <span>{b1}</span>
                  </li>
                ))}
              </ul>
              <h4 className="mt-5" style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Watch out for</h4>
              <ul className="mt-2 space-y-1">
                {t.weaknesses.map((w) => (
                  <li key={w} style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.8rem", lineHeight: 1.5 }}>· {w}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* OTHER COMPARISONS */}
      <section className="py-10" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <h2 className="mb-5" style={{ color: BRAND.navy, fontSize: "1.05rem", fontWeight: 700 }}>Compare with other tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {POPULAR_PAIRS.filter(([x, y]) => `${x}-vs-${y}` !== slug).slice(0, 8).map(([x, y]) => {
              const tx = COMPARE_TOOLS[x]; const ty = COMPARE_TOOLS[y];
              if (!tx || !ty) return null;
              return (
                <Link key={`${x}-vs-${y}`} href={`/compare/${x}-vs-${y}`} data-testid={`link-related-${x}-vs-${y}`}>
                  <div className="rounded-lg px-3 py-2 text-center" style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.1)", fontSize: "0.78rem", color: BRAND.navy, fontWeight: 600 }}>
                    {tx.name.split(" ")[0]} vs {ty.name.split(" ")[0]}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="mb-5" style={{ color: BRAND.navy, fontSize: "1.2rem", fontWeight: 700 }}>FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl p-4" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.08)" }} data-testid={`faq-${f.q.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`}>
                <h3 style={{ color: BRAND.navy, fontSize: "0.9rem", fontWeight: 700 }}>{f.q}</h3>
                <p className="mt-1.5" style={{ color: BRAND.navy, opacity: 0.7, fontSize: "0.85rem", lineHeight: 1.6 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
