import { CANONICAL_MAP } from "./canonical-map.js";

// Legacy commercial/editorial pages pre-date the current evidence gates. Keep
// their URLs reachable but non-indexable until their claims are re-verified.
const mappedCommercialAliases = Object.keys(CANONICAL_MAP).filter(
  (path) => path.startsWith("/tools/") || path.endsWith("-plans"),
);

export const PUBLIC_REVIEW_PATHS = new Set([
  ...mappedCommercialAliases,
  "/tools/vault",
  "/tools/linkedin",
  "/chatgpt/plus-shared",
  "/chatgpt/plus-premium-shared",
  "/chatgpt/plus-personal-seat",
  "/chatgpt/business-shared",
  "/chatgpt/business-premium-shared",
  "/chatgpt/business-personal-like",
  "/chatgpt/go-personal",
  "/chatgpt/pro-premium-shared",
  "/chatgpt/go-shared",
  "/services",
  "/support",
  "/services/brand-design",
  "/services/web-development",
  "/services/digital-marketing",
  "/services/app-development",
  "/services/ai-advisory",
  "/services/ai-setup-security",
  "/services/ai-training",
  "/services/ai-automation",
  "/services/ai-ops-sprint",
  "/services/managed-ai-operations",
]);

export function isPublicReviewPath(path) {
  const normalized = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return PUBLIC_REVIEW_PATHS.has(normalized);
}
