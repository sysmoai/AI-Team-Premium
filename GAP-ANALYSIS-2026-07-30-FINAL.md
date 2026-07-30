# Gap Analysis — AI Team Premium
**Date:** July 30, 2026 | **Production:** www.aiteampremium.com ✅ LIVE | **Ship Gate:** 18/18

---

## What Was Done Today (All Deployed)

| Commit | What | Files |
|--------|------|-------|
| `afa5636` | Homepage motion: logo trace animation, scroll reveals (28 elements, IntersectionObserver), interaction states (card-lift, press, focus-visible) | 4 files, +315/-36 |
| `a1b752d` | Align Personal-tier tool page prices to catalog | 4 files |
| `e21203a` | Strip stale prices from whatsapp.ts; broaden gate | 2 files, +40/-31 |
| `3e084d3` | Remove stale prices from order templates; add price-drift audit | 2 files |
| `823e07f` | Fix false/contradictory claims across site | — |
| `fc91de2` | Homepage: fix orphaned pages, expand FAQ, surface live training | — |

**Specific fixes shipped today:**
- Logo geometry preserved (pixel-identical in navbar/footer, animated in hero only)
- useReveal threshold bug fixed (0.12 → 0, no more stuck-invisible elements)
- Duplicate font @import removed (index.css was importing Inter again after index.html already did)
- Dead .no-js CSS rule removed
- will-change stripped from reveal base rule (avoids per-element compositor layers on 1GB Android)
- Hover gated behind @media (hover:hover) for touch devices
- focus-visible ring added (was missing on all focusable elements)
- CTAs got press:active feedback (they had transition-all with no :hover/:active)
- "80+ tools" contradiction resolved → "37 tools / 80 plans"

---

## CRITICAL — What Broke Today

### 1. Price Drift: 19/23 products (82%)

```
audit:prices result — NO product is in sync:

Tool page vs catalog mismatch:
  AdobeCC     page: ৳499     catalog: ৳190      page 2.6x HIGH
  Canva       page: ৳599     catalog: ৳510      page 1.2x HIGH
  Copilot     page: ৳999     catalog: ৳1,495    page 1.5x LOW  ← UNDERCHARGING
  ElevenLabs  page: ৳699     catalog: ৳748      page 1.1x LOW  ← UNDERCHARGING
  Firefly     page: ৳599     catalog: ৳190      page 3.2x HIGH
  Freepik     page: ৳499     catalog: ৳450      page 1.1x HIGH
  GoogleAIPro page: ৳599     catalog: ৳3,390    page 5.7x LOW  ← UNDERCHARGING BADLY
  Grammarly   page: ৳499     catalog: ৳470      page 1.1x HIGH
  Grok        page: ৳499     catalog: ৳1,495    page 3.0x LOW  ← UNDERCHARGING
  Ideogram    page: ৳599     catalog: ৳2,990    page 5.0x LOW  ← UNDERCHARGING BADLY
  Kling       page: ৳599     catalog: ৳270      page 2.2x HIGH
  Leonardo    page: ৳349     catalog: ৳599      page 1.7x LOW
  Manus       page: ৳1,499   catalog: ৳2,500    page 1.7x LOW
  Microsoft365 page: ৳899    catalog: ৳780      page 1.2x HIGH
  Midjourney  page: ৳1,200   catalog: ৳1,199    page 1.0x HIGH
  Notion      page: ৳450     catalog: ৳800      page 1.8x LOW
  Perplexity  page: ৳499     catalog: ৳350      page 1.4x HIGH
  Runway      page: ৳899     catalog: ৳1,794    page 2.0x LOW
  SuperGrok   page: ৳699     catalog: ৳1,495    page 2.1x LOW
```

**Products on tool pages but absent from catalog:**
Gemini, LinkedIn, Poe, Vault — have pages but no catalog entry

**Financial impact:** Products showing LOW are actively losing money on every sale. Google AI Pro at ৳599 instead of ৳3,390 is losing ৳2,791 per sale. Ideogram at ৳599 instead of ৳2,990 loses ৳2,391 per sale.

### 2. SEO: AllProducts.tsx missing metadata
Only audit failure (57/58 pass). AllProducts page has no SEO metadata.

### 3. Structural: No Single Source of Truth for Prices
Prices exist in 4+ locations per product:
- `client/src/lib/usd-retail.ts` (international reference)
- `client/src/data/products-catalog.json` (80 products)
- Individual tool page TOOL_META or inline prices
- WhatsApp template files
- Plan page components (for 7 products that have them)

An update requires changes in 3-5 files. This is why drifts accumulate.

---

## Current State by the Numbers

| Metric | Value |
|--------|-------|
| Products in catalog (JSON) | 80 |
| Products with dedicated tool pages | 25 |
| Products with plan pages | 9 (ChatGPT, Claude, Gemini, Perplexity, Canva, Grammarly, Grok, GoogleAIPro?, SuperGrok?) |
| Products with complete data (plans + FAQs + schemas + CTAs) | 1 (ChatGPT) |
| Routes in App.tsx | 62 |
| Audit score | 57/58 (1 fail: AllProducts metadata) |
| Price drift | 19/23 tool pages (82%) |
| Entry bundle size | 279KB (flat since framer-motion was avoided) |
| TypeScript errors | 0 |
| Build | Clean |

---

## Priority for Tomorrow — Ordered by Urgency

### P0: Fix Price Drift (Financial)
Every sale on an undercharging page loses money. Fix all 19 drifts immediately.
- Source of truth: `products-catalog.json`
- Fix individual tool pages to match catalog
- Run `npm run audit:prices` after to verify 0 drifts
- Add Gemini, LinkedIn, Poe, Vault to catalog if they should be sold

### P1: Fix AllProducts SEO Metadata
Add usePageMeta hook to AllProducts.tsx. Only failing audit check.

### P2: Centralize Product Data
Current: prices scattered across 5+ file types, WhatsApp templates scattered, FAQs duplicated.
Target: Single `products.ts` that tool pages, plan pages, catalog, and WhatsApp templates all pull from.
This prevents future drift and makes adding/modifying products a one-file change.

### P3: Complete Product Pages
25 tool pages exist, but only ChatGPT has complete structured data (plans, FAQs, schemas).
- 7 products have partial plan pages
- 16 products have no plan pages
- Most tool pages lack FAQSchema and JSON-LD

### P4: Catalog Consistency
- 25 tool pages exist but catalog has 80 products → 55 catalog products have no dedicated page
- 4 tool pages (Gemini, LinkedIn, Poe, Vault) aren't in catalog
- Resolve which products actually exist

---

## Verified Production State

```
✅ www.aiteampremium.com — Vercel production, HTTP 200
✅ Custom CSS verified: orbit-trace, logo-animated, card-lift, data-reveal, prefers-reduced-motion, focus-visible, press:active
✅ JS bundle verified: data-reveal, is-revealed, IntersectionObserver, logo-animated
✅ TypeScript: 0 errors
✅ Build: clean
✅ Verify: 18/18 checks
✅ Verify:live: 8/8 routes, bundle in sync
✅ Git: remote matches local (afa5636)
```

---

## Tomorrow's Continuation Point

**Repo:** `C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium`
**Last commit:** `afa5636` (Homepage motion)
**Production:** www.aiteampremium.com (in sync with commit)
**Ship gate:** `npm run check && npm run build && npm run verify` — all pass

**Start with:** Fix price drift across all 19 tool pages against the catalog, then add Gemini/LinkedIn/Poe/Vault to catalog.
