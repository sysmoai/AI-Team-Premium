# AITP production runbook (Cloudflare Workers)

Never put tokens, passwords or recovery codes in this file or in chat.

## Identity

| | |
|---|---|
| Canonical URL | https://www.aiteampremium.com |
| Apex | https://aiteampremium.com → 301 to www (zone Redirect Rule) |
| Production Worker | `ai-team-premium` (custom domain `www.aiteampremium.com`) |
| Staging Worker | `ai-team-premium-staging` on `*.workers.dev`, always noindex |
| Deploy authority | `.github/workflows/cloudflare-deploy.yml`, and nothing else |
| Registrar | Squarespace Domains (historical; confirm in the Squarespace account) |
| Email | Zoho Mail (MX `mx/mx2/mx3.zoho.com`, SPF `include:zohomail.com`) |

**Decision (founder, 2026-10-23): AITP gets its own free Cloudflare account.** Don't use the account that holds `ai-premium-shop` and `saveonsub-store` (other businesses). Create the AITP zone, the Workers and the API token only in the AITP account. In that account, an account-scoped Workers Admin token touches nothing outside AITP.

## One-time setup (human, about 10 minutes)

1. **Cloudflare API token.** Sign up for a new free Cloudflare account for AITP (dash.cloudflare.com/sign-up) and use it for everything below. In that account's dashboard, go to Manage Account → Account API Tokens → Create Token. Account-owned tokens are preferred. Grant **Workers Admin** on the account (needed to *create* the two Workers the first time) plus Account Settings Read. After the zone exists (cutover step 2), edit the token to add **Zone → Workers Routes → Write**, scoped to `aiteampremium.com` only. That permission is what lets the deploy attach the `www` custom domain. Don't give the token access to other zones.
2. **GitHub secrets.** Go to github.com/sysmoai/AI-Team-Premium → Settings → Secrets and variables → Actions. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (the account ID is shown on the Workers & Pages overview).
3. Re-run the "Deploy to Cloudflare Workers" workflow on the migration PR, or run it manually with target `staging`. The job summary prints the staging URL, and the workflow verifies every sitemap URL against it.

## Current production state (2026-10-26)

| | |
|---|---|
| Status | LIVE on Cloudflare since 2026-10-26 ~11:57 UTC |
| Cloudflare account | `312f8683be42143016fe5478457dc00c` (AITP only) |
| Authoritative nameservers | `isla.ns.cloudflare.com`, `khalid.ns.cloudflare.com` (set at Squarespace) |
| DNSSEC | ON. Cloudflare signs; DS `2371 13 2 DB161E55…3B61A68EB` is at Squarespace |
| Apex | `AAAA @ 100::` proxied + Redirect Rule "Apex to www (301, keep path and query)" + Always Use HTTPS |
| Real User Monitoring | OFF. Its auto-injected beacon violates our CSP; leave it off, or add `static.cloudflareinsights.com` to the CSP on purpose if you ever want it |
| Production deploys | ON (`CLOUDFLARE_PRODUCTION_ENABLED=true`): every push to `main` deploys |
| Vercel | Domains removed and Git disconnected on the `ai-team-premium` project (suspended team). Not a fallback. |

The steps below are the historical cutover procedure, kept for reference. They are done; don't repeat them.

## DNS cutover (done 2026-10-26)

The domain currently uses **Squarespace nameservers with DNSSEC on** (DS `46186 8 2 F9A7…20C7`). Changing nameservers while that DS record exists makes the domain fail validation and go dark. Order matters:

1. **Inventory.** In Squarespace → Domains → aiteampremium.com → DNS, export or screenshot every record. Known from public DNS on 2026-10-23: A `@` 216.198.79.1 (Vercel), CNAME `www` cname.vercel.sh (Vercel), MX 10 mx.zoho.com, MX 20 mx2.zoho.com, MX 50 mx3.zoho.com, TXT `zoho-verification=…`, TXT `v=spf1 include:zohomail.com ~all`. Also TXT `zoho._domainkey` (Zoho DKIM, `v=DKIM1; k=r…`), confirmed in the Squarespace panel on 2026-10-23. There's no DMARC and no CAA. Squarespace also showed: domain lock ON, auto-renew ON, expires 2027-07-04, DNSSEC ON.
2. **Create the zone.** In Cloudflare → Add a domain → `aiteampremium.com` → Free plan. Make sure every Zoho record (MX, SPF, verification, DKIM) is present and set to **DNS only** (grey cloud). Do **not** recreate the Vercel A or CNAME records.
3. **Turn off DNSSEC at Squarespace** (this removes the DS record). Wait at least 24 hours: the DS TTL is 6 h, and parent-zone caches take time to clear.
4. **Change nameservers** at Squarespace to the two Cloudflare nameservers shown for the zone. Wait for the zone status to show **Active**.
5. **Attach the Worker.** Set the repository variable `CLOUDFLARE_PRODUCTION_ENABLED=true` (Settings → Variables), then run the workflow with target `production`, or merge to `main`. The `www` custom domain record and its certificate are created by the deploy.
6. **Apex.** Add a DNS record `AAAA @ 100::` set to **Proxied**. Then go to Rules → Redirect Rules → Create. Set "Hostname equals aiteampremium.com", dynamic redirect to `concat("https://www.aiteampremium.com", http.request.uri.path)`, preserve query string, status 301. Under SSL/TLS → Edge Certificates, turn on "Always Use HTTPS".
7. **Turn DNSSEC back on** in Cloudflare (DNS → Settings → DNSSEC) and paste the DS record it gives you into Squarespace.
8. Run `npm run verify:live -- --all` and check that mail still arrives at the Zoho mailbox.

## Normal deploys

Open a PR. CI builds, runs `check`, `validate:commercial` and `verify`, then deploys to staging and runs `verify:live --all` against it. Merge to `main` to deploy production, which also runs a live smoke test. You don't repeat any DNS step.

Local run: `npm run build && npm run cf:dev`, then `npm run verify:live -- --base http://127.0.0.1:8787 --all`.

## Rollback

- **Bad Worker release:** Actions → "Deploy to Cloudflare Workers" → Run workflow → `rollback-production` (blank means the previous version). Or in the dashboard: Workers → ai-team-premium → Deployments → Rollback.
- **DNS:** don't move the nameservers away from Cloudflare while the Cloudflare DS is at Squarespace, or the domain fails DNSSEC validation and goes dark. To leave Cloudflare: delete the DS at Squarespace, wait at least 24 h (DS TTL 86400), then change nameservers. Vercel is retired and is not a rollback target.

## Incident checklist

1. Check GitHub → Actions → "Monitor Production Health" (runs every 6 h) for when it started failing.
2. DNS: `nslookup -type=ns aiteampremium.com 1.1.1.1` and `nslookup www.aiteampremium.com 8.8.8.8`. The nameservers should be Cloudflare's, and `www` should resolve to Cloudflare IPs.
3. HTTP: `curl -sI https://www.aiteampremium.com/` should show `server: cloudflare`. A 403 or 503 with `cf-mitigated: challenge` is a security challenge, not an outage.
4. Certificate: Cloudflare → SSL/TLS → Edge Certificates. Both `www` and the apex should be covered by the Universal certificate.
5. Worker errors: Workers → ai-team-premium → Observability or Logs (observability is enabled in `wrangler.jsonc`), or run `npx wrangler tail`.
6. Deploy failures: the GitHub Actions run log for `cloudflare-deploy.yml`.

## Monitoring

The only persistent monitor is the GitHub Actions schedule in `monitor.yml` (every 6 h). Its `edge-check` job fails if www stops being served by Cloudflare, a Vercel header appears, the apex or http redirects stop returning 301 to www with path and query, unknown URLs stop returning 404, DNSSEC stops validating, or the Zoho MX disappears. GitHub emails the repo owner when a run fails, if notifications are on. Nothing watches the site beyond that.
