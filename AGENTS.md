# AGENTS.md — AI Team Premium

## Project
- Repo: github.com/sysmoai/AI-Team-Premium
- Stack: Express 5 + React 18 + Vite + Tailwind
- Owner: Emon Hossain
- Live: https://www.aiteampremium.com on Cloudflare Workers (since 2026-10-26; see docs/operations/AITP-MIGRATION-CHECKPOINT.md)
- Dev: `C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium`

## Status (2026-07-30)
- Domain: LIVE on Cloudflare (zone aiteampremium.com, account 312f8683…, DNSSEC on)
- Build: ✅ Clean (TypeScript 0 errors)
- Verify: ✅ 18/18 gate passes
- SEO: ✅ 57/58 audit checks (AllProducts.tsx missing metadata — P1)
- Price drift: ❌ 19/23 tool pages don't match catalog (P0 — financial impact)
- Deploy: push to main (cloudflare-deploy.yml)

## Critical Alerts
- **Price drift:** 19 products show wrong prices on tool pages vs catalog. Several undercharge.
  Run `npm run audit:prices` to see the current state.
  Source of truth: `client/src/data/products-catalog.json` (80 products)

## Ship Gate
```
npm run check && npm run build && npm run validate:commercial && npm run verify && npm run verify:live
```

## Deploy
Cloudflare Workers + Static Assets. `.github/workflows/cloudflare-deploy.yml` is the only deploy path
(PR → staging Worker, main → production). Runbook: `docs/operations/AITP-PRODUCTION-RUNBOOK.md`.
```
npm run build && npm run cf:dev                                   # local Worker on :8787
npm run verify:live -- --base http://127.0.0.1:8787 --all         # check it
```
Vercel is retired (domains detached, Git disconnected, vercel.json removed). `api/index.js` stays: the verify and validate:commercial gates load it as the shared renderer.

## Key Files
- Catalog: `client/src/data/products-catalog.json` (80 products)
- Audit scripts: `scripts/audit-routes.cjs`, `scripts/audit-prices.mjs`
- Latest gap analysis: `GAP-ANALYSIS-2026-07-30-FINAL.md`
- Tomorrow's prompt: `TOMORROW-EXECUTION-PROMPT.md`
