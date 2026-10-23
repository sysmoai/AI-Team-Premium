# AITP migration checkpoint

Read this first when resuming. Re-verify every line against Git, GitHub Actions and Cloudflare before acting on it. Don't trust a planned step as done.

**Last updated:** 2026-10-23, recovery session (cloud container, not the founder's PC)

| Item | State |
|---|---|
| Current phase | Phase 4/6 done (Worker implemented and tested locally). Phase 7 (staging deploy) is **blocked on credentials**. |
| Baseline commit | `6ee610b8e36568c8c5037ef014f1616073deb8ab` |
| Branch | `migration/aitp-cloudflare-recovery-20261023` (see `git log` for the head SHA) |
| PR | see GitHub, "Cloudflare Workers migration" |
| Production | **DOWN** on Vercel since about 2026-10-03 (monitor workflow). DNS is unchanged: Squarespace nameservers, DNSSEC on, `www` CNAME to Vercel. |
| Cloudflare | Nothing deployed for AITP. The account seen by the connector has only other brands' Workers (`ai-premium-shop`, `saveonsub-store`), which were not touched. |
| Tests passed | check, build, validate:commercial, verify 54/54, local Worker verify:live 203/203 + 4/4, Playwright on 3 viewports |
| Tests failed | `npm run audit` 62/63 (pre-existing risky-language scan); tablet 8 px overflow (pre-existing) |
| Vercel | Untouched. `vercel.json` and `api/index.js` (now a thin adapter) are kept for rollback. Vercel's Git integration still exists in the Vercel account. |

## Pending external dependencies (human)

1. Decide which Cloudflare account hosts AITP (see the runbook, "Identity").
2. Create the API token and add the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` GitHub secrets (runbook, "One-time setup").
3. After staging passes: DNS cutover steps 1–7 (Squarespace login, DNSSEC off, nameserver change).

## Next executable action

With secrets present, re-run the `staging` job on the PR, or run the workflow manually with target `staging`. Then check the job summary's staging URL and the `verify:live --all` result.

## Rollback state

No production change has been made, so there is nothing to roll back.
