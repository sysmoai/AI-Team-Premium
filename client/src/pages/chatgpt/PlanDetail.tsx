import { Layout } from "@/components/layout/Layout";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { chatgptPlans } from "@/lib/plans";
import { config } from "@/lib/config";
import { Check, X, Shield, Clock, User, Users, Zap, MessageSquare, AlertTriangle, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SupportUpsell } from "@/components/SupportUpsell";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/components/seo/JsonLd";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

interface PlanDetailProps {
  slug: string;
}

export function PlanDetail({ slug }: PlanDetailProps) {
  const plan = chatgptPlans.find((p) => p.slug === slug);
  const [, setLocation] = useLocation();

  // usePageMeta runs client-side after hydration and OVERWRITES whatever
  // lib/route-meta.js injected server-side. Fixing the server metadata for a
  // quarantined plan without fixing this call is therefore not a fix at all —
  // this is the exact mechanism that put ৳4,990 back into the tab title for
  // pro-premium-shared after the server-rendered title said something else.
  usePageMeta({
    title: !plan
      ? "ChatGPT Plan — AI Team Premium"
      : plan.quarantined
        ? `${plan.title} in Bangladesh | AI Team Premium`
        : `${plan.title} Bangladesh — ৳${plan.priceBDT}`,
    description: !plan
      ? "Get premium ChatGPT subscriptions in Bangladesh."
      : plan.quarantined
        ? "Availability and current price confirmed after plan verification — ask on WhatsApp. Pay via bKash/Nagad, no international card needed."
        : `Buy ${plan.title} in Bangladesh for ${plan.priceLabel}. ${plan.deliverySLA} delivery via bKash/Nagad. 30-day replacement warranty. ${plan.targetBuyer}.`,
    path: plan ? `/chatgpt/${plan.slug}` : "/chatgpt-plans",
  });

  if (!plan) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Plan not found</h1>
          <Button onClick={() => setLocation("/chatgpt-plans")} className="mt-4">
            Back to Plans
          </Button>
        </div>
      </Layout>
    );
  }

  const whatsappMessage = plan.quarantined
    ? `Hi, I want to ask about ${plan.title}`
    : (config as any).whatsappPlanTemplates?.[slug] || `Hi, I want to order ${plan.title}`;
  const whatsappUrl = `${config.whatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`;

  const features = {
    plus: ["GPT-4.5 / o3-mini Access (latest GPT model)", "GPT-image-1 Image Generation", "Canvas Collaborative Writing & Coding", "Advanced Voice Mode with Video", "Web Browsing & Deep Research", "File Uploads & Analysis", "Custom GPTs"],
    pro: ["Everything in Plus", "latest GPT model Extended Access", "o3 Pro Reasoning", "256K Context Window", "Priority Server Access", "Higher Usage Limits", "Higher Rate Limits"],
    business: ["Admin Console", "SSO / SAML", "60+ Integrations", "HIPAA Eligibility", "Shared Workspaces", "Team Management"],
  };

  const planFeatures = plan.plan === "Pro" ? features.pro : plan.plan === "Business" ? features.business : features.plus;

  // Quarantined plans get FAQ copy that matches their actual state: no
  // delivery-time promise, no price, no warranty claim, no fixed-price payment
  // instruction. They keep only the one question that's still true regardless
  // — who the plan is aimed at — since that's about fit, not availability.
  const planFaqs = plan.quarantined
    ? [
        { q: `How much does ${plan.title} cost in Bangladesh?`, a: `We are not publishing a fixed price for ${plan.title} right now — we are confirming the access model and current terms first. Ask us on WhatsApp and we'll tell you where that review stands.` },
        { q: `Can I pay for ${plan.title} via bKash or Nagad?`, a: "Yes, once availability is confirmed. AI Team Premium accepts bKash, Nagad, Rocket and Bank Transfer in BDT." },
        { q: `Who is ${plan.title} best for?`, a: `${plan.title} is aimed at ${plan.targetBuyer}, subject to the access-model review above.` },
      ]
    : [
        { q: `How long does ${plan.title} delivery take?`, a: `Our standard delivery time for ${plan.title} is ${plan.deliverySLA}. Once payment is verified via bKash or Nagad on WhatsApp, we send the login details directly to your WhatsApp.` },
        { q: `How much does ${plan.title} cost in Bangladesh?`, a: `${plan.title} costs ${plan.priceLabel} for a ${plan.duration} subscription from AI Team Premium, payable in BDT via bKash, Nagad, Rocket or Bank Transfer — no international credit card required.` },
        { q: `Is there a warranty on ${plan.title}?`, a: `Yes. We provide a full 30-day replacement warranty. If the account fails for any non-misuse reason, we replace it within 24 hours. ${plan.warranty}` },
        { q: `Can I pay for ${plan.title} via bKash or Nagad?`, a: "Yes. AI Team Premium accepts bKash, Nagad, Rocket and Bank Transfer in BDT. Payment numbers are shared privately on WhatsApp after you confirm your order." },
        { q: `Who is ${plan.title} best for?`, a: `${plan.title} is best for ${plan.targetBuyer}. It includes ${plan.seats} seat${typeof plan.seats === "number" && plan.seats > 1 ? "s" : ""}, ${plan.deviceRule.toLowerCase()}, and ${plan.deliverySLA} delivery.` },
      ];

  return (
    <Layout>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "ChatGPT Plans", path: "/chatgpt-plans" },
          { name: plan.title, path: `/chatgpt/${plan.slug}` },
        ]}
      />
      {/*
        No ProductSchema while quarantined: a Product/Offer node is a
        machine-readable claim that something is for sale at a price, and
        search engines act on it independently of what the visible page says.
        Restore together with plan.quarantined = false in lib/plans.ts.
      */}
      {!plan.quarantined && (
        <ProductSchema
          name={plan.title}
          description={`${plan.title} subscription in Bangladesh from AI Team Premium. ${plan.priceLabel}, ${plan.duration}, ${plan.deliverySLA} delivery via bKash/Nagad. ${plan.targetBuyer}.`}
          path={`/chatgpt/${plan.slug}`}
          priceBDT={plan.priceBDT}
          category="AI Subscription / ChatGPT"
        />
      )}
      <FAQSchema items={planFaqs} />

      {/* 1. BREADCRUMB */}
      <nav className="bg-white border-b py-3">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/chatgpt-plans" className="hover:text-primary transition-colors">ChatGPT Plans</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">{plan.title}</span>
        </div>
      </nav>

      <div className="bg-muted/50 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Details & Rules */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: BRAND.navy }}>
                  {plan.title}
                </h1>
                <p className="mt-4 text-lg text-slate-500">
                  Genuine {plan.plan} features tailored for Bangladesh users with local payment support.
                </p>
                {/* DIRECT ANSWER BLOCK (GEO) */}
                <div className="mt-6 rounded-xl p-5 border" style={{ background: "#EFF6FF", borderColor: "rgba(37,99,235,0.15)" }}>
                  <p style={{ color: BRAND.navy, fontSize: "0.96rem", lineHeight: 1.7 }}>
                    {plan.quarantined ? (
                      <>
                        <strong>{plan.title}</strong> is a {plan.tier.toLowerCase()} {plan.plan} plan, best suited for <strong>{plan.targetBuyer}</strong>. We are currently confirming the access model and current provider terms for this tier, so pricing and availability are <strong>confirmed after plan verification</strong> — ask us on WhatsApp.
                      </>
                    ) : (
                      <>
                        <strong>{plan.title}</strong> costs <strong>{plan.priceLabel}</strong> ({plan.duration}) from AI Team Premium in Bangladesh. It is a {plan.tier.toLowerCase()} {plan.plan} plan with <strong>{plan.seats} seat{typeof plan.seats === "number" && plan.seats > 1 ? "s" : ""}</strong>, <strong>{plan.deliverySLA}</strong> delivery via bKash/Nagad, a 30-day replacement warranty, and is best suited for <strong>{plan.targetBuyer}</strong>.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* 3. RULES/DISCLOSURE BOX
                  Previously described shared-credential terms ("No recovery
                  access", "No password changes") as a normal, marketed feature
                  of a settled product, for tiers that in fact have zero
                  documented provider authorization. Quarantined tiers now say
                  that plainly instead of presenting the arrangement as decided. */}
              <div className="rounded-2xl border-2 p-6 bg-red-50/30 border-red-200">
                <div className="flex gap-3">
                  <AlertTriangle className="text-red-600 shrink-0" size={24} />
                  <div className="space-y-2">
                    <h3 className="font-bold text-red-900">
                      {plan.quarantined ? "Access Model Under Review" : "Important Rules & Disclosure"}
                    </h3>
                    <div className="text-red-800 text-sm leading-relaxed">
                      {plan.quarantined ? (
                        <p>
                          We are reviewing how this tier is delivered against the provider's current terms before
                          offering it for sale again. It is not available for direct purchase right now — ask us on
                          WhatsApp for its current status.
                        </p>
                      ) : plan.accessType === "customer-owned" ? (
                        <p className="text-green-800 font-medium">
                          ✅ You own and control the account. No device restrictions or sharing limitations.
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. WHAT YOU GET */}
              <div className="bg-white rounded-2xl border p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: BRAND.navy }}>
                  <Zap className="text-blue-600" size={20} />
                  What You Get
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {planFeatures.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-100 rounded-full p-0.5">
                        <Check size={14} className="text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. WHAT YOU DON'T GET (for shared only, and only once sellable again) */}
              {plan.accessType === "shared" && !plan.quarantined && (
                <div className="bg-white rounded-2xl border p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                    <X className="text-red-500" size={20} />
                    What You Don't Get
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {["No password access", "No recovery email access", "Cannot use on multiple devices", "No billing access"].map((f) => (
                      <div key={f} className="flex items-start gap-3 opacity-70">
                        <div className="mt-1 bg-red-100 rounded-full p-0.5">
                          <X size={14} className="text-red-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. SUPPORT UPSELL */}
              <SupportUpsell />

              {/* 7. MINI-FAQ */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold" style={{ color: BRAND.navy }}>Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border px-6 text-slate-900">
                  {plan.quarantined ? (
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Why isn't a price or delivery time shown?</AccordionTrigger>
                      <AccordionContent>
                        We're confirming this plan's access model and current provider terms before selling it again.
                        Ask us on WhatsApp for its current status.
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>How long does delivery take?</AccordionTrigger>
                        <AccordionContent>
                          Our standard delivery time is {plan.deliverySLA}. Once payment is verified via bKash or Nagad, we send the login details or invite link to your WhatsApp.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Is there a warranty?</AccordionTrigger>
                        <AccordionContent>
                          Yes, we provide a full {plan.duration} warranty. If the account face any issues, we replace it within 24 hours. {plan.warranty}
                        </AccordionContent>
                      </AccordionItem>
                    </>
                  )}
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I pay via bKash/Nagad?</AccordionTrigger>
                    <AccordionContent>
                      Absolutely! We accept all major local mobile banking methods including bKash, Nagad, and Rocket.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* 9. REFUND POLICY LINK */}
              <div className="text-center pt-4">
                <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">
                  Refund & Replacement Policy
                </Link>
              </div>
            </div>

            {/* Right Column: Fact Box & CTA */}
            <div className="lg:col-span-5 lg:sticky lg:top-8">
              {/* 2. OFFER FACT BOX */}
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden text-slate-900">
                <div className="bg-blue-600 p-6 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-100 text-sm font-medium uppercase tracking-wider">{plan.plan} Plan</span>
                    {plan.badge && (
                      <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">{plan.badge}</span>
                    )}
                  </div>
                  <div className={plan.quarantined ? "text-lg font-bold" : "text-3xl font-bold"}>
                    {plan.quarantined ? "Request current price" : plan.priceLabel}
                  </div>
                  {!plan.quarantined && <div className="text-blue-100 text-sm mt-1">Duration: {plan.duration}</div>}
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 uppercase flex items-center gap-1">
                        <Users size={12} /> Seat Type
                      </div>
                      <div className="text-sm font-bold capitalize">{plan.tier}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 uppercase flex items-center gap-1">
                        <User size={12} /> Seats
                      </div>
                      <div className="text-sm font-bold">{plan.seats}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 uppercase flex items-center gap-1">
                        <Clock size={12} /> Delivery
                      </div>
                      <div className="text-sm font-bold">{plan.deliverySLA}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 uppercase flex items-center gap-1">
                        <MessageSquare size={12} /> Support
                      </div>
                      <div className="text-sm font-bold text-green-600">WhatsApp</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="text-slate-500">
                        Status:{" "}
                        {plan.quarantined ? (
                          <span className="text-amber-600 font-bold">Under Review</span>
                        ) : (
                          <span className="text-green-600 font-bold">Active</span>
                        )}
                      </span>
                      {!plan.quarantined && <span className="text-slate-500 italic">Verified: {config.lastVerified}</span>}
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick(plan.title, undefined, plan.quarantined ? "price-on-request" : plan.priceLabel, "plan-detail")}
                      className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#22c35e] text-white py-4 rounded-xl font-bold transition-all shadow-md active:scale-[0.98]"
                      data-testid={`button-order-whatsapp-${slug}`}
                    >
                      <WhatsAppIcon size={22} />
                      {plan.quarantined ? "Ask on WhatsApp" : "Order on WhatsApp"}
                    </a>
                    <a
                      href={config.messenger}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMessengerClick(plan.title, "plan-detail")}
                      className="mt-3 flex items-center justify-center gap-3 w-full bg-[#0084FF] hover:bg-[#0071db] text-white py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-[0.98]"
                      data-testid={`button-order-messenger-${slug}`}
                    >
                      <MessageSquare size={20} />
                      {plan.quarantined ? "Or Ask on Messenger" : "Or Order on Messenger"}
                    </a>
                    
                    <p className="mt-4 text-[10px] text-center text-slate-500 leading-tight">
                      By ordering, you agree to our Terms of Service and Refund Policy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust badges — both claims (a warranty, and delivery speed)
                  depend on the product actually being sellable. */}
              {!plan.quarantined && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border flex items-center gap-3">
                    <Shield size={20} className="text-blue-600" />
                    <span className="text-xs font-bold leading-tight text-slate-900">30-Day Warranty</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border flex items-center gap-3">
                    <Zap size={20} className="text-orange-500" />
                    <span className="text-xs font-bold leading-tight text-slate-900">Instant Activation</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 8. STICKY MOBILE CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/90 backdrop-blur-lg border-t p-3 pb-safe flex gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(plan.title, undefined, plan.priceLabel, "plan-detail-sticky")}
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold shadow-lg text-sm"
          data-testid={`button-sticky-whatsapp-${slug}`}
        >
          <WhatsAppIcon size={18} />
          WhatsApp
        </a>
        <a
          href={config.messenger}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMessengerClick(plan.title, "plan-detail-sticky")}
          className="flex-1 flex items-center justify-center gap-2 bg-[#0084FF] text-white py-3 rounded-xl font-bold shadow-lg text-sm"
          data-testid={`button-sticky-messenger-${slug}`}
        >
          <MessageSquare size={18} />
          Messenger
        </a>
      </div>
    </Layout>
  );
}
