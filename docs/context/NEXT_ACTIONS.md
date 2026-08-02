# AITP Next Actions

## Done this session (continuation)
1. ✅ Built `scripts/audit-floor.mjs` — committed, reusable diagnostic script. Correctly excludes 32 shared-tier records and 8 request-price/no-cost-basis records; flags 2 material anomalies (Notion Business, 73% gap each) out of 89 checked, cleanly separated from 27 immaterial (<2%) rounding-level gaps. Explicitly framed as a human-review signal, not a pricing authority, per the eligibility protocol's own rule against automatic formula-based pricing.
2. ✅ Read "AI Team Premium — Product Intelligence & Offer Eligibility Protocol" in full. **Major finding:** it explicitly prohibits shared-credential sales unless provider terms clearly permit it and management approves per-product — directly implicating all 32 `accessType:"shared"` catalog records, none of which carry documented authorization evidence. See CONFLICT_LEDGER CL-1b (new) and KNOWN_RISKS R0 (new top P0).
3. ✅ Read "AI Team Premium — Rebrand Migration & Eradication Ledger" in full. Confirms the eligibility protocol was only ever applied to a handful of example pages (ChatGPT, Claude Pro) as of "Batch 3, started 2026-07-19" — never completed across the catalog. This is the root cause of R0: the live 129-product catalog was built later, via a different process, without this governance layer.
4. ✅ Checked for unsupported "official partner"/"authorized reseller" claims on the site — none found, clean.

## Done this session (second continuation)
5. ✅ Fetched the full "Market, SEO, Competitor & Growth Intelligence Report." Confirmed the ownership question is a real conflict *between two of AITP's own canonical documents* (not a stale snippet) — see CONFLICT_LEDGER CL-4 (updated). Also found the report's own "production unverified" P0 is now resolved by this session's direct measurement (CL-6b), and surfaced a real strategic tension: the report explicitly warns "catalog volume risks diluting the enablement position," yet the live site is exactly catalog-heavy with no service-pillar pages built.
6. This session's Notion-reading queue (the 4 pages flagged as unread in the original capability report) is now fully read. Remaining work is CEO decisions, or new engineering batches the CEO selects from NEXT_ACTIONS' blocked list — not further unprompted discovery.

## Unblocked — safe to start immediately (green lane), lower priority than the CEO queue
1. Given R0's scale (127 of 129 products never eligibility-reviewed), consider whether a lightweight per-product triage pass (even just classifying each into "clearly fine" vs "needs review," without full protocol depth) is more tractable than waiting for a full CEO-sequenced review of all 129 records. This itself is a scoping question worth raising with the CEO rather than starting unprompted, given its scale.

## Blocked — require CEO/owner decision (do not act without one)
1. **Highest priority (new, R0):** the shared-access legitimacy question across 32 catalog records — this is a legal/ToS exposure question, not an engineering one, and is now the single largest known gap in this repo.
2. Confirm CapCut's correct plan/USD basis and approve the corrected price (CL-2 / R1).
3. Confirm what Notion Business tiers actually represent and whether the "73% Off" claim has any legitimate basis (CL-2b, upgraded to P0).
4. Acknowledge the production/Notion divergence (CL-1 / R2) before the checkpoint is updated.
5. Resolve legal operator/ownership wording (CL-4 / R3).
6. Sequencing call: fix P0 truth/pricing/access-legitimacy conflicts first vs. prioritize building the five service-pillar pages (R6).
7. Resolve GitHub Actions billing lock (R5) — account-wide, not project-specific.

## Exact next command for the next session
```bash
cd /c/Users/emonh/SYSmoAI-Stack/apps/AI-Team-Premium
git fetch origin --quiet
git checkout feat/aitp-truth-reconciliation-20260802
cat docs/context/resume.json
node -e "const d=require('./client/src/data/products-catalog.json'); d.forEach(p=>{const floor=Math.ceil((p.officialUSD*130*1.15)/16)*16; if(p.price < floor && !p.priceOnRequest) console.log(p.id, p.price, 'floor='+floor)})"
```
