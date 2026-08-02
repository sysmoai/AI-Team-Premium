import { BRAND } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { KeyRound, UserCheck, Users, Wrench, ShieldAlert, HelpCircle } from "lucide-react";

// Access Types Explained.
//
// This page exists because a customer looking at a product now sees either a
// price or "Request price", and deserves to know what actually differs between
// the ways access is delivered — above all, who owns the account and who can
// recover (and therefore seize) it.
//
// Deliberately absent, and they must stay absent until an approved record says
// otherwise: any named legal operator or owner, any claim of official
// partnership or authorisation, any delivery-time or uptime guarantee, and any
// statement that a specific product is available under a specific access model.
// This page explains the categories; the per-product classification is still
// under review and is not asserted here.

const MODELS = [
  {
    icon: UserCheck,
    name: "Customer-owned account",
    who: "You do.",
    recovery: "You do — your email, your phone, your 2FA.",
    what:
      "The subscription is bought on an account that belongs to you and stays with you. We help you choose the right plan, set it up, pay for it from Bangladesh, and configure security sensibly.",
    leaving:
      "Nothing happens to your access. The account was never ours to withdraw.",
    best: "Anyone who wants the account to outlast the relationship with us.",
  },
  {
    icon: Users,
    name: "Official team or workspace seat",
    who: "The organisation that holds the workspace.",
    recovery: "The workspace administrator.",
    what:
      "Some products officially sell multi-seat plans. In that model a named seat is assigned to you inside a workspace, using the vendor's own seat system rather than a shared login.",
    leaving:
      "The seat is reassigned or removed by the administrator. Content stored in the workspace may stay with the workspace — worth checking before you put anything important in it.",
    best: "Teams that want central administration and per-person accounts.",
  },
  {
    icon: Wrench,
    name: "Managed or done-for-you service",
    who: "Depends on the engagement — agreed in writing before work starts.",
    recovery: "Agreed in writing before work starts.",
    what:
      "We operate something on your behalf, such as a workflow, an automation, or a configured tool. You are paying for the work and the ongoing operation, not for a login.",
    leaving:
      "Handover terms are part of the engagement, not an afterthought. Ask about them at the start.",
    best: "Organisations that want an outcome maintained rather than software handed over.",
  },
  {
    icon: KeyRound,
    name: "Your own API key",
    who: "You do.",
    recovery: "You do.",
    what:
      "You hold the vendor account and the API key; we build, configure or integrate against it. Usage is billed to you by the vendor directly, so there is no markup layer between you and your consumption.",
    leaving: "You revoke the key. That is the whole exit.",
    best: "Developers and teams building something on top of a model provider.",
  },
];

export default function AccessTypes() {
  usePageMeta({
    title: "Access Types Explained — Who Owns the Account?",
    description:
      "The difference between a customer-owned account, an official team seat, a managed service and your own API key — including who controls recovery, what happens when you leave, and what AI Team Premium will never ask you for.",
    path: "/access-types",
  });

  return (
    <Layout>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Access Types", path: "/access-types" },
        ]}
      />

      <section className="py-16 md:py-24" style={{ background: BRAND.sky }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: BRAND.navy }}>
              Access types, <br />
              <span style={{ color: BRAND.blue }}>explained plainly</span>
            </h1>
            <p className="text-lg opacity-80" style={{ color: BRAND.navy }}>
              Two people can pay for "the same tool" and end up with very different things. The
              difference that matters most is not the price — it is who owns the account and who can
              recover it. This page explains each model we use, in the same words we would use on a
              call.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 max-w-6xl">
            {MODELS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.name}
                  className="rounded-2xl p-6 md:p-7"
                  style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.10)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={22} style={{ color: BRAND.blue }} aria-hidden="true" />
                    <h2 className="text-xl font-bold" style={{ color: BRAND.navy }}>
                      {m.name}
                    </h2>
                  </div>
                  <p className="mb-5 opacity-80" style={{ color: BRAND.navy }}>
                    {m.what}
                  </p>
                  <dl className="space-y-3 text-sm" style={{ color: BRAND.navy }}>
                    <div>
                      <dt className="font-semibold">Who owns the account</dt>
                      <dd className="opacity-75">{m.who}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Who controls recovery</dt>
                      <dd className="opacity-75">{m.recovery}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">If you stop working with us</dt>
                      <dd className="opacity-75">{m.leaving}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Usually the right fit for</dt>
                      <dd className="opacity-75">{m.best}</dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12" style={{ background: BRAND.sky }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert size={22} style={{ color: BRAND.blue }} aria-hidden="true" />
              <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>
                What we will never ask you for
              </h2>
            </div>
            <p className="mb-4 opacity-80" style={{ color: BRAND.navy }}>
              No legitimate setup needs any of these. If anyone asks you for one of them — including
              someone claiming to be us — stop and contact us through the number published on this
              site.
            </p>
            <ul className="space-y-2 opacity-80" style={{ color: BRAND.navy }}>
              {[
                "The password to your primary email account",
                "Your bank, bKash, Nagad or card PIN",
                "An account recovery code or backup code",
                "Unrestricted access to your OTP messages",
                "Remote control of your device to \"complete\" a purchase",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" style={{ color: BRAND.blue }}>
                    —
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle size={22} style={{ color: BRAND.blue }} aria-hidden="true" />
              <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>
                Why some products say "Request price"
              </h2>
            </div>
            <p className="mb-4 opacity-80" style={{ color: BRAND.navy }}>
              We are working through our catalogue and confirming, product by product, exactly which
              access model applies and what the current terms allow. Where that review is not
              finished, we do not show a price — because a price implies we are ready to sell you
              something on terms we have confirmed, and we would rather answer the question properly
              than publish a number we are still checking.
            </p>
            <p className="opacity-80" style={{ color: BRAND.navy }}>
              If a product you want is in that state, ask us. We will tell you where the review stands
              and what we can offer today.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
