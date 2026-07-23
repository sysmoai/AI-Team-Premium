import {
  BRAND,
  IconOrbit,
  IconOrbitSimple,
  IconOrbitConstruction,
  LogoStacked,
  LogoHorizontal,
} from "./LogoIcons";

export function ConceptsPage() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <div className="mb-16 text-center">
        <p
          className="mb-3 uppercase"
          style={{
            color: BRAND.blue,
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            fontWeight: 600,
          }}
        >
          Brand Identity — Orbit Connection
        </p>
        <h1
          style={{
            color: BRAND.navy,
            fontSize: "2.5rem",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Neural Nexus Mark
        </h1>
        <p
          className="mt-4 mx-auto max-w-lg"
          style={{
            color: BRAND.navy,
            opacity: 0.5,
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          The official brand mark for AI Team Premium — a team united around
          AI, connected through a shared network, reaching the world.
        </p>
      </div>

      {/* ─── Giant Icon Display ─── */}
      <div
        className="rounded-3xl mb-6 flex items-center justify-center border overflow-hidden"
        style={{
          background: BRAND.white,
          borderColor: "rgba(37,99,235,0.06)",
          minHeight: 460,
        }}
      >
        <div className="py-14 px-8">
          <IconOrbit size={320} color={BRAND.blue} />
        </div>
      </div>
      <div className="text-center mb-20">
        <p
          style={{
            color: BRAND.navy,
            opacity: 0.25,
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
          }}
        >
          320 × 320 px — Full detail mark
        </p>
      </div>

      {/* ─── Stacked Logo ─── */}
      <SectionTitle>Stacked Logo</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div
          className="rounded-2xl flex items-center justify-center border"
          style={{
            background: BRAND.white,
            borderColor: "rgba(37,99,235,0.06)",
            minHeight: 340,
          }}
        >
          <LogoStacked
            size="xl"
            iconColor={BRAND.blue}
            textColor={BRAND.navy}
          />
        </div>
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{ background: BRAND.navy, minHeight: 340 }}
        >
          <LogoStacked
            size="xl"
            iconColor={BRAND.white}
            textColor={BRAND.white}
          />
        </div>
      </div>

      {/* ─── Horizontal Logo ─── */}
      <SectionTitle>Horizontal Logo</SectionTitle>
      <div className="grid grid-cols-1 gap-8 mb-20">
        <div
          className="rounded-2xl flex items-center justify-center border py-14 px-10"
          style={{
            background: BRAND.white,
            borderColor: "rgba(37,99,235,0.06)",
          }}
        >
          <LogoHorizontal
            size="xl"
            iconColor={BRAND.blue}
            textColor={BRAND.navy}
          />
        </div>
        <div
          className="rounded-2xl flex items-center justify-center py-14 px-10"
          style={{ background: BRAND.navy }}
        >
          <LogoHorizontal
            size="xl"
            iconColor={BRAND.white}
            textColor={BRAND.white}
          />
        </div>
      </div>

      {/* ─── Lockup Size System ─── */}
      <SectionTitle>Lockup Size System</SectionTitle>
      <div
        className="rounded-2xl border p-10 mb-20"
        style={{
          background: BRAND.white,
          borderColor: "rgba(37,99,235,0.06)",
        }}
      >
        <p
          className="mb-8"
          style={{ color: BRAND.navy, fontSize: "0.85rem", fontWeight: 600 }}
        >
          Stacked — sm / md / lg / xl
        </p>
        <div className="flex items-end justify-center gap-14 flex-wrap mb-14">
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-5">
              <LogoStacked
                size={s}
                iconColor={BRAND.blue}
                textColor={BRAND.navy}
              />
              <span
                style={{
                  fontSize: "0.6rem",
                  color: BRAND.navy,
                  opacity: 0.3,
                  fontWeight: 500,
                }}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        <div
          className="h-px mb-10"
          style={{ background: "rgba(37,99,235,0.06)" }}
        />

        <p
          className="mb-8"
          style={{ color: BRAND.navy, fontSize: "0.85rem", fontWeight: 600 }}
        >
          Horizontal — sm / md / lg / xl
        </p>
        <div className="flex flex-col items-start gap-8">
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <div key={s} className="flex items-center gap-6">
              <LogoHorizontal
                size={s}
                iconColor={BRAND.blue}
                textColor={BRAND.navy}
              />
              <span
                style={{
                  fontSize: "0.6rem",
                  color: BRAND.navy,
                  opacity: 0.3,
                  fontWeight: 500,
                }}
              >
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Background Variants ─── */}
      <SectionTitle>Background Variants</SectionTitle>
      <div
        className="rounded-2xl border overflow-hidden mb-20"
        style={{ borderColor: "rgba(37,99,235,0.06)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { bg: BRAND.white, ic: BRAND.blue, tx: BRAND.navy, label: "White" },
            { bg: BRAND.sky, ic: BRAND.blue, tx: BRAND.navy, label: "Sky" },
            { bg: BRAND.navy, ic: BRAND.white, tx: BRAND.white, label: "Navy" },
            { bg: BRAND.blue, ic: BRAND.white, tx: BRAND.white, label: "Blue" },
          ].map((v) => (
            <div
              key={v.label}
              className="flex flex-col items-center justify-center py-12 px-4"
              style={{ background: v.bg }}
            >
              <LogoStacked size="sm" iconColor={v.ic} textColor={v.tx} />
              <span
                style={{
                  fontSize: "0.6rem",
                  color: v.tx,
                  opacity: 0.3,
                  marginTop: 16,
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                }}
              >
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Construction Grid ─── */}
      <SectionTitle>Construction & Geometry</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        <div
          className="rounded-2xl border flex items-center justify-center p-6"
          style={{
            background: BRAND.white,
            borderColor: "rgba(37,99,235,0.06)",
          }}
        >
          <IconOrbitConstruction size={360} color={BRAND.blue} />
        </div>

        <div
          className="rounded-2xl border p-8"
          style={{
            background: BRAND.white,
            borderColor: "rgba(37,99,235,0.06)",
          }}
        >
          <h3
            className="mb-6"
            style={{ color: BRAND.navy, fontSize: "1rem", fontWeight: 600 }}
          >
            Geometry Specification
          </h3>
          <div>
            {[
              { label: "ViewBox", value: "64 × 64, center (32, 32)" },
              { label: "Orbits", value: "rx=24 ry=11, ±35°, stroke 2.2" },
              { label: "Ring", value: "r=12, stroke 1.3, 25% opacity" },
              { label: "Nodes", value: "3× r=2.8, equilateral △ on ring" },
              { label: "Core", value: "r=4 at (32, 32)" },
              { label: "△ Edges", value: "≈ 20.78 each (equilateral ✓)" },
              { label: "Core:Node", value: "4 : 2.8 = 1.43× hierarchy" },
              { label: "Stacked", value: "Icon : cap-height ≈ 3.2–4.6:1" },
              { label: "Horizontal", value: "Icon : cap-height ≈ 1.6–1.9:1" },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className="flex items-baseline py-2"
                style={{
                  borderBottom:
                    i < arr.length - 1
                      ? "1px solid rgba(37,99,235,0.05)"
                      : "none",
                }}
              >
                <span
                  className="flex-shrink-0"
                  style={{
                    width: 100,
                    fontSize: "0.75rem",
                    color: BRAND.navy,
                    fontWeight: 600,
                  }}
                >
                  {row.label}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    color: BRAND.navy,
                    opacity: 0.5,
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Mark Anatomy ─── */}
      <SectionTitle>Mark Anatomy</SectionTitle>
      <div
        className="rounded-2xl border p-10 mb-20"
        style={{
          background: BRAND.white,
          borderColor: "rgba(37,99,235,0.06)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <IconOrbit size={200} color={BRAND.blue} />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                n: "01",
                t: "Dual Orbital Paths",
                d: "Two ellipses at ±35° — global AI connectivity, reach, and dynamic energy.",
              },
              {
                n: "02",
                t: "Inner Network Ring",
                d: "Subtle circle at 25% opacity connecting the team nodes — the collaboration layer.",
              },
              {
                n: "03",
                t: "Three Team Nodes",
                d: "Equilateral triangle on the ring — balanced, equal partnership and teamwork.",
              },
              {
                n: "04",
                t: "AI Core Hub",
                d: "Central point 1.43× larger than nodes — the intelligence engine anchoring the mark.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-3">
                <span
                  className="flex-shrink-0 inline-flex items-center justify-center rounded-lg"
                  style={{
                    width: 32,
                    height: 32,
                    background: BRAND.sky,
                    color: BRAND.blue,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  {item.n}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: BRAND.navy,
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    {item.t}
                  </p>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: BRAND.navy,
                      opacity: 0.45,
                      lineHeight: 1.55,
                    }}
                  >
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Scale Test ─── */}
      <SectionTitle>Scale Test</SectionTitle>
      <div
        className="rounded-2xl border p-10 mb-10"
        style={{
          background: BRAND.white,
          borderColor: "rgba(37,99,235,0.06)",
        }}
      >
        <div className="flex items-end gap-10 flex-wrap justify-center">
          {[
            { s: 160, simple: false },
            { s: 96, simple: false },
            { s: 64, simple: false },
            { s: 48, simple: false },
            { s: 32, simple: false },
            { s: 24, simple: true },
            { s: 16, simple: true },
          ].map(({ s, simple }) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: Math.max(s + 24, 48),
                  height: Math.max(s + 24, 48),
                  background: BRAND.sky,
                }}
              >
                {simple ? (
                  <IconOrbitSimple size={s} color={BRAND.blue} />
                ) : (
                  <IconOrbit size={s} color={BRAND.blue} />
                )}
              </div>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: BRAND.navy,
                  opacity: 0.3,
                  fontWeight: 500,
                }}
              >
                {s}px
              </span>
            </div>
          ))}
        </div>
        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: "1px solid rgba(37,99,235,0.05)" }}
        >
          <p
            style={{
              fontSize: "0.78rem",
              color: BRAND.navy,
              opacity: 0.4,
              lineHeight: 1.6,
            }}
          >
            Full mark at 32 px and above. Simplified mark (orbits + core) at
            24 px and below.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-8"
      style={{ color: BRAND.navy, fontSize: "1.15rem", fontWeight: 600 }}
    >
      {children}
    </h2>
  );
}