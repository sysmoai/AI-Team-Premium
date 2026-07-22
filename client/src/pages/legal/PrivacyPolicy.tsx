import { Layout } from "@/components/layout/Layout";
import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { config } from "@/lib/config";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy — AI Team Premium",
    description: "How AI Team Premium collects, uses, and protects customer data in Bangladesh. Covers WhatsApp orders, bKash/Nagad payment information, and account credentials handling.",
    path: "/privacy-policy",
  });
  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }]} />
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700 }}>Privacy Policy</h1>
          <p className="mt-3" style={{ color: BRAND.navy, opacity: 0.45, fontSize: "0.85rem" }}>Effective date: May 2026 · AI Team Premium · aiteampremium.com</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-10" style={{ color: BRAND.navy, fontSize: "0.92rem", lineHeight: 1.8 }}>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>1. Introduction</h2>
            <p style={{ opacity: 0.65 }}>AI Team Premium ("we", "us", or "our") is committed to protecting your personal data. This Privacy Policy explains what data we collect, how we use it, and your rights. We operate from Dhaka, Bangladesh and serve customers across the country.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>2. Data We Collect</h2>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.65 }}>
              <li style={{ listStyleType: "disc" }}><strong>Identity Data</strong> — your name as provided when ordering.</li>
              <li style={{ listStyleType: "disc" }}><strong>Contact Data</strong> — your WhatsApp number, Facebook Messenger ID, or email address used to contact us.</li>
              <li style={{ listStyleType: "disc" }}><strong>Transaction Data</strong> — the plan(s) you purchased, bKash/Nagad transaction reference numbers (we do not store your bKash PIN or account password).</li>
              <li style={{ listStyleType: "disc" }}><strong>Account Delivery Data</strong> — login credentials or access codes we set up for you (e.g., your ChatGPT account login method).</li>
              <li style={{ listStyleType: "disc" }}><strong>Contact Form Data</strong> — name, WhatsApp number, service interest, and project description submitted via our contact form.</li>
              <li style={{ listStyleType: "disc" }}><strong>Usage Data</strong> — basic web analytics (page views, session duration) via Vite/Replit analytics. We do not use Google Analytics or third-party ad trackers.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>3. How We Use Your Data</h2>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.65 }}>
              <li style={{ listStyleType: "disc" }}>To process and deliver your AI subscription or service.</li>
              <li style={{ listStyleType: "disc" }}>To communicate with you about your order via WhatsApp or Messenger.</li>
              <li style={{ listStyleType: "disc" }}>To provide post-delivery support and warranty service.</li>
              <li style={{ listStyleType: "disc" }}>To send you renewal reminders (WhatsApp only, opt-out available on request).</li>
              <li style={{ listStyleType: "disc" }}>To improve our website and product offerings.</li>
            </ul>
            <p className="mt-3" style={{ opacity: 0.65 }}>We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>4. Data Retention</h2>
            <p style={{ opacity: 0.65 }}>We retain order data for up to 12 months for warranty and support purposes. Contact form submissions are stored in our PostgreSQL database and reviewed only by our support team. You may request deletion at any time by messaging us on WhatsApp.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>5. Payment Data</h2>
            <p style={{ opacity: 0.65 }}>We accept payments via bKash, Nagad, Rocket, and Bank Transfer. We do not store your bKash/Nagad account credentials, PINs, or OTPs. bKash/Nagad transaction reference numbers may be stored to verify payment. All payment instructions are shared privately over WhatsApp — never publicly on the website.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>6. Data Security</h2>
            <p style={{ opacity: 0.65 }}>We use HTTPS for all web communications. Our database is hosted on a secure server with access restricted to authorized personnel only. We never share your account credentials with anyone other than you.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>7. Your Rights</h2>
            <ul className="space-y-2 pl-5" style={{ opacity: 0.65 }}>
              <li style={{ listStyleType: "disc" }}><strong>Access</strong> — request a copy of data we hold about you.</li>
              <li style={{ listStyleType: "disc" }}><strong>Correction</strong> — ask us to correct inaccurate data.</li>
              <li style={{ listStyleType: "disc" }}><strong>Deletion</strong> — ask us to delete your personal data.</li>
              <li style={{ listStyleType: "disc" }}><strong>Opt-out</strong> — unsubscribe from renewal reminders at any time.</li>
            </ul>
            <p className="mt-3" style={{ opacity: 0.65 }}>To exercise any of these rights, contact us on WhatsApp at <a href={config.whatsappGeneral} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.blue }}>+880 1533-262758</a>.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>8. Cookies</h2>
            <p style={{ opacity: 0.65 }}>Our website uses minimal cookies for session management and performance. We do not use advertising or tracking cookies. You can disable cookies in your browser settings without affecting core functionality.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>9. Third-Party Links</h2>
            <p style={{ opacity: 0.65 }}>Our website contains links to external platforms (Facebook, WhatsApp, Instagram). We are not responsible for the privacy practices of these external sites. Please review their respective privacy policies.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>10. Changes to This Policy</h2>
            <p style={{ opacity: 0.65 }}>We may update this Privacy Policy from time to time. Material changes will be communicated via our WhatsApp channel or website notice. The effective date at the top of this page will always reflect the latest version.</p>
          </div>

          <div>
            <h2 className="mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>11. Contact Us</h2>
            <p style={{ opacity: 0.65 }}>For any privacy-related questions or requests, please contact us via WhatsApp at <a href={config.whatsappGeneral} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.blue }}>+880 1533-262758</a> or our <a href="/start-a-project" style={{ color: BRAND.blue }}>contact form</a>. We respond within 5–15 minutes during 9 AM–11 PM BST.</p>
          </div>

        </div>
      </section>
    </Layout>
  );
}
