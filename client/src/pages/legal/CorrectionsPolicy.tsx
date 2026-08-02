import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function CorrectionsPolicy() {
  usePageMeta({
    title: "Corrections Policy | AI Team Premium",
    description: "How AI Team Premium handles corrections: we fix errors promptly, publish corrections publicly when warranted, and never silently edit substantive mistakes.",
    path: "/corrections",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Corrections Policy", path: "/corrections" },
      ]} />
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            Corrections <span style={{ color: BRAND.blue }}>Policy</span>
          </h1>
          <p className="text-lg" style={{ color: BRAND.navy, opacity: 0.6 }}>
            We fix mistakes. Here is exactly how, when, and why.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our approach to errors</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              This website contains prices, product descriptions, comparisons, blog posts, and guidance about AI tools. Any of them can contain errors — an outdated official price, a feature that changed, a typo in a Bangla translation, a broken link.
            </p>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              When we find an error, we fix it. When the error was substantive — a wrong price that someone may have relied on, a claim we cannot support, a factual inaccuracy that could mislead — we acknowledge the correction. We do not silently edit mistakes and pretend they never happened.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">What counts as "substantive"</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>A published price that was incorrect and could have influenced a purchase decision.</li>
              <li>A claim of official partnership, endorsement, or authorization that we cannot evidence.</li>
              <li>A comparison figure (e.g., savings percentage) that was factually wrong.</li>
              <li>A delivery time, warranty term, or refund policy stated incorrectly on a product page.</li>
              <li>A factual statement about a provider's product that the provider's own documentation contradicts.</li>
            </ul>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              Typos, formatting fixes, grammar improvements, and Bangla translation refinements that do not change meaning are not substantive and will not be separately announced. We fix them quietly, the way you would notice a spelling mistake in your own document and correct it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">How we handle corrections</h2>
            <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li><strong>Fix the error.</strong> The incorrect content is updated on the live site as quickly as possible — typically within hours of discovery.</li>
              <li><strong>Record the correction.</strong> We maintain an internal audit log of every substantive correction: what was wrong, what it was changed to, when, and why.</li>
              <li><strong>Disclose when warranted.</strong> If the error was public and could have affected customer decisions, we publish a correction note on this page with the date, the affected content, and what changed.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Recent corrections</h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4" style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.10)" }}>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">2026-08-02</p>
                <p className="text-slate-700 dark:text-slate-300 mt-1">
                  <strong>CapCut Pro pricing:</strong> A previously published price of ৳399 was withdrawn after review identified a conflict with a recorded pricing decision. The product now shows "Request Price" while the correct basis is confirmed. No customer was charged the withdrawn price during the review period.
                </p>
              </div>
              <div className="rounded-lg p-4" style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.10)" }}>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">2026-08-02</p>
                <p className="text-slate-700 dark:text-slate-300 mt-1">
                  <strong>Notion Business discount claim:</strong> A "73% Off" badge was removed from the Notion Business monthly product. The savings percentage was not computationally derived from an evidenced cost basis. The product now shows "Request Price" while the pricing basis is reviewed.
                </p>
              </div>
              <div className="rounded-lg p-4" style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.10)" }}>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">2026-07-31</p>
                <p className="text-slate-700 dark:text-slate-300 mt-1">
                  <strong>AI Tools Vault pricing:</strong> Product schema and pricing claims for the Vault bundle were removed from structured data. The bundle's commercial basis is under review. The page remains accessible while compliance is verified.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Report an error</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you spot something wrong — a price that does not match the provider's official page, a feature description that is incorrect, a Bangla translation that miscommunicates — please tell us on WhatsApp at <strong>+880 1533-262758</strong> or email <strong>support@aiteampremium.com</strong>. We will verify it and fix it, and if it was substantive, we will publish the correction here.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
