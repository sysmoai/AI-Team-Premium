/**
 * Comparison layer for the /compare/:slug page.
 *
 * Data is DERIVED from each /tools/*.tsx page's own `TOOL_META` export
 * (the structured snapshot of what that page shows). This keeps a single
 * source of truth per tool — when a tool page changes its model name or
 * price, the comparison page picks it up automatically, no duplication.
 *
 * We only define the icon resolver and the recommendation/row-winner
 * heuristics here; everything else flows out of the tool pages.
 */
import { Brain, Sparkles, Star, Image as ImageIcon, Video, Search, Code2, FileText, Edit3, Palette, Briefcase, Linkedin, Mic, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { TOOL_META as CHATGPT_META } from "@/pages/tools/ChatGPT";
import { TOOL_META as CLAUDE_META } from "@/pages/tools/Claude";
import { TOOL_META as GEMINI_META } from "@/pages/tools/Gemini";
import { TOOL_META as PERPLEXITY_META } from "@/pages/tools/Perplexity";
import { TOOL_META as GROK_META } from "@/pages/tools/Grok";
import { TOOL_META as MIDJOURNEY_META } from "@/pages/tools/Midjourney";
import { TOOL_META as LEONARDO_META } from "@/pages/tools/Leonardo";
import { TOOL_META as RUNWAY_META } from "@/pages/tools/Runway";
import { TOOL_META as KLING_META } from "@/pages/tools/Kling";
import { TOOL_META as COPILOT_META } from "@/pages/tools/Copilot";
import { TOOL_META as GRAMMARLY_META } from "@/pages/tools/Grammarly";
import { TOOL_META as NOTION_META } from "@/pages/tools/Notion";
import { TOOL_META as CANVA_META } from "@/pages/tools/Canva";
import { TOOL_META as MS365_META } from "@/pages/tools/Microsoft365";
import { TOOL_META as LINKEDIN_META } from "@/pages/tools/LinkedIn";
import { TOOL_META as ELEVENLABS_META } from "@/pages/tools/ElevenLabs";
import { TOOL_META as VAULT_META } from "@/pages/tools/Vault";
import { TOOL_META as MANUS_META } from "@/pages/tools/Manus";
import { TOOL_META as POE_META } from "@/pages/tools/Poe";
import { TOOL_META as FIREFLY_META } from "@/pages/tools/Firefly";
import { TOOL_META as IDEOGRAM_META } from "@/pages/tools/Ideogram";
import { TOOL_META as FREEPIK_META } from "@/pages/tools/Freepik";
import { TOOL_META as ADOBE_CC_META } from "@/pages/tools/AdobeCC";

const ICONS: Record<string, LucideIcon> = {
  Brain, Sparkles, Star, Image: ImageIcon, Video, Search, Code2, FileText, Edit3,
  Palette, Briefcase, Linkedin, Mic, Layers,
};

// The shape that every tool page's TOOL_META export must satisfy.
export interface ToolMeta {
  readonly slug: string;
  readonly category: "chat" | "image" | "video" | "writing" | "code" | "search";
  readonly priceBdt: number;
  readonly priceLabel: string;
  readonly model: string;
  readonly contextWindow: string;
  readonly multimodal: string;
  readonly banglaQuality: string;
  readonly speed: string;
  readonly accuracy: string;
  readonly pricingTier: string;
  readonly brand: string;
  readonly tagline: string;
  readonly toolPath: string;
  readonly iconName: string;
  readonly accent: string;
  readonly bestUseCase: string;
  readonly bestFor: readonly string[];
  readonly weaknesses: readonly string[];
}

export interface CompareTool extends ToolMeta {
  name: string;
  icon: LucideIcon;
  priceFromBdt: number;        // alias for compatibility
  priceFromLabel: string;      // alias for compatibility
  specs: {
    model: string;
    contextWindow: string;
    multimodal: string;
    banglaQuality: string;
    bestUseCase: string;
    speed: string;
    accuracy: string;
    pricingTier: string;
  };
}

// Tool-page name mapping (taken from the `name=` prop each page passes
// to <ToolDetail>). Centralised here because the page passes `name`
// inline to the component rather than via TOOL_META.
const NAMES: Record<string, string> = {
  chatgpt: "ChatGPT Plus",
  claude: "Claude Pro",
  gemini: "Google AI Pro",
  perplexity: "Perplexity Pro",
  grok: "SuperGrok",
  midjourney: "Midjourney",
  leonardo: "Leonardo AI",
  runway: "Runway ML",
  kling: "Kling AI",
  copilot: "GitHub Copilot Pro",
  grammarly: "Grammarly Premium",
  notion: "Notion AI",
  canva: "Canva Pro",
  microsoft365: "Microsoft 365 Copilot",
  linkedin: "LinkedIn Premium",
  elevenlabs: "ElevenLabs",
  vault: "AI Tools Vault",
  manus: "Manus AI",
  poe: "Poe AI",
  firefly: "Adobe Firefly",
  ideogram: "Ideogram AI",
  freepik: "Freepik (Magnific)",
  "adobe-cc": "Adobe Creative Cloud",
};

function deriveCompareTool(meta: ToolMeta): CompareTool {
  return {
    ...meta,
    name: NAMES[meta.slug] ?? meta.slug,
    icon: ICONS[meta.iconName] ?? Sparkles,
    priceFromBdt: meta.priceBdt,
    priceFromLabel: meta.priceLabel,
    specs: {
      model: meta.model,
      contextWindow: meta.contextWindow,
      multimodal: meta.multimodal,
      banglaQuality: meta.banglaQuality,
      bestUseCase: meta.bestUseCase,
      speed: meta.speed,
      accuracy: meta.accuracy,
      pricingTier: meta.pricingTier,
    },
  };
}

const ALL_METAS: ToolMeta[] = [
  CHATGPT_META, CLAUDE_META, GEMINI_META, PERPLEXITY_META, GROK_META,
  MIDJOURNEY_META, LEONARDO_META, RUNWAY_META, KLING_META, COPILOT_META,
  GRAMMARLY_META, NOTION_META, CANVA_META, MS365_META, LINKEDIN_META,
  ELEVENLABS_META, VAULT_META, MANUS_META, POE_META, FIREFLY_META, IDEOGRAM_META, FREEPIK_META, ADOBE_CC_META,
];

export const COMPARE_TOOLS: Record<string, CompareTool> = Object.fromEntries(
  ALL_METAS.map((m) => [m.slug, deriveCompareTool(m)])
);

// Pairs we ship in the sitemap and surface on the comparison hub.
type ToolSlug = keyof typeof COMPARE_TOOLS;
export const POPULAR_PAIRS: [ToolSlug, ToolSlug][] = [
  ["claude", "chatgpt"],
  ["gemini", "chatgpt"],
  ["claude", "gemini"],
  ["chatgpt", "perplexity"],
  ["grok", "chatgpt"],
  ["midjourney", "leonardo"],
  ["runway", "kling"],
  ["copilot", "chatgpt"],
  ["notion", "chatgpt"],
  ["grammarly", "chatgpt"],
  ["claude", "perplexity"],
  ["midjourney", "chatgpt"],
  ["canva", "midjourney"],
  ["elevenlabs", "runway"],
  ["microsoft365", "notion"],
  ["vault", "chatgpt"],
];

// ────────────────────────────────────────────────────────────────────
// Row-level winner heuristic
// ────────────────────────────────────────────────────────────────────
type RowCmp = "higher" | "lower";
const ROW_COMPARISON: Record<string, RowCmp> = {
  "Starting price (BDT)": "lower",
  "Context window": "higher",
  "Bangla language quality": "higher",
  "Overall accuracy": "higher",
};

const numFromLabel = (s: string): number | null => {
  const matches = s.match(/([\d,.]+)\s*([KMkm]?)/g);
  if (!matches) return null;
  let best = -Infinity;
  for (const m of matches) {
    const parts = m.match(/([\d,.]+)\s*([KMkm]?)/);
    if (!parts) continue;
    const [, raw, suf] = parts;
    let n = parseFloat(raw.replace(/,/g, ""));
    if (!isFinite(n)) continue;
    if (suf?.toLowerCase() === "k") n *= 1000;
    if (suf?.toLowerCase() === "m") n *= 1_000_000;
    if (n > best) best = n;
  }
  return best === -Infinity ? null : best;
};

const starCount = (s: string): number | null => {
  const m = s.match(/⭐/g);
  return m ? m.length : null;
};

export function rowWinner(label: string, a: string, b: string): "a" | "b" | null {
  const dir = ROW_COMPARISON[label];
  if (!dir) return null;
  const aStars = starCount(a);
  const bStars = starCount(b);
  if (aStars != null && bStars != null) {
    if (aStars === bStars) return null;
    return aStars > bStars ? "a" : "b";
  }
  const aNum = numFromLabel(a);
  const bNum = numFromLabel(b);
  if (aNum == null || bNum == null) return null;
  if (aNum === bNum) return null;
  if (dir === "higher") return aNum > bNum ? "a" : "b";
  return aNum < bNum ? "a" : "b";
}

// ────────────────────────────────────────────────────────────────────
// Slug parsing + recommendation
// ────────────────────────────────────────────────────────────────────
export function parseComparePair(slug: string): { a: CompareTool; b: CompareTool } | null {
  const m = slug.match(/^([a-z0-9-]+)-vs-([a-z0-9-]+)$/i);
  if (!m) return null;
  const a = COMPARE_TOOLS[m[1].toLowerCase()];
  const b = COMPARE_TOOLS[m[2].toLowerCase()];
  if (!a || !b || a.slug === b.slug) return null;
  return { a, b };
}

export type Recommendation =
  | { kind: "winner"; winnerSlug: string; reason: string }
  | { kind: "depends"; reason: string };

export function recommend(a: CompareTool, b: CompareTool): Recommendation {
  if (a.category !== b.category) {
    return {
      kind: "depends",
      reason: `${a.name} and ${b.name} solve different problems — ${a.name} is built for ${a.category}, while ${b.name} is built for ${b.category}. There's no single winner here: pick ${a.name} if you need ${a.bestFor[0].toLowerCase()}, and pick ${b.name} if you need ${b.bestFor[0].toLowerCase()}. Many AITP customers buy both.`,
    };
  }
  const aScore = (a.specs.accuracy.match(/⭐/g)?.length ?? 0) - (a.priceFromBdt / 1000);
  const bScore = (b.specs.accuracy.match(/⭐/g)?.length ?? 0) - (b.priceFromBdt / 1000);
  const winner = aScore >= bScore ? a : b;
  const other = winner.slug === a.slug ? b : a;
  return {
    kind: "winner",
    winnerSlug: winner.slug,
    reason: `For most Bangladeshi users in the ${a.category} category, ${winner.name} (${winner.priceFromLabel}) is the stronger pick — it scores higher on accuracy and capability for the price. ${other.name} is still a solid choice if you specifically need ${other.bestFor[0].toLowerCase()}.`,
  };
}
