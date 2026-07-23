import {
  BRAND,
  IconOrbit,
  IconOrbitSimple,
  LogoStacked,
  LogoHorizontal,
} from "./LogoIcons";

export function FinalSelectionPage() {
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
          Logo System
        </p>
        <h1
          style={{
            color: BRAND.navy,
            fontSize: "2rem",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Production-Ready Assets
        </h1>
        <p
          className="mt-3 max-w-2xl"
          style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.95rem" }}
        >
          Complete logo system — horizontal, stacked, monochrome, favicon, and
          clear space rules. Ready for all brand touchpoints.
        </p>
      </div>

      {/* 1. Horizontal */}
      <Section title="1. Primary Logo — Horizontal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card bg={BRAND.white} border>
            <LogoHorizontal size="lg" iconColor={BRAND.blue} textColor={BRAND.navy} />
            <Label>On White</Label>
          </Card>
          <Card bg={BRAND.navy}>
            <LogoHorizontal size="lg" iconColor={BRAND.white} textColor={BRAND.white} />
            <Label light>On Navy</Label>
          </Card>
          <Card bg={BRAND.sky} border>
            <LogoHorizontal size="lg" iconColor={BRAND.blue} textColor={BRAND.navy} />
            <Label>On Sky</Label>
          </Card>
          <Card bg={BRAND.blue}>
            <LogoHorizontal size="lg" iconColor={BRAND.white} textColor={BRAND.white} />
            <Label light>On Blue</Label>
          </Card>
        </div>
      </Section>

      {/* 2. Stacked */}
      <Section title="2. Primary Logo — Stacked">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card bg={BRAND.white} border centered>
            <LogoStacked size="lg" iconColor={BRAND.blue} textColor={BRAND.navy} />
            <Label>On White</Label>
          </Card>
          <Card bg={BRAND.navy} centered>
            <LogoStacked size="lg" iconColor={BRAND.white} textColor={BRAND.white} />
            <Label light>On Navy</Label>
          </Card>
          <Card bg={BRAND.sky} border centered>
            <LogoStacked size="md" iconColor={BRAND.blue} textColor={BRAND.navy} />
            <Label>Stacked md</Label>
          </Card>
          <Card bg={BRAND.blue} centered>
            <LogoStacked size="md" iconColor={BRAND.white} textColor={BRAND.white} />
            <Label light>Stacked md</Label>
          </Card>
        </div>
      </Section>

      {/* 3. Icon Mark */}
      <Section title="3. Standalone Icon Mark">
        <div className="flex flex-wrap gap-6">
          {[
            { bg: BRAND.white, c: BRAND.blue, bd: "rgba(37,99,235,0.08)", l: "Blue / White" },
            { bg: BRAND.blue, c: BRAND.white, bd: "transparent", l: "White / Blue" },
            { bg: BRAND.navy, c: BRAND.white, bd: "transparent", l: "White / Navy" },
            { bg: BRAND.sky, c: BRAND.blue, bd: "rgba(37,99,235,0.06)", l: "Blue / Sky" },
            { bg: "#F1F5F9", c: BRAND.black, bd: "rgba(0,0,0,0.04)", l: "Black Mono" },
            { bg: BRAND.black, c: BRAND.white, bd: "transparent", l: "White / Black" },
          ].map((v) => (
            <div key={v.l} className="flex flex-col items-center gap-3">
              <div
                className="flex items-center justify-center rounded-2xl"
                style={{ width: 100, height: 100, background: v.bg, border: `1px solid ${v.bd}` }}
              >
                <IconOrbit size={60} color={v.c} />
              </div>
              <span style={{ fontSize: "0.6rem", color: BRAND.navy, opacity: 0.4 }}>{v.l}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Monochrome */}
      <Section title="4. Monochrome Versions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { bg: BRAND.white, ic: BRAND.black, tx: BRAND.black, l: "Black", bd: "rgba(0,0,0,0.06)" },
            { bg: BRAND.navy, ic: BRAND.white, tx: BRAND.white, l: "White", bd: "transparent" },
            { bg: BRAND.white, ic: BRAND.blue, tx: BRAND.blue, l: "Single Blue", bd: "rgba(37,99,235,0.08)" },
          ].map((v) => (
            <Card key={v.l} bg={v.bg} borderColor={v.bd}>
              <LogoHorizontal size="md" iconColor={v.ic} textColor={v.tx} />
              <Label light={v.bg === BRAND.navy}>{v.l}</Label>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5. Favicon */}
      <Section title="5. Favicon / App Icon">
        <div className="flex flex-wrap items-end gap-6">
          {[
            { s: 64, pad: 20, simple: false },
            { s: 48, pad: 16, simple: false },
            { s: 32, pad: 12, simple: false },
            { s: 24, pad: 10, simple: true },
            { s: 16, pad: 8, simple: true },
          ].map(({ s, pad, simple }) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: s + pad, height: s + pad, background: BRAND.blue }}
              >
                {simple ? (
                  <IconOrbitSimple size={s} color={BRAND.white} />
                ) : (
                  <IconOrbit size={s} color={BRAND.white} />
                )}
              </div>
              <span style={{ fontSize: "0.6rem", color: BRAND.navy, opacity: 0.3 }}>{s}px</span>
            </div>
          ))}
        </div>
        <p className="mt-4" style={{ fontSize: "0.75rem", color: BRAND.navy, opacity: 0.4 }}>
          Simplified mark (orbits + core) at 24 px and below.
        </p>
      </Section>

      {/* 6. Clear Space */}
      <Section title="6. Clear Space & Minimum Size">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card bg={BRAND.white} border>
            <div className="relative w-full">
              <div
                className="border-2 border-dashed rounded-xl p-10 flex items-center justify-center"
                style={{ borderColor: "rgba(37,99,235,0.25)" }}
              >
                <LogoHorizontal size="md" iconColor={BRAND.blue} textColor={BRAND.navy} />
              </div>
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3"
                style={{
                  background: BRAND.white,
                  fontSize: "0.65rem",
                  color: BRAND.blue,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                1× icon height clear space on all sides
              </span>
            </div>
            <Label>Clear Space Rule</Label>
          </Card>

          <Card bg={BRAND.white} border>
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-4">
                <LogoHorizontal size="sm" iconColor={BRAND.blue} textColor={BRAND.navy} />
                <Badge pass>Min horizontal — sm</Badge>
              </div>
              <div className="flex items-center gap-4">
                <LogoStacked size="sm" iconColor={BRAND.blue} textColor={BRAND.navy} />
                <Badge pass>Min stacked — sm</Badge>
              </div>
              <div className="flex items-center gap-4">
                <IconOrbitSimple size={16} color={BRAND.blue} />
                <Badge pass>Simplified icon — 16px</Badge>
              </div>
              <div className="h-px" style={{ background: "rgba(37,99,235,0.06)" }} />
              <p style={{ fontSize: "0.75rem", color: BRAND.navy, opacity: 0.4, lineHeight: 1.5 }}>
                Below 24 px icon size, switch to simplified mark. Never scale
                wordmark independently from the lockup.
              </p>
            </div>
            <Label>Minimum Size</Label>
          </Card>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <h2 className="mb-6" style={{ color: BRAND.navy, fontSize: "1.15rem", fontWeight: 600 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Card({
  bg,
  border,
  borderColor,
  centered,
  children,
}: {
  bg: string;
  border?: boolean;
  borderColor?: string;
  centered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col gap-5 ${centered ? "items-center" : "items-start"}`}
      style={{
        background: bg,
        border: `1px solid ${borderColor ?? (border ? "rgba(37,99,235,0.06)" : "transparent")}`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      style={{
        fontSize: "0.6rem",
        color: light ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.3)",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function Badge({ children, pass }: { children: React.ReactNode; pass?: boolean }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full"
      style={{
        background: pass ? "#DCFCE7" : "#FEE2E2",
        color: pass ? "#166534" : "#991B1B",
        fontSize: "0.6rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {pass ? "✓" : "✕"} {children}
    </span>
  );
}
