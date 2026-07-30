# AGENTS.md — AI Team Premium

## Project
- Repo: github.com/sysmoai/AI-Team-Premium
- Stack: Express 5 + React 18 + Vite + Tailwind
- Owner: Emon Hossain
- Live: https://www.aiteampremium.com (Vercel)
- Dev: `C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium`

## Status (2026-07-30)
- Domain: ✅ LIVE (custom domain on Vercel)
- Build: ✅ Clean (TypeScript 0 errors)
- Verify: ✅ 18/18 gate passes
- SEO: ✅ 57/58 audit checks (AllProducts.tsx missing metadata — P1)
- Price drift: ❌ 19/23 tool pages don't match catalog (P0 — financial impact)
- Deploy: `npx vercel deploy --prod --yes` or push to origin

## Critical Alerts
- **Price drift:** 19 products show wrong prices on tool pages vs catalog. Several undercharge.
  Run `npm run audit:prices` to see the current state.
  Source of truth: `client/src/data/products-catalog.json` (80 products)

## Ship Gate
```
npm run check && npm run build && npm run verify && npm run verify:live
```

## Deploy
```
npx vercel deploy --prod --yes    # CLI deploy (free tier: 100/day)
git push origin main              # Triggers Vercel auto-deploy
```

## Key Files
- Catalog: `client/src/data/products-catalog.json` (80 products)
- Audit scripts: `scripts/audit-routes.cjs`, `scripts/audit-prices.mjs`
- Latest gap analysis: `GAP-ANALYSIS-2026-07-30-FINAL.md`
- Tomorrow's prompt: `TOMORROW-EXECUTION-PROMPT.md`
