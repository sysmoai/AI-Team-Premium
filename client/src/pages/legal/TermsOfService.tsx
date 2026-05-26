import { Layout } from "@/components/layout/Layout";
import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

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
          <p className="mt-3" style={{ color: BRAND.navy, opacity: 0.45, fontSize: "0.85rem" }}>Last updated: May 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-8" style={{ color: BRAND.navy, fontSize: "0.92rem", lineHeight: 1.8 }}>
          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>1. Terms</h2>
            <p style={{ opacity: 0.6 }}>By accessing the website at aitpbd.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>2. Subscriptions & Delivery</h2>
            <p style={{ opacity: 0.6 }}>When purchasing an AI tool subscription (e.g., ChatGPT Plus, Claude Pro) through AITPBD, you acknowledge that we are acting as a procurement proxy. Delivery of credentials or account upgrades will typically occur within 5 minutes to 6 hours depending on the plan type.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>3. Payment & Refunds</h2>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.6 }}>
              <li style={{ listStyleType: "disc" }}>Payments are accepted via bKash, Nagad, or Bank Transfer.</li>
              <li style={{ listStyleType: "disc" }}>Refunds for subscriptions are evaluated case-by-case and only provided if the service is undeliverable.</li>
              <li style={{ listStyleType: "disc" }}>For digital services (web design, marketing), milestone payments are non-refundable once the specific milestone is approved.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>4. Account Usage</h2>
            <p style={{ opacity: 0.6 }}>If you purchase a "Shared" account, you agree not to change the password or account details. Violation of this will result in immediate termination without refund. For "Personal" accounts, you maintain full control.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>5. Limitations</h2>
            <p style={{ opacity: 0.6 }}>In no event shall AI Team Premium BD or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials or services.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}