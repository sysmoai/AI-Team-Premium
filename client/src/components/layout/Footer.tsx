import { Link } from "wouter";
import { NAV_CATEGORIES, CATALOG_TOTALS } from "@shared/nav-menu.js";
import { Phone, MapPin, Facebook, Instagram, Users, MessageCircle, ChevronUp, ArrowUpRight } from "lucide-react";
import { BRAND, LogoHorizontal, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

import { config } from "@/lib/config";

// The Bangla headline reads in Bengali numerals, so a derived price has to be
// converted rather than dropped in as ASCII digits mid-sentence.
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBengaliDigits = (n: number) =>
  n.toLocaleString("en-US").replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

const SOCIAL_LINKS = [
  { label: "WhatsApp", url: config.whatsappUrl, icon: <WhatsAppIcon size={15} color="currentColor" /> },
  { label: "Messenger", url: config.messenger, icon: <MessageCircle size={15} strokeWidth={2} /> },
  { label: "Facebook", url: config.fbPage, icon: <Facebook size={15} strokeWidth={2} /> },
  { label: "Facebook Group", url: config.fbGroup, icon: <Users size={15} strokeWidth={2} /> },
  { label: "Instagram", url: config.instagram, icon: <Instagram size={15} strokeWidth={2} /> },
];

export function Footer() {
  return (
    <footer style={{ background: BRAND.navy }}>
      <div
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.05) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              style={{
                color: BRAND.white,
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              {/* Was a hardcoded ৳৩৪৯ in Bengali numerals against a ৳190 floor.
                  Derived, and in Bengali numerals to match the sentence. */}
              বাংলাদেশে AI Tools — ৳{toBengaliDigits(CATALOG_TOTALS.priceFrom)} থেকে শুরু
            </h3>
            <p className="mt-1.5" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>
              Get in touch — fastest response on WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-whatsapp"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "footer")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 transition-all hover:scale-[1.02] active:scale-95"
              style={{ background: "#25D366", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const }}
            >
              <WhatsAppIcon size={16} color="#fff" />
              WhatsApp
            </a>
            <a
              href={config.messenger}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-messenger"
              onClick={() => trackMessengerClick(undefined, "footer")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 transition-all hover:scale-[1.02] active:scale-95"
              style={{ background: "#0084FF", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const }}
            >
              <MessageCircle size={16} color="#fff" />
              Messenger
            </a>
            <Link
              href="/contact"
              data-testid="link-footer-contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 transition-all"
              style={{ background: "rgba(255,255,255,0.1)", color: BRAND.white, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const, border: "1px solid rgba(255,255,255,0.1)" }}
            >
              All Channels
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6">
          <div className="col-span-2 md:col-span-4">
            <LogoHorizontal size="md" iconColor={BRAND.white} textColor={BRAND.white} />
            <p className="mt-5 max-w-xs" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.84rem", lineHeight: 1.7 }}>
              Affordable premium AI subscriptions + dedicated Bangla support for Bangladesh users — the price shown is the price you pay, with fast delivery.
            </p>
            <div className="mt-6 space-y-3">
              <a href="tel:+8801533262758" className="flex items-center gap-2.5" style={{ textDecoration: "none" }} data-testid="link-footer-phone">
                <Phone size={14} color="rgba(255,255,255,0.3)" strokeWidth={2} />
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>+880 1533-262758</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} color="rgba(255,255,255,0.3)" strokeWidth={2} />
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>Dhaka, Bangladesh</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-testid={`link-footer-social-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center justify-center rounded-lg transition-all"
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 col-span-1">
            <FooterHeading>Company</FooterHeading>
            <FooterLinks links={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: "Compare Tools", to: "/compare" },
              { label: "Support", to: "/support" },
              { label: "Pricing", to: "/pricing" },
              { label: "About", to: "/about" },
            ]} />
          </div>

          <div className="md:col-span-2 col-span-1">
            {/* Categories, not a hand-picked product list. The previous version
                named nine products and advertised "All 80 Plans" against a
                catalog of 129 — and had no link to automation, SEO or learning
                at all. Generated, so both problems stay fixed. */}
            <FooterHeading>AI Tools</FooterHeading>
            <FooterLinks links={[
              ...NAV_CATEGORIES.map((c) => ({ label: c.label, to: c.href })),
              { label: `All ${CATALOG_TOTALS.families} tools →`, to: "/all-products" },
            ]} />
          </div>

          <div className="md:col-span-2 col-span-1">
            <FooterHeading>Services</FooterHeading>
            <FooterLinks links={[
              { label: "AI Advisory", to: "/services/ai-advisory" },
              { label: "Setup & Security", to: "/services/ai-setup-security" },
              { label: "AI Training", to: "/services/ai-training" },
              { label: "AI Automation", to: "/services/ai-automation" },
              { label: "Managed AI Ops", to: "/services/managed-ai-operations" },
              { label: "AI Ops Sprint", to: "/services/ai-ops-sprint" },
              { label: "AI Coaching", to: "/support" },
              { label: "Brand Design", to: "/services/brand-design" },
              { label: "Web Development", to: "/services/web-development" },
              { label: "Digital Marketing", to: "/services/digital-marketing" },
            ]} />
          </div>

          <div className="md:col-span-2 col-span-1">
            <FooterHeading>Legal</FooterHeading>
            <FooterLinks links={[
              { label: "Access Types Explained", to: "/access-types" },
              { label: "Pricing — How It Works", to: "/pricing-how-it-works" },
              { label: "Non-Affiliation", to: "/non-affiliation" },
              { label: "Corrections Policy", to: "/corrections" },
              { label: "Incident & Escalation", to: "/incident-escalation" },
              { label: "Refund Policy", to: "/refund-policy" },
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Terms of Service", to: "/terms" },
              { label: "Contact", to: "/contact" },
            ]} />
            <div className="mt-6">
              <FooterHeading>Quick Reach</FooterHeading>
              <FooterLinks links={[
                { label: "WhatsApp Chat", to: config.whatsappGeneral, external: true },
                { label: "Messenger", to: config.messenger, external: true },
                { label: "Call Us", to: `tel:${config.phone}`, external: true },
                { label: "Facebook", to: config.fbPage, external: true },
                { label: "Instagram", to: config.instagram, external: true },
              ]} />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col items-center justify-between gap-3">
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.68rem", textAlign: "center", maxWidth: "640px", lineHeight: 1.5 }}>
            AI Team Premium is not affiliated with OpenAI, Anthropic, Google, Canva, Grammarly, Midjourney, Perplexity, xAI, Microsoft, or other third-party tool providers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
              &copy; {new Date().getFullYear()} AI Team Premium. All rights reserved.
            </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 transition-opacity"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.72rem",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label="Back to top"
            data-testid="button-back-to-top"
          >
            Back to top
            <ChevronUp size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: string }) {
  return (
    <p className="mb-4" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em" }}>
      {children}
    </p>
  );
}

function FooterLinks({ links }: { links: { label: string; to: string; external?: boolean }[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.map((l) => (
        <li key={l.label}>
          {l.external ? (
            <a
              href={l.to}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-footer-${l.label.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ) : (
            <Link href={l.to} data-testid={`link-footer-${l.label.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", textDecoration: "none" }}>
              {l.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
