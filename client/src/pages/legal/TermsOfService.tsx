import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { config } from "@/lib/config";

export default function TermsOfService() {
  usePageMeta({
    title: "Terms of Service — AI Team Premium BD",
    description: "Terms governing the purchase and use of AI subscriptions and support services from AI Team Premium BD in Bangladesh. Includes usage rules for shared plans, warranty conditions, and dispute resolution.",
    path: "/terms",
  });
  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms" }]} />
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700 }}>Terms of Service</h1>
          <p className="mt-3" style={{ color: BRAND.navy, opacity: 0.45, fontSize: "0.85rem" }}>Effective date: May 2026 · AI Team Premium BD · aiteampremiumbd.com</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-10" style={{ color: BRAND.navy, fontSize: "0.92rem", lineHeight: 1.8 }}>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>1. Acceptance of Terms</h2>
            <p style={{ opacity: 0.65 }}>By accessing <strong>aiteampremiumbd.com</strong>, ordering via WhatsApp (+880 1533-262758), Facebook, or any other channel, you agree to be bound by these Terms of Service. If you do not agree, please do not place an order. These terms apply to all users in Bangladesh and internationally.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>2. Nature of Service</h2>
            <p style={{ opacity: 0.65 }}>AI Team Premium BD acts as a <strong>procurement proxy and reseller</strong> for official AI subscriptions. We do not represent OpenAI, Anthropic, Google, Grammarly, Canva, or any other platform. All subscriptions sold are genuine and official. We are not affiliated with any AI company unless explicitly stated.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>3. Subscriptions & Delivery</h2>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.65 }}>
              <li style={{ listStyleType: "disc" }}>Shared plans (ChatGPT Plus, Claude Pro, etc.) are delivered within <strong>5–15 minutes</strong> of payment confirmation for Plus and Pro tiers.</li>
              <li style={{ listStyleType: "disc" }}>Business workspace plans have a <strong>12-hour</strong> delivery SLA.</li>
              <li style={{ listStyleType: "disc" }}>Personal seat plans are delivered within <strong>2–4 hours</strong>.</li>
              <li style={{ listStyleType: "disc" }}>Bundle plans (AI Tools Vault) are delivered within <strong>6 hours</strong>.</li>
              <li style={{ listStyleType: "disc" }}>Digital service projects (brand design, web development, etc.) follow the timeline specified at the time of quotation.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>4. Payment</h2>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.65 }}>
              <li style={{ listStyleType: "disc" }}>Payments are accepted in BDT via <strong>bKash, Nagad, Rocket, or Bank Transfer</strong>. Payment numbers are shared only via WhatsApp — never publicly.</li>
              <li style={{ listStyleType: "disc" }}>All prices quoted are inclusive of any applicable charges. No hidden fees.</li>
              <li style={{ listStyleType: "disc" }}>For digital service projects, a 50% advance is required before work begins, with the balance due on delivery. For app development, milestones apply (30% / 40% / 30%).</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>5. Refunds & Replacements</h2>
            <p style={{ opacity: 0.65 }}>Subscription fees are <strong>non-refundable</strong> once delivered. We guarantee a <strong>replacement within 24 hours</strong> if a subscription stops working due to our fault. A 30-day warranty covers all shared plans. See our full <a href="/refund-policy" style={{ color: BRAND.blue }}>Refund Policy</a> for complete details.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>6. Shared Account Usage Rules</h2>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.65 }}>
              <li style={{ listStyleType: "disc" }}>Shared plan accounts are limited to <strong>1 device at a time</strong>.</li>
              <li style={{ listStyleType: "disc" }}>Users must <strong>not change the password</strong>, recovery email, phone number, or any account credentials on shared plans. Doing so immediately voids the warranty and may result in termination without refund.</li>
              <li style={{ listStyleType: "disc" }}>Users must not use accounts for activities that violate the AI platform's Terms of Service (e.g., generating illegal content, mass automation abuse).</li>
              <li style={{ listStyleType: "disc" }}>Password access is not provided for shared accounts — we set up secure login for you.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>7. Support Sessions</h2>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.65 }}>
              <li style={{ listStyleType: "disc" }}>AI training sessions are conducted live over Google Meet in Bangla and/or English.</li>
              <li style={{ listStyleType: "disc" }}>Session fees are non-refundable after the session begins, except within the first 15 minutes if we determine we cannot help.</li>
              <li style={{ listStyleType: "disc" }}>No-shows (failure to join within 10 minutes of the scheduled time) forfeit the session fee.</li>
              <li style={{ listStyleType: "disc" }}>Each session includes a custom prompt pack and workflow document.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>8. Intellectual Property</h2>
            <p style={{ opacity: 0.65 }}>All content on this website — text, graphics, logos, and design — is the property of AI Team Premium BD unless otherwise noted. You may not reproduce, distribute, or commercially exploit any content without written permission.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>9. Limitation of Liability</h2>
            <p style={{ opacity: 0.65 }}>AI Team Premium BD is not liable for: (a) changes made by AI platforms (OpenAI, Anthropic, Google, etc.) to their products, pricing, or availability; (b) any indirect, incidental, or consequential damages arising from the use or inability to use our products; (c) data loss, account suspension, or service interruption caused by the underlying AI platforms.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>10. Governing Law</h2>
            <p style={{ opacity: 0.65 }}>These terms are governed by the laws of the People's Republic of Bangladesh. Any disputes shall be resolved first through mutual negotiation; failing that, through arbitration in Dhaka, Bangladesh.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>11. Changes to Terms</h2>
            <p style={{ opacity: 0.65 }}>We reserve the right to update these terms at any time. Material changes will be communicated via our WhatsApp channel or website. Continued use after changes constitutes acceptance.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>12. Contact</h2>
            <p style={{ opacity: 0.65 }}>For questions about these terms, contact us on WhatsApp at <a href="https://wa.me/8801533262758" style={{ color: BRAND.blue }}>+880 1533-262758</a> or via our <a href="/start-a-project" style={{ color: BRAND.blue }}>contact form</a>. We typically respond within 5–15 minutes during 9 AM–11 PM BST.</p>
          </div>

        </div>
      </section>
    </Layout>
  );
}
