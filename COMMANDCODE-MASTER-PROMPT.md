# COMMAND CODE — MASTER AUTONOMOUS CONTINUATION PROMPT
## Project: AI Team Premium (aiteampremium.com)
## Resume Token: AITP-WINDOWS-AUTONOMOUS-ENABLEMENT-V4-20260802-commercial-governance-018f474

---

## ⚠️ CRITICAL — START HERE

```
cd "C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium"
git fetch origin --quiet
git checkout feat/aitp-truth-reconciliation-20260802
cat docs/context/resume.json
```

This is the ONLY repo. Everything lives here. Do NOT look anywhere else.

---

## PROJECT IDENTITY

- **Brand**: AI Team Premium (AITP)
- **Domain**: www.aiteampremium.com (CANONICAL — always use www)
- **What it does**: Sells premium AI subscriptions to Bangladeshi customers — ChatGPT, Claude, Gemini, Midjourney, Canva, Grammarly, 70+ brands, 129 products, paid via bKash/Nagad/Rocket
- **Stack**: React 18 (Vite) + Express 5 → Vercel hosting. No database in production (Supabase is configured but unused by the site)
- **GitHub**: sysmoai/AI-Team-Premium
- **Vercel project**: sysmoaigits-projects/ai-team-premium
- **Operator**: Emon Hossain / SYSmoAI Private Limited
- **Payments**: bKash, Nagad, Rocket, Bank Transfer (BDT)
- **Delivery**: 5-15 min shared, 2-4 hr personal
- **Warranty**: 30-day replacement

---

## CURRENT STATE (as of 2026-08-02)

### Git
- **Branch**: `feat/aitp-truth-reconciliation-20260802`
- **Head SHA**: `141d49fceeb844b1b39b7fe9fdf2ed2690d5ed0d`
- **Production SHA** (main): `444c2411e110523775a57384ddc4a2241c56b`
- **Status**: Working tree CLEAN — all committed
- **Tests passing**: 42/42 (`npm run ship` passes), `node scripts/validate-commercial.mjs` = 0 hard failures, 1 warning

### Completed (most recent commits)
1. Commercial governance layer: quarantined 34 unevidenced offers, fixed broken validator
2. Price alignment + AllProducts SEO metadata (production)
3. Blog posts: Fixed WhatsApp buttons, removed forbidden pricing, FTC compliance (322 posts)
4. Generated /pricing from catalog (all 49 rows had drifted)
5. Quarantined AI Tools Vault bundle: 13 price sites, Product schema removed, 2 claims withdrawn
6. Fixed stale Bangla comparison figure
7. Extended validate-commercial to cover non-catalog quarantined pages
8. 12 category pages built with their own SEO metadata
9. 50+ blog posts live (322 individual post pages via the static batch)
10. Header/footer navigation rebuilt from catalog
11. Added /access-types trust page

### Site stats
- **188 indexable routes** in sitemap.xml
- **129 products** in catalog (products-catalog.json — GENERATED file, do not hand-edit)
- **72 unique brands**
- **32 shared-access records** (17 elevated risk)
- **34 quarantined pending evidence** (commercial-governance.json)
- **36 price-on-request**
- **95 approved legacy unreviewed**
- **50+ blog posts** live

---

## PENDING WORK — PRIORITY ORDER

### 🔴 P0 — Service Pillar Pages (THE IMMEDIATE TASK)
The next action from resume.json: **"Build the five service-pillar pages"**

These pages are the LAST major unbuilt item from the canonical brand OS. Build these:
1. `/services/ai-advisory` — AI Advisory & Strategy Consulting
2. `/services/ai-setup-security` — AI Setup & Security Hardening
3. `/services/ai-training` — AI Training & Workshops
4. `/services/ai-automation` — AI Automation & Workflow Integration
5. `/services/managed-ai-operations` — Managed AI Operations

**How to add a page** (from DEPLOY.md):
1. Create `client/src/pages/services/YourPage.tsx`
2. Add route in `client/src/App.tsx` with `<Route path="/services/ai-advisory" component={AiAdvisory} />`  
3. Add metadata entry in `lib/route-meta.js`
4. Add URL to `client/public/sitemap.xml` (or regenerate with `npm run gen:sitemap`)
5. Verify with `npm run preview`
6. Run `npm run ship` before committing

**Design pattern**: Look at the existing service pages as templates:
- `client/src/pages/services/AIOpsSprint.tsx`
- `client/src/pages/services/BrandDesign.tsx`
- `client/src/pages/services/WebDevelopment.tsx`
- `client/src/pages/services/DigitalMarketing.tsx`
- `client/src/pages/services/AppDevelopment.tsx`

Named imports in App.tsx: `const AiAdvisory = lazy(() => import("./pages/services/AiAdvisory"));`

### 🟡 P1 — AI Tools Vault Quarantine Issue
`/ai-tools-vault` hardcodes 1990 BDT for shared access to 3 identity-bound accounts — outside the catalog governance layer, emitted to ProductSchema. This needs to be moved into the governance system or quarantined.

### 🟡 P2 — CEO Blocker Decisions Needed
These are BLOCKED waiting for CEO input. Surface them, do NOT make unilateral decisions:
1. 32 shared records quarantined pending provider-ToS review (17 elevated risk)
2. CapCut official plan mismatch — F27 verified official Pro at $19.99, catalog shows 399 BDT
3. Notion Business tiers: unsupported "73% Off" claim, large pricing gap
4. Production/Notion divergence not acknowledged
5. Ownership/operator wording conflict between 2 Notion documents
6. GitHub Actions billing lock on sysmoai account

### 🟢 P3 — Catalog Expansion
Goal: 150+ products (currently 129). Source: Notion database. Only when CEO provides data.

### 🟢 P4 — Blog Expansion
Goal: 50+ additional blog posts for 50K/month organic traffic target.

---

## WORKFLOW — HOW TO WORK ON THIS SITE

### Local development
```bash
npm run dev          # Fast Vite HMR — BUT per-route SEO and 404s are INVISIBLE here
npm run preview      # Serve production build locally — REAL SEO + real 404s
npm run ship         # Typecheck + build + verify — RUN BEFORE EVERY PUSH
```

### The gate
`npm run ship` runs: `tsc` + `npm run build` + `npm run validate:commercial` + `npm run verify`
It runs automatically via `.githooks/pre-push` — a failing check BLOCKS the push.

### Deploy
Push to any branch. Vercel auto-deploys from GitHub directly (NOT via GitHub Actions). Deploy takes 30-60s. The live site is www.aiteampremium.com.

### Verify production
```
npm run verify:live
```

---

## ARCHITECTURE — LOAD-BEARING CONSTRAINTS

### Route metadata is SINGLE SOURCE OF TRUTH
`lib/route-meta.js` — imported by both `api/index.js` (production Vercel) and `server/seo.ts` (local preview). If you add a page to App.tsx but forget to add its metadata here, `npm run verify` FAILS.

### Vercel config (vercel.json)
- `outputDirectory` MUST be `dist/public`. The key `public` is a BOOLEAN, not a path.
- Everything maps to `api/index.js` via a rewrite rule
- `api/index.js` must be ESM (package.json has `"type": "module"`)
- No bracketed catch-all filenames in `api/` — they don't register as catch-alls
- Any file in `api/` becomes its own serverless function — keep shared modules in `lib/`

### Product catalog
- `products-complete.json` — internal export, NEVER publish as-is (contains wrong brand name, invented review scores)
- `client/src/data/products-catalog.json` — SHIPPED catalog, GENERATED by `npm run build:catalog`
- Do NOT hand-edit products-catalog.json
- `scripts/build-catalog.mjs` strips the internal brand data and applies governance quarantine
- Commercial governance: `data/commercial-governance.json` — sidecar quarantine layer, survives catalog rebuild

### Canonical URLs
- EVERYTHING must use `https://www.aiteampremium.com`
- The apex 308-redirects to www (configured in Vercel)
- `npm run verify` FAILS on any bare-apex URL in host-sensitive files

### DNS (Squarespace) — DO NOT TOUCH
- Zoho email shares the zone — MX/TXT records must never be changed
- A @ → 216.198.79.1 (Vercel's current apex IP)
- CNAME www → cname.vercel.sh
- 76.76.19.165 is DEAD (old apex A record, no TCP at all — caused previous outage)

### GitHub Actions
Billing-locked on sysmoai account — every workflow fails instantly. No CI/CD. The pre-push git hook is the only safety net.

---

## CORE LAWS (from brand OS)
1. BRAND FIREWALL — Strict isolation between all business units. Never cross-contaminate.
2. ZERO-GAP AUDIT — Hunt gaps every run. Assume there is always one more.
3. PRICING SAFETY — Locked prices never auto-changed. Unlocked → "Request on WhatsApp."
4. LIVE VERIFICATION — Verify every fact each run. Source + date required.
5. PRESERVE EXISTING — Additive builds only. Never rebuild from scratch.
6. HUMAN-IN-THE-LOOP — CEO approves prices, refunds, risky changes.
7. TRUTH GUARDRAILS — No unsupported claims, no fake reviews, no invented pricing.
8. STATE MACHINE — DISCOVER → VERIFY → PLAN → IMPLEMENT → TEST → REVIEW → COMMIT → REPORT

---

## KEY FILES REFERENCE

| File | Purpose |
|------|---------|
| `docs/context/resume.json` | Session state, next action, blockers |
| `docs/context/state.json` | Full project state snapshot |
| `lib/route-meta.js` | Single source of truth for ALL route metadata |
| `client/src/App.tsx` | All routes (wouter router) |
| `DEPLOY.md` | Full runbook — read this first |
| `data/commercial-governance.json` | Quarantine/approval overlay |
| `scripts/build-catalog.mjs` | Builds the shipped catalog from source |
| `scripts/validate-commercial.mjs` | Commercial compliance check (in ship gate) |
| `shared/bundle-prices.js` | Bundle pricing + Vault quarantine logic |
| `vercel.json` | Vercel routing config |
| `client/src/data/products-catalog.json` | Shipped catalog (GENERATED, do not hand-edit) |

---

## COMMANDS CHEAT SHEET

```bash
cd "C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium"
npm run dev              # Fast dev (no SEO visibility)
npm run preview          # Prod build locally (real SEO/404s)
npm run ship             # GATE: tsc + build + validate:commercial + verify
npm run build:catalog    # Regenerate shipped catalog from source
npm run gen:routes       # Regenerate product route metadata
npm run gen:compare      # Regenerate comparison pages metadata
npm run gen:blog         # Regenerate blog route metadata
npm run gen:category     # Regenerate category route metadata
npm run gen:sitemap      # Regenerate sitemap.xml
npm run verify:live      # Verify production after deploy
npm run validate:commercial  # Run commercial governance check
git add -A && git commit -m "message" && git push  # Deploy loop
```

---

## IF PRODUCTION LOOKS BROKEN

Check for false alarm first:
```bash
curl -sI https://www.aiteampremium.com/ | grep -i x-vercel-mitigated
```
If that header is present, it's Vercel rate limiting (403 with challenge), not an outage. Open in a real browser to confirm.

Roll back via Vercel dashboard Instant Rollback, or revert commit and push.

---

## YOUR TASK

1. Read `docs/context/resume.json` and `DEPLOY.md` first
2. Pick up the next action: **Build the 5 service-pillar pages** (ai-advisory, ai-setup-security, ai-training, ai-automation, managed-ai-operations)
3. Follow the "How to add a page" workflow exactly
4. Run `npm run ship` before each commit
5. Check `npm run preview` to verify SEO metadata and 404s
6. Push to the current branch (`feat/aitp-truth-reconciliation-20260802`)
7. Surface any CEO blockers — do NOT unilaterally change pricing, quarantine status, or claims
8. After finishing service pages, continue with P1 (Vault quarantine fix), then P4 (blog expansion)

**Do NOT**:
- Hand-edit `client/src/data/products-catalog.json`
- Touch DNS records (Zoho email shares the zone)
- Use bare apex URLs anywhere
- Cross-contaminate with other business units
- Make pricing decisions without CEO approval
- Ignore failing pre-push hooks

---

**Resume Token**: AITP-WINDOWS-AUTONOMOUS-ENABLEMENT-V4-20260802-commercial-governance-018f474
**Project root**: C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium
**Branch**: feat/aitp-truth-reconciliation-20260802
