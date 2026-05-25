import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Clock, Check, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { chatgptPlans } from "@/lib/plans";
import { config } from "@/lib/config";
import { BreadcrumbSchema, JsonLd } from "@/components/seo/JsonLd";

const SUBS = [
  { name: "ChatGPT Plus", type: "Shared", price: "৳399", period: "/mo", delivery: "5-15 min", link: "/tools/chatgpt" },
  { name: "Claude Pro", type: "Shared", price: "৳599", period: "/mo", delivery: "5-15 min", link: "/tools/claude" },
  { name: "Gemini Advanced", type: "Shared", price: "৳499", period: "/mo", delivery: "5-15 min", link: "/tools/gemini" },
  { name: "Grammarly Premium", type: "Private", price: "৳800", period: "/mo", delivery: "1-2 hr", link: "/tools/grammarly" },
  { name: "Perplexity Pro", type: "Shared", price: "৳599", period: "/mo", delivery: "5-15 min", link: "/tools/perplexity" },
  { name: "Grok Premium", type: "Shared", price: "৳699", period: "/mo", delivery: "5-15 min", link: "/tools/grok" },
  { name: "Midjourney", type: "Shared", price: "৳1,200", period: "/mo", delivery: "5-15 min", link: "/tools/midjourney" },
  { name: "Canva Pro", type: "Team", price: "৳350", period: "/mo", delivery: "5-15 min", link: "/tools/canva" },
  { name: "GitHub Copilot", type: "Private", price: "৳1,200", period: "/mo", delivery: "2-4 hr", link: "/tools/copilot" },
  { name: "AI Tools Vault", type: "Bundle", price: "৳1,990", period: "/mo", delivery: "6 hr", link: "/tools/vault" },
];

export default function AISubscriptions() {
  usePageMeta({
    title: "All AI Subscriptions in Bangladesh — ChatGPT, Claude, Gemini & 10+ Tools",
    description: "Browse all premium AI subscriptions in Bangladesh — ChatGPT Plus (৳399/mo), Claude Pro, Gemini Advanced, Grammarly, Canva, Midjourney, Perplexity & more. Pay via bKash/Nagad. 5–15 min delivery.",
    path: "/ai-subscriptions",
  });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AI Subscriptions Available in Bangladesh from AI Team Premium BD",
    "numberOfItems": SUBS.length,
    "itemListElement": SUBS.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://aiteampremiumbd.com${s.link}`,
      "name": `${s.name} Bangladesh`,
    })),
  };

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "AI Subscriptions", path: "/ai-subscriptions" }]} />
      <JsonLd data={itemListSchema} />
      <section className="py-8" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="rounded-2xl p-6 md:p-7" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "1rem", lineHeight: 1.7, fontWeight: 500 }}>
              <strong>AI Team Premium BD</strong> sells 10+ official premium AI subscriptions in Bangladesh — <strong>ChatGPT Plus from ৳399/mo</strong>, Claude Pro (৳599), Gemini Advanced (৳499), Grammarly Premium, Canva Pro, Midjourney, Perplexity Pro, Grok Premium, GitHub Copilot, and the AI Tools Vault bundle — payable in BDT via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>, with 5–15 minute delivery and a 30-day replacement warranty.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>AI Subscriptions</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15 }}>
            বাংলাদেশে ChatGPT — ৳৩৯৯ থেকে শুরু
          </h1>
          <p className="mt-4 mx-auto max-w-xl" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.95rem", lineHeight: 1.65 }}>
            Pay via bKash / Nagad. No international credit card. Delivered fast.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* ChatGPT Plans first from lib */}
            {chatgptPlans.map((sub, i) => (
              <div
                key={`chatgpt-${i}`}
                className="flex flex-col rounded-2xl p-6"
                style={{ background: BRAND.white, border: sub.badge === "Most Popular" ? `2px solid ${BRAND.blue}` : "1px solid rgba(37,99,235,0.06)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 600 }}>{sub.title}</h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-white"
                    style={{ background: sub.color === 'blue' ? BRAND.blue : sub.color === 'purple' ? '#7C3AED' : sub.color === 'green' ? '#16A34A' : sub.color === 'orange' ? '#F59E0B' : '#EF4444', fontSize: "0.65rem", fontWeight: 600 }}
                  >
                    {sub.tier}
                  </span>
                </div>
                <p style={{ color: BRAND.navy, fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>
                  {sub.priceLabel}
                </p>
                <ul className="mt-4 space-y-2 flex-1">
                  <li className="flex items-center gap-2" style={{ fontSize: "0.8rem", color: BRAND.navy, opacity: 0.55 }}>
                    <Check size={13} color={BRAND.blue} strokeWidth={3} /> {sub.deviceRule}
                  </li>
                  <li className="flex items-center gap-2" style={{ fontSize: "0.8rem", color: BRAND.navy, opacity: 0.55 }}>
                    <Check size={13} color={BRAND.blue} strokeWidth={3} /> {sub.warranty}
                  </li>
                  <li className="flex items-center gap-2" style={{ fontSize: "0.8rem", color: BRAND.blue }}>
                    <Clock size={13} strokeWidth={2} /> {sub.deliverySLA} delivery
                  </li>
                </ul>
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(sub.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-wa-chatgpt-${i}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 transition-all"
                      style={{ background: "#25D366", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <WhatsAppIcon size={13} color="#fff" /> WhatsApp
                    </a>
                    <a
                      href={config.messenger}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-msg-chatgpt-${i}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 transition-all"
                      style={{ background: "#0084FF", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <MessageCircle size={13} color="#fff" /> Messenger
                    </a>
                  </div>
                  <Link
                    href={`/tools/chatgpt`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full py-2 transition-all"
                    style={{ border: `1px solid ${BRAND.blue}`, color: BRAND.blue, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}
                  >
                    Details <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            ))}

            {/* Other tools */}
            {SUBS.filter(s => s.name !== "ChatGPT Plus").map((sub, i) => (
              <div
                key={`other-${i}`}
                className="flex flex-col rounded-2xl p-6"
                style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 600 }}>{sub.name}</h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-white"
                    style={{ background: BRAND.blue, fontSize: "0.65rem", fontWeight: 600 }}
                  >
                    {sub.type}
                  </span>
                </div>
                <p style={{ color: BRAND.navy, fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>
                  {sub.price}<span style={{ fontSize: "0.78rem", fontWeight: 400, opacity: 0.5 }}>{sub.period}</span>
                </p>
                <ul className="mt-4 space-y-2 flex-1">
                  <li className="flex items-center gap-2" style={{ fontSize: "0.8rem", color: BRAND.navy, opacity: 0.55 }}>
                    <Check size={13} color={BRAND.blue} strokeWidth={3} /> Official access
                  </li>
                  <li className="flex items-center gap-2" style={{ fontSize: "0.8rem", color: BRAND.navy, opacity: 0.55 }}>
                    <Check size={13} color={BRAND.blue} strokeWidth={3} /> Replacement guarantee
                  </li>
                  <li className="flex items-center gap-2" style={{ fontSize: "0.8rem", color: BRAND.blue }}>
                    <Clock size={13} strokeWidth={2} /> {sub.delivery} delivery
                  </li>
                </ul>
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+${encodeURIComponent(sub.name)}+${sub.type}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-wa-other-${i}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 transition-all"
                      style={{ background: "#25D366", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <WhatsAppIcon size={13} color="#fff" /> WhatsApp
                    </a>
                    <a
                      href={config.messenger}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-msg-other-${i}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 transition-all"
                      style={{ background: "#0084FF", color: BRAND.white, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      <MessageCircle size={13} color="#fff" /> Messenger
                    </a>
                  </div>
                  <Link
                    href={sub.link}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full py-2 transition-all"
                    style={{ border: `1px solid ${BRAND.blue}`, color: BRAND.blue, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}
                  >
                    Details <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl p-8 text-center" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.06)" }}>
            <h3 style={{ color: BRAND.navy, fontSize: "1.1rem", fontWeight: 600 }}>Need a tool not listed here?</h3>
            <p className="mt-2" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.88rem" }}>We can procure almost any digital subscription for you.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <a
                href="https://wa.me/8801533262758?text=Hi%2C+I+need+a+custom+AI+tool+subscription"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-custom-wa"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-all"
                style={{ background: "#25D366", color: BRAND.white, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
              >
                <WhatsAppIcon size={14} color="#fff" /> WhatsApp
              </a>
              <a
                href={config.messenger}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-custom-msg"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-all"
                style={{ background: "#0084FF", color: BRAND.white, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
              >
                <MessageCircle size={14} color="#fff" /> Messenger
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
