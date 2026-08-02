# AITP Shared-Access Audit — 2026-08-02

Scope: all 32 `accessType: "shared"` records in the shipped catalog (`client/src/data/products-catalog.json`).
Machine-readable results: `docs/audit/shared-access-results.json`.
Governance overlay: `data/commercial-governance.json`.

## What this audit did and did not establish

**Did:** established from the repository that **not one** of the 32 shared records carries any of what the canonical *Product Intelligence & Offer Eligibility Protocol* requires before a shared offer may be publicly sold — no documented access model, no account-owner or recovery-owner disclosure, no provider-terms source, no resale/seat evidence, no verification date.

**Did not:** fetch any provider's live terms of service. No record here is marked compliant, `not_for_resale`, or `prohibited`, because asserting either without reading the actual current terms would be fabricating a provider finding. The protocol is explicit that provider permission cannot be assumed, and it equally cannot be assumed *absent*.

So every one of the 32 is classified **`pending_evidence`** — the honest state: unknown, and therefore not sellable until someone establishes which it is.

## Effect applied on this branch

All 32 are quarantined: `priceOnRequest` is set, any ৳ figure is stripped from the WhatsApp prefill, and promotional/discount badges are removed. Customer-facing wording is neutral — *"Availability and current price confirmed after plan verification."*

Nothing is deleted. Internal price references remain in the data for audit continuity; they are simply no longer rendered or quoted.

**This is a feature branch. Production is unchanged until PR #3 is reviewed and merged.**

## Risk tiering (structural evidence only)

The 32 split by one fact that *is* knowable from the vendor's public plan lineup — whether an official multi-seat product exists at all. This says nothing about whether AITP is authorised; it only narrows what question needs answering.

### Tier A — vendor publishes official multi-seat plans (15 records)
`chatgpt-plus-starter-shared`, `chatgpt-plus-premium-shared`, `chatgpt-business-starter-shared`, `chatgpt-business-premium-shared`, `chatgpt-pro-premium-shared`, `claude-pro-premium-shared`, `otter-ai-shared`, `gamma-plus-shared`, `grammarly-premium-starter-shared`, `canva-pro-starter-shared`, `microsoft-copilot-pro-starter-shared`, `jasper-ai-starter-shared`, `adobe-firefly-starter-shared`, `descript-pro-starter-shared`, `synthesia-starter-shared`

A compliant path plausibly exists (AITP holds the workspace, assigns named seats). **Question to answer per record:** does AITP actually hold the workspace and assign a named seat, or is one credential being split? Those are very different products wearing the same "Shared" label.

### Tier B — no official multi-seat plan known at this tier (17 records)
`perplexity-pro-shared`, `midjourney-std-shared`, `midjourney-std-premium-shared`, `midjourney-pro-shared`, `leonardo-ai-shared`, `capcut-pro-starter-shared`, `heygen-creator-shared`, `udio-pro-shared`, `v0-dev-shared`, `writesonic-shared`, `quillbot-premium-starter-shared`, `pika-labs-starter-shared`, `opus-clip-starter-shared`, `murf-ai-starter-shared`, `freepik-premium-shared`, `kling-ai-starter-shared`, `windsurf-pro-shared`

These are individual-plan products. If there is no official multi-user tier, "Shared" most likely means one account used by several people — the model the protocol presumptively prohibits. **Highest priority for ToS review.** Elevated risk, not a finding.

## Separate P0 discovered during this audit — outside the catalog

`client/src/pages/AIToolsVault.tsx` sells a bundle at a **hardcoded ৳1,990**, described as *"Shared access to ChatGPT Plus, Claude Pro and Gemini Advanced"*, with *"6-hour delivery, 30-day warranty"*. Because the price is hardcoded in the page rather than read from the catalog, this offer sits **entirely outside** the governance layer built here — the quarantine does not reach it. It also emits into `ProductSchema` structured data, so the price and claims are published to search engines.

This is arguably the single most exposed surface on the site: it explicitly advertises shared access to three identity-bound personal accounts, at a price no catalog record backs, with a warranty claim.

**Not changed in this batch.** Rewriting a bundle sales page is a commercial/content decision, not a mechanical quarantine, and doing it hastily at the end of a long batch would be worse than doing it deliberately. It is the recommended next action.

## What must happen per record before any of the 32 can be sold again

1. Read the provider's current terms — the actual page, dated and linked.
2. Classify the access model honestly (`official_workspace_seat`, `official_named_seat`, `customer_owned_activation`, `managed_service`, or a prohibited pattern).
3. Record who owns the account and who controls recovery. A customer needs to know who can seize the account.
4. Record whether a credential is shared. If yes, it is `not_for_resale` or `prohibited` — this is not a pricing question.
5. Record real acquisition cost and seat capacity.
6. Obtain a management price approval with an ID and validity date.
7. Set `verified_at` and `next_review_at`.

`scripts/validate-commercial.mjs` enforces steps 2–4 and 6 mechanically: a shared record cannot become publicly purchasable while its access model is `UNVERIFIED_SHARED`, and one flagged `credential_sharing_required: true` cannot hold any status other than `not_for_resale`/`prohibited`.
