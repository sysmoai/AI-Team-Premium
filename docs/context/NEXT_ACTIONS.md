# AITP Next Actions

## Unblocked — safe to start immediately (green lane)
1. **Partially done this session:** ran the formula check manually (excluding 32 `accessType:"shared"` records, since shared tiers legitimately price below full-retail floor). Result: 27 personal-tier records show only ৳2–14 immaterial gaps (formula-precision artifacts, not real issues); 2 show a large, unexplained gap (`notion-business-monthly`, `notion-business-6m` — see CL-2b). **Remaining work:** turn this ad-hoc check into a committed script (e.g. `scripts/audit-floor.mjs`) so it runs on every future catalog change instead of being re-derived by hand each session.
2. Fetch the full "AI Team Premium — Market, SEO, Competitor & Growth Intelligence Report" to resolve whether the "operated by Refat" snippet is real content or a stale/wrong fragment, before it can even be logged properly (currently only a search highlight, not verified).
3. Read "AI Team Premium — Product Intelligence & Offer Eligibility Protocol" — needed before deciding whether to rewrite or retire the earlier bulk-import scaffolding (Decision D1).
4. Read "AI Team Premium — Rebrand Migration & Eradication Ledger" — needed for Stage 1 ("workspace audit and identity eradication") which the Canonical Brand OS marks as the *current immediate priority*.

## Blocked — require CEO/owner decision (do not act without one)
1. Confirm CapCut's correct plan/USD basis and approve the corrected price (CL-2 / R1).
2. Acknowledge the production/Notion divergence (CL-1 / R2) before the checkpoint is updated.
3. Resolve legal operator/ownership wording (CL-4 / R3).
4. Sequencing call: fix P0 truth/pricing conflicts first vs. prioritize building the five service-pillar pages (R6) — recommend the former given the contract's own "highest priority first" instruction, but flagging for CEO awareness since the five-pillar architecture is central to positioning.
5. Resolve GitHub Actions billing lock (R5) — account-wide, not project-specific.

## Exact next command for the next session
```bash
cd /c/Users/emonh/SYSmoAI-Stack/apps/AI-Team-Premium
git fetch origin --quiet
git checkout feat/aitp-truth-reconciliation-20260802
cat docs/context/resume.json
node -e "const d=require('./client/src/data/products-catalog.json'); d.forEach(p=>{const floor=Math.ceil((p.officialUSD*130*1.15)/16)*16; if(p.price < floor && !p.priceOnRequest) console.log(p.id, p.price, 'floor='+floor)})"
```
