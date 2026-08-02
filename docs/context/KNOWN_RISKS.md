# AITP Known Risks

## P0 — TOP FINDING (this session, after reading the eligibility protocol in full)
- **R0 — The entire live catalog (129 products) was built without ever going through the CEO-approved Product Intelligence & Offer Eligibility Protocol.** No record carries `commercialStatus`, an eligibility state, evidence IDs, or verification dates. Most critically: **32 records are `accessType: "shared"` with zero documented provider-authorization evidence**, despite the protocol explicitly stating shared-credential sales are presumptively prohibited unless written provider rules permit the exact arrangement and management approves it per product. This mirrors an identical finding already made on the sibling AIPS repo in this same conversation. CL-2 (CapCut) and CL-2b (Notion Business) are two specific instances this session happened to catch — not the full scope. See CONFLICT_LEDGER CL-1b. Owner: CEO (prioritization + per-product review, likely the single largest open item in this repo).

## P0
- **R1 — CapCut underpriced, violates recorded CEO decision.** Live at ৳399/mo vs. approved ৳2,510+/৳3,350+. See CONFLICT_LEDGER CL-2. Owner: CEO (confirm correct plan/USD basis, then approve fix).
- **R2 — Production/Notion divergence not yet acknowledged by CEO.** Site is far more built (129 products, 322 posts, 12 category pages) and on different hosting (Vercel, not Replit) than the last Notion checkpoint reflects. See CL-1. Owner: CEO (acknowledge, then Notion gets updated to match).
- **R3 — Ownership/operator wording: two of AITP's own canonical Notion documents directly contradict each other**, not just an unverified snippet. Canonical Brand OS (touched 2026-08-02, higher authority tier): "pending written management decision." Market/SEO report (2026-07-30, fetched in full): names a specific operator and explicitly forbids describing Emon Hossain as owner. Per authority order, treated as still-undecided; the naming is not adopted as fact. No claim made anywhere in any file this session. See CONFLICT_LEDGER CL-4 (updated). Owner: whoever can reconcile Notion itself, then CEO for any resulting public wording.

## P0 (upgraded from P1 this session)
- **R3b — Notion Business tiers carry an unsupported "73% Off" claim AND price far below the formula floor, with no legitimate bulk/shared explanation in the data.** Confirmed: these are the only two Notion records in the catalog (no Team/Shared tier exists to imply bulk-purchase economics), and the "73% Off" badge has zero computational backing anywhere in the codebase — a standalone claims-registry violation independent of the pricing question. See CL-2b (upgraded). Owner: CEO (both the price and the claim need a decision).

## P1
- **R4 — No automated cost-floor enforcement on the live-serving catalog.** `lib/floor-guard.js` validates the wrong file. See CL-3. This is how R1 (CapCut) shipped unnoticed and could recur for any future addition.
- **R5 — GitHub Actions billing-locked account-wide.** Blocks all CI gating (lint/typecheck/test/E2E/security-scan). Vercel deploy is unaffected. Shared condition with the sibling AIPS repo. Owner: CEO/admin (billing).
- **R6 — Five required service-pillar pages don't exist.** `/services/ai-advisory`, `/ai-setup-security`, `/ai-training`, `/ai-automation`, `/managed-ai-operations` are specified in the canonical brand OS but not built; only unrelated service pages exist. This is central to AITP's stated positioning ("not a cheap-account shop").
- **R7 — Earlier bulk-import scaffolding is not taxonomy-aware.** The 150+-products scripts built earlier in this conversation would bypass commercial-status/evidence/price-approval requirements if run as-is. See DECISIONS.md D1. Not run against real data; flagged, not deleted.

## P2
- **R8 — Uncommitted work was sitting on `main`.** Moved to a feature branch this session; process hygiene only, no live impact.
- **R9 — CapCut's `officialUSD: 7.99` doesn't match the CEO-verified $19.99 official Pro price.** Possibly a different, legitimate lower tier never covered by the original P18 decision — needs source confirmation, not assumption, before treating it as simply "wrong."

## Explicitly not a risk (verified, closed)
- ChatGPT Pro Premium Shared price-leak concern from the contract's Section 9 hypothesis list: **confirmed correctly implemented**, matches the recorded CEO HOLD decision exactly (data flag + component logic + live HTML all checked). No action needed.
- "No extra VAT" unsafe wording: searched broadly across `client/src/pages` and `client/src/data`, no instance found (all grep hits were false positives — "hover-elevate," "Instant Activation," etc.).
