import { BRAND, IconOrbit, LogoHorizontal } from "./LogoIcons";

const COLORS = [
  {
    name: "Premium Blue",
    hex: "#2563EB",
    rgb: "37, 99, 235",
    role: "Primary brand color. Icon marks, CTAs, key brand elements, and the 'AI' accent in the wordmark.",
    swatch: BRAND.blue,
  },
  {
    name: "Deep Navy",
    hex: "#0F172A",
    rgb: "15, 23, 42",
    role: "Primary text color, dark backgrounds, wordmark base, and monochrome applications.",
    swatch: BRAND.navy,
  },
  {
    name: "Light Sky",
    hex: "#EFF6FF",
    rgb: "239, 246, 255",
    role: "Page background, containers, card surfaces, and light UI fills.",
    swatch: BRAND.sky,
  },
  {
    name: "Pure White",
    hex: "#FFFFFF",
    rgb: "255, 255, 255",
    role: "Clean backgrounds, reversed type on dark surfaces, card fills.",
    swatch: BRAND.white,
  },
  {
    name: "Pure Black",
    hex: "#000000",
    rgb: "0, 0, 0",
    role: "Monochrome print applications only. Never used in digital brand.",
    swatch: BRAND.black,
  },
];

export function ColorSystemPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <p
          className="mb-2 uppercase"
          style={{
            color: BRAND.blue,
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            fontWeight: 600,
          }}
        >
          Color System
        </p>
        <h1
          style={{
            color: BRAND.navy,
            fontSize: "2rem",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Brand Color Palette
        </h1>
        <p
          className="mt-3 max-w-2xl"
          style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.95rem" }}
        >
          A restrained, timeless palette anchored by a single premium blue. Flat
          colors only — no gradients.
        </p>
      </div>

      {/* Swatches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
        {COLORS.map((c) => (
          <div
            key={c.hex}
            className="rounded-2xl overflow-hidden border"
            style={{
              background: BRAND.white,
              borderColor: "rgba(37,99,235,0.06)",
            }}
          >
            <div
              className="h-28"
              style={{
                background: c.swatch,
                border:
                  c.hex === "#FFFFFF"
                    ? "1px solid rgba(0,0,0,0.06)"
                    : undefined,
              }}
            />
            <div className="p-4">
              <p
                style={{
                  color: BRAND.navy,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                {c.name}
              </p>
              <p
                className="mt-1 font-mono"
                style={{
                  color: BRAND.blue,
                  fontSize: "0.78rem",
                  fontWeight: 500,
                }}
              >
                {c.hex}
              </p>
              <p
                className="mt-0.5 font-mono"
                style={{
                  color: BRAND.navy,
                  opacity: 0.35,
                  fontSize: "0.68rem",
                }}
              >
                rgb({c.rgb})
              </p>
              <p
                className="mt-2"
                style={{
                  color: BRAND.navy,
                  opacity: 0.5,
                  fontSize: "0.73rem",
                  lineHeight: 1.5,
                }}
              >
                {c.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Color Usage with actual logos */}
      <h2
        className="mb-6"
        style={{ color: BRAND.navy, fontSize: "1.15rem", fontWeight: 600 }}
      >
        Color in Context
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Light Sky bg */}
        <div
          className="rounded-2xl p-8 flex flex-col gap-5"
          style={{
            background: BRAND.sky,
            border: "1px solid rgba(37,99,235,0.06)",
          }}
        >
          <LogoHorizontal
            size="md"
            iconColor={BRAND.blue}
            textColor={BRAND.navy}
          />
          <p
            style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.8rem", lineHeight: 1.6 }}
          >
            Blue icon + Navy text on Light Sky. The default digital application.
          </p>
          <span
            style={{
              fontSize: "0.65rem",
              color: BRAND.navy,
              opacity: 0.3,
              marginTop: "auto",
            }}
          >
            Light Background
          </span>
        </div>
        {/* Navy bg */}
        <div
          className="rounded-2xl p-8 flex flex-col gap-5"
          style={{ background: BRAND.navy }}
        >
          <LogoHorizontal
            size="md"
            iconColor={BRAND.white}
            textColor={BRAND.white}
          />
          <p
            style={{ color: BRAND.white, opacity: 0.5, fontSize: "0.8rem", lineHeight: 1.6 }}
          >
            All-white logo on Deep Navy. Used for dark UI, email headers, and
            overlays.
          </p>
          <span
            style={{
              fontSize: "0.65rem",
              color: BRAND.white,
              opacity: 0.25,
              marginTop: "auto",
            }}
          >
            Dark Background
          </span>
        </div>
        {/* White bg */}
        <div
          className="rounded-2xl p-8 flex flex-col gap-5"
          style={{
            background: BRAND.white,
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <LogoHorizontal
            size="md"
            iconColor={BRAND.blue}
            textColor={BRAND.navy}
          />
          <p
            style={{ color: BRAND.navy, opacity: 0.55, fontSize: "0.8rem", lineHeight: 1.6 }}
          >
            Standard application on clean white. For documents, cards, and print.
          </p>
          <span
            style={{
              fontSize: "0.65rem",
              color: BRAND.navy,
              opacity: 0.3,
              marginTop: "auto",
            }}
          >
            White Background
          </span>
        </div>
      </div>

      {/* Accessibility — corrected contrast ratios */}
      <h2
        className="mb-6"
        style={{ color: BRAND.navy, fontSize: "1.15rem", fontWeight: 600 }}
      >
        Contrast & Accessibility
      </h2>
      <div
        className="rounded-2xl p-8 border"
        style={{
          background: BRAND.white,
          borderColor: "rgba(37,99,235,0.06)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { fg: "Blue", bg: "White", fgH: BRAND.blue, bgH: BRAND.white, ratio: "5.1 : 1", level: "AA" },
            { fg: "Navy", bg: "White", fgH: BRAND.navy, bgH: BRAND.white, ratio: "17.9 : 1", level: "AAA" },
            { fg: "White", bg: "Navy", fgH: BRAND.white, bgH: BRAND.navy, ratio: "17.9 : 1", level: "AAA" },
            { fg: "Blue", bg: "Sky", fgH: BRAND.blue, bgH: BRAND.sky, ratio: "4.7 : 1", level: "AA" },
            { fg: "White", bg: "Blue", fgH: BRAND.white, bgH: BRAND.blue, ratio: "5.1 : 1", level: "AA" },
            { fg: "Navy", bg: "Sky", fgH: BRAND.navy, bgH: BRAND.sky, ratio: "16.4 : 1", level: "AAA" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Mini swatch */}
              <div className="flex-shrink-0 flex rounded overflow-hidden" style={{ width: 28, height: 18 }}>
                <div style={{ width: 14, height: 18, background: item.fgH }} />
                <div style={{ width: 14, height: 18, background: item.bgH, border: item.bgH === BRAND.white ? "1px solid rgba(0,0,0,0.08)" : undefined }} />
              </div>
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: "#DCFCE7",
                  color: "#166534",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                }}
              >
                {item.level} ✓
              </span>
              <span
                style={{
                  fontSize: "0.78rem",
                  color: BRAND.navy,
                }}
              >
                {item.fg} / {item.bg}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.68rem",
                  color: BRAND.navy,
                  opacity: 0.35,
                  marginLeft: "auto",
                }}
              >
                {item.ratio}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-6 pt-5"
          style={{
            borderTop: "1px solid rgba(37,99,235,0.05)",
            fontSize: "0.75rem",
            color: BRAND.navy,
            opacity: 0.4,
            lineHeight: 1.6,
          }}
        >
          All pairings exceed WCAG 2.1 AA (4.5:1 minimum). Navy/White and
          Navy/Sky achieve AAA (7:1+). Ratios calculated per WCAG relative
          luminance formula.
        </p>
      </div>
    </div>
  );
}
