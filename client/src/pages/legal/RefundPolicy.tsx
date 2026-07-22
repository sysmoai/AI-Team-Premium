import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { WhatsAppIcon } from "@/components/brand/LogoIcons";
import { Layout } from "@/components/layout/Layout";
import { ShieldCheck, RefreshCw, Clock, MessageCircle, Paintbrush, Code, TrendingUp, Smartphone } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { config } from "@/lib/config";

export default function RefundPolicy() {
  usePageMeta({
    title: "Refund & Replacement Policy — 30-Day Warranty | AI Team Premium",
    description: "AI Team Premium's refund and replacement policy for AI subscriptions, support sessions, and digital services in Bangladesh. 30-day warranty, 24-hour replacement SLA, milestone-based digital service terms.",
    path: "/refund-policy",
  });

  return (
    <Layout>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Refund Policy", path: "/refund-policy" }]} />

      <section className="py-16 md:py-24" style={{ background: BRAND.sky }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: BRAND.navy }}>
              Refund & Replacement <br />
              <span style={{ color: BRAND.blue }}>Policy</span>
            </h1>
            <p className="text-lg opacity-80" style={{ color: BRAND.navy }}>
              We strive to provide a reliable AI experience in Bangladesh. This policy outlines our commitment to your satisfaction, the rules for subscriptions, support sessions, and all digital services.
            </p>
            <p className="text-sm opacity-50 mt-3" style={{ color: BRAND.navy }}>Effective: May 2026 · aiteampremium.com</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-14">

              {/* 1. Shared AI Subscriptions */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100" style={{ color: BRAND.blue }}>
                    <RefreshCw size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>1. Shared AI Subscriptions</h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                  <p>Shared subscription fees (ChatGPT Plus, Claude Pro, Gemini Advanced, Perplexity Pro, Grok, Canva Pro, Grammarly, etc.) are <strong>non-refundable</strong> once access has been delivered and the account has been accessed.</p>
                  <p><strong>30-Day Warranty:</strong> If a shared plan stops working through no fault of the subscriber during the warranty period, we will restore access or provide a replacement account within <strong>24 hours</strong>.</p>
                  <div className="p-4 rounded-xl border border-red-100 bg-red-50 text-red-900 text-sm">
                    <strong>Warranty is void if:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Password, email, or phone is changed by the user (shared accounts only).</li>
                      <li>The account is used on more than 1 device at the same time.</li>
                      <li>Account is misused or violates the AI platform's Terms of Service.</li>
                      <li>User-initiated ban occurs due to prohibited prompt usage or API abuse.</li>
                    </ul>
                  </div>
                  <p><strong>Access Restoration Failure:</strong> If we cannot restore access or provide a replacement within 48 hours, we will issue a <strong>pro-rated credit</strong> for the remaining unused days, applicable to your next renewal or a different plan.</p>
                </div>
              </div>

              {/* 2. Personal Seat Subscriptions */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100" style={{ color: BRAND.blue }}>
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>2. Personal Seat Subscriptions</h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                  <p>Personal seat subscriptions (e.g., ChatGPT Plus Personal ৳2,950/mo, Claude Personal ৳2,500/mo, Gemini Personal ৳1,800/mo) provide <strong>dedicated account access</strong>. Fees are non-refundable once the seat has been provisioned.</p>
                  <p><strong>30-Day Warranty applies equally</strong> — if the personal seat stops working due to our fault, we will provide a replacement account or restore access within 24 hours.</p>
                  <p>For personal seats, users may change their own password after provisioning. However, <strong>changing the primary email</strong> associated with the account may void the warranty if it prevents us from managing the account during a replacement event.</p>
                </div>
              </div>

              {/* 3. Support Sessions */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100" style={{ color: BRAND.blue }}>
                    <Clock size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>3. AI Training & Support Sessions</h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                  <p>Support session fees (hourly ৳799, Student/Freelancer packs, AI Ops Sprint) are non-refundable except:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A refund is requested within the <strong>first 15 minutes</strong> of session start, AND we determine we cannot help with your specific requirement.</li>
                    <li>We cancel the session due to our own unavailability — full refund or free reschedule offered.</li>
                  </ul>
                  <div className="p-4 rounded-xl border border-orange-100 bg-orange-50 text-orange-900 text-sm">
                    <strong>No Refund If:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Incorrect or incomplete information was provided during booking.</li>
                      <li>Client is a "no-show" (fails to join within 10 minutes of scheduled time).</li>
                      <li>User does not implement the advice given during the session.</li>
                      <li>Session was completed and prompt pack/workflow doc was delivered.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Brand Design */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(37,99,235,0.08)", color: BRAND.blue }}>
                    <Paintbrush size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>4. Brand Design Services</h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                  <p>A <strong>50% advance payment</strong> is required before work begins. The remaining 50% is due upon final delivery.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Before initial concepts are delivered:</strong> 100% refund of the advance (minus any bank transfer fees).</li>
                    <li><strong>After initial concepts are delivered:</strong> The advance is non-refundable. We will continue to revise until you are satisfied (within the agreed revision count).</li>
                    <li><strong>After final delivery:</strong> No refunds. Minor corrections are handled within 7 days of delivery at no extra cost.</li>
                  </ul>
                  <p>Unlimited-revision tiers (Professional & Premium) are not subject to "revision limit reached" cancellations.</p>
                </div>
              </div>

              {/* 5. Web Development */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(37,99,235,0.08)", color: BRAND.blue }}>
                    <Code size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>5. Web Development Services</h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                  <p>Web development projects follow a <strong>milestone-based payment schedule</strong>: typically 50% advance + 50% on completion, or 30% / 40% / 30% for larger projects.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Before any development work begins:</strong> Full advance refund (minus bank fees).</li>
                    <li><strong>After milestone 1 is delivered:</strong> That milestone's payment is non-refundable. Remaining milestones may be renegotiated if scope changes.</li>
                    <li><strong>After final deployment:</strong> No refunds. We provide a 14-day post-launch bug-fix window at no extra cost.</li>
                  </ul>
                  <p>Scope changes requested after a milestone begins may incur additional charges. Any agreed scope change is documented via WhatsApp message for reference.</p>
                </div>
              </div>

              {/* 6. Digital Marketing */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(37,99,235,0.08)", color: BRAND.blue }}>
                    <TrendingUp size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>6. Digital Marketing Services</h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                  <p>Monthly retainer fees for Digital Marketing (Facebook Ads, Google Ads, SEO, Social Media Management) are <strong>non-refundable once the campaign has launched</strong>.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Before campaign launch:</strong> Full refund of that month's retainer.</li>
                    <li><strong>After campaign launch:</strong> Non-refundable. Monthly engagements auto-renew unless cancelled 7 days before the next billing date.</li>
                    <li><strong>Ad spend:</strong> Ad budgets paid directly to Facebook/Google are managed by the client's own account and are subject to those platforms' policies — not refundable through AITP.</li>
                  </ul>
                  <p>If we fail to deliver agreed-upon monthly deliverables (e.g., content calendar, campaign report), we will provide a credit or bonus month at our discretion.</p>
                </div>
              </div>

              {/* 7. App Development */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(37,99,235,0.08)", color: BRAND.blue }}>
                    <Smartphone size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>7. App Development Services</h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                  <p>App development follows a <strong>3-milestone payment structure</strong>: 30% on project kickoff, 40% on beta delivery, 30% on final launch.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Before kickoff:</strong> Full refund of any advance.</li>
                    <li><strong>After kickoff (milestone 1 delivered):</strong> Milestone 1 payment (30%) is non-refundable.</li>
                    <li><strong>After beta delivery (milestone 2):</strong> Milestones 1 & 2 are non-refundable. Client may pause the project with written notice.</li>
                    <li><strong>After final launch:</strong> No refunds. We provide a 30-day post-launch bug-fix period for defects present at the time of delivery.</li>
                  </ul>
                  <p>App Store / Google Play submission fees (if any) are charged separately and are non-refundable once submitted.</p>
                </div>
              </div>

              {/* 8. What We Guarantee */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100" style={{ color: BRAND.blue }}>
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>8. What We Guarantee</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "30-Day Warranty", desc: "Continuous access for the full duration of your shared or personal subscription." },
                    { title: "24h Replacement SLA", desc: "Fast replacement if any subscription account fails through our fault." },
                    { title: "Access Restoration Credit", desc: "Pro-rated credit or next-month free if replacement takes over 48 hours." },
                    { title: "Session Deliverables", desc: "Custom prompt pack + workflow document delivered after every support session." },
                    { title: "14-Day Post-Launch Fix", desc: "Web projects: bug fixes at no cost for 14 days after launch." },
                    { title: "30-Day App Bug Fix", desc: "App projects: defects present at launch fixed free for 30 days." },
                  ].map((g) => (
                    <div key={g.title} className="p-5 rounded-2xl border bg-slate-50">
                      <h3 className="font-bold mb-2 text-sm" style={{ color: BRAND.blue }}>{g.title}</h3>
                      <p className="text-xs text-muted-foreground">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-8 rounded-3xl border bg-slate-50 space-y-6">
                <h3 className="text-xl font-bold" style={{ color: BRAND.navy }}>Need Assistance?</h3>
                <p className="text-sm text-muted-foreground">
                  For refund, replacement, or service dispute queries, contact our support team on WhatsApp. We respond within 5–15 minutes (9 AM – 11 PM BST).
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
                    Response time: 5–15 min · 9 AM – 11 PM BST · 7 days a week
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
