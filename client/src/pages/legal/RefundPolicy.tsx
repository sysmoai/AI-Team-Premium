import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { WhatsAppIcon } from "@/components/brand/LogoIcons";
import { Layout } from "@/components/layout/Layout";
import { ChevronRight, ShieldCheck, RefreshCw, Clock, MessageCircle } from "lucide-react";
import { config } from "@/lib/config";

export default function RefundPolicy() {
  usePageMeta({
    title: "Refund & Replacement Policy — 30-Day Warranty | AI Team Premium BD",
    description: "AI Team Premium BD's refund and replacement policy for AI subscriptions in Bangladesh. 30-day warranty, 24-hour replacement SLA, and 15-minute refund window for support sessions if the issue cannot be solved.",
    path: "/refund-policy",
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24" style={{ background: BRAND.sky }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: BRAND.navy }}
            >
              Refund & Replacement <br />
              <span style={{ color: BRAND.blue }}>Policy</span>
            </h1>
            <p className="text-lg opacity-80" style={{ color: BRAND.navy }}>
              We strive to provide the best AI experience in Bangladesh. This policy outlines our commitment to your satisfaction and the rules for subscriptions and support sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              
              {/* Subscription Refund Policy */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100" style={{ color: BRAND.blue }}>
                    <RefreshCw size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>Subscription Refund Policy</h2>
                </div>
                <div className="prose prose-blue max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    Due to the nature of digital goods and the immediate costs associated with account provisioning, <strong>no refunds</strong> are provided once a subscription has been delivered and accessed.
                  </p>
                  <p>
                    However, we guarantee the functionality of every account:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>If you receive a non-working account, we will provide a replacement within <strong>24 hours</strong>.</li>
                    <li>Shared plans come with a <strong>30-day warranty</strong>. If the account stops working during this period, we will restore access or provide a new one.</li>
                  </ul>
                  <div className="mt-4 p-4 rounded-xl border border-red-100 bg-red-50 text-red-900 text-sm">
                    <strong>Warranty Void If:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Password is changed by the user (for shared accounts).</li>
                      <li>Multiple devices are used (limit: 1 device for shared plans).</li>
                      <li>Account is misused or violates OpenAI's terms.</li>
                      <li>User-initiated ban occurs due to prohibited prompt usage.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Support Session Refund Policy */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100" style={{ color: BRAND.blue }}>
                    <Clock size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>Support Session Refund Policy</h2>
                </div>
                <div className="prose prose-blue max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    Support session fees are non-refundable except in the following specific cases:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A refund is requested within the <strong>first 15 minutes</strong> of the session start.</li>
                    <li>We determine that we cannot fulfill your specific technical requirements or help with your workflow.</li>
                  </ul>
                  <div className="mt-4 p-4 rounded-xl border border-orange-100 bg-orange-50 text-orange-900 text-sm">
                    <strong>No Refund If:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Incorrect or incomplete information was provided during booking.</li>
                      <li>Client is a "no-show" (fails to join within 10 minutes of scheduled time).</li>
                      <li>Non-implementation of provided workflows or advice.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* What We Guarantee */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100" style={{ color: BRAND.blue }}>
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>What We Guarantee</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border bg-slate-50">
                    <h3 className="font-bold mb-2" style={{ color: BRAND.blue }}>30-Day Warranty</h3>
                    <p className="text-sm text-muted-foreground">Continuous access for the full duration of your shared subscription plan.</p>
                  </div>
                  <div className="p-5 rounded-2xl border bg-slate-50">
                    <h3 className="font-bold mb-2" style={{ color: BRAND.blue }}>24h Replacement</h3>
                    <p className="text-sm text-muted-foreground">Fast turnaround if any account issues arise, ensuring minimal downtime.</p>
                  </div>
                  <div className="p-5 rounded-2xl border bg-slate-50">
                    <h3 className="font-bold mb-2" style={{ color: BRAND.blue }}>Deliverables Delivery</h3>
                    <p className="text-sm text-muted-foreground">Guaranteed prompt pack and custom workflow delivery after every support session.</p>
                  </div>
                  <div className="p-5 rounded-2xl border bg-slate-50">
                    <h3 className="font-bold mb-2" style={{ color: BRAND.blue }}>Bangla Support</h3>
                    <p className="text-sm text-muted-foreground">Clear communication and technical assistance in Bengali for all queries.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Contact */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-8 rounded-3xl border bg-slate-50 space-y-6">
                <h3 className="text-xl font-bold" style={{ color: BRAND.navy }}>Need Assistance?</h3>
                <p className="text-sm text-muted-foreground">
                  If you are facing issues with your subscription or need to request a replacement, contact our support team on WhatsApp.
                </p>
                <a
                  href="https://wa.me/8801533262758?text=Hi%2C+I+have+a+question+about+refund/replacement"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-refund-whatsapp"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold transition-transform hover:scale-[1.02]"
                  style={{ background: "#25D366" }}
                >
                  <WhatsAppIcon size={20} />
                  Contact on WhatsApp
                </a>
                <a
                  href={config.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-refund-messenger"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold transition-transform hover:scale-[1.02]"
                  style={{ background: "#0084FF" }}
                >
                  <MessageCircle size={20} />
                  Contact on Messenger
                </a>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-muted-foreground">
                    Response time: Usually 5-15 minutes (10 AM - 11 PM)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
