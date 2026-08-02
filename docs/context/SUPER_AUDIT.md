# AITP — SUPER-COMPREHENSIVE AUDIT · 2026-08-02
## Definitive handoff checkpoint for any AI agent continuation

---

## 🚨 START HERE — exact commands to resume

```powershell
cd "C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium"
git fetch origin --prune
git checkout feat/aitp-truth-reconciliation-20260802
git status
git --no-pager log --oneline -5
cat docs/context/resume.json
cat docs/context/SUPER_AUDIT.md
```

---

## 📊 QUICK STATUS

| Metric | Value |
|--------|-------|
| Live site | www.aiteampremium.com (Vercel) |
| Branch | feat/aitp-truth-reconciliation-20260802 |
| Last commit | `4e65ddd` |
| Production SHA | `444c241` |
| npm run ship | **42/42 PASSING** |
| Working tree | CLEAN (no uncommitted changes) |
| TypeScript | 0 errors |
| Routes in App.tsx | 78 |
| ROUTE_META entries | 250 (78 static + 172 generated product/compare/blog/category) |
| Sitemap URLs | 231 |
| Blog posts | 50 (all with BlogPosting schema) |
| Catalog | 129 products / 72 brands |
| Service pages | 10 (5 existing + 5 new) |
| Trust pages | 5 (1 existing + 4 new) |
| GitHub Actions | Billing-locked (account-wide) |
| Vercel deploy | Auto on push (~30-60s) |

---

## 📁 COMPLETE PROJECT STRUCTURE

### Key files (read these first in order)
1. `docs/context/resume.json` — session state
2. `docs/context/SUPER_AUDIT.md` — THIS FILE
3. `docs/context/CONFLICT_LEDGER.md` — all conflicts documented
4. `docs/context/CEO_DECISION_CHECKPOINT.md` — Notion-ready decisions
5. `docs/context/DECISIONS.md` — architectural decisions
6. `docs/context/KNOWN_RISKS.md` — risk register
7. `docs/context/NEXT_ACTIONS.md` — next steps
8. `DEPLOY.md` — deployment runbook
9. `docs/audit/AITP_SHARED_ACCESS_AUDIT.md` — shared-access audit

### All routes (78 total, by category)

**Static routes (hand-built pages):**
| Route | File | Status |
|-------|------|--------|
| `/` | Home.tsx | Live |
| `/chatgpt-plans` | ChatGPTPlans.tsx | Live |
| `/claude-plans` | ClaudePlans.tsx | Live |
| `/gemini-plans` | GeminiPlans.tsx | Live |
| `/grammarly-plans` | GrammarlyPlans.tsx | Live |
| `/canva-plans` | CanvaPlans.tsx | Live |
| `/perplexity-plans` | PerplexityPlans.tsx | Live |
| `/grok-plans` | GrokPlans.tsx | Live |
| `/ai-subscriptions` | AISubscriptions.tsx | Live |
| `/all-products` | AllProducts.tsx | Live |
| `/products` | AllProducts.tsx | Live |
| `/pricing` | Pricing.tsx | Live |
| `/ai-tools-vault` | AIToolsVault.tsx | QUARANTINED |
| `/compare` | Compare.tsx | Live |
| `/blog` | Blog.tsx | Live |
| `/about` | About.tsx | Live |
| `/contact` | Contact.tsx | Live |
| `/start-a-project` | Contact.tsx | Live |
| `/support` | Services.tsx | Live |
| `/services` | Services.tsx | Live |
| `/admin/audit` | AuditDashboard.tsx | Live |
| `/access-types` | AccessTypes.tsx | Live |
| `/refund-policy` | RefundPolicy.tsx | Live |
| `/privacy-policy` | PrivacyPolicy.tsx | Live |
| `/terms` | TermsOfService.tsx | Live |
| `/ai-readiness` | AIReadinessAssessment.tsx | **NEW** |

**Services (10 pages):**
| Route | File | Status |
|-------|------|--------|
| `/services/ai-ops-sprint` | AIOpsSprint.tsx | Live |
| `/services/brand-design` | BrandDesign.tsx | Live |
| `/services/web-development` | WebDevelopment.tsx | Live |
| `/services/digital-marketing` | DigitalMarketing.tsx | Live |
| `/services/app-development` | AppDevelopment.tsx | Live |
| `/services/ai-advisory` | AiAdvisory.tsx | **NEW** |
| `/services/ai-setup-security` | AiSetupSecurity.tsx | **NEW** |
| `/services/ai-training` | AiTraining.tsx | **NEW** |
| `/services/ai-automation` | AiAutomation.tsx | **NEW** |
| `/services/managed-ai-operations` | ManagedAiOperations.tsx | **NEW** |

**Trust pages (5 total):**
| Route | File | Status |
|-------|------|--------|
| `/access-types` | AccessTypes.tsx | Existing |
| `/pricing-how-it-works` | PricingHowItWorks.tsx | **NEW** |
| `/non-affiliation` | NonAffiliation.tsx | **NEW** |
| `/corrections` | CorrectionsPolicy.tsx | **NEW** |
| `/incident-escalation` | IncidentEscalation.tsx | **NEW** |

**ChatGPT tiers (9):**
All in `pages/chatgpt/` — PlusShared, GoShared, GoPersonal, PlusPremiumShared, PlusPersonalSeat, BusinessShared, BusinessPremiumShared, BusinessPersonalLike, ProPremiumShared. All live.

**Tool detail pages (built in App.tsx):**
15 hard-coded: ChatGPT, Claude, Gemini, Grammarly, Canva, Midjourney, Perplexity, Grok, Copilot, Vault, Notion, Microsoft365, LinkedIn, ElevenLabs, SuperGrok, GoogleAIPro, Leonardo, Runway, Kling, Manus, Poe, Firefly, Ideogram, Freepik, AdobeCC

**Generated routes (catalog + dynamic):**
- `/tools/:slug` → ProductDetail.tsx (catalog fallback)
- `/compare/:slug` → Compare.tsx (dynamic comparison)
- `/blog/:slug` → BlogPost.tsx (50 posts)
- `/category/:slug` → CategoryPage.tsx (12 categories)

### Generated files (all current)
| File | Size | Source | Regenerate |
|------|------|--------|------------|
| `lib/blog-routes.js` | 43KB | `client/src/data/blog-posts.ts` | `npm run gen:blog` |
| `lib/product-routes.js` | 31KB | `client/src/data/products-catalog.json` | `npm run gen:routes` |
| `lib/compare-routes.js` | 15KB | catalog | `npm run gen:compare` |
| `lib/category-routes.js` | 4KB | catalog | `npm run gen:category` |
| `lib/structured-data.js` | 119KB | catalog + blog-routes | `npm run gen:schema` |
| `client/public/sitemap.xml` | 43KB | route-meta.js | `npm run gen:sitemap` |
| `client/src/data/products-catalog.json` | 373KB | `products-complete.json` | `npm run build:catalog` |

---

## 🔴 CURRENT QUARANTINE STATUS

### Catalog-level (commercial-governance.json)
- **34 records quarantined** (`pending_evidence`)
- **36 price-on-request** (no fixed public price)
- **95 approved_legacy_unreviewed** (predate protocol)
- All 32 shared records are quarantined
- CapCut (`capcut-pro-starter-shared`): quarantined, price 399 withdrawn
- Notion Business (`notion-business-monthly`, `notion-business-6m`): quarantined, "73% Off" badge removed

### Bundle-level (shared/bundle-prices.js)
- **AI Tools Vault**: `VAULT_QUARANTINE.quarantined = true`
- Price 1990 BDT retained in code but NOT rendered or quoted
- ProductSchema NOT emitted
- 6-hour delivery, 30-day warranty, 24-hour replacement: ALL WITHDRAWN

### Page surfaces cleaned
- Vault page: stat bar shows "After Plan Verified" / "Verification Pending"
- Vault page: delivery text "confirmed after order"
- Vault page: no price anywhere
- Vault page: FAQ explains the quarantine honestly
- Homepage: Vault removed from OFFERS, replaced with services card
- No other page references the withdrawn claims

---

## ⚠️ CEO DECISIONS PENDING (6 items)

See `docs/context/CEO_DECISION_CHECKPOINT.md` for full details.

1. **Shared-access legitimacy** — 32 records, Tier A (15) + Tier B (17 elevated risk)
2. **CapCut** — which actual plan? correct price?
3. **Notion Business** — what do these records represent? "73% Off" claim?
4. **Production/Notion divergence** — acknowledge Vercel reality?
5. **Ownership wording** — reconcile conflicting Notion docs
6. **GitHub billing** — account-wide lock on sysmoai

---

## 🔧 HOW TO WORK ON THIS SITE

### Local development
```bash
npm run dev          # Vite HMR (NO SEO visibility!)
npm run preview      # Production build locally (REAL SEO + 404s)
npm run ship         # Typecheck + build + validate + verify — THE GATE
```

### Deploy loop
```bash
npm run ship         # Must pass
git add -A && git commit -m "message" && git push
# Vercel auto-deploys ~30-60s after push
```

### Adding a new page
1. Create `client/src/pages/YourPage.tsx`
2. Add lazy import + route in `client/src/App.tsx`
3. Add metadata in `lib/route-meta.js`
4. Run `npm run gen:sitemap`
5. Run `npm run preview` to verify
6. Run `npm run ship`

### Editing products
Do NOT edit `client/src/data/products-catalog.json` directly — it's generated.
1. Edit source data
2. Run `npm run build:catalog`
3. Run `npm run gen:routes && npm run gen:compare && npm run gen:category`
4. Run `npm run gen:schema && npm run gen:sitemap`
5. Run `npm run ship`

---

## 🏗️ ARCHITECTURE (load-bearing)

- `lib/route-meta.js` — SINGLE SOURCE OF TRUTH for all page metadata
- `api/index.js` — Vercel serverless handler (ESM only!)
- `vercel.json` — `outputDirectory: "dist/public"` (NOT `public`)
- `shared/bundle-prices.js` — Vault quarantine flag + bundle prices
- `data/commercial-governance.json` — Quarantine overlay (survives catalog rebuild)
- `scripts/validate-commercial.mjs` — Enforcement (in ship gate)
- `.githooks/pre-push` — Auto-runs `npm run ship` before every push

### Non-obvious gotchas
- `public` in vercel.json is a BOOLEAN, not a path
- `api/` files must be ESM (package.json has `"type": "module"`)
- Bracketed catch-all `api/[...path].js` does NOT register as catch-all
- Always test with `npm run preview` — `npm run dev` hides SEO/404 issues
- NEVER use bare `aiteampremium.com` — always `www.aiteampremium.com`
- DNS at Squarespace — Zoho email shares the zone, NEVER touch MX/TXT

---

## 📊 QUALITY GATES (all passing)

```
npm run ship:
  ✅ tsc (0 errors)
  ✅ build (Vite + esbuild)
  ✅ validate:commercial (0 hard failures, 1 warning)
  ✅ verify (42/42 checks)

verify.mjs covers:
  ✅ Route coverage — all 78 routes have metadata
  ✅ Sitemap — all 231 URLs valid
  ✅ Catalog — parses, all fields present
  ✅ Count claims — homepage counts match catalog
  ✅ Catalog freshness — sync with source
  ✅ Order templates — no hardcoded prices
  ✅ Canonical host — no bare-apex URLs
  ✅ Brand claims — no foreign brand, no acronyms
  ✅ Pricing — all 129 tiers in /pricing
  ✅ Blog prices — match catalog
  ✅ Structured data — all 50 posts have BlogPosting
  ✅ Product schemas — 78 match catalog
  ✅ No review ratings in structured data
  ✅ Build output — SPA mount point, JS bundle, canonical tag
  ✅ Serverless handler — ESM, paths correct, security escapes
  ✅ Vault prices — trace to catalog or bundle-prices
```

---

## 🧪 NEXT: After CEO decisions

1. Apply pricing decisions to governance.json
2. Update catalog if needed (`npm run build:catalog`)
3. Regenerate all derived files (`npm run gen:routes`, etc.)
4. Full ship (`npm run ship`)
5. Commit + push
6. Verify live (`npm run verify:live`)
7. Review PR #3
8. Merge to main when ready

---

**Generated:** 2026-08-02
**Resume token:** AITP-WINDOWS-AUTONOMOUS-ENABLEMENT-V7-20260802-COMPLETE
**Agent on resume:** `cd C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium && cat docs/context/SUPER_AUDIT.md`
