import { Layout } from "@/components/layout/Layout";

export default function TermsOfService() {
  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg dark:prose-invert">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Terms</h2>
          <p>
            By accessing the website at aitpbd.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2>2. Subscriptions & Delivery</h2>
          <p>
            When purchasing an AI tool subscription (e.g., ChatGPT Plus, Claude) through AITPBD, you acknowledge that we are acting as a procurement proxy. Delivery of credentials or account upgrades will typically occur within 2-24 hours of payment verification.
          </p>

          <h2>3. Payment & Refunds</h2>
          <ul>
            <li>Payments are accepted strictly via authorized local BD channels (bKash, Nagad, Rocket, Bank Transfer).</li>
            <li>Refunds for subscriptions are evaluated on a case-by-case basis and only provided if the service is undeliverable.</li>
            <li>For digital services (Web design, marketing), milestone payments are non-refundable once the specific milestone is approved.</li>
          </ul>

          <h2>4. Account Usage</h2>
          <p>
            If you purchase a "Shared" account, you agree not to change the password or account details. Violation of this will result in immediate termination without refund. For "Private" accounts, you maintain full control.
          </p>

          <h2>5. Limitations</h2>
          <p>
            In no event shall AI Team Premium BD or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials or services.
          </p>
        </div>
      </div>
    </Layout>
  );
}
