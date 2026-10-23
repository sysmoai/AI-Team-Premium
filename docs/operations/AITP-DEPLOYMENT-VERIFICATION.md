# AITP deployment verification

Every result below was produced on 2026-10-23 in the recovery environment (Linux, Node 22.22.0, wrangler 4.150.0) against branch `migration/aitp-cloudflare-recovery-20261023`. "Local Worker" means `wrangler dev --env staging` running the real Worker and the asset layer in workerd. Staging and production rows are filled in only when those runs actually happen.

## Repository gates

| Command | Result | Notes |
|---|---|---|
| `npm run check` | PASS | tsc, 0 errors |
| `npm run build` | PASS | Vite client to `dist/public`, plus a server bundle (unused in production) |
| `npm run validate:commercial` | PASS | "no issues"; 36 price-on-request records |
| `npm run verify` | PASS 54/54 | 44 existing checks plus 10 new Worker checks |
| `npm run audit` | FAIL 62/63, **pre-existing** | Same result on the baseline `6ee610b`: "4 risky language occurrences". "#1" is in AIReadinessAssessment.tsx, and "official partner" is in About.tsx, CorrectionsPolicy.tsx and NonAffiliation.tsx, probably as negations ("not an official partner"). Content was not edited (out of scope). |
| `npm audit` | Pre-existing advisories (adm-zip, braces, ip-address and others) | None of these packages is in the Worker bundle, which imports only `lib/` and `shared/`. |

## Local Worker: HTTP

`npm run verify:live -- --base http://127.0.0.1:8787 --all`: **203/203 routes, 4/4 404 probes, bundle in sync, PASS.** That covers all 199 sitemap URLs plus the sample routes. For each route it checks:

- the status matches what `lib/render-page.js` expects
- the SPA mount point and the JS bundle are present
- the title and canonical are exact, and the canonical is on www
- review and quarantine pages carry noindex
- exactly one JSON-LD graph on indexable pages
- staging noindex
- all 5 security headers

Spot checks (curl):

| Path | Status | Title / note |
|---|---|---|
| `/` | 200 | static index.html; CSP, XFO DENY, nosniff present |
| `/all-products` | 200 | "All Premium AI Products — Complete Catalog (78 AI Tools)…" |
| `/tools/midjourney` | 200 + noindex | "Commercial Page Under Evidence Review" (public-review list) |
| `/chatgpt/plus-shared`, `/services/brand-design` | 200 + noindex | review page |
| `/blog/chatgpt-plus-price-bangladesh-bkash-guide` | 200 + noindex | "Guide Under Evidence Review" (quarantine list) |
| `/blog` | 200 | React blog hub, not the legacy static file |
| `/no-such-page`, `/api/health` | 404 + noindex | real 404 |
| `/assets/nope.js` | 404 text/plain | no HTML for missing assets |
| `/images/README.md`, `/images/src/app/App.tsx`, `/_headers`, `/.assetsignore` | 404 | source and config files are not published |
| `/assets/index-*.js` | 200 | `Cache-Control: public, max-age=31536000, immutable` |
| `/robots.txt`, `/sitemap.xml` | 200 | sitemap points to www |

## Local Worker: browser (Playwright, Chromium)

9 pages at desktop 1366×900, tablet 820×1180 and mobile 390×844: `/`, `/all-products`, `/pricing`, `/tools/canva-pro-bangladesh`, `/compare/claude-vs-chatgpt`, `/about`, `/contact`, `/blog`, `/no-such-page`.

- Every page rendered its H1 and content, and WhatsApp links were present (6 to 135 per page).
- No broken images and no failed same-origin requests.
- No console errors, except the expected 404 status on `/no-such-page`.
- No horizontal overflow on desktop or mobile.
- **Tablet (820 px):** the document is 8 px wider than the viewport on every page, but no element is detectably outside it. The assets are the same ones Vercel served, so this is not a migration regression. Logged as a follow-up.
- Performance: a warm render in the Worker takes about 0.03 ms. The main JS chunk triggers Vite's >500 kB warning (pre-existing).

## Staging (workers.dev)

Not yet deployed. It needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets, and the recovery environment cannot reach api.cloudflare.com. Once they're set, the PR's "Deploy to Cloudflare Workers / staging" job deploys and runs the same `verify:live --all` against the staging URL.

## Production

Not yet cut over. See the runbook, "DNS cutover".
