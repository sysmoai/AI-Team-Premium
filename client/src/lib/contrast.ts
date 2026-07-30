// Brand colours are used as text colours across the tool and comparison pages.
// Used raw, they fail in one direction or the other: GitHub (#24292F) and Notion
// (#000000) disappear on the dark navy hero, while Canva (#00C4CC) and the amber
// accent (#F59E0B) are unreadable on white. Both produce text that is present in
// the DOM but effectively invisible to the reader.
//
// readableOn() keeps a brand's hue and shifts only its lightness until it clears
// a contrast threshold against the surface it sits on, so the colour still reads
// as the brand without vanishing.

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function channelLuminance(v: number): number {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h, s, l };
}

function hslToHex(h: number, s: number, l: number): string {
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    const c = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Return `color` adjusted so it reaches `minRatio` against `surface`, keeping
 * hue and saturation. Lightness moves away from the surface: darker on a light
 * surface, lighter on a dark one. Falls back to plain black or white only if the
 * hue cannot reach the threshold at any lightness.
 */
export function readableOn(color: string, surface: string, minRatio = 4.5): string {
  if (!color) return surface === "#ffffff" ? "#111827" : "#ffffff";
  let current = color;
  try {
    if (contrastRatio(current, surface) >= minRatio) return current;
    const { r, g, b } = hexToRgb(color);
    const { h, s } = rgbToHsl(r, g, b);
    const surfaceIsDark = relativeLuminance(surface) < 0.5;

    // Walk lightness away from the surface in small steps and take the first
    // value that clears the threshold.
    for (let step = 1; step <= 100; step++) {
      const l = surfaceIsDark ? Math.min(1, step / 100) : Math.max(0, 1 - step / 100);
      const candidate = hslToHex(h, s, l);
      if (contrastRatio(candidate, surface) >= minRatio) return candidate;
    }
    return surfaceIsDark ? "#ffffff" : "#111827";
  } catch {
    return surfaceIsDark(surface) ? "#ffffff" : "#111827";
  }
}

/**
 * Pick black or white for text sitting directly on `background`. White on a
 * light brand colour (Canva's #00C4CC, amber #F59E0B) is barely legible; this
 * flips to near-black when that reads better.
 */
export function bestTextOn(background: string): string {
  try {
    return contrastRatio("#ffffff", background) >= contrastRatio("#111827", background)
      ? "#ffffff"
      : "#111827";
  } catch {
    return "#ffffff";
  }
}

function surfaceIsDark(surface: string): boolean {
  try {
    return relativeLuminance(surface) < 0.5;
  } catch {
    return false;
  }
}
