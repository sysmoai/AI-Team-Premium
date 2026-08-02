import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function PricingHowItWorks() {
  usePageMeta({
    title: "Pricing — How It Works | AI Team Premium",
    description: "How AI Team Premium sets prices: official USD cost, Bangladesh exchange rate, service margin, and what 'Request Price' means. Transparent, no hidden fees.",
    path: "/pricing-how-it-works",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Pricing — How It Works", path: "/pricing-how-it-works" },
      ]} />
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            Pricing — <span style={{ color: BRAND.blue }}>How It Works</span>
          </h1>
          <p className="text-lg" style={{ color: BRAND.navy, opacity: 0.6 }}>
            Transparent, honest, and straightforward — no hidden fees, no surprise charges.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Where do the prices come from?</h2>
            <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              Every price you see on AI Team Premium is built from three components:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li><strong>Official provider price (USD).</strong> We check the provider's public pricing page and record the current official rate. This is the number the provider publishes — we do not invent it or guess it.</li>
              <li><strong>Bangladesh currency conversion.</strong> We convert the official USD price to BDT using a consistent exchange rate. This covers what it actually costs us to acquire the subscription in a currency Bangladeshi cards cannot directly pay.</li>
              <li><strong>Service and delivery margin.</strong> We add a margin to cover payment processing, account setup, WhatsApp support, replacement handling, and the fact that someone is available to help you when something goes wrong — in Bangla, during Bangladesh hours.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">What "Request Price" means</h2>
            <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              Some products show "Request Price" instead of a fixed BDT amount. This happens when:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>The provider's official pricing has changed recently and we are verifying the new rate.</li>
              <li>The access model (shared, personal, workspace seat) affects the cost, and we need to understand your specific situation before quoting.</li>
              <li>We are reviewing the provider's terms of service to confirm the access arrangement is compliant before publishing a price.</li>
              <li>The product is a bundle or custom configuration where the price depends on exactly what you need.</li>
            </ul>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              "Request Price" is not a sales tactic. It means we would rather be honest about not knowing a final number yet than publish one we cannot stand behind. Message us on WhatsApp and we will tell you exactly what we know.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Prices can change</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Providers raise and lower their official prices. When that happens, our prices may change too — up or down. We update prices as quickly as we can after verifying the change. If you ordered at one price and the provider raised theirs before we could update, you are not charged the difference — we absorb that risk. If a price drops, contact us and we will tell you what the new rate is for your next purchase.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">What you will never be charged</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li><strong>No sign-up fees.</strong> The price you see is the price you pay.</li>
              <li><strong>No hidden taxes.</strong> Prices include everything — we do not add VAT or surcharges at checkout.</li>
              <li><strong>No auto-renewal without your consent.</strong> We will remind you before renewal. We never charge a card automatically.</li>
              <li><strong>No cancellation penalties.</strong> If you want to stop, just stop. No contract, no minimum term, no exit fee.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Payment methods</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We accept bKash, Nagad, Rocket, and bank transfer — all in Bangladeshi Taka (BDT). We do not accept international cards because you should not need one to buy an AI subscription in Bangladesh. Payment is made directly to a personal number we share on WhatsApp — never posted publicly, to protect you from scam lookalikes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Questions?</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Message us on WhatsApp at <strong>+880 1533-262758</strong>. We will answer pricing questions directly — no script, no bot, no "kindly wait." 
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
