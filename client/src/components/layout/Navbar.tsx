import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Layers, Briefcase, Sun, Moon } from "lucide-react";
import { BRAND, LogoHorizontal, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { config } from "@/lib/config";
import { trackWhatsAppClick } from "@/lib/analytics";
import { useTheme } from "@/components/ThemeProvider";
import { NAV_COLUMNS, NAV_CATEGORIES, CATALOG_TOTALS } from "@shared/nav-menu.js";

// Categories, counts and prices come from lib/nav-menu.js, generated from the
// catalog by `npm run gen:nav`.
//
// This block used to be 17 hand-written products with hand-written prices in
// Bengali numerals, and every one of them had gone stale — Claude listed at ৳599
// against a ৳1,495 catalog price, Google AI Pro at ৳449 against ৳3,390, Kling at
// ৳599 against ৳270. The header renders on every page, so it was the widest
// wrong-price surface on the site.
//
// It could not grow either: products were listed individually, so automation,
// SEO and learning had no route into the nav at all, and the flat list was
// already too long to scan. Grouping by category fixes both — the menu now
// describes 78 families in four scannable columns instead of naming 17.
const bdt = (n: number) => `৳${n.toLocaleString("en-US")}`;

const SERVICES_MENU = [
  { name: "🤝 AI Ops Sprint (1:1)", href: "/services/ai-ops-sprint", desc: "৳৯,৯০০ · 3-session implementation" },
  { name: "🎓 AI Coaching & Support", href: "/support", desc: "৳৭৯৯/hr · Live Bangla sessions" },
  { name: "🎨 Brand Design", href: "/services/brand-design", desc: "Logo, identity, social kit" },
  { name: "🌐 Web Development", href: "/services/web-development", desc: "Landing pages, web apps" },
  { name: "📢 Digital Marketing", href: "/services/digital-marketing", desc: "Ads, SEO, social media" },
  { name: "📱 App Development", href: "/services/app-development", desc: "iOS, Android, cross-platform" },
];

const PLAIN_LINKS = [
  { name: "Blog", href: "/blog" },
  { name: "Support", href: "/support" },
  { name: "About", href: "/about" },
];

function useDropdown() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onEnter = () => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(true); };
  const onLeave = () => { timerRef.current = setTimeout(() => setOpen(false), 120); };
  return { open, setOpen, onEnter, onLeave };
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const [location] = useLocation();
  const cat = useDropdown();
  const svc = useDropdown();
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsOpen(false);
    setMobileCatOpen(false);
    setMobileSvcOpen(false);
    cat.setOpen(false);
    svc.setOpen(false);
  }, [location]);

  const isDark = resolvedTheme === "dark";

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: isDark ? "rgba(3,7,18,0.90)" : "rgba(255,255,255,0.90)",
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(37,99,235,0.06)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between" style={{ height: 80 }}>
          <Link href="/" className="flex-shrink-0" style={{ textDecoration: "none" }} data-testid="link-logo">
            <LogoHorizontal size="sm" iconColor={BRAND.blue} textColor={isDark ? BRAND.white : BRAND.navy} />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            <DesktopDropdown
              label="Categories"
              icon={<Layers size={12} strokeWidth={2.5} />}
              open={cat.open}
              onEnter={cat.onEnter}
              onLeave={cat.onLeave}
              testId="button-nav-categories"
              isDark={isDark}
            >
              {/* Mega-menu: one column per group, each listing its categories
                  with a live count and real price floor. Products sit under the
                  category rather than replacing it, so the menu stays the same
                  size as the catalog grows. */}
              <div
                className="grid gap-x-6 gap-y-5 p-5 grid-cols-2 lg:grid-cols-4"
                style={{ width: "min(84vw, 900px)" }}
                onMouseEnter={cat.onEnter}
                onMouseLeave={cat.onLeave}
              >
                {NAV_COLUMNS.map((column) => (
                  <div key={column.heading} className="min-w-0">
                    <div
                      className="px-1 pb-2 mb-2"
                      style={{
                        color: BRAND.blue,
                        fontSize: "0.66rem",
                        fontWeight: 800,
                        letterSpacing: "0.09em",
                        textTransform: "uppercase",
                        borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(37,99,235,0.10)",
                      }}
                    >
                      {column.heading}
                    </div>
                    {column.categories.map((c) => (
                      <div key={c.slug} className="mb-3">
                        <Link
                          href={c.href}
                          data-testid={`link-nav-cat-${c.slug}`}
                          className="block px-1 py-1 rounded-md transition-colors hover:opacity-80"
                          style={{ textDecoration: "none" }}
                        >
                          <span
                            style={{
                              color: isDark ? "rgba(255,255,255,0.92)" : BRAND.navy,
                              fontSize: "0.82rem",
                              fontWeight: 650,
                            }}
                          >
                            {c.label}
                          </span>
                          <span
                            style={{
                              color: isDark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.45)",
                              fontSize: "0.7rem",
                              marginLeft: 6,
                            }}
                          >
                            {c.count}
                            {c.priceFrom !== null && ` · from ${bdt(c.priceFrom)}`}
                          </span>
                        </Link>
                        {c.top.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            data-testid={`link-nav-tool-${p.href.split("/").pop()}`}
                            className="block px-1 py-0.5 rounded transition-colors hover:opacity-75"
                            style={{
                              textDecoration: "none",
                              color: isDark ? "rgba(255,255,255,0.58)" : "rgba(15,23,42,0.62)",
                              fontSize: "0.74rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {p.name}
                            {p.priceFrom !== null && (
                              <span style={{ opacity: 0.6 }}> · {bdt(p.priceFrom)}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
                <div
                  className="col-span-2 lg:col-span-4 pt-3 flex flex-wrap items-center gap-x-5 gap-y-2"
                  style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(37,99,235,0.10)" }}
                >
                  <Link href="/all-products" data-testid="link-nav-all-products" style={{ textDecoration: "none", color: BRAND.blue, fontSize: "0.8rem", fontWeight: 700 }}>
                    All {CATALOG_TOTALS.families} tools →
                  </Link>
                  <Link href="/pricing" data-testid="link-nav-all-pricing" style={{ textDecoration: "none", color: isDark ? "rgba(255,255,255,0.7)" : BRAND.navy, fontSize: "0.78rem" }}>
                    Pricing
                  </Link>
                  <Link href="/ai-tools-vault" data-testid="link-nav-vault" style={{ textDecoration: "none", color: isDark ? "rgba(255,255,255,0.7)" : BRAND.navy, fontSize: "0.78rem" }}>
                    AI Tools Vault
                  </Link>
                  <Link href="/compare" data-testid="link-nav-compare" style={{ textDecoration: "none", color: isDark ? "rgba(255,255,255,0.7)" : BRAND.navy, fontSize: "0.78rem" }}>
                    Compare tools
                  </Link>
                  <span style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)", fontSize: "0.74rem" }}>
                    {CATALOG_TOTALS.tiers} plans from {bdt(CATALOG_TOTALS.priceFrom)}/mo
                  </span>
                </div>
              </div>
            </DesktopDropdown>

            <DesktopDropdown
              label="Services"
              icon={<Briefcase size={12} strokeWidth={2.5} />}
              open={svc.open}
              onEnter={svc.onEnter}
              onLeave={svc.onLeave}
              testId="button-nav-services"
              isDark={isDark}
            >
              <div className="py-2" style={{ minWidth: 300 }}>
                {SERVICES_MENU.map((item) => (
                  <DropdownItem key={item.name} href={item.href} name={item.name} desc={item.desc} onMouseEnter={svc.onEnter} onMouseLeave={svc.onLeave} isDark={isDark} />
                ))}
              </div>
            </DesktopDropdown>

            {PLAIN_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  data-testid={`link-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 rounded-full transition-all"
                  style={{
                    background: isActive ? BRAND.blue : undefined,
                    color: isActive ? BRAND.white : isDark ? "rgba(255,255,255,0.8)" : BRAND.navy,
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 600 : 450,
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              aria-label="Toggle dark mode"
              className="flex items-center justify-center rounded-full transition-all"
              style={{
                width: 36,
                height: 36,
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)",
                color: isDark ? "rgba(255,255,255,0.7)" : BRAND.navy,
                border: "none",
                cursor: "pointer",
              }}
            >
              {isDark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
            </button>
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "navbar-desktop")}
              data-testid="link-nav-contact"
              className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-all animate-pulse-ring"
              style={{ background: "#25D366", color: "#fff", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
            >
              <WhatsAppIcon size={14} color="#fff" /> Get Started
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle-mobile"
              aria-label="Toggle dark mode"
              className="flex items-center justify-center rounded-full transition-all"
              style={{
                width: 36,
                height: 36,
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)",
                color: isDark ? "rgba(255,255,255,0.7)" : BRAND.navy,
                border: "none",
                cursor: "pointer",
              }}
            >
              {isDark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
            </button>
            <button
              className="p-2 rounded-xl transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: isDark ? "rgba(255,255,255,0.8)" : BRAND.navy }}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden border-t px-5 pb-6 pt-4"
          style={{
            background: isDark ? "rgba(3,7,18,0.98)" : BRAND.white,
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(37,99,235,0.06)",
          }}
        >
          <nav className="flex flex-col gap-1">
            <MobileExpandable
              label="Categories"
              open={mobileCatOpen}
              onToggle={() => setMobileCatOpen((o) => !o)}
              testId="button-mobile-categories"
              isDark={isDark}
            >
              {/* On mobile the categories are the menu — listing individual
                  products here would be a 78-item scroll. Each row is a real
                  tap target (44px) with its count and entry price. */}
              {NAV_CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={c.href}
                  data-testid={`link-mobile-cat-${c.slug}`}
                  className="flex items-center justify-between px-4"
                  style={{ textDecoration: "none", minHeight: 44 }}
                >
                  <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : BRAND.navy, fontSize: "0.88rem", fontWeight: 500 }}>
                    {c.label}
                  </span>
                  <span style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.45)", fontSize: "0.75rem" }}>
                    {c.count}
                    {c.priceFrom !== null && ` · from ${bdt(c.priceFrom)}`}
                  </span>
                </Link>
              ))}
              <Link
                href="/all-products"
                data-testid="link-mobile-all-products"
                className="flex items-center px-4"
                style={{ textDecoration: "none", minHeight: 44, color: BRAND.blue, fontSize: "0.85rem", fontWeight: 700 }}
              >
                All {CATALOG_TOTALS.families} tools →
              </Link>
            </MobileExpandable>

            <MobileExpandable
              label="Services"
              open={mobileSvcOpen}
              onToggle={() => setMobileSvcOpen((o) => !o)}
              testId="button-mobile-services"
              isDark={isDark}
            >
              {SERVICES_MENU.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-testid={`link-mobile-svc-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 25)}`}
                  className="flex px-4 py-2.5"
                  style={{ textDecoration: "none" }}
                >
                  <span style={{ color: isDark ? "rgba(255,255,255,0.85)" : BRAND.navy, fontSize: "0.88rem", fontWeight: 500 }}>{item.name}</span>
                </Link>
              ))}
            </MobileExpandable>

            {PLAIN_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  data-testid={`link-mobile-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: isActive ? (isDark ? "rgba(37,99,235,0.2)" : BRAND.sky) : undefined,
                    color: isActive ? BRAND.blue : isDark ? "rgba(255,255,255,0.8)" : BRAND.navy,
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
            <a
              href={config.whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "navbar-mobile")}
              data-testid="link-mobile-contact"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl px-5 py-3"
              style={{ background: "#25D366", color: "#fff", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none" }}
            >
              <WhatsAppIcon size={16} color="#fff" /> Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function DesktopDropdown({
  label,
  icon,
  open,
  onEnter,
  onLeave,
  testId,
  children,
  isDark,
}: {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  testId: string;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        data-testid={testId}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all"
        style={{
          background: open ? (isDark ? "rgba(37,99,235,0.2)" : BRAND.sky) : undefined,
          color: open ? BRAND.blue : isDark ? "rgba(255,255,255,0.8)" : BRAND.navy,
          fontSize: "0.82rem",
          fontWeight: open ? 600 : 450,
          letterSpacing: "0.01em",
          border: "none",
          cursor: "pointer",
        }}
      >
        {icon} {label}
        <ChevronDown
          size={12}
          strokeWidth={2.5}
          style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1.5 rounded-2xl overflow-hidden border"
          style={{
            background: isDark ? "#0F172A" : BRAND.white,
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(37,99,235,0.10)",
            boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(15,23,42,0.14)",
            zIndex: 100,
            animation: "fadeSlideDown 0.15s ease",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ href, name, desc, onMouseEnter, onMouseLeave, isDark }: { href: string; name: string; desc: string; onMouseEnter: () => void; onMouseLeave: () => void; isDark: boolean }) {
  return (
    <Link
      href={href}
      data-testid={`link-dropdown-${name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}`}
      className="flex items-start gap-2 px-4 py-2.5 transition-colors rounded-lg mx-1"
      style={{ textDecoration: "none" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <div style={{ color: isDark ? "rgba(255,255,255,0.9)" : BRAND.navy, fontSize: "0.84rem", fontWeight: 600, lineHeight: 1.3 }}>{name}</div>
        <div style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#64748B", fontSize: "0.72rem", marginTop: 1 }}>{desc}</div>
      </div>
    </Link>
  );
}

function MobileExpandable({
  label,
  open,
  onToggle,
  testId,
  children,
  isDark,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  testId: string;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <div>
      <button
        data-testid={testId}
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all"
        style={{
          background: open ? (isDark ? "rgba(37,99,235,0.2)" : BRAND.sky) : undefined,
          color: open ? BRAND.blue : isDark ? "rgba(255,255,255,0.8)" : BRAND.navy,
          fontSize: "0.95rem",
          fontWeight: open ? 600 : 400,
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {label}
        <ChevronDown
          size={16}
          strokeWidth={2}
          style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div
          className="ml-2 mb-1 rounded-xl border overflow-hidden"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(37,99,235,0.10)",
            background: isDark ? "rgba(37,99,235,0.08)" : BRAND.sky,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
