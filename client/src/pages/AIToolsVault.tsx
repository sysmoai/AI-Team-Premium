import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, Shield, Zap, Clock, Package, MessageCircle, Star } from "lucide-react";
import { config } from "@/lib/config";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

const INCLUDED = [
  "ChatGPT Plus access (shared seat)",
  "Claude Pro access (shared seat)",
  "Gemini Advanced access (shared seat)",
  "Bundled onboarding guide for all 3 tools",
  "Priority WhatsApp support — single channel for all 3",
  "Setup guide and best-practices doc for each tool",
];

const COMPARISON = [
  { tool: "ChatGPT Plus", individual: "৳2,990", type: "Personal Seat" },
  { tool: "Claude Pro", individual: "৳2,500", type: "Personal Seat" },
  { tool: "Gemini Advanced", individual: "৳1,800", type: "Personal Seat" },
];

const VAULT_FAQS = [
  { q: "What is the AI Tools Vault bundle from AI Team Premium?", a: "The AI Tools Vault is a bundle that gives you shared-seat access to three top AI tools — ChatGPT Plus, Claude Pro, and Gemini Advanced — together for ৳1,990/month, paid in BDT via bKash or Nagad. It includes bundled onboarding, a single WhatsApp support channel, and setup guides for all three tools." },
  { q: "How much does the AI Tools Vault cost in Bangladesh?", a: "The AI Tools Vault costs ৳1,990/month from AI Team Premium. You can pay in BDT using bKash, Nagad, Rocket or Bank Transfer — no international credit card required." },
  { q: "How is the AI Tools Vault value calculated?", a: "If you were to buy a Personal Seat for each tool separately — ChatGPT Plus (৳2,990), Claude Pro (৳2,500), and Gemini Advanced (৳1,800) — you'd pay ৳7,250/month. The Vault gives you shared access to all three for ৳1,990/month, with a single payment and single support channel." },
  { q: "How long does delivery take for the AI Tools Vault?", a: "Vault bundle access is set up within 6 hours after payment confirmation. AI Team Premium confirms via WhatsApp at +880 1533-262758." },
  { q: "Is there a warranty on the AI Tools Vault?", a: "Yes. All three tools carry a 30-day replacement warranty. If any access stops working due to our fault, we replace it within 24 hours at no extra charge." },
  { q: "Can I buy just one tool instead of the full Vault?", a: "Yes. ChatGPT Plus starts at ৳499/mo (shared), Claude Pro at ৳1,495/mo (shared), and Gemini Advanced at ৳899/mo (shared) individually. The Vault is ideal if you regularly need all three tools and want single-channel support and onboarding." },
  { q: "What is the difference between Vault shared access and personal seats?", a: "The Vault provides shared-seat access — you share the account with a small number of other users, but your conversations remain private. Personal seats give you your own dedicated account. If you want full private ownership, buy each tool's Personal Seat separately." },
  { q: "What onboarding do I get with the Vault?", a: "You get a bundled onboarding guide covering the best use cases for all three tools, tips on when to use each AI (ChatGPT for creative/coding, Claude for long documents/analysis, Gemini for Google Workspace tasks), and a prompt starter pack." },
];

export default function AIToolsVault() {
  usePageMeta({
    title: "AI Tools Vault Bangladesh — ChatGPT + Claude + Gemini Bundle ৳1,990/mo",
    description: "Get shared access to ChatGPT Plus, Claude Pro and Gemini Advanced together for ৳1,990/month in Bangladesh. Pay via bKash/Nagad. 6-hour delivery, 30-day warranty. AI Team Premium.",
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
      <ProductSchema
        name="AI Tools Vault Bangladesh — ChatGPT + Claude + Gemini Bundle"
        description="Shared access to ChatGPT Plus, Claude Pro and Gemini Advanced in one bundle for ৳1,990/month. Pay in BDT via bKash or Nagad. 6-hour delivery, 30-day warranty."
        path="/ai-tools-vault"
        priceBDT={1990}
        category="AI Subscription Bundle"
        rating={{ value: "4.8", count: "12" }}
      />
      <section className="pb-8" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl p-5 md:p-6" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.08)" }}>
            <p style={{ color: BRAND.navy, fontSize: "0.95rem", lineHeight: 1.7 }}>
              The <strong>AI Tools Vault</strong> from <strong>AI Team Premium</strong> bundles <strong>ChatGPT Plus + Claude Pro + Gemini Advanced</strong> into a single shared-access plan for <strong>৳1,990/month</strong> in Bangladesh, payable in BDT via <strong>bKash, Nagad, Rocket or Bank Transfer</strong>. Access is delivered within <strong>6 hours</strong>, with a 30-day replacement warranty and priority WhatsApp support — no international credit card required.
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
            AI Tools Vault — <span style={{ color: BRAND.blue }}>৳১,৯৯০</span>/মাস
          </h1>
          <p className="text-lg mb-10 max-w-3xl mx-auto" style={{ color: BRAND.navy, opacity: 0.6 }}>
            ChatGPT Plus + Claude Pro + Gemini Advanced — shared access, one payment, one WhatsApp support channel.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+AI+Tools+Vault+Premium+Access+%E2%98%851990%2Fmo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("AI Tools Vault", undefined, "৳1,990/mo", "vault-hero")}
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
              { icon: <Clock size={16} color={BRAND.blue} />, text: "6hr Delivery" },
              { icon: <Shield size={16} color={BRAND.blue} />, text: "30-Day Warranty" },
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
                <span style={{ color: BRAND.navy, fontSize: "2.8rem", fontWeight: 800 }}>৳1,990</span>
                <span style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.9rem" }}>/month</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 mb-6" style={{ color: BRAND.blue, fontSize: "0.78rem", fontWeight: 500 }}>
                <Clock size={13} /> Delivery: 6 hours
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
                href="https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+AI+Tools+Vault+Premium+Access+%E2%98%851990%2Fmo"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("AI Tools Vault", undefined, "৳1,990/mo", "vault-card")}
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
              <p className="mt-3 text-center text-xs" style={{ color: BRAND.navy, opacity: 0.4 }}>Free replacement or account credit within 24h if access is not delivered.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2" style={{ color: BRAND.navy }}>কেন Vault নেবেন?</h3>
              <p className="mb-4 text-sm" style={{ color: BRAND.navy, opacity: 0.65, lineHeight: 1.7 }}>
                তিনটি AI tool আলাদাভাবে Personal Seat হিসেবে কিনলে মাসে ৳৭,২৫০ খরচ হয়। Vault-এ Shared access পাবেন মাত্র <strong>৳১,৯৯০-এ</strong> — একটি payment, একটি WhatsApp support channel, এবং bundled onboarding।
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
                        <td className="px-5 py-3 text-right font-medium" style={{ color: BRAND.navy }}>{row.individual}/mo</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `2px solid rgba(37,99,235,0.15)`, background: BRAND.sky }}>
                      <td className="px-5 py-3 font-bold" style={{ color: BRAND.navy }}>Total (3 Personal Seats)</td>
                      <td className="px-5 py-3 text-right font-bold" style={{ color: "#EF4444" }}>৳7,250/mo</td>
                    </tr>
                    <tr style={{ background: BRAND.blue }}>
                      <td className="px-5 py-3 font-bold text-white">🎁 Vault Bundle (Shared)</td>
                      <td className="px-5 py-3 text-right font-bold text-white">৳1,990/mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="mt-5 rounded-xl p-4"
                style={{ background: "rgba(37,99,235,0.06)", border: `1px solid rgba(37,99,235,0.15)` }}
              >
                <p className="text-sm font-semibold" style={{ color: BRAND.navy }}>⚡ Vault-এর সুবিধা</p>
                <ul className="mt-2 space-y-1.5">
                  {["একটি payment — ৩টি tool সক্রিয়", "একটি WhatsApp channel — সব support", "Bundled onboarding — সব tool একসাথে শিখুন", "Shared access — affordable entry point"].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm" style={{ color: BRAND.navy, opacity: 0.7 }}>
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
              href="https://wa.me/8801533262758?text=Hi%2C+I+want+to+buy+AI+Tools+Vault+Premium+Access+%E2%98%851990%2Fmo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("AI Tools Vault", undefined, "৳1,990/mo", "vault-bottom-cta")}
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
