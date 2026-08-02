# AITP Conflict Ledger

Authority order per the AITP Windows Execution OS v4.0 (Notion, 2026-08-02): (1) law/provider/security/payment rules, (2) latest written CEO decision, (3) Canonical Brand & Business OS, (4) Audit Checkpoint + decision ledger, (5) latest implementation/market reports, (6) canonical Notion product/service records, (7) measured repo/deploy config, (8) measured production behaviour, (9) official provider docs, (10) historical/archived material.

---

### CL-1 — Hosting architecture and build-state divergence (P0)
- **notionValue:** Audit Checkpoint (content 2026-07-26, page touched 2026-07-30): Replit primary (`ai-team-premium.replit.app`), Cloudflare Pages mirror, cutover not started, F32 "UNVERIFIED/BLOCKED," homepage "still the thin 3-plan version," catalog "107 rows / 99 unique."
- **repositoryValue:** `main` HEAD `444c241`, 129-record catalog, 322 blog posts, 12 category pages, 67 routes with SEO metadata — built across a long commit history not reflected in the checkpoint.
- **liveValue:** Vercel (`Server: Vercel`, DNS confirms), live and current with `main` HEAD (`Last-Modified` matches within ~34s of the triggering push).
- **officialValue:** n/a.
- **authorityUsed:** This is not a case where a document outranks measurement or vice versa — the checkpoint's claims here are *its own prior measurements*, now stale. Full detail and reasoning in `docs/audit/AITP_CURRENT_PRODUCTION_TRUTH.md`.
- **severity:** P0 — the CEO/owner should know that actual production has diverged substantially, via a different process (direct GitHub→Vercel), from what the checkpoint describes and gates on.
- **recommendedAction:** Present this finding to the CEO/owner explicitly; update the Notion checkpoint's hosting/count/build-state fields only after that acknowledgment, not silently.
- **requiresCEOApproval:** true — not for the fact-finding, but for deciding whether this deviation is accepted going forward or needs reconciling.

---

### CL-2 — CapCut pricing violates a recorded CEO decision (P0)
- **notionValue:** F27 (2026-07-26): CapCut official Pro re-verified at $19.99/mo; old ৳1,299 UNPUBLISHED; relist ৳2,510+ annual / ৳3,350+ monthly.
- **repositoryValue:** Single record `capcut-pro-starter-shared`, `price: 399`, `officialUSD: 7.99` (badge "P0 Hot Add" — added later, likely outside the F27 decision's scope).
- **liveValue:** Not independently re-checked via curl this session (data-level finding is already conclusive).
- **officialValue:** CapCut's official $19.99/mo (per the checkpoint's own re-verification) vs. this record's `officialUSD: 7.99` — a **second**, unexplained discrepancy: it's unclear which actual CapCut plan `officialUSD: 7.99` is meant to represent.
- **authorityUsed:** A2 equivalent (an actual recorded CEO pricing decision) overrides whatever process added this later "P0 Hot Add" record.
- **severity:** P0 — live, public underpricing directly contradicting a specific, dated CEO decision; direct margin/floor violation regardless of which exact number is "correct."
- **recommendedAction:** Confirm which CapCut plan `officialUSD: 7.99` actually refers to (it doesn't match the $19.99 the checkpoint verified), then correct the price to the approved range. This is a pricing change — red lane — do not execute without a current CEO confirmation, even though the existing price appears to already violate a past decision.
- **requiresCEOApproval:** true.

---

### CL-2b — Notion Business tiers show a large, unexplained pricing gap (P1, needs investigation, not yet confirmed like CL-2)
- **Method:** Ran the checkpoint's own recorded formula (`(officialUSD×130×1.15)` rounded up to nearest ৳16) against all 129 catalog records, **excluding the 32 `accessType: "shared"` records** (shared tiers legitimately price below full-retail floor by design — the whole shared-seat business model — so the naive formula does not apply to them and was correctly excluded, not misapplied).
- **Result on the remaining 97 non-shared ("personal") records:** 27 show only a ৳2–14 gap against the formula's floor — immaterial, almost certainly explained by a slightly different original rounding/FX convention than my reconstruction, **not treated as violations**.
- **Two records show a dramatically different, material gap:** `notion-business-monthly` (price ৳800 vs. formula floor ৳2,992, gap ৳2,192) and `notion-business-6m` (price ৳4,800 vs. floor ৳17,952, gap ৳13,152) — both marked `accessType: "personal"`, not shared, so the shared-tier exclusion does not explain this.
- **severity:** P1 — flagged with lower confidence than CL-2 (CapCut) because this is derived from my own formula reconstruction, not a specific dated CEO decision like CapCut's. Could indicate a genuine pricing defect, or could indicate this "Business" tier is actually a legitimate multi-seat/bulk product mislabeled as `personal`, or that `officialUSD: 20` is the wrong reference price for whatever this record actually represents (an `officialUSD` mismatch, same failure mode as CL-2's CapCut finding).
- **recommendedAction:** Investigate what `notion-business-monthly`/`notion-business-6m` are actually meant to represent (seat count, billing structure) before concluding this is a pricing error; do not change the price without that confirmation.
- **requiresCEOApproval:** true if a price change results; false for the investigation itself.

---

### CL-3 — No automated cost-floor enforcement on the catalog that actually ships (P1, systemic)
- **notionValue:** Checkpoint records a general floor formula (`(USD×130)×1.15`, rounded to nearest ৳16) and a Section 59.5 "margin mandate" reprice pass across 20+ products (2026-07-26).
- **repositoryValue:** `lib/floor-guard.js` implements a *flat* ৳29,900 floor (not the USD-based formula) and validates `data/catalog.json` — a schema/file the live site does not render from. The live-serving catalog (`client/src/data/products-catalog.json`) is validated only by `scripts/audit-prices.mjs`, which checks tool-page-vs-catalog *consistency*, not cost-floor *violations*.
- **severity:** P1 — this is the specific gap that let CL-2 (CapCut) ship unnoticed, and could let similar violations recur for any future product addition.
- **recommendedAction:** Extend `scripts/audit-prices.mjs` (or add a new script) to compute the CEO's actual approved floor formula per-record from `officialUSD` and fail if `price` is below it, applied to `client/src/data/products-catalog.json` specifically. This is a green-lane engineering task (build a validator), not a pricing decision itself.
- **requiresCEOApproval:** false for building the validator; true for what it should do when it finds an existing violation (fix silently vs. flag for approval — recommend the latter, per CL-2).

---

### CL-4 — Legal operator / ownership wording is explicitly undecided
- **notionValue:** Canonical Brand & Business OS (2026-08-02): "Legal operator and ownership wording: Pending written management decision." Listed under "Decision gates requiring human authority."
- **Separately observed (search snippet only, not fetched in full):** the Market/SEO/Competitor report's search highlight contained the phrase "AI Team Premium is an independent business operated by Refat" — **not verified by fetching the full page this session**, and directly in tension with the canonical doc's "pending" status.
- **severity:** P0 for any public-facing claim — this session made **no** ownership/operator statement anywhere, and none should be made until this is resolved with a current written decision.
- **recommendedAction:** Fetch the full Market/SEO report to see the exact context of the "operated by Refat" phrase before treating it as anything more than an unverified search snippet; do not repeat it as fact.
- **requiresCEOApproval:** true (explicitly listed as a decision gate in the canonical doc itself).

---

### CL-5 — GitHub Actions billing lock (shared with sibling AIPS repo)
- **repositoryValue:** Confirmed via `gh run view` — every workflow on `sysmoai/AI-Team-Premium` fails in seconds with "account is locked due to a billing issue," identical to the condition found on `sysmoai/AI-Premium-Shop` in this same conversation's prior work.
- **severity:** P1 — blocks all CI-based gating (lint/typecheck/test/security-scan/E2E); does not block production (Vercel deploys independently).
- **recommendedAction:** CEO/admin resolves GitHub billing account-wide.
- **requiresCEOApproval:** true (billing/account action, red lane).

---

### CL-6 — Uncommitted work found loose on `main` at session start
- **repositoryValue:** Seven untracked files (150+ products integration planning docs and scripts) from earlier in this conversation were sitting uncommitted directly on local `main`, not on any feature branch.
- **severity:** P2 — process hygiene, not a live defect. No secrets, no brand contamination in these files.
- **recommendedAction:** Moved to a dedicated feature branch this session (`checkout -b` carries uncommitted changes forward) rather than left on `main` or discarded. See `docs/context/DECISIONS.md` for whether to keep, revise, or archive this scaffolding.
- **requiresCEOApproval:** false.
