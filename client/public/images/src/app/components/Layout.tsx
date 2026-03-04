import { Menu, X, ArrowUpRight, Phone, MapPin, MessageCircle, Facebook, Instagram, Users, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import {
  BRAND,
  LogoStacked,
} from "./LogoIcons";

const F = "'Inter', system-ui, -apple-system, sans-serif";
const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/brand", label: "Brand" },
  { to: "/contact", label: "Contact" },
];

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BRAND.white }}>
      {/* ════════════════════════════════════════════
          HEADER
         ════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderColor: "rgba(37,99,235,0.06)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-[100px]">
            {/* Logo — Stacked sm */}
            <Link to="/" className="flex-shrink-0" style={{ textDecoration: "none" }}>
              <LogoStacked size="sm" iconColor={BRAND.blue} textColor={BRAND.navy} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-full transition-all ${
                      isActive ? "" : "hover:bg-blue-50/60"
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? BRAND.blue : undefined,
                    color: isActive ? BRAND.white : BRAND.navy,
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 600 : 450,
                    whiteSpace: "nowrap",
                    letterSpacing: "0.01em",
                    fontFamily: F,
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full px-6 py-2.5 transition-all hover:opacity-90"
              style={{
                background: BRAND.navy,
                color: BRAND.white,
                fontSize: "0.82rem",
                fontWeight: 600,
                fontFamily: F,
                textDecoration: "none",
              }}
            >
              Get Started
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-xl transition-colors hover:bg-blue-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: BRAND.navy }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-6 pb-6 pt-4"
            style={{
              background: BRAND.white,
              borderColor: "rgba(37,99,235,0.06)",
            }}
          >
            <nav className="flex flex-col gap-1">
              {NAV.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl transition-all ${
                      isActive ? "" : ""
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? BRAND.sky : undefined,
                    color: isActive ? BRAND.blue : BRAND.navy,
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 600 : 400,
                    fontFamily: F,
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl px-5 py-3"
                style={{
                  background: BRAND.navy,
                  color: BRAND.white,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: F,
                }}
              >
                Get Started
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════
          CONTENT
         ════════════════════════════════════════════ */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════ */}
      <footer style={{ background: BRAND.navy }}>
        {/* ── CTA Banner ── */}
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
                  fontFamily: F,
                  lineHeight: 1.3,
                }}
              >
                Ready to build something great?
              </h3>
              <p
                className="mt-1.5"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.85rem",
                  fontFamily: F,
                }}
              >
                Get in touch — fastest response on WhatsApp.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="http://wa.me/8801533262758"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 transition-all hover:opacity-90"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  fontFamily: F,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <WhatsAppIconSmall />
                WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 transition-all hover:opacity-80"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: BRAND.white,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  fontFamily: F,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                All Channels
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-4">
              <LogoStacked
                size="sm"
                iconColor={BRAND.white}
                textColor={BRAND.white}
              />
              <p
                className="mt-5 max-w-xs"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.84rem",
                  lineHeight: 1.7,
                  fontFamily: F,
                }}
              >
                Your trusted AI partner from Bangladesh. We build brands, websites, marketing systems, and apps — powered by intelligence and innovation.
              </p>

              {/* Contact info */}
              <div className="mt-6 space-y-3">
                <a
                  href="tel:+8801533262758"
                  className="flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                  style={{ textDecoration: "none" }}
                >
                  <Phone size={14} color="rgba(255,255,255,0.3)" strokeWidth={2} />
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", fontFamily: F }}>
                    +880 1533-262758
                  </span>
                </a>
                <div className="flex items-center gap-2.5">
                  <MapPin size={14} color="rgba(255,255,255,0.3)" strokeWidth={2} />
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", fontFamily: F }}>
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>

              {/* Social Icons Row */}
              <div className="mt-6 flex items-center gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="inline-flex items-center justify-center rounded-lg transition-all hover:opacity-80"
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

            {/* Navigation Columns */}
            <div className="md:col-span-2">
              <FooterHeading>Company</FooterHeading>
              <FooterLinks
                links={[
                  { label: "Home", to: "/" },
                  { label: "Services", to: "/services" },
                  { label: "Brand Identity", to: "/brand" },
                  { label: "Contact", to: "/contact" },
                ]}
              />
            </div>
            <div className="md:col-span-2">
              <FooterHeading>Services</FooterHeading>
              <FooterLinks
                links={[
                  { label: "Brand Design", to: "/services" },
                  { label: "Website Dev", to: "/services" },
                  { label: "Marketing", to: "/services" },
                  { label: "App Development", to: "/services" },
                ]}
              />
            </div>
            <div className="md:col-span-2">
              <FooterHeading>Community</FooterHeading>
              <FooterLinks
                links={[
                  { label: "Facebook Page", to: "https://www.facebook.com/profile.php?id=61586742067282", external: true },
                  { label: "Facebook Group", to: "https://www.facebook.com/groups/333019393218410", external: true },
                  { label: "Instagram", to: "https://www.instagram.com/ai_team_premium_bd/", external: true },
                  { label: "Messenger", to: "https://www.facebook.com/messages/t/61586742067282/", external: true },
                ]}
              />
            </div>
            <div className="md:col-span-2">
              <FooterHeading>Quick Reach</FooterHeading>
              <FooterLinks
                links={[
                  { label: "WhatsApp Chat", to: "http://wa.me/8801533262758", external: true },
                  { label: "Call Us", to: "tel:+8801533262758", external: true },
                  { label: "Send Message", to: "https://www.facebook.com/messages/t/61586742067282/", external: true },
                  { label: "All Channels", to: "/contact" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.75rem",
                fontFamily: F,
              }}
            >
              &copy; {new Date().getFullYear()} AI Team Premium BD. All rights reserved.
            </p>
            <div className="flex items-center gap-5 sm:gap-6 flex-wrap justify-center">
              {["Privacy Policy", "Terms of Service"].map((t) => (
                <a
                  key={t}
                  href="#"
                  className="hover:opacity-60 transition-opacity"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.72rem",
                    fontFamily: F,
                    textDecoration: "none",
                  }}
                >
                  {t}
                </a>
              ))}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "0.72rem",
                  fontFamily: F,
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label="Back to top"
              >
                Back to top
                <ChevronUp size={12} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Footer helpers ── */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-4"
      style={{
        color: "rgba(255,255,255,0.7)",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        fontFamily: F,
      }}
    >
      {children}
    </p>
  );
}

function FooterLinks({
  links,
}: {
  links: { label: string; to: string; external?: boolean }[];
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.map((l) => (
        <li key={l.label}>
          {l.external ? (
            <a
              href={l.to}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.82rem",
                textDecoration: "none",
                fontFamily: F,
              }}
            >
              {l.label}
            </a>
          ) : (
            <Link
              to={l.to}
              className="hover:opacity-70 transition-opacity"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.82rem",
                textDecoration: "none",
                fontFamily: F,
              }}
            >
              {l.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ── WhatsApp mini icon for footer CTA ── */
function WhatsAppIconSmall() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="#fff"
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.108-1.132l-.288-.173-2.98.78.796-2.907-.19-.3A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z"
        fill="#fff"
      />
    </svg>
  );
}

/* ── Social links data ── */
const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    url: "http://wa.me/8801533262758",
    icon: <WhatsAppIconSmall />,
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61586742067282",
    icon: <Facebook size={15} strokeWidth={2} />,
  },
  {
    label: "Facebook Group",
    url: "https://www.facebook.com/groups/333019393218410",
    icon: <Users size={15} strokeWidth={2} />,
  },
  {
    label: "Messenger",
    url: "https://www.facebook.com/messages/t/61586742067282/",
    icon: <MessageCircle size={15} strokeWidth={2} />,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/ai_team_premium_bd/",
    icon: <Instagram size={15} strokeWidth={2} />,
  },
];