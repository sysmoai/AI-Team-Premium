import { Layout } from "@/components/layout/Layout";
import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy — AI Team Premium BD",
    description: "How AI Team Premium BD collects, uses, and protects customer data in Bangladesh. Covers WhatsApp orders, bKash/Nagad payment information, and account credentials handling.",
    path: "/privacy-policy",
  });
  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }]} />
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700 }}>Privacy Policy</h1>
          <p className="mt-3" style={{ color: BRAND.navy, opacity: 0.45, fontSize: "0.85rem" }}>Last updated: May 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-8" style={{ color: BRAND.navy, fontSize: "0.92rem", lineHeight: 1.8 }}>
          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>1. Introduction</h2>
            <p style={{ opacity: 0.6 }}>Welcome to AI Team Premium BD. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>2. Data We Collect</h2>
            <p className="mb-3" style={{ opacity: 0.6 }}>We may collect, use, store and transfer different kinds of personal data about you:</p>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.6 }}>
              <li style={{ listStyleType: "disc" }}><strong>Identity Data</strong> — first name, last name, username or similar identifier.</li>
              <li style={{ listStyleType: "disc" }}><strong>Contact Data</strong> — email address and telephone numbers (WhatsApp).</li>
              <li style={{ listStyleType: "disc" }}><strong>Transaction Data</strong> — details about payments and products/services you have purchased from us.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>3. How We Use Your Data</h2>
            <p style={{ opacity: 0.6 }}>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling your AI subscription), and where it is necessary for our legitimate interests.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>4. Data Security</h2>
            <p style={{ opacity: 0.6 }}>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>5. Contact Us</h2>
            <p style={{ opacity: 0.6 }}>If you have any questions about this privacy policy, please contact us via our WhatsApp line (+880 1533-262758) or contact form.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}