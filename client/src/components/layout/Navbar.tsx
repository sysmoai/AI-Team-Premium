import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Layers, Briefcase } from "lucide-react";
import { BRAND, LogoStacked, WhatsAppIcon } from "@/components/brand/LogoIcons";

const CATEGORIES_MENU = [
  {
    group: "🤖 AI Tools",
    items: [
      { name: "ChatGPT Premium Subscriptions", href: "/chatgpt-plans", desc: "৳৩৯৯–৳৪,৫০০/mo · 7 plans" },
      { name: "Claude Plans", href: "/claude-plans", desc: "৳৫৯৯/mo · Long docs & coding" },
      { name: "Google Gemini Advanced", href: "/gemini-plans", desc: "৳৪৯৯/mo · Google Workspace" },
      { name: "Perplexity Pro", href: "/perplexity-plans", desc: "৳৪৯৯/mo · AI-powered search" },
      { name: "Grok", href: "/grok-plans", desc: "৳৪৯৯/mo · Real-time data" },
      { name: "Grammarly Premium", href: "/grammarly-plans", desc: "৳৪৯৯/mo · AI writing assistant" },
      { name: "Canva Pro", href: "/canva-plans", desc: "৳৫৯৯/mo · AI design tools" },
    ],
  },
  {
    group: "💎 Bundles",
    items: [
      { name: "AI Tools Vault", href: "/ai-tools-vault", desc: "৳১,৯৯০/mo · ChatGPT + Claude + Gemini" },
    ],
  },
  {
    group: "🛒 All Plans",
    items: [
      { name: "All Plans & Pricing", href: "/pricing", desc: "Compare every product & service" },
    ],
  },
];

const SERVICES_MENU = [
  { name: "🤝 AI Ops Sprint (1:1)", href: "/services/ai-ops-sprint", desc: "৳৯,৯০০ · 3-session implementation" },
  { name: "🎓 AI Coaching & Support", href: "/support", desc: "৳৭৯৯/hr · Live Bangla sessions" },
  { name: "🎨 Brand Design", href: "/services/brand-design", desc: "Logo, identity, social kit" },
  { name: "🌐 Web Development", href: "/services/web-development", desc: "Landing pages, web apps" },
  { name: "📢 Digital Marketing", href: "/services/digital-marketing", desc: "Ads, SEO, social media" },
  { name: "📱 App Development", href: "/services/app-development", desc: "iOS, Android, cross-platform" },
];

const PLAIN_LINKS = [
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

  useEffect(() => {
    setIsOpen(false);
    setMobileCatOpen(false);
    setMobileSvcOpen(false);
    cat.setOpen(false);
    svc.setOpen(false);
  }, [location]);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ background: "rgba(255,255,255,0.93)", borderColor: "rgba(37,99,235,0.06)" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between" style={{ height: 80 }}>
          <Link href="/" className="flex-shrink-0" style={{ textDecoration: "none" }} data-testid="link-logo">
            <LogoStacked size="sm" iconColor={BRAND.blue} textColor={BRAND.navy} />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            <DesktopDropdown
              label="Categories"
              icon={<Layers size={12} strokeWidth={2.5} />}
              open={cat.open}
              onEnter={cat.onEnter}
              onLeave={cat.onLeave}
              testId="button-nav-categories"
            >
              <div className="py-2" style={{ minWidth: 340 }}>
                {CATEGORIES_MENU.map((section) => (
                  <div key={section.group}>
                    <div className="px-4 pt-3 pb-1" style={{ color: BRAND.blue, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {section.group}
                    </div>
                    {section.items.map((item) => (
                      <DropdownItem key={item.name} href={item.href} name={item.name} desc={item.desc} onMouseEnter={cat.onEnter} onMouseLeave={cat.onLeave} />
                    ))}
                  </div>
                ))}
              </div>
            </DesktopDropdown>

            <DesktopDropdown
              label="Services"
              icon={<Briefcase size={12} strokeWidth={2.5} />}
              open={svc.open}
              onEnter={svc.onEnter}
              onLeave={svc.onLeave}
              testId="button-nav-services"
            >
              <div className="py-2" style={{ minWidth: 300 }}>
                {SERVICES_MENU.map((item) => (
                  <DropdownItem key={item.name} href={item.href} name={item.name} desc={item.desc} onMouseEnter={svc.onEnter} onMouseLeave={svc.onLeave} />
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
                    color: isActive ? BRAND.white : BRAND.navy,
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

          <a
            href="https://wa.me/8801533262758"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-nav-contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-all"
            style={{ background: "#25D366", color: "#fff", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
          >
            <WhatsAppIcon size={14} color="#fff" /> Get Started
          </a>

          <button
            className="md:hidden p-2 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: BRAND.navy }}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t px-5 pb-6 pt-4" style={{ background: BRAND.white, borderColor: "rgba(37,99,235,0.06)" }}>
          <nav className="flex flex-col gap-1">
            <MobileExpandable
              label="Categories"
              open={mobileCatOpen}
              onToggle={() => setMobileCatOpen((o) => !o)}
              testId="button-mobile-categories"
            >
              {CATEGORIES_MENU.map((section) => (
                <div key={section.group}>
                  <div className="px-4 pt-2 pb-1" style={{ color: BRAND.blue, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {section.group}
                  </div>
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      data-testid={`link-mobile-cat-${item.name.toLowerCase().replace(/\s+/g, '-').slice(0, 25)}`}
                      className="flex items-start gap-2 px-4 py-2.5"
                      style={{ textDecoration: "none" }}
                    >
                      <span style={{ color: BRAND.navy, fontSize: "0.88rem", fontWeight: 500 }}>{item.name}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </MobileExpandable>

            <MobileExpandable
              label="Services"
              open={mobileSvcOpen}
              onToggle={() => setMobileSvcOpen((o) => !o)}
              testId="button-mobile-services"
            >
              {SERVICES_MENU.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-testid={`link-mobile-svc-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 25)}`}
                  className="flex px-4 py-2.5"
                  style={{ textDecoration: "none" }}
                >
                  <span style={{ color: BRAND.navy, fontSize: "0.88rem", fontWeight: 500 }}>{item.name}</span>
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
                    background: isActive ? BRAND.sky : undefined,
                    color: isActive ? BRAND.blue : BRAND.navy,
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
            <a
              href="https://wa.me/8801533262758"
              target="_blank"
              rel="noopener noreferrer"
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
}: {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  testId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        data-testid={testId}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all"
        style={{
          background: open ? BRAND.sky : undefined,
          color: open ? BRAND.blue : BRAND.navy,
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
            background: BRAND.white,
            borderColor: "rgba(37,99,235,0.10)",
            boxShadow: "0 12px 40px rgba(15,23,42,0.14)",
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

function DropdownItem({ href, name, desc, onMouseEnter, onMouseLeave }: { href: string; name: string; desc: string; onMouseEnter: () => void; onMouseLeave: () => void }) {
  return (
    <Link
      href={href}
      data-testid={`link-dropdown-${name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}`}
      className="flex items-start gap-2 px-4 py-2.5 transition-all"
      style={{ textDecoration: "none" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <div style={{ color: BRAND.navy, fontSize: "0.84rem", fontWeight: 600, lineHeight: 1.3 }}>{name}</div>
        <div style={{ color: "#64748B", fontSize: "0.72rem", marginTop: 1 }}>{desc}</div>
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
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  testId: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        data-testid={testId}
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all"
        style={{
          background: open ? BRAND.sky : undefined,
          color: open ? BRAND.blue : BRAND.navy,
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
        <div className="ml-2 mb-1 rounded-xl border overflow-hidden" style={{ borderColor: "rgba(37,99,235,0.10)", background: BRAND.sky }}>
          {children}
        </div>
      )}
    </div>
  );
}
