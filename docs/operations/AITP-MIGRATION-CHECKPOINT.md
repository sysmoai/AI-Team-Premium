# AITP migration checkpoint

Read this first when resuming. Re-verify every line against Git, GitHub Actions, Cloudflare and public DNS before acting on it. Don't trust a planned step as done.

**Last updated:** 2026-10-23 14:40 UTC, project thread (cloud session), after the merge of PR #38

| Item | State |
|---|---|
| Current phase | Code merged and staging re-verified on `main`. DNS cutover **in its DNSSEC safety window**. Nameservers are NOT changed yet. |
| Branch / PR | PR #38 **merged** into `main` 2026-10-23 14:01 UTC, merge commit `7eb6adf563261e679efd715c95985fd6df44f490`. Push runs on `main`: CI — Build & Test, E2E and Deploy to Cloudflare Workers all green (production job skipped because the variable is unset). |
| Production | **DOWN**: `www.aiteampremium.com` returns HTTP 402 from Vercel ("Account is blocked"). |
| AITP Cloudflare account | `Sysmoaiprivatelimited@gmail.com's Account`, ID `312f8683be42143016fe5478457dc00c`. The only account that login can see. |
| Isolation | The shared SYSmoAI account (the Cloudflare connector on the founder's PC) holds `ai-premium-shop` and `saveonsub-store` and is a different account. The AITP account has only `ai-team-premium-staging`. Nothing in the shared account was touched. |
| API token | `aitp-github-actions-workers-deploy` (AITP account). Account: Workers Scripts Write, Account Settings Read. Zone `aiteampremium.com` only: Workers Routes Write, Zone Read. No expiry. |
| GitHub secrets | `CLOUDFLARE_API_TOKEN` (2026-10-23 04:17 UTC), `CLOUDFLARE_ACCOUNT_ID` (2026-10-23 04:19 UTC, AITP ID). `CLOUDFLARE_PRODUCTION_ENABLED` is **not** set. |
| Staging | Re-deployed from `main` (7eb6adf) by workflow_dispatch run 39970708050, 2026-10-23 14:35 UTC: `verify:live --all` **203/203 routes, 4/4 404 probes**, bundle `index-BoXwXmyR.js` in sync. Earlier: run 39899071809. URL: https://ai-team-premium-staging.sysmoaiprivatelimited.workers.dev |
| Cloudflare zone | `aiteampremium.com` added (Free), status **Pending**. Assigned nameservers: `isla.ns.cloudflare.com`, `khalid.ns.cloudflare.com`. Bot Preference Sync is OFF (robots.txt untouched). |
| Zone records | Only Zoho, all DNS only: MX 10 mx.zoho.com, MX 20 mx2.zoho.com, MX 50 mx3.zoho.com, TXT `v=spf1 include:zohomail.com ~all`, TXT `zoho-verification=zb77136606.zmverify.zoho.com`, TXT `zoho._domainkey` DKIM. Vercel A/CNAME deleted. Verified byte-identical to Squarespace by querying both nameservers directly (DKIM 410/410 chars). |
| Squarespace | Records unchanged (still include Vercel A/CNAME). Nameservers still `nsa1-4.squarespacedns.com`. Domain lock ON, auto-renew ON, expires 2027-07-04. |
| DNSSEC | **Turned OFF at Squarespace 2026-10-23 08:10 UTC (14:10 +06:00).** At 08:11 UTC the .com registry still served DS 46186 (TTL 86400); Squarespace says removal can take up to 48 h. |

## Gate before changing nameservers (do not skip)

1. `Resolve-DnsName aiteampremium.com -Type DS -Server a.gtld-servers.net -DnsOnly` returns **no DS answer**. Note that time (T).
2. Wait until **T + 24 h** (the DS TTL is 86400, so cached copies expire by then).
3. Only then: Squarespace → aiteampremium.com → Domain Nameservers → custom → `isla.ns.cloudflare.com`, `khalid.ns.cloudflare.com`.

**Gate status (founder reconfirmed the 24 h gate 2026-10-23 14:32 UTC):** DS removed at registry, first seen 2026-10-23 13:52 UTC (no DS from a/b/m.gtld-servers.net; none cached at 1.1.1.1 or 8.8.8.8; Squarespace serves no DNSKEY; Squarespace DNSSEC page shows OFF with no pending notice). The previous check, at 08:11 UTC, still showed DS 46186, so the true removal time is somewhere between these two checks; 13:52 is used as T to be safe. **Earliest nameserver switch: 2026-10-24 13:52 UTC (19:52 +06:00).**

At 13:58 UTC a fresh query sent to a .com server (`2001:502:1ca1::30`, via dns.google with `cd=1`) returned NSEC3 proof of no DS. Google Public DNS's normal cache still held DS 46186 with 21600 s left. That stale copy expires by about 19:58 UTC, well inside the gate.

## Execution blocker on the Windows PC

The Claude Code session on the founder's PC runs in **Auto** permission mode. Its safety classifier refused the Squarespace nameserver change and the PR merge ("DNS / Domain change", "Merge without review"), even with the founder's chat approval. It was not worked around. Required: the founder switches that session from Auto to **Ask permissions** (or Default), then approves each native prompt. The cloud session's network proxy blocks the GitHub Actions variables API, so the cloud session cannot set `CLOUDFLARE_PRODUCTION_ENABLED` either.

## Mail inventory (public DNS via dns.google, 2026-10-23 14:35 UTC)

MX 10 mx.zoho.com, 20 mx2.zoho.com, 50 mx3.zoho.com (TTL 14400). Apex TXT: `v=spf1 include:zohomail.com ~all`, `zoho-verification=zb77136606.zmverify.zoho.com`. `zoho._domainkey` TXT DKIM present (`v=DKIM1; k=rsa; p=MIIBIjAN…QIDAQAB`). `_dmarc`: NXDOMAIN (no DMARC; not added, out of scope). Matches the Cloudflare zone records listed above.

## Next executable action

At or after **2026-10-24 13:52 UTC** (a scheduled follow-up is set for 13:56 UTC), from a PC session that is not in Auto mode: re-check DS absent, then run the steps below.

## After the gate (runbook steps 4–8)

1. Wait for the zone to show **Active**.
2. ~~Merge PR #38~~ (done). Set the repo variable `CLOUDFLARE_PRODUCTION_ENABLED=true`. Run the workflow with target `production` (or let the merge push deploy it).
3. Apex: `AAAA @ 100::` Proxied, a Redirect Rule from the apex to `https://www.aiteampremium.com` + path (301, keep query), Always Use HTTPS.
4. Turn on DNSSEC in Cloudflare and add its DS record at Squarespace.
5. `npm run verify:live -- --all`, check headers and SEO, send a test email to the Zoho mailbox.

## Rollback state

- Zone: deleting the Pending zone has no public effect.
- DNSSEC: can be re-enabled in Squarespace. Do that only if the nameservers stay on Squarespace.
- Nothing in production has changed.
