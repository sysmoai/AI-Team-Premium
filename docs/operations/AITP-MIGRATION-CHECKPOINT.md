# AITP migration checkpoint

Read this first when resuming. Re-verify every line against Git, GitHub Actions, Cloudflare and public DNS before acting on it. Don't trust a planned step as done.

**Last updated:** 2026-10-26 12:10 UTC, Claude Code session on the founder's Windows PC (browser: founder's Chrome), after the production cutover.

| Item | State |
|---|---|
| Current phase | **Cutover complete. Production is LIVE on Cloudflare Workers.** Only an end-to-end mail delivery test is still open (see "Open items"). |
| Production | https://www.aiteampremium.com → HTTP 200, `server: cloudflare`, no Vercel headers. Worker `ai-team-premium`, version `0669ac45-86f3-45c6-8f6c-f3ec9a57f019`, custom domain `www.aiteampremium.com`. |
| Deployed commit | `main` @ `481402f` (merge of PR #39; includes PR #38 `7eb6adf`). |
| Deploy run | GitHub Actions run [40318665627](https://github.com/sysmoai/AI-Team-Premium/actions/runs/40318665627) (workflow_dispatch, target `production`, 2026-10-26 11:55:36 UTC): build, typecheck, commercial gate, verify, deploy and live smoke test all green. |
| AITP Cloudflare account | `Sysmoaiprivatelimited@gmail.com's Account`, ID `312f8683be42143016fe5478457dc00c` (checked in the dashboard URL and header before every change). Nothing in any other account was touched. |
| Cloudflare zone | `aiteampremium.com`, Free plan, **Active** (seen 2026-10-26 ~11:55 UTC). Nameservers `isla.ns.cloudflare.com`, `khalid.ns.cloudflare.com`. |
| Zone records | Zoho (all DNS only): MX 10 mx / 20 mx2 / 50 mx3 `.zoho.com`, TXT SPF `v=spf1 include:zohomail.com ~all`, TXT `zoho-verification=zb77136606.zmverify.zoho.com`, TXT `zoho._domainkey` DKIM (410 chars). Web: `AAAA @ 100::` **proxied**. `www` is the Worker custom-domain record created by the deploy (not hand-made). |
| Zone settings | Always Use HTTPS **ON**. Redirect Rule "Apex to www (301, keep path and query)": `(http.host eq "aiteampremium.com")` → dynamic `concat("https://www.aiteampremium.com", http.request.uri.path)`, 301, preserve query string. Real User Monitoring (RUM) **disabled**: its auto-injected `static.cloudflareinsights.com` beacon was blocked by our CSP and logged a console error on every page. Disabling it fixes the cause without weakening the CSP. |
| Registrar (Squarespace) | Nameservers **custom: isla/khalid** (saved 2026-10-26 11:51 UTC after the founder's passkey re-verification). DS record 2371 / 13 / 2 / `DB161E55337DC4653168BCF8A28ABD9B6166F401A5EDB2F7E2AA4003B61A68EB` (added 11:59 UTC). Domain lock ON, auto-renew ON, expires 2027-07-04, all unchanged. |
| DNSSEC | **Enabled in Cloudflare and validating.** The DS was computed independently from the live DNSKEY (KSK tag 2371, alg 13) and matched the dashboard. The registry (a.gtld-servers.net) served DS 2371/13/2 at 12:00:27 UTC. dns.google and cloudflare-dns.com return **AD=true** for A, AAAA, MX, TXT and www at 12:01 UTC. |
| GitHub | Variable `CLOUDFLARE_PRODUCTION_ENABLED=true` (set 2026-10-26 11:55:33 UTC). Secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` unchanged. From now on, every push to `main` deploys production. |
| Staging | https://ai-team-premium-staging.sysmoaiprivatelimited.workers.dev re-verified 2026-10-26 ~11:50 UTC before cutover: 203/203 routes, 4/4 404 probes. |
| Vercel | Project `ai-team-premium` (team `sysmoaigits-projects`, suspended): domains `aiteampremium.com` and `www.aiteampremium.com` **removed**, Git connection to `sysmoai/AI-Team-Premium` **disconnected** (2026-10-26 ~12:05 UTC). The project, team and account were **not** deleted. Only `ai-team-premium.vercel.app` remains attached to the project. |

## Cutover timeline (UTC, 2026-10-26)

| Time | Step | Evidence |
|---|---|---|
| 11:44:47 | Preflight: no DS at a.gtld-servers.net (SOA only); dns.google cd=1 no DS | `Resolve-DnsName -Type DS -Server a.gtld-servers.net` |
| 11:45 | isla and khalid both serve the zone: SOA, NS, 3 MX, SPF, verification, DKIM 410 chars | direct queries to both nameservers |
| 11:49 | Dashboard: account `312f8683…`, zone Pending, assigned NS isla/khalid, 6 Zoho records all DNS only | dashboard Overview and DNS pages |
| 11:50 | Local `npm ci` and `npm run build` PASS; staging `verify:live --all` 203/203 + 4/4 | terminal |
| 11:51 | Squarespace nameservers → isla/khalid saved ("Nameservers updated … Oct 26, 2026, 5:51 PM" +06:00) | Squarespace banner |
| 11:52–11:54 | AAAA `@` 100:: proxied, Always Use HTTPS ON, Redirect Rule deployed | dashboard |
| 11:54:56 | .com registry delegates to isla/khalid | `nslookup -type=ns … a.gtld-servers.net` |
| ~11:55 | Zone **Active** ("Your domain is now protected by Cloudflare") | dashboard Overview |
| 11:55:33 | `CLOUDFLARE_PRODUCTION_ENABLED=true` | `gh variable list` |
| 11:55:36–11:57 | Production deploy run 40318665627 green; version `0669ac45…`; smoke 10/10 + 4/4, apex checked | Actions log |
| 11:57:46 | www 200 Cloudflare; apex https/http 301 → www with path and query; http://www 301 → https; 404 real; Let's Encrypt cert for apex + `*.aiteampremium.com`, valid to 2027-01-24 | curl, openssl |
| ~11:58 | Production `verify:live --all`: **203/203 routes, 4/4 404 probes**, apex redirect checked, bundle in sync | terminal |
| 11:58–11:59 | DNSSEC enabled in Cloudflare; DS added at Squarespace | dashboards |
| 12:00:27 | DS 2371/13/2 at a.gtld-servers.net | `Resolve-DnsName -Type DS` |
| 12:01:52 | AD=true at dns.google and 1.1.1.1; Zoho MX intact | DoH queries |
| 12:02–12:04 | Browser QA (desktop + mobile 375 px). RUM beacon CSP error found and fixed by disabling RUM | built-in browser |
| ~12:05 | Vercel: domains removed, Git disconnected | Vercel dashboard |

## Open items

1. **Mail: fixed by switching the site to `help@aiteampremium.com`.** At 12:20 UTC a test from Gmail to `support@`, `hello@` and `escalation@` bounced `550 5.1.1 User does not exist` from `mx.zoho.com` (so DNS routing worked, but the mailboxes never existed). The founder confirmed `help@aiteampremium.com` is the only mailbox for this business. A test to `help@` at 12:29 UTC was **delivered**: it shows in the Zoho Mail inbox, received 6:29 PM +06:00 (checked 12:52 UTC). Every public address (legal pages, `data/policies.json`, `data/seo-config.json`, the static blog footers) now uses `help@`.
2. **DMARC and HSTS not added.** Both are optional hardening. Adding the `_dmarc` TXT (`v=DMARC1; p=none`) was refused by the PC session's Auto-mode policy ("DNS / Domain / Cert Changes"), and HSTS falls under the same policy, so neither was retried. To finish them, switch the session to Ask/Default permissions and approve them, or add them in the Cloudflare dashboard.
3. Repository Vercel leftovers were removed (`vercel.json`, `.vercelignore`, `vercel-deploy.yml`, the Vercel-only `rollback.yml`). `api/index.js` stays, because the `verify` and `validate:commercial` gates load it as the shared server renderer. The local `.vercel/` link is gitignored and unused.

## Rollback state

- **Bad Worker release:** Actions → "Deploy to Cloudflare Workers" → `rollback-production` (blank = previous version), or the dashboard (Workers → ai-team-premium → Deployments → Rollback).
- **DNS:** do NOT switch nameservers back to Squarespace while the Cloudflare DS is at the registry. First remove the DS at Squarespace and wait at least 24 h (DS TTL 86400). Vercel is suspended and detached, so it is not a working fallback.
