import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function IncidentEscalation() {
  usePageMeta({
    title: "Incident & Escalation Process",
    description: "What to do if you experience an access issue, account problem, or security concern with your AI subscription. Step-by-step escalation process with response times.",
    path: "/incident-escalation",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Incident & Escalation", path: "/incident-escalation" },
      ]} />
      <section className="py-20" style={{ backgroundColor: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ color: BRAND.navy }}>
            Incident & <span style={{ color: BRAND.blue }}>Escalation</span>
          </h1>
          <p className="text-lg" style={{ color: BRAND.navy, opacity: 0.6 }}>
            If something goes wrong, here is exactly what to do and what to expect.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Step 1: Message on WhatsApp</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              WhatsApp is our primary support channel. Message <strong>+880 1533-262758</strong> and describe what happened. Include:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>Which subscription this is about (e.g., "ChatGPT Plus Shared")</li>
              <li>When the issue started</li>
              <li>What you see on your screen (screenshot if possible)</li>
              <li>Your order reference if you have one</li>
            </ul>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Response time:</strong> Under 2 hours during business hours (9 AM – 9 PM Bangladesh time, 7 days a week). Outside business hours, we respond the next morning.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Step 2: If WhatsApp is not suitable</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Email <strong>support@aiteampremium.com</strong> with the same details. Email is checked during business hours. Response may take up to 4 hours.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Common issues and what we do</h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.10)" }}>
                <h3 className="font-semibold text-slate-900 dark:text-white">Cannot log in</h3>
                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">We check the account status, verify no one changed the password, and reissue credentials if needed. For personal accounts where you control recovery, we guide you through the provider's recovery process.</p>
              </div>
              <div className="rounded-lg p-4" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.10)" }}>
                <h3 className="font-semibold text-slate-900 dark:text-white">Account suspended or restricted</h3>
                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">We investigate the cause and work with the provider if applicable. If the suspension is due to usage policy violation, we explain what happened and what can be done. Replacement eligibility depends on the specific situation and our replacement policy.</p>
              </div>
              <div className="rounded-lg p-4" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.10)" }}>
                <h3 className="font-semibold text-slate-900 dark:text-white">Feature not working as expected</h3>
                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">We verify whether the feature is included in your plan, whether the provider has a known outage or change, and whether a workaround exists. If the feature was advertised on our site but is genuinely unavailable on your plan, we address it under our corrections policy.</p>
              </div>
              <div className="rounded-lg p-4" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.10)" }}>
                <h3 className="font-semibold text-slate-900 dark:text-white">Billing or payment issue</h3>
                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">If a payment was made but access not delivered, we verify the transaction and resolve it — either by delivering the access or refunding the payment. If you believe you were charged incorrectly, contact us and we will investigate immediately.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Escalation</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If your issue is not resolved through the normal support channel, or you are unsatisfied with the resolution:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li><strong>Request escalation on WhatsApp.</strong> Say "I would like to escalate this issue." Your case will be reviewed by a senior team member within 4 business hours.</li>
              <li><strong>Email escalation.</strong> Send to <strong>escalation@aiteampremium.com</strong> with your WhatsApp conversation reference. This reaches management directly.</li>
              <li><strong>Refund request.</strong> If you believe you are entitled to a refund under our <a href="/refund-policy" className="text-blue-600 underline">refund policy</a>, state this clearly and we will process it according to the policy terms.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">What we will never ask you for</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>Your personal password for any AI provider account</li>
              <li>Your 2FA codes or OTPs</li>
              <li>Your bKash/Nagad PIN</li>
              <li>Remote access to your device</li>
              <li>Payment outside the normal bKash/Nagad/Rocket/Bank Transfer channels</li>
            </ul>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              If anyone claiming to represent AI Team Premium asks for any of the above, stop communicating and report it to us through a different channel immediately.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Security concerns</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you believe your account has been compromised, your credentials exposed, or you have identified a security vulnerability, contact us immediately on WhatsApp or email. We treat security issues with the highest priority. Do not post security concerns publicly.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
