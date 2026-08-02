import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Shield, Zap, Clock, Package, MessageCircle, Star } from "lucide-react";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

const INCLUDED = [
  "ChatGPT Plus access (shared seat)",
  "Claude Pro access (shared seat)",
  "Gemini Advanced access (shared seat)",
  "Bundled onboarding guide for all 3 tools",
  "Priority WhatsApp support — single channel for all 3",
  "Setup guide and best-practices doc for each tool",
];

// Personal-seat prices, taken from products-catalog.json. Claude Pro was listed
// here at ৳2,500 and Gemini at ৳1,800 — neither matched the catalog, and the
// ৳7,250 total below was the sum of those wrong figures, which understated the
// comparison the whole section exists to make.
const COMPARISON = [
  { tool: "ChatGPT Plus", individualBdt: 2990, type: "Personal Seat" },
  { tool: "Claude Pro", individualBdt: 2990, type: "Personal Seat" },
  { tool: "Google AI Pro (Gemini Advanced)", individualBdt: 3390, type: "Personal Seat" },
];

const bdt = (n: number) => `৳${n.toLocaleString("en-US")}`;
const COMPARISON_TOTAL = COMPARISON.reduce((s, r) => s + r.individualBdt, 0);

// The Bangla section quotes the same comparison total in Bangla numerals. It had
// been typed separately and was left at ৳৭,২৫০ when the English figure was
// corrected to the real catalog sum — understating the comparison by ৳2,120 for
// every Bangla-reading visitor. Deriving it from COMPARISON_TOTAL means the two
// cannot disagree again.
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const bnBdt = (n: number) =>
  `৳${n.toLocaleString("en-US").replace(/\d/g, (d) => BN_DIGITS[Number(d)])}`;

// FAQ answers rewritten 2026-08-02 alongside the Vault quarantine.
//
// Every price was removed, not replaced with a different number: the bundle has
// no approved price while its access model is unevidenced, and an FAQ answer is
// exactly the kind of place a stale figure survives a reprice. The delivery-time
// and warranty answers are gone for the same reason the claims were withdrawn —
// nothing on record establishes either.
//
// The "what is shared access" answer is kept and expanded, because a customer
// evaluating this bundle needs that explanation more than ever now that we are
// telling them we are still verifying it.
const VAULT_FAQS = [
  { q: "What is the AI Tools Vault bundle from AI Team Premium?", a: "The AI Tools Vault bundles access to three widely used AI tools — ChatGPT Plus, Claude Pro and Gemini Advanced — with bundled onboarding, a single WhatsApp support channel and setup guidance for all three." },
  { q: "How much does the AI Tools Vault cost in Bangladesh?", a: "We are not publishing a price for the Vault at the moment. We are confirming exactly how access to each of the three tools is delivered and what the current provider terms allow, and we would rather answer that properly than publish a figure we are still checking. Ask us on WhatsApp and we will tell you where that review stands and what we can offer today." },
  { q: "Why is there no price shown right now?", a: "The Vault provides shared access, and we are reviewing our shared-access products one by one against each provider's current terms. Until that review is finished for these three tools, we are not quoting a fixed bundle price. This is a deliberate pause, not a stock problem." },
  { q: "What is the difference between shared access and a personal seat?", a: "A personal seat is an account of your own: you own it, you control the email and password recovery, and nobody else uses it. Shared access means an account is used by more than one person. That difference matters for privacy, for who can recover the account, and for what the provider's terms permit — which is precisely what we are currently verifying." },
  { q: "Can I buy the tools individually instead?", a: "Yes, and for some people that is the better answer regardless of price — a personal seat you own outright behaves differently from shared access. Each tool has its own page with its current availability. Ask us if you would like help choosing between them." },
  { q: "What onboarding is included?", a: "A bundled onboarding guide covering practical use cases for all three tools, guidance on which tool suits which kind of work (ChatGPT for creative and coding work, Claude for long documents and analysis, Gemini for Google Workspace tasks), and a prompt starter pack." },
];

export default function AIToolsVault() {
  usePageMeta({
    title: "AI Tools Vault Bangladesh — ChatGPT + Claude + Gemini Bundle",
    description: "ChatGPT Plus, Claude Pro and Gemini Advanced in one bundle with shared onboarding and a single support channel. Pricing and availability confirmed after plan verification — ask on WhatsApp.",
    path: "/ai-tools-vault",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "AI Subscriptions", path: "/ai-subscriptions" },
        { name: "AI Tools Vault", path: "/ai-tools-vault" },
      ]} />
      <FAQSchema items={VAULT_FAQS} />
      {/*
        ProductSchema deliberately not emitted while the Vault is quarantined.
        A Product/Offer node is a machine-readable statement that a thing is for
        sale at a price. Emitting one for a bundle we are not currently selling
        at a fixed price would be misleading structured data — and search engines
        act on it, which is how a withdrawn price ends up in a result snippet
        long after the page stops showing it.
        Restore this together with VAULT_QUARANTINE.quarantined = false.
      */}
      <section className="pb-8" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl p-5 md:p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              The <strong>AI Tools Vault</strong> from <strong>AI Team Premium</strong> bundles <strong>ChatGPT Plus + Claude Pro + Gemini Advanced</strong> into a single shared-access plan, payable in BDT via <strong>bKash, Nagad, Rocket or Bank Transfer</strong> — no international credit card required. We are currently confirming how access to each of the three tools is delivered and what the providers' present terms allow, so <strong>pricing and availability are confirmed after plan verification</strong>. Ask us on WhatsApp and we will tell you where that stands.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(37,99,235,0.1)", color: BRAND.blue, fontSize: "0.78rem", fontWeight: 600 }}>
            <Package size={13} /> Bundle · 3 Premium AI Tools · 1 Payment
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            AI Tools Vault — <span style={{ color: BRAND.blue }}>দাম জানতে যোগাযোগ করুন</span>
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            ChatGPT Plus + Claude Pro + Gemini Advanced — shared access, one payment, one WhatsApp support channel.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+to+ask+about+the+AI+Tools+Vault+bundle"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("AI Tools Vault", undefined, "price-on-request", "vault-hero")}
              data-testid="button-hero-vault"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick("AI Tools Vault", "vault-hero")}
              data-testid="button-hero-vault-messenger"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-base"
              style={{ background: "#0084FF" }}
            >
              <MessageCircle size={18} color="#fff" /> Messenger
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 border-b" style={{ background: BRAND.white }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Package size={16} color={BRAND.blue} />, text: "3 Tools in 1" },
              { icon: <Clock size={16} color={BRAND.blue} />, text: "After Plan Verified" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "Verification Pending" },
              { icon: <Zap size={16} color={BRAND.blue} />, text: "bKash / Nagad" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 py-3">
                {item.icon}
                <span style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div
              className="rounded-2xl p-8 relative"
              style={{ background: BRAND.white, border: `2px solid ${BRAND.blue}`, boxShadow: "0 8px 32px rgba(37,99,235,0.12)" }}
            >
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-4 py-1 text-white"
                style={{ background: BRAND.blue, fontSize: "0.72rem", fontWeight: 700 }}
              >
                <Star size={11} fill="#fff" /> 3 Tools · 1 Bundle
              </span>
              <h2 style={{ color: BRAND.navy, fontSize: "1.3rem", fontWeight: 700 }}>AI Tools Vault</h2>
              <p className="mt-1" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.8rem" }}>3 Premium AI Tools — Shared Access</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span style={{ color: BRAND.navy, fontSize: "1.5rem", fontWeight: 700 }}>Request current price</span>
                <span style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.9rem" }}>/month</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 mb-6" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.78rem", fontWeight: 500 }}>
                <Clock size={13} /> Delivery: confirmed after order
              </div>
              <ul className="space-y-3 mb-8">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5" style={{ fontSize: "0.88rem", color: BRAND.navy, opacity: 0.75 }}>
                    <Check size={15} color={BRAND.blue} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/8801533262758?text=Hi%2C+I+want+to+ask+about+the+AI+Tools+Vault+bundle"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("AI Tools Vault", undefined, "price-on-request", "vault-card")}
                data-testid="button-order-vault"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-base"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} color="#fff" /> Order on WhatsApp
              </a>
              <a
                href={config.messenger}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMessengerClick("AI Tools Vault", "vault-card")}
                data-testid="button-order-vault-messenger"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 font-semibold text-white text-sm"
                style={{ background: "#0084FF" }}
              >
                <MessageCircle size={14} color="#fff" /> Or message on Messenger
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: BRAND.navy, opacity: 0.4 }}>Availability and terms confirmed after plan verification.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">কেন Vault নেবেন?</h3>
              <p className="mb-4 text-sm text-slate-900/65 dark:text-slate-300" style={{ lineHeight: 1.7 }}>
                তিনটি AI tool আলাদাভাবে Personal Seat হিসেবে কিনলে মাসে {bnBdt(COMPARISON_TOTAL)} খরচ হয়। Vault-এ Shared access-এর <strong>দাম যাচাইয়ের পর জানানো হবে</strong> — একটি payment, একটি WhatsApp support channel, এবং bundled onboarding।
              </p>
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(37,99,235,0.10)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: BRAND.sky }}>
                      <th className="text-left px-5 py-3 font-semibold" style={{ color: BRAND.navy }}>Tool</th>
                      <th className="text-right px-5 py-3 font-semibold" style={{ color: BRAND.navy }}>Personal Seat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row, i) => (
                      <tr key={row.tool} style={{ borderTop: "1px solid rgba(37,99,235,0.06)", background: i % 2 === 0 ? BRAND.white : "rgba(239,246,255,0.4)" }}>
                        <td className="px-5 py-3" style={{ color: BRAND.navy, opacity: 0.75 }}>{row.tool}</td>
                        <td className="px-5 py-3 text-right font-medium" style={{ color: BRAND.navy }}>{bdt(row.individualBdt)}/mo</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `2px solid rgba(37,99,235,0.15)`, background: BRAND.sky }}>
                      <td className="px-5 py-3 font-bold" style={{ color: BRAND.navy }}>Total (3 Personal Seats)</td>
                      <td className="px-5 py-3 text-right font-bold" style={{ color: "#EF4444" }}>{bdt(COMPARISON_TOTAL)}/mo</td>
                    </tr>
                    <tr style={{ background: BRAND.blue }}>
                      <td className="px-5 py-3 font-bold text-white">🎁 Vault Bundle (Shared)</td>
                      <td className="px-5 py-3 text-right font-bold text-white">Request price</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="mt-5 rounded-xl p-4"
                style={{ background: "rgba(37,99,235,0.06)", border: `1px solid rgba(37,99,235,0.15)` }}
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">⚡ Vault-এর সুবিধা</p>
                <ul className="mt-2 space-y-1.5">
                  {["একটি payment — ৩টি tool সক্রিয়", "একটি WhatsApp channel — সব support", "Bundled onboarding — সব tool একসাথে শিখুন", "Shared access — affordable entry point"].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-900/70 dark:text-slate-300">
                      <Check size={13} color={BRAND.blue} className="mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">অর্ডার করতে প্রস্তুত?</h2>
          <p className="text-white/50 mb-8">WhatsApp বা Messenger-এ মেসেজ করুন — ৫ মিনিটে সাড়া পাবেন।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+to+ask+about+the+AI+Tools+Vault+bundle"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("AI Tools Vault", undefined, "price-on-request", "vault-bottom-cta")}
              data-testid="button-final-cta"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white text-lg"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={20} color="#fff" /> WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick("AI Tools Vault", "vault-bottom-cta")}
              data-testid="button-final-cta-messenger"
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
