export const BRAND = {
  blue: "#2563EB",
  navy: "#0F172A",
  sky: "#EFF6FF",
  white: "#FFFFFF",
  black: "#000000",
  accent: "#2563EB",
  /** Gradient for OG images and hero sections */
  gradient: "linear-gradient(135deg, #0F172A 0%, #1e3a5f 50%, #2563EB 100%)",
  /** Muted blue for backgrounds */
  muted: "rgba(37, 99, 235, 0.08)",
};

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Improved Atom Orbit icon — thicker strokes, higher-contrast ring,
 * slightly larger core for better visual balance at all sizes.
 * Based on the original geometry spec but enhanced for modern look.
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
      {/* Orbits — thicker 2.5 for better visibility */}
      <ellipse cx="32" cy="32" rx="24" ry="11" transform="rotate(-35 32 32)" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="32" cy="32" rx="24" ry="11" transform="rotate(35 32 32)" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Ring — more visible at 0.35 opacity */}
      <circle cx="32" cy="32" r="12" stroke={color} strokeWidth="1.6" fill="none" opacity="0.35" />
      {/* Nodes — slightly larger 3.0 */}
      <circle cx="32" cy="20" r="3" fill={color} />
      <circle cx="42.39" cy="38" r="3" fill={color} />
      <circle cx="21.61" cy="38" r="3" fill={color} />
      {/* Core — larger 4.5 for better center balance */}
      <circle cx="32" cy="32" r="4.5" fill={color} />
    </svg>
  );
}

const FONT = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

/**
 * Cleaner wordmark: "AI Team" in blue, "Premium" in navy.
 * Removed the "BD" suffix — the brand is "AI Team Premium".
 * Two styles only: bold accent + medium base = cleaner hierarchy.
 */
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
        gap: "0.3em",
        whiteSpace: "nowrap",
        fontSize,
        letterSpacing: tracking,
        color: baseColor,
        fontFamily: FONT,
        lineHeight: 1.2,
        fontWeight: 500,
      }}
    >
      <span style={{ fontWeight: 700, color: accentColor }}>AI</span>
      <span style={{ fontWeight: 400 }}>Team</span>
      <span style={{ fontWeight: 600 }}>Premium</span>
    </span>
  );
}

const STACKED = {
  sm: { icon: 56, fs: 13, gap: 6, tr: "0.05em" },
  md: { icon: 80, fs: 16, gap: 8, tr: "0.06em" },
  lg: { icon: 110, fs: 20, gap: 10, tr: "0.07em" },
  xl: { icon: 150, fs: 26, gap: 14, tr: "0.08em" },
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
      <WordmarkInner fontSize={s.fs} tracking={s.tr} accentColor={accent} baseColor={textColor} />
    </div>
  );
}

const HORIZ = {
  sm: { icon: 28, fs: 13, gap: 10, tr: "0.05em" },
  md: { icon: 38, fs: 16, gap: 12, tr: "0.06em" },
  lg: { icon: 48, fs: 20, gap: 14, tr: "0.07em" },
  xl: { icon: 64, fs: 26, gap: 18, tr: "0.08em" },
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
      <WordmarkInner fontSize={s.fs} tracking={s.tr} accentColor={accent} baseColor={textColor} />
    </div>
  );
}

export function WhatsAppIcon({ size = 20, color = "#fff" }: { size?: number; color?: string }) {
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