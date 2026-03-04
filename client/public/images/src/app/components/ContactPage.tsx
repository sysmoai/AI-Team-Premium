import { useState } from "react";
import { BRAND, LogoStacked } from "./LogoIcons";
import {
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Users,
  ChevronDown,
  Copy,
  Check,
  Shield,
} from "lucide-react";

const F = "'Inter', system-ui, -apple-system, sans-serif";

/* ── WhatsApp SVG icon ── */
function WhatsAppIcon({ size = 20, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill={color}
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.108-1.132l-.288-.173-2.98.78.796-2.907-.19-.3A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z"
        fill={color}
      />
    </svg>
  );
}

/* ── Messenger SVG icon ── */
function MessengerIcon({ size = 20, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.18.16.14.25.34.26.56l.05 1.75c.02.55.57.91 1.08.71l1.96-.77c.16-.06.34-.08.51-.04.93.26 1.92.4 2.99.4 5.64 0 10-4.13 10-9.7S17.64 2 12 2z"
        fill={color}
      />
      <path
        d="M7.56 14.56l2.19-3.47c.35-.55 1.08-.69 1.59-.29l1.74 1.3c.16.12.38.12.54 0l2.35-1.78c.31-.24.72.13.51.47l-2.19 3.47c-.35.55-1.08.69-1.59.29l-1.74-1.3a.42.42 0 00-.54 0l-2.35 1.78c-.31.24-.72-.13-.51-.47z"
        fill={color === "#fff" ? "#0084FF" : "#fff"}
      />
    </svg>
  );
}

/* ── Contact data ── */
const WHATSAPP_URL = "http://wa.me/8801533262758";
const PHONE = "+880 1533-262758";
const MESSENGER_URL = "https://www.facebook.com/messages/t/61586742067282/";
const FB_PAGE_URL = "https://www.facebook.com/profile.php?id=61586742067282";
const FB_GROUP_URL = "https://www.facebook.com/groups/333019393218410";
const INSTAGRAM_URL = "https://www.instagram.com/ai_team_premium_bd/";

const NEW_CUSTOMER_TEMPLATE = `Hi! I want help from AI Team Premium BD.
1) My name:
2) Business / page link (if any):
3) What I need (Brand / Website / Marketing / App):
4) Deadline:
5) Budget range (optional):`;

const EXISTING_CUSTOMER_TEMPLATE = `Hi! I already worked with AI Team Premium BD.
1) My name:
2) Project / service name:
3) What is the issue / request:
4) Urgency (Today / This week / Not urgent):`;

export function ContactPage() {
  return (
    <div>
      {/* ══ Header ══ */}
      <section style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-20 pb-14 text-center">
          <p
            className="mb-3 uppercase"
            style={{
              color: BRAND.blue,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              fontWeight: 600,
              fontFamily: F,
            }}
          >
            Contact
          </p>
          <h1
            style={{
              color: BRAND.navy,
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              fontFamily: F,
            }}
          >
            Connect with AI Team Premium BD
          </h1>
          <p
            className="mt-3 mx-auto"
            style={{
              color: BRAND.blue,
              fontSize: "0.95rem",
              fontWeight: 500,
              fontFamily: F,
            }}
          >
            Fastest response: WhatsApp
          </p>
        </div>
      </section>

      {/* ══ Main Content ══ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-8">
          {/* ── Quick Contact ── */}
          <Card title="Quick Contact">
            {/* WhatsApp — Primary CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl px-6 py-4 transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "#25D366",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: F,
                textDecoration: "none",
              }}
            >
              <WhatsAppIcon size={22} color="#fff" />
              Chat on WhatsApp
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {/* Phone */}
              <a
                href={`tel:${PHONE.replace(/\s|-/g, "")}`}
                className="flex items-center gap-3 rounded-xl px-5 py-3.5 transition-all hover:opacity-80"
                style={{
                  background: BRAND.sky,
                  color: BRAND.navy,
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  fontFamily: F,
                  textDecoration: "none",
                  border: "1px solid rgba(37,99,235,0.08)",
                }}
              >
                <span
                  className="flex-shrink-0 inline-flex items-center justify-center rounded-lg"
                  style={{ width: 36, height: 36, background: "rgba(37,99,235,0.08)" }}
                >
                  <Phone size={16} color={BRAND.blue} strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block" style={{ fontSize: "0.72rem", opacity: 0.5 }}>
                    Call
                  </span>
                  {PHONE}
                </span>
              </a>

              {/* Messenger */}
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-5 py-3.5 transition-all hover:opacity-80"
                style={{
                  background: BRAND.sky,
                  color: BRAND.navy,
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  fontFamily: F,
                  textDecoration: "none",
                  border: "1px solid rgba(37,99,235,0.08)",
                }}
              >
                <span
                  className="flex-shrink-0 inline-flex items-center justify-center rounded-lg"
                  style={{ width: 36, height: 36, background: "rgba(59,130,246,0.08)" }}
                >
                  <MessengerIcon size={18} color="#0084FF" />
                </span>
                <span>
                  <span className="block" style={{ fontSize: "0.72rem", opacity: 0.5 }}>
                    Messenger
                  </span>
                  Send a Message
                </span>
              </a>
            </div>
          </Card>

          {/* ── Social Links ── */}
          <Card title="Follow Us">
            <div className="space-y-2">
              <SocialRow
                icon={<Facebook size={17} color="#1877F2" strokeWidth={2} />}
                label="Facebook Page"
                handle="AI Team Premium BD"
                url={FB_PAGE_URL}
                accent="#1877F2"
              />
              <SocialRow
                icon={<Users size={17} color="#1877F2" strokeWidth={2} />}
                label="Facebook Group"
                handle="AITPBD Community"
                url={FB_GROUP_URL}
                accent="#1877F2"
              />
              <SocialRow
                icon={<Instagram size={17} color="#E4405F" strokeWidth={2} />}
                label="Instagram"
                handle="@ai_team_premium_bd"
                url={INSTAGRAM_URL}
                accent="#E4405F"
              />
            </div>
          </Card>

          {/* ── What to Send ── */}
          <Card title="What to Send">
            <p
              className="mb-4"
              style={{
                color: BRAND.navy,
                opacity: 0.5,
                fontSize: "0.82rem",
                lineHeight: 1.6,
                fontFamily: F,
              }}
            >
              Copy a template below and paste it into WhatsApp or Messenger to get started quickly.
            </p>
            <div className="space-y-3">
              <AccordionItem
                title="New Customer"
                subtitle="First time? Use this template"
                template={NEW_CUSTOMER_TEMPLATE}
              />
              <AccordionItem
                title="Existing Customer"
                subtitle="Already working with us? Use this"
                template={EXISTING_CUSTOMER_TEMPLATE}
              />
            </div>
          </Card>

          {/* ── Mini Brand + Trust Note ── */}
          <div
            className="rounded-2xl px-6 py-8 flex flex-col items-center text-center"
            style={{ background: BRAND.navy }}
          >
            <LogoStacked size="sm" iconColor={BRAND.white} textColor={BRAND.white} />
            <p
              className="mt-5 max-w-xs"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.8rem",
                lineHeight: 1.65,
                fontFamily: F,
              }}
            >
              Intelligence meets innovation.
              <br />
              Your trusted AI partner.
            </p>
          </div>

          {/* Trust Note */}
          <div
            className="flex items-start gap-3 rounded-xl px-5 py-4"
            style={{
              background: "rgba(37,99,235,0.03)",
              border: "1px solid rgba(37,99,235,0.06)",
            }}
          >
            <Shield size={16} color={BRAND.blue} strokeWidth={2} className="flex-shrink-0 mt-0.5" />
            <p
              style={{
                color: BRAND.navy,
                opacity: 0.45,
                fontSize: "0.75rem",
                lineHeight: 1.6,
                fontFamily: F,
              }}
            >
              <strong style={{ fontWeight: 600, opacity: 1 }}>Brand firewall: AITPBD-only.</strong>{" "}
              This is the single source of truth for contact links.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   REUSABLE SUB-COMPONENTS
   ═══════════════════════════════════════════════ */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: BRAND.white,
        border: "1px solid rgba(37,99,235,0.06)",
        boxShadow: "0 4px 24px rgba(37,99,235,0.04)",
      }}
    >
      <h2
        className="mb-5"
        style={{
          color: BRAND.navy,
          fontSize: "1rem",
          fontWeight: 650,
          fontFamily: F,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function SocialRow({
  icon,
  label,
  handle,
  url,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  handle: string;
  url: string;
  accent: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3.5 rounded-xl px-4 py-3 transition-all hover:opacity-80"
      style={{
        background: BRAND.sky,
        textDecoration: "none",
        border: "1px solid rgba(37,99,235,0.05)",
      }}
    >
      <span
        className="flex-shrink-0 inline-flex items-center justify-center rounded-lg"
        style={{
          width: 36,
          height: 36,
          background: `${accent}10`,
        }}
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span
          className="block"
          style={{
            color: BRAND.navy,
            opacity: 0.45,
            fontSize: "0.7rem",
            fontFamily: F,
          }}
        >
          {label}
        </span>
        <span
          className="block truncate"
          style={{
            color: BRAND.navy,
            fontSize: "0.85rem",
            fontWeight: 500,
            fontFamily: F,
          }}
        >
          {handle}
        </span>
      </span>
      <span style={{ color: BRAND.navy, opacity: 0.25 }}>
        <ChevronDown size={14} className="-rotate-90" />
      </span>
    </a>
  );
}

function AccordionItem({
  title,
  subtitle,
  template,
}: {
  title: string;
  subtitle: string;
  template: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = template;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{
        background: BRAND.sky,
        border: "1px solid rgba(37,99,235,0.06)",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-all"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
      >
        <span>
          <span
            className="block"
            style={{
              color: BRAND.navy,
              fontSize: "0.88rem",
              fontWeight: 600,
              fontFamily: F,
            }}
          >
            {title}
          </span>
          <span
            className="block mt-0.5"
            style={{
              color: BRAND.navy,
              opacity: 0.4,
              fontSize: "0.75rem",
              fontFamily: F,
            }}
          >
            {subtitle}
          </span>
        </span>
        <ChevronDown
          size={18}
          color={BRAND.navy}
          strokeWidth={2}
          className="transition-transform flex-shrink-0"
          style={{
            opacity: 0.3,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div className="px-5 pb-5">
          <pre
            className="rounded-lg px-4 py-3.5 whitespace-pre-wrap"
            style={{
              background: BRAND.white,
              color: BRAND.navy,
              fontSize: "0.8rem",
              lineHeight: 1.7,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              border: "1px solid rgba(37,99,235,0.06)",
              userSelect: "all",
            }}
          >
            {template}
          </pre>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 transition-all hover:opacity-90"
              style={{
                background: copied ? "#25D366" : BRAND.blue,
                color: "#fff",
                fontSize: "0.78rem",
                fontWeight: 600,
                fontFamily: F,
                border: "none",
                cursor: "pointer",
              }}
            >
              {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2} />}
              {copied ? "Copied!" : "Copy Template"}
            </button>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(template)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 transition-all hover:opacity-90"
              style={{
                background: "#25D366",
                color: "#fff",
                fontSize: "0.78rem",
                fontWeight: 600,
                fontFamily: F,
                textDecoration: "none",
                border: "none",
              }}
            >
              <WhatsAppIcon size={14} color="#fff" />
              Send via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
