# AITP migration checkpoint

Read this first when resuming. Re-verify every line against Git, GitHub Actions, Cloudflare and public DNS before acting on it. Don't trust a planned step as done.

**Last updated:** 2026-10-23 08:15 UTC, founder's Windows PC session (Claude in Chrome)

| Item | State |
|---|---|
| Current phase | Staging live. DNS cutover **in its DNSSEC safety window**. Nameservers are NOT changed yet. |
| Branch / PR | `migration/aitp-cloudflare-recovery-20261023`, PR #38 (open, not merged) |
| Production | **DOWN**: `www.aiteampremium.com` returns HTTP 402 from Vercel ("Account is blocked"). |
| AITP Cloudflare account | `Sysmoaiprivatelimited@gmail.com's Account`, ID `312f8683be42143016fe5478457dc00c`. The only account that login can see. |
| Isolation | The shared SYSmoAI account (the Cloudflare connector on the founder's PC) holds `ai-premium-shop` and `saveonsub-store` and is a different account. The AITP account has only `ai-team-premium-staging`. Nothing in the shared account was touched. |
| API token | `aitp-github-actions-workers-deploy` (AITP account). Account: Workers Scripts Write, Account Settings Read. Zone `aiteampremium.com` only: Workers Routes Write, Zone Read. No expiry. |
| GitHub secrets | `CLOUDFLARE_API_TOKEN` (2026-10-23 04:17 UTC), `CLOUDFLARE_ACCOUNT_ID` (2026-10-23 04:19 UTC, AITP ID). `CLOUDFLARE_PRODUCTION_ENABLED` is **not** set. |
| Staging | Run 39899071809 passed (build, staging deploy, verify:live --all). URL: https://ai-team-premium-staging.sysmoaiprivatelimited.workers.dev |
| Cloudflare zone | `aiteampremium.com` added (Free), status **Pending**. Assigned nameservers: `isla.ns.cloudflare.com`, `khalid.ns.cloudflare.com`. Bot Preference Sync is OFF (robots.txt untouched). |
| Zone records | Only Zoho, all DNS only: MX 10 mx.zoho.com, MX 20 mx2.zoho.com, MX 50 mx3.zoho.com, TXT `v=spf1 include:zohomail.com ~all`, TXT `zoho-verification=zb77136606.zmverify.zoho.com`, TXT `zoho._domainkey` DKIM. Vercel A/CNAME deleted. Verified byte-identical to Squarespace by querying both nameservers directly (DKIM 410/410 chars). |
| Squarespace | Records unchanged (still include Vercel A/CNAME). Nameservers still `nsa1-4.squarespacedns.com`. Domain lock ON, auto-renew ON, expires 2027-07-04. |
| DNSSEC | **Turned OFF at Squarespace 2026-10-23 08:10 UTC (14:10 +06:00).** At 08:11 UTC the .com registry still served DS 46186 (TTL 86400); Squarespace says removal can take up to 48 h. |

## Gate before changing nameservers (do not skip)

1. `Resolve-DnsName aiteampremium.com -Type DS -Server a.gtld-servers.net -DnsOnly` returns **no DS answer**. Note that time (T).
2. Wait until **T + 24 h** (the DS TTL is 86400, so cached copies expire by then).
3. Only then: Squarespace → aiteampremium.com → Domain Nameservers → custom → `isla.ns.cloudflare.com`, `khalid.ns.cloudflare.com`.

## After the gate (runbook steps 4–8)

1. Wait for the zone to show **Active**.
2. Merge PR #38. Set the repo variable `CLOUDFLARE_PRODUCTION_ENABLED=true`. Run the workflow with target `production` (or let the merge push deploy it).
3. Apex: `AAAA @ 100::` Proxied, a Redirect Rule from the apex to `https://www.aiteampremium.com` + path (301, keep query), Always Use HTTPS.
4. Turn on DNSSEC in Cloudflare and add its DS record at Squarespace.
5. `npm run verify:live -- --all`, check headers and SEO, send a test email to the Zoho mailbox.

## Rollback state

- Zone: deleting the Pending zone has no public effect.
- DNSSEC: can be re-enabled in Squarespace. Do that only if the nameservers stay on Squarespace.
- Nothing in production has changed.
