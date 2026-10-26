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

## Staging (workers.dev): PASS

- Cloudflare account: the AITP-only account (sysmoaiprivatelimited@gmail.com, ID `312f8683be42143016fe5478457dc00c`). Its Workers list was empty beforehand.
- Worker `ai-team-premium-staging`, URL https://ai-team-premium-staging.sysmoaiprivatelimited.workers.dev
- GitHub Actions run 39900436698 (workflow_dispatch, target staging, branch head `2661503`).
  - Attempt 1: version `8b7d8cf2-2293-42a9-83f3-6258dc7c7ec2`. verify:live gave 199/203. The 4 failures were the first requests to a brand-new workers.dev hostname: Cloudflare's own "Page not found" with none of our headers, which is a propagation delay. The workflow now waits 20 s before verifying.
  - Attempt 2: version `f863d3fd-65c9-4dd8-a792-991e2c469802`. **verify:live --all gave 203/203 routes, 4/4 404 probes, bundle in sync, PASS.**
- An independent fetch from outside GitHub (WebFetch) returned the homepage title "ChatGPT & Premium AI Tools in Bangladesh — bKash & Nagad | AI Team Premium".

## Production (2026-10-26): LIVE

Cut over on 2026-10-26 from the founder's Windows PC. The full timeline is in `AITP-MIGRATION-CHECKPOINT.md`.

- Worker `ai-team-premium`, version `0669ac45-86f3-45c6-8f6c-f3ec9a57f019`, custom domain `www.aiteampremium.com`. AITP account `312f8683be42143016fe5478457dc00c`.
- Deployed from `main` @ `481402f` by run [40318665627](https://github.com/sysmoai/AI-Team-Premium/actions/runs/40318665627). Build, typecheck, commercial gate, verify and live smoke test (10/10 routes, 4/4 404 probes, apex checked) all passed.
- `npm run verify:live -- --all` against https://www.aiteampremium.com from the founder's PC: **203/203 routes, 4/4 404 probes, apex redirect checked, bundle `index-BoXwXmyR.js` in sync**.

### HTTP and TLS (curl, 11:57 UTC)

| Request | Result |
|---|---|
| `https://www.aiteampremium.com/` | 200, `server: cloudflare`, CSP, XFO DENY, nosniff, Referrer-Policy and Permissions-Policy present, no `x-vercel-*` |
| `https://aiteampremium.com/pricing?x=1&y=2` | 301 → `https://www.aiteampremium.com/pricing?x=1&y=2` |
| `http://aiteampremium.com/blog?q=a` | 301 → `https://www.aiteampremium.com/blog?q=a` |
| `http://www.aiteampremium.com/pricing?z=3` | 301 → `https://www.aiteampremium.com/pricing?z=3` |
| `https://www.aiteampremium.com/this-does-not-exist-xyz` | 404, `X-Robots-Tag: noindex, follow`, security headers |
| Certificate (www and apex) | Let's Encrypt YE1, SAN `aiteampremium.com`, `*.aiteampremium.com`, valid until 2027-01-24 |

### DNS and DNSSEC (12:01 UTC)

- The .com registry delegates to `isla.ns.cloudflare.com` and `khalid.ns.cloudflare.com` and serves DS `2371 13 2 DB161E55…3B61A68EB`.
- dns.google and cloudflare-dns.com return **AD=true** for A, AAAA, MX, TXT and `www`.
- Zoho MX 10/20/50, SPF and the verification TXT resolve at 8.8.8.8 and 1.1.1.1.

### Browser (Claude app browser, Chromium; desktop and mobile 375×812)

| Page | Result |
|---|---|
| `/` | Title "ChatGPT, Claude & AI Tools in Bangladesh \| AI Team Premium", canonical www, `index, follow`, 5 JSON-LD blocks, WhatsApp links `wa.me/8801533262758…`, no broken images, no horizontal overflow on mobile |
| `/pricing` | 200, canonical `/pricing` |
| `/all-products` | 200, canonical `/all-products` |
| `/tools/chatgpt-plus-bangladesh` | `index, follow`, 5 JSON-LD blocks, 9 WhatsApp links, renders on mobile |
| `/tools/chatgpt` | quarantine "Commercial Page Under Evidence Review", canonical → `/tools/chatgpt-plus-bangladesh` (by design) |
| `/blog`, `/blog/category/buying-guides` | 200 |
| `/blog/chatgpt-plus-price-bangladesh-bkash-guide` | quarantine page, `noindex, follow` (by design) |
| `/nope-404-check` | "Page Not Found", `noindex, follow` |

Console: the only error at first was Cloudflare's auto-injected Web Analytics (RUM) beacon, blocked by `script-src 'self'`. I disabled RUM for the zone, which fixes the cause and keeps the CSP as it was. Afterwards, curl of six pages and a DOM check showed no `cloudflareinsights` script. Apart from that, only the expected 404 status on the 404 page.

### Mail delivery

- 2026-10-26 12:29 UTC: a test from Gmail to `help@aiteampremium.com` (the only mailbox for this business) was delivered to the Zoho inbox. The site's earlier addresses (`support@`, `hello@`, `escalation@`) bounced 550 because they don't exist; PR #41 replaced them with `help@`.
