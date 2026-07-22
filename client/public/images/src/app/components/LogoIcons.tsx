// ─────────────────────────────────────────────
// AI Team Premium — Brand Mark System
// Orbit Connection · Neural Nexus
// ─────────────────────────────────────────────

export const BRAND = {
  blue: "#2563EB",
  navy: "#0F172A",
  sky: "#EFF6FF",
  white: "#FFFFFF",
  black: "#000000",
};

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/*
 * ── GEOMETRY SPEC (64×64 viewBox, center 32,32) ──
 *
 * ORBITS:  Two ellipses, rx=24 ry=11, rotated ±35°
 *          strokeWidth=2.2, round caps
 *
 * RING:    Circle r=12, strokeWidth=1.3, 25% opacity
 *
 * NODES:   3 circles r=2.8 on the ring at 120° intervals
 *          Top:          (32.00, 20.00)
 *          Bottom-right: (42.39, 38.00)
 *          Bottom-left:  (21.61, 38.00)
 *          Equilateral △, all edges ≈ 20.78 units ✓
 *
 * CORE:    Circle r=4, center (32,32)
 *          1.43× satellite radius → clear hierarchy
 */

export function IconOrbit({
  size = 64,
  color = BRAND.blue,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", flexShrink: 0 }}
    >
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="11"
        transform="rotate(-35 32 32)"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="11"
        transform="rotate(35 32 32)"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="12"
        stroke={color}
        strokeWidth="1.3"
        fill="none"
        opacity="0.25"
      />
      <circle cx="32" cy="20" r="2.8" fill={color} />
      <circle cx="42.39" cy="38" r="2.8" fill={color} />
      <circle cx="21.61" cy="38" r="2.8" fill={color} />
      <circle cx="32" cy="32" r="4" fill={color} />
    </svg>
  );
}

export function IconOrbitSimple({
  size = 16,
  color = BRAND.blue,
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", flexShrink: 0 }}
    >
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="11"
        transform="rotate(-35 32 32)"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="11"
        transform="rotate(35 32 32)"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="32" r="6" fill={color} />
    </svg>
  );
}

export function IconOrbitConstruction({
  size = 400,
  color = BRAND.blue,
  className,
}: IconProps) {
  const g = "rgba(37,99,235,0.12)";
  const gs = "rgba(37,99,235,0.25)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block" }}
    >
      <line x1="32" y1="0" x2="32" y2="64" stroke={g} strokeWidth="0.3" />
      <line x1="0" y1="32" x2="64" y2="32" stroke={g} strokeWidth="0.3" />
      <line x1="0" y1="0" x2="64" y2="64" stroke={g} strokeWidth="0.2" />
      <line x1="64" y1="0" x2="0" y2="64" stroke={g} strokeWidth="0.2" />
      <circle cx="32" cy="32" r="28" stroke={g} strokeWidth="0.3" fill="none" />
      <circle cx="32" cy="32" r="12" stroke={gs} strokeWidth="0.4" strokeDasharray="1.5 1" fill="none" />
      <polygon points="32,20 42.39,38 21.61,38" stroke={gs} strokeWidth="0.35" strokeDasharray="1.2 0.8" fill="none" />
      {/* Mark */}
      <ellipse cx="32" cy="32" rx="24" ry="11" transform="rotate(-35 32 32)" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <ellipse cx="32" cy="32" rx="24" ry="11" transform="rotate(35 32 32)" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="32" r="12" stroke={color} strokeWidth="1.3" fill="none" opacity="0.25" />
      <circle cx="32" cy="20" r="2.8" fill={color} />
      <circle cx="42.39" cy="38" r="2.8" fill={color} />
      <circle cx="21.61" cy="38" r="2.8" fill={color} />
      <circle cx="32" cy="32" r="4" fill={color} />
      {/* Guides */}
      <circle cx="32" cy="20" r="4.5" stroke={gs} strokeWidth="0.3" fill="none" />
      <circle cx="42.39" cy="38" r="4.5" stroke={gs} strokeWidth="0.3" fill="none" />
      <circle cx="21.61" cy="38" r="4.5" stroke={gs} strokeWidth="0.3" fill="none" />
      <circle cx="32" cy="32" r="6.5" stroke={gs} strokeWidth="0.3" fill="none" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Shared wordmark renderer (DRY helper)
//
// DESIGN: "AI" renders in accentColor (brand blue)
// to visually connect the icon mark with the type.
// "Team Premium BD" renders in the base color.
// When accent & base are the same (e.g. all white
// on dark bg), the wordmark is uniform — intentional.
// ─────────────────────────────────────────────

const FONT =
  "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

function WordmarkInner({
  fontSize,
  tracking,
  accentColor,
  baseColor,
}: {
  fontSize: number;
  tracking: string;
  accentColor: string;
  baseColor: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.25em",
        whiteSpace: "nowrap",
        fontSize,
        letterSpacing: tracking,
        color: baseColor,
        fontFamily: FONT,
        lineHeight: 1.2,
      }}
    >
      <span style={{ fontWeight: 700, color: accentColor }}>AI</span>
      <span style={{ fontWeight: 300 }}>Team</span>
      <span style={{ fontWeight: 600 }}>Premium</span>
      <span style={{ fontWeight: 300 }}>BD</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// Standalone Wordmark
// ─────────────────────────────────────────────

const WM_SIZES: Record<string, { fs: number; tr: string }> = {
  xs: { fs: 11, tr: "0.04em" },
  sm: { fs: 13, tr: "0.05em" },
  md: { fs: 16, tr: "0.06em" },
  lg: { fs: 20, tr: "0.07em" },
  xl: { fs: 28, tr: "0.08em" },
  "2xl": { fs: 36, tr: "0.09em" },
};

export function Wordmark({
  size = "lg",
  color = BRAND.navy,
  accentColor,
  className,
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  color?: string;
  accentColor?: string;
  className?: string;
}) {
  const s = WM_SIZES[size];
  return (
    <span className={className ?? ""}>
      <WordmarkInner
        fontSize={s.fs}
        tracking={s.tr}
        accentColor={accentColor ?? color ?? BRAND.navy}
        baseColor={color ?? BRAND.navy}
      />
    </span>
  );
}

// ─────────────────────────────────────────────
// Logo Lockups — pixel-perfect, pre-checked ratios
// ─────────────────────────────────────────────

/*
 * STACKED — icon centered above wordmark (single line)
 *
 * Visual icon height (content, not viewBox) ≈ 53% of icon px size
 * because mark bbox is ~34/64 of viewBox.
 *
 * Preset    Icon   Font  Visual icon h  Cap h (~71%)  Vis ratio
 * sm         56     13     29.7           9.2          3.22 : 1
 * md         88     17     46.6          12.1          3.86 : 1
 * lg        120     21     63.6          14.9          4.27 : 1
 * xl        168     27     89.0          19.2          4.64 : 1
 *
 * Icon is clearly the hero element; text is a label beneath.
 * Pattern matches Apple, Airbnb, Anthropic stacked marks.
 */
const STACKED = {
  sm: { icon: 56, fs: 13, gap: 6, tr: "0.05em" },
  md: { icon: 88, fs: 17, gap: 8, tr: "0.06em" },
  lg: { icon: 120, fs: 21, gap: 10, tr: "0.07em" },
  xl: { icon: 168, fs: 27, gap: 14, tr: "0.08em" },
};

export function LogoStacked({
  size = "lg",
  iconColor = BRAND.blue,
  textColor = BRAND.navy,
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  iconColor?: string;
  textColor?: string;
  className?: string;
}) {
  const s = STACKED[size];
  // "AI" shares iconColor to connect mark + type
  const accent = iconColor === textColor ? textColor : iconColor;
  return (
    <div
      className={className ?? ""}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: s.gap,
      }}
    >
      <IconOrbit size={s.icon} color={iconColor} />
      <WordmarkInner
        fontSize={s.fs}
        tracking={s.tr}
        accentColor={accent}
        baseColor={textColor}
      />
    </div>
  );
}

/*
 * HORIZONTAL — icon left, wordmark right, vertically centered
 *
 * Preset    Icon   Font   Vis ratio (≈)
 * sm         28     13     1.62 : 1
 * md         40     17     1.76 : 1
 * lg         52     21     1.85 : 1
 * xl         72     28     1.92 : 1
 */
const HORIZ = {
  sm: { icon: 28, fs: 13, gap: 10, tr: "0.05em" },
  md: { icon: 40, fs: 17, gap: 12, tr: "0.06em" },
  lg: { icon: 52, fs: 21, gap: 14, tr: "0.07em" },
  xl: { icon: 72, fs: 28, gap: 18, tr: "0.08em" },
};

export function LogoHorizontal({
  size = "lg",
  iconColor = BRAND.blue,
  textColor = BRAND.navy,
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  iconColor?: string;
  textColor?: string;
  className?: string;
}) {
  const s = HORIZ[size];
  const accent = iconColor === textColor ? textColor : iconColor;
  return (
    <div
      className={className ?? ""}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
      }}
    >
      <IconOrbit size={s.icon} color={iconColor} />
      <WordmarkInner
        fontSize={s.fs}
        tracking={s.tr}
        accentColor={accent}
        baseColor={textColor}
      />
    </div>
  );
}