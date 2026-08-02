import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function NonAffiliation() {
  usePageMeta({
    title: "Third-Party Trademark & Non-Affiliation Disclosure | AI Team Premium",
    description: "AI Team Premium is an independent subscription facilitator. We are not officially affiliated with, endorsed by, or authorised resellers of any AI provider whose subscriptions we help you access.",
    path: "/non-affiliation",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Non-Affiliation Disclosure", path: "/non-affiliation" },
      ]} />
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            Third-Party Trademark & <span style={{ color: BRAND.blue }}>Non-Affiliation</span>
          </h1>
          <p className="text-lg" style={{ color: BRAND.navy, opacity: 0.6 }}>
            Important disclosure about our relationship with AI providers.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          <div className="rounded-xl p-6" style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.15)" }}>
            <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">We are independent</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              AI Team Premium is an <strong>independent subscription facilitator</strong> operating in Bangladesh. We help customers access premium AI tools, pay in Bangladeshi Taka (BDT) through bKash, Nagad, and Rocket, and receive local support in Bangla and English.
            </p>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              We are <strong>not</strong> officially affiliated with, endorsed by, sponsored by, or authorised resellers of OpenAI, Anthropic, Google, xAI, Midjourney, Perplexity, Canva, Grammarly, Adobe, Microsoft, Notion, GitHub, ByteDance, or any other AI provider whose products appear on this website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Trademarks belong to their owners</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              All product names, logos, brands, and trademarks displayed on this website are the property of their respective owners. Use of these names does not imply endorsement or partnership. We reference them to accurately describe the subscriptions we help facilitate — the same way a phone shop might display "iPhone" to tell you what they sell.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">What we actually do</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>We help you choose the right AI subscription for your needs.</li>
              <li>We handle the payment in BDT so you do not need an international credit card.</li>
              <li>We assist with account setup, security configuration, and ongoing support.</li>
              <li>We provide replacement and troubleshooting support in Bangla during Bangladesh hours.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">What we do NOT claim</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>We do not claim to be an "official partner," "authorised reseller," or "certified distributor" of any provider.</li>
              <li>We do not speak on behalf of any AI provider or represent their views.</li>
              <li>We do not offer warranties or guarantees that the providers themselves do not offer.</li>
              <li>We do not control provider uptime, feature changes, pricing changes, or account actions taken by the provider.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Why this matters</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Transparency about who we are — and who we are not — is essential to trust. You deserve to know exactly what relationship stands behind every subscription you buy. If you are ever unsure whether a claim on this site is accurate, ask us directly on WhatsApp. We will give you the honest answer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Corrections</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If any provider believes their trademark or product is misrepresented on this site, please contact us at <strong>support@aiteampremium.com</strong>. We will review and correct the issue promptly.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
