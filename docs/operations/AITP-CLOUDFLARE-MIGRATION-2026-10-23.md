# AITP Cloudflare migration — 2026-10-23

Mission: AITP-CLOUDFLARE-RECOVERY-2026-10-23. Restore https://www.aiteampremium.com and move it from Vercel to Cloudflare Workers with Static Assets.

## 1. Observed outage

| Evidence | Source |
|---|---|
| GitHub "Monitor Production Health" last **passed 2026-10-03 02:51 UTC**. Every scheduled run since then (about every 6 h, through 2026-10-23 02:29 UTC) fails at "Check homepage status" (homepage HTTP code is not 200). | `gh api repos/sysmoai/AI-Team-Premium/actions/workflows/monitor.yml/runs` |
| `www.aiteampremium.com` CNAME → `cname.vercel.sh` (TTL 14400). Apex A → `216.198.79.1` (Vercel). DNS resolves normally (NOERROR, DNSSEC AD=true). | Google Public DNS JSON API, 2026-10-23 |
| `https://www.aiteampremium.com`, `https://aiteampremium.com` and `https://ai-team-premium.vercel.app` all return a client error to an external fetcher. | WebFetch, 2026-10-23 03:3x UTC |
| No commit to `main` since 2026-09-03 (last Vercel production deployment `6242833490`, commit `6ee610b`, status success). | GitHub deployments API |

**Probable root cause:** a Vercel-side failure (project/deployment paused, suspended, removed or blocked by account billing). The code and DNS have not changed since the site last worked, DNS still resolves to Vercel, and the `*.vercel.app` hostname fails as well, which rules out a custom-domain-only problem.

**Remaining uncertainty:** the exact Vercel HTTP status and error code were not visible from the recovery environment (its network policy blocked direct requests to the domain). Not needed for recovery, because the decision is to leave Vercel.

**Fastest safe recovery route:** deploy the unchanged site to Cloudflare Workers (staging first), then move DNS to Cloudflare.

## 2. Source of truth

- Repository: `sysmoai/AI-Team-Premium`, default branch `main`
- Baseline commit: `6ee610b8e36568c8c5037ef014f1616073deb8ab` (2026-09-03, "P0 hotfix: quarantine unverified service commercial claims")
- Migration branch: `migration/aitp-cloudflare-recovery-20261023`
- No open PRs at start. No uncommitted work (fresh cloud clone).

## 3. What production actually is

Measured from `vercel.json`, `api/index.js` and the client code:

- **Static React SPA** built by Vite to `dist/public` (index.html, hashed JS/CSS, 320 legacy static blog pages under `/blog/<category>/<slug>/`, robots.txt, sitemap.xml with 199 URLs).
- **One serverless function** (`api/index.js`) that ran only on filesystem misses: it served the SPA shell with per-route title/description/canonical/OG/Twitter/JSON-LD, a real 404 for unknown paths, and noindex "under evidence review" pages for review/quarantine paths.
- **Not active in production:** Express server, PostgreSQL/Drizzle, sessions/passport, admin audit API, `/api/exchange-rate` (the client falls back to a fixed rate). On Vercel every `/api/*` request was answered by the SEO function, never by Express. No database or data to migrate.
- Customer journey: WhatsApp links (`wa.me`) with prefilled text. No payment collection, no forms that post to a backend.

## 4. Architecture decision

**Workers Static Assets + a small Worker for misses** (option B, which matches how Vercel ran):

- Static files are served by Cloudflare's asset layer **without invoking the Worker** (free, no CPU). Security headers and immutable caching for `/assets/*` come from `client/public/_headers`.
- `not_found_handling: "none"`, so an unmatched path goes to the Worker, which calls `lib/render-page.js`, the same renderer the Vercel adapter now uses. That keeps per-route metadata, JSON-LD, real 404s, review and quarantine noindex, and plain-text 404s for missing assets.
- `/blog` and `/blog/` run the Worker first, because `client/public/blog/index.html` is a stale legacy hub with mojibake. The React `/blog` (in the sitemap) is the intended page.
- The apex redirect is a Cloudflare zone Redirect Rule (301, keeps path and query). The Worker also redirects the apex if it ever gets that traffic.
- Staging is the `ai-team-premium-staging` Worker on `workers.dev`. Every staging response carries `X-Robots-Tag: noindex, nofollow`.
- `client/public/images/` is a stray design-system source project (tsx, md, package.json). It is now excluded from upload by `.assetsignore` instead of being published.

Static pre-rendering (option A) was rejected for now. The Worker only runs on deep links, and it shares one renderer with the existing verify suite, so behaviour can't drift.

**Free-tier fit:** Workers Free allows 100k requests a day, 10 ms CPU per request, and 20k static files per version. Static asset requests are free and unlimited. The upload is about 840 files and a 263 KiB Worker bundle. Each Worker request does a regex-based HTML rewrite of an index.html of about 5 KB, and the template is cached per isolate. Measured locally in Node, a warm render takes about 0.03 ms on average (2,000 renders), far below the 10 ms limit. Cold-start and real edge CPU still need confirming on staging in the Workers metrics.

## 5. Changes

| File | Change |
|---|---|
| `lib/render-page.js` | New. Runtime-agnostic renderer: status, headers and body for any path. Logic moved verbatim from `api/index.js`. |
| `api/index.js` | Now a thin Vercel adapter over `render-page.js`, kept only for rollback until Vercel is retired. |
| `worker/index.js` | New. Cloudflare Worker: template from the ASSETS binding, security headers, staging noindex, HEAD/405, apex fallback. |
| `wrangler.jsonc` | New. Worker `ai-team-premium` (production, custom domain www) and `env.staging` (`ai-team-premium-staging`, workers.dev). Compatibility date 2026-10-01, wrangler 4.150.0 pinned. |
| `client/public/_headers` | New. Same CSP and security set as `vercel.json`, plus immutable `/assets/*` and noindex on `*.workers.dev`. |
| `client/public/.assetsignore` | New. Keeps `images/` source files out of the public upload. |
| `scripts/verify.mjs` | +10 offline Worker checks (routing, 404, quarantine, apex, staging noindex, HEAD/POST, header parity, no SPA fallback, no source leaks). |
| `scripts/verify-live.mjs` | Rewritten for Cloudflare. `--base` targets staging or local, `--all` covers every sitemap URL, and it checks review/quarantine noindex, security headers, 404s, robots/sitemap, bundle caching, the apex 301/308 with query, and the absence of Vercel. |
| `.github/workflows/cloudflare-deploy.yml` | New single deploy authority (PR → staging, main → production when enabled, manual rollback). |
| `.github/workflows/deploy.yml` | Removed. This was a disabled Cloudflare Pages workflow that hid every failure with `continue-on-error`. |
| `.github/workflows/monitor.yml` | Reads the Cloudflare cache and server headers instead of `X-Vercel-Cache`. |
| `package.json` | `wrangler` devDependency plus `cf:dev`, `cf:deploy:staging` and `cf:deploy` scripts. |

Not changed: content, prices, catalog, brand, quarantine lists, CSP values, `vercel.json` (kept for rollback).

## 6. Status at hand-off

See `AITP-MIGRATION-CHECKPOINT.md` for the live state and `AITP-DEPLOYMENT-VERIFICATION.md` for the test evidence.
