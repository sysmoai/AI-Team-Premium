import { useState } from "react";
import { ChevronDown, Globe2, Sparkles } from "lucide-react";
import { BRAND } from "@/components/brand/LogoIcons";
import { useUsdToBdt } from "@/lib/use-exchange-rate";
import { getUsdRetail } from "@/lib/usd-retail";

interface PriceCompareProps {
  toolName: string;
  planLabel: string;
  planPriceBDT: string;
  accentColor: string;
}

function parseBDT(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
}

function formatBDT(n: number): string {
  return `৳${Math.round(n).toLocaleString("en-IN")}`;
}

export function PriceCompare({ toolName, planLabel, planPriceBDT, accentColor }: PriceCompareProps) {
  const [open, setOpen] = useState(false);
  const usd = getUsdRetail(toolName, planLabel);
  const { rate, isFallback, isLoading } = useUsdToBdt();

  if (!usd) return null;

  const ourBDT = parseBDT(planPriceBDT);
  const intlBDT = usd * rate;
  const savings = Math.max(0, intlBDT - ourBDT);
  const savingsPct = intlBDT > 0 ? Math.round((savings / intlBDT) * 100) : 0;
  const safeLabel = planLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div
      className="mt-4 rounded-xl overflow-hidden"
      style={{ border: `1px solid ${accentColor}22`, background: `${accentColor}06` }}
      data-testid={`price-compare-${safeLabel}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-testid={`button-toggle-compare-${safeLabel}`}
        className="w-full flex items-center justify-between px-4 py-2.5 transition-colors"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <span className="flex items-center gap-2" style={{ color: BRAND.navy, fontSize: "0.78rem", fontWeight: 600 }}>
          <Globe2 size={13} color={accentColor} strokeWidth={2.2} />
          Compare to international price
          {savings > 0 && (
            <span
              className="rounded-full px-2 py-0.5"
              style={{ background: `${accentColor}1A`, color: accentColor, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.02em" }}
              data-testid={`badge-savings-${safeLabel}`}
            >
              Save {savingsPct}%
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          color={accentColor}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <div className="px-4 pb-3.5 pt-1" style={{ borderTop: `1px solid ${accentColor}14` }}>
          <div className="grid grid-cols-2 gap-3 mt-2.5">
            <div className="rounded-lg px-3 py-2.5" style={{ background: "rgba(15,23,42,0.04)" }}>
              <p style={{ color: BRAND.navy, opacity: 0.45, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Official price
              </p>
              <p className="mt-1" style={{ color: BRAND.navy, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.1 }}>
                ${usd}
                <span style={{ fontSize: "0.66rem", fontWeight: 500, opacity: 0.5 }}>/mo</span>
              </p>
              <p style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.7rem", fontWeight: 500 }} data-testid={`text-intl-bdt-${safeLabel}`}>
                ≈ {formatBDT(intlBDT)}
              </p>
            </div>
            <div className="rounded-lg px-3 py-2.5" style={{ background: `${accentColor}12` }}>
              <p style={{ color: accentColor, opacity: 0.85, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                AITPBD price
              </p>
              <p className="mt-1" style={{ color: BRAND.navy, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.1 }}>
                {formatBDT(ourBDT)}
                <span style={{ fontSize: "0.66rem", fontWeight: 500, opacity: 0.5 }}>/mo</span>
              </p>
              <p style={{ color: accentColor, fontSize: "0.7rem", fontWeight: 600 }}>
                Pay in BDT · bKash / Nagad
              </p>
            </div>
          </div>
          {savings > 0 && (
            <div
              className="mt-2.5 flex items-center gap-2 rounded-lg px-3 py-2"
              style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}22` }}
              data-testid={`text-savings-${safeLabel}`}
            >
              <Sparkles size={13} color={accentColor} strokeWidth={2.2} />
              <span style={{ color: BRAND.navy, fontSize: "0.76rem", fontWeight: 600 }}>
                You save <strong style={{ color: accentColor }}>{formatBDT(savings)}/mo</strong> — about {savingsPct}% off the international price
              </span>
            </div>
          )}
          <p className="mt-2" style={{ color: BRAND.navy, opacity: 0.42, fontSize: "0.65rem", lineHeight: 1.45 }}>
            {isLoading ? "Loading live rate…" : `Live USD→BDT: 1 USD ≈ ৳${rate.toFixed(2)}`}
            {isFallback && !isLoading && " (estimated)"}
            {" · "}No international card needed.
          </p>
        </div>
      )}
    </div>
  );
}
