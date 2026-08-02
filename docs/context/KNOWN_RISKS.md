# AITP Known Risks

## P0
- **R1 — CapCut underpriced, violates recorded CEO decision.** Live at ৳399/mo vs. approved ৳2,510+/৳3,350+. See CONFLICT_LEDGER CL-2. Owner: CEO (confirm correct plan/USD basis, then approve fix).
- **R2 — Production/Notion divergence not yet acknowledged by CEO.** Site is far more built (129 products, 322 posts, 12 category pages) and on different hosting (Vercel, not Replit) than the last Notion checkpoint reflects. See CL-1. Owner: CEO (acknowledge, then Notion gets updated to match).
- **R3 — Ownership/operator wording undecided.** Canonical brand doc marks this "pending"; a separate unverified search snippet suggested a name that conflicts with that pending status. No claim made anywhere. Owner: CEO.

## P1
- **R3b — Notion Business tiers (`notion-business-monthly`, `notion-business-6m`) show a large, unexplained gap against the formula floor** (৳2,192 and ৳13,152 respectively) — lower confidence than R1/CapCut since it's derived from formula reconstruction, not a dated CEO decision, but the gap size (73–93% shortfall) is too large to dismiss as rounding. See CL-2b. Owner: next session to investigate what these records actually represent before flagging to CEO as a price question.
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
