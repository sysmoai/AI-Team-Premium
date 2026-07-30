# AI Team Premium — Blockers

## Active (2026-07-30)

### P0: Price Drift — 19 product pages showing wrong prices
- **Impact:** Direct financial loss on every sale from undercharging pages
- **Worst cases:** Google AI Pro (৳599 vs catalog ৳3,390), Ideogram (৳599 vs catalog ৳2,990)
- **Fix:** Align tool page prices to products-catalog.json, run `npm run audit:prices` to verify
- **Status:** NOT STARTED

### P1: AllProducts.tsx missing SEO metadata
- **Impact:** No meta title/description on the full catalog page (57/58 audit pass)
- **Fix:** Add usePageMeta hook to AllProducts.tsx

## Resolved
- ✅ Vercel deploy limit — reset after 24h (CLI deploy working again)
- ✅ useReveal threshold bug — fixed (0 → 0.12, tall elements stuck invisible)
- ✅ Duplicate font @import — removed from index.css
- ✅ "80+ tools" contradiction — resolved to "37 tools / 80 plans"
- ✅ Will-change on reveal elements — removed
- ✅ Missing focus-visible ring — added
- ✅ CTA hover/active states — added and gated for touch

## Non-Blockers
- Vercel free tier deploy limit: 100/day — plan around it or use git push auto-deploy
- All older "blocked" entries from previous reports are resolved
