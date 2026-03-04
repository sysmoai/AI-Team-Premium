import {
  BRAND,
  IconOrbit,
  Wordmark,
  LogoStacked,
  LogoHorizontal,
} from "./LogoIcons";

export function GuidelinesPage() {
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
          Brand Guidelines
        </p>
        <h1
          style={{
            color: BRAND.navy,
            fontSize: "2rem",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Usage & Export Reference
        </h1>
        <p
          className="mt-3 max-w-2xl"
          style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.95rem" }}
        >
          Rules for consistent application of the AI Team Premium BD identity
          across all touchpoints.
        </p>
      </div>

      {/* Wordmark Spec */}
      <Section title="Wordmark Specification">
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: BRAND.white,
            borderColor: "rgba(37,99,235,0.06)",
          }}
        >
          <div className="flex flex-col gap-6">
            {/* Large wordmark preview */}
            <Wordmark
              size="2xl"
              color={BRAND.navy}
              accentColor={BRAND.blue}
            />

            {/* Weight breakdown */}
            <div className="flex flex-wrap gap-8 mt-2">
              {[
                {
                  word: "AI",
                  weight: "Bold 700",
                  note: "Brand blue accent — connects icon to type",
                  color: BRAND.blue,
                },
                {
                  word: "Team",
                  weight: "Light 300",
                  note: "Soft contrast — approachable & human",
                  color: BRAND.navy,
                },
                {
                  word: "Premium",
                  weight: "SemiBold 600",
                  note: "Core emphasis — quality & confidence",
                  color: BRAND.navy,
                },
                {
                  word: "BD",
                  weight: "Light 300",
                  note: "Balanced ending — open & grounded",
                  color: BRAND.navy,
                },
              ].map((item) => (
                <div key={item.word} className="flex flex-col">
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: item.color,
                      fontWeight: 600,
                    }}
                  >
                    "{item.word}"
                  </span>
                  <span
                    style={{
                      fontSize: "0.73rem",
                      color: BRAND.navy,
                      fontWeight: 500,
                    }}
                  >
                    {item.weight}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: BRAND.navy,
                      opacity: 0.4,
                      marginTop: 2,
                    }}
                  >
                    {item.note}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="pt-5 border-t"
              style={{ borderColor: "rgba(37,99,235,0.06)" }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  color: BRAND.navy,
                  opacity: 0.5,
                  lineHeight: 1.65,
                }}
              >
                <strong style={{ fontWeight: 600 }}>Design system:</strong>{" "}
                "AI" renders in brand blue to visually connect the icon mark
                with the wordmark. On dark backgrounds where both icon and text
                are white, "AI" unifies with the rest. The weight rhythm
                (Bold–Light–SemiBold–Light) creates a visual heartbeat across
                the name. Always write in one line — never abbreviate or break.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Lockup Rules */}
      <Section title="Lockup Rules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: BRAND.white,
              borderColor: "rgba(37,99,235,0.06)",
            }}
          >
            <p
              className="mb-6"
              style={{
                color: BRAND.navy,
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              Horizontal Lockup
            </p>
            <div className="space-y-5">
              <div
                className="rounded-xl p-6 flex items-center justify-center"
                style={{ background: BRAND.sky }}
              >
                <LogoHorizontal
                  size="lg"
                  iconColor={BRAND.blue}
                  textColor={BRAND.navy}
                />
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: BRAND.navy,
                  opacity: 0.45,
                  lineHeight: 1.6,
                }}
              >
                Icon and wordmark vertically centered. Icon:cap-height ≈ 1.6–1.9:1.
                Use for headers, navigation, banners, and wide placements.
              </p>
            </div>
          </div>
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: BRAND.white,
              borderColor: "rgba(37,99,235,0.06)",
            }}
          >
            <p
              className="mb-6"
              style={{
                color: BRAND.navy,
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              Stacked Lockup
            </p>
            <div className="space-y-5">
              <div
                className="rounded-xl p-8 flex items-center justify-center"
                style={{ background: BRAND.sky }}
              >
                <LogoStacked
                  size="md"
                  iconColor={BRAND.blue}
                  textColor={BRAND.navy}
                />
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: BRAND.navy,
                  opacity: 0.45,
                  lineHeight: 1.6,
                }}
              >
                Icon centered above wordmark (single line). Icon:cap-height ≈ 2.5–3.5:1.
                Use for social profiles, app icons, square/vertical placements.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Do's and Don'ts */}
      <Section title="Do's & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: BRAND.white,
              borderColor: "rgba(37,99,235,0.06)",
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  background: "#DCFCE7",
                  color: "#166534",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                ✓
              </span>
              <h3
                style={{
                  color: "#166534",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Do
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "Maintain 1× icon height clear space on all sides",
                "Use on approved brand backgrounds only",
                "Keep 'AI' in brand blue when on light backgrounds",
                "Keep the wordmark on a single line — never wrap or break",
                "Use stacked lockup for square/vertical placements",
                "Use horizontal lockup for wide/banner contexts",
                "Switch to simplified mark at 24 px and below",
                "Use monochrome versions when color is unavailable",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2.5"
                  style={{
                    fontSize: "0.85rem",
                    color: BRAND.navy,
                    opacity: 0.7,
                  }}
                >
                  <span
                    className="flex-shrink-0"
                    style={{ color: "#166534" }}
                  >
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-8 border"
            style={{
              background: BRAND.white,
              borderColor: "rgba(37,99,235,0.06)",
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  background: "#FEE2E2",
                  color: "#991B1B",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                ✕
              </span>
              <h3
                style={{
                  color: "#991B1B",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Don't
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "Apply gradients, shadows, or 3D effects to the logo",
                "Distort, rotate, or skew icon or wordmark",
                "Change colors outside the approved palette",
                "Abbreviate the name (e.g., 'ATPBD', 'AI Team')",
                "Break the wordmark across multiple lines",
                "Scale icon and text independently from the lockup",
                "Place the logo on busy or photographic backgrounds",
                "Use the full mark below 20 px or icon below 16 px",
                "Recolor 'AI' to a non-brand color",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2.5"
                  style={{
                    fontSize: "0.85rem",
                    color: BRAND.navy,
                    opacity: 0.7,
                  }}
                >
                  <span
                    className="flex-shrink-0"
                    style={{ color: "#991B1B" }}
                  >
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Export Checklist */}
      <Section title="Export-Ready Assets">
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: BRAND.white,
            borderColor: "rgba(37,99,235,0.06)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "SVG — Horizontal logo (light bg)",
              "SVG — Horizontal logo (dark bg)",
              "SVG — Stacked logo (light bg)",
              "SVG — Stacked logo (dark bg)",
              "SVG — Standalone icon mark",
              "SVG — Monochrome black",
              "SVG — Monochrome white",
              "SVG — Monochrome single blue",
              "PNG — Horizontal @1x, @2x, @3x",
              "PNG — Stacked @1x, @2x, @3x",
              "PNG — Favicon 16, 32, 48",
              "PNG — App icon 64, 128, 256, 512",
              "PNG — Social profile (1:1)",
              "PNG — Dark bg versions @1x, @2x",
            ].map((item, i) => (
              <label key={i} className="flex items-center gap-3 py-1.5">
                <span
                  className="inline-flex items-center justify-center rounded flex-shrink-0"
                  style={{
                    width: 18,
                    height: 18,
                    background: BRAND.sky,
                    border: `1.5px solid ${BRAND.blue}`,
                    color: BRAND.blue,
                    fontSize: "0.55rem",
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: BRAND.navy,
                    opacity: 0.65,
                  }}
                >
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      </Section>

      {/* Application Preview */}
      <Section title="Application Preview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business Card */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(37,99,235,0.06)" }}
          >
            <div className="p-6" style={{ background: BRAND.white }}>
              <div className="mb-6">
                <LogoHorizontal
                  size="sm"
                  iconColor={BRAND.blue}
                  textColor={BRAND.navy}
                />
              </div>
              <div className="space-y-1">
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: BRAND.navy,
                    fontWeight: 600,
                  }}
                >
                  John Doe
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: BRAND.navy,
                    opacity: 0.5,
                  }}
                >
                  AI Solutions Lead
                </p>
                <p style={{ fontSize: "0.7rem", color: BRAND.blue }}>
                  hello@aiteampremiumbd.com
                </p>
              </div>
            </div>
            <div className="px-6 py-3" style={{ background: BRAND.sky }}>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: BRAND.navy,
                  opacity: 0.35,
                }}
              >
                Business Card
              </span>
            </div>
          </div>

          {/* Email Header */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(37,99,235,0.06)" }}
          >
            <div className="p-6" style={{ background: BRAND.navy }}>
              <div className="mb-4">
                <LogoHorizontal
                  size="sm"
                  iconColor={BRAND.white}
                  textColor={BRAND.white}
                />
              </div>
              <div
                className="h-px mb-4"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
              <div className="space-y-2">
                <div
                  className="h-2 rounded-full w-3/4"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
                <div
                  className="h-2 rounded-full w-1/2"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />
                <div
                  className="h-2 rounded-full w-2/3"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>
            </div>
            <div className="px-6 py-3" style={{ background: BRAND.sky }}>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: BRAND.navy,
                  opacity: 0.35,
                }}
              >
                Email Header
              </span>
            </div>
          </div>

          {/* Social Profile */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(37,99,235,0.06)" }}
          >
            <div
              className="p-8 flex items-center justify-center"
              style={{ background: BRAND.white }}
            >
              <div
                className="rounded-2xl flex items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  background: BRAND.blue,
                }}
              >
                <IconOrbit size={72} color={BRAND.white} />
              </div>
            </div>
            <div className="px-6 py-3" style={{ background: BRAND.sky }}>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: BRAND.navy,
                  opacity: 0.35,
                }}
              >
                Social Avatar
              </span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-14">
      <h2
        className="mb-6"
        style={{ color: BRAND.navy, fontSize: "1.15rem", fontWeight: 600 }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
