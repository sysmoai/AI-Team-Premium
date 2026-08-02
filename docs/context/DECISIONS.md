# AITP Architectural & Disposition Decisions

## Decision D1: disposition of the earlier "150+ products" scaffolding (this session)

**Context:** Earlier in this conversation, before the AITP/AIPS execution contracts were provided, the user asked to add 150+ Notion products to this site. No Notion product export was ever provided, so I built generic integration infrastructure instead: `scripts/integrate-bulk-products.mjs`, `scripts/generate-product-pages.mjs`, `scripts/optimize-seo.mjs`, `scripts/transform-notion-data.mjs`, `scripts/extract-missing-products.mjs`, plus planning docs (`150-PRODUCTS-EXPANSION-PLAN.md`, `COMPREHENSIVE-EXECUTION-PLAN.md`, `INTEGRATION-INSTRUCTIONS.md`, `STATUS-READY-TO-EXECUTE.md`, `QUICK-START.txt`, `DEPLOYMENT-COMPLETE.md`, `MISSING_PRODUCTS.json`, `PRODUCT-INTEGRATION-STARTED.md`). These sat uncommitted directly on `main`.

**Decision made this session:** Keep them, but move to a feature branch rather than `main`, and flag clearly that they must NOT be run as-is. Reason: this contract's Section 12 (canonical hierarchy, commercial-status taxonomy, evidence IDs, price-approval records) and Section 17 (Product Intelligence & Offer Eligibility Protocol) require every new product to carry eligibility/evidence/approval metadata before publication. The generic bulk-import scripts built earlier have no concept of this taxonomy — they would happily import 150 products with no `commercialStatus`, no price approval, no eligibility check, repeating exactly the kind of gap that produced the CapCut violation (CL-2). They should not be run against real data until rewritten to enforce the taxonomy, or retired if the Notion Product Intelligence & Offer Eligibility Protocol turns out to specify an incompatible approach once read in full.

**Not yet decided (needs the next session or CEO input):** whether to rewrite these scripts to be taxonomy-aware, or retire them entirely in favor of a process driven directly by the (not yet fully read) Product Intelligence & Offer Eligibility Protocol page.

## Decision D2 (pending — not made, listed per contract Section 25/CEO queue)

The following are unresolved and require CEO/owner input, not engineering judgment:
1. CapCut price correction (CL-2) — needs confirmation of which actual plan `officialUSD: 7.99` represents before any number is changed.
2. CL-1's hosting/build-state divergence — needs CEO acknowledgment before the Notion checkpoint is updated to match measured reality.
3. Legal operator/ownership wording (CL-4) — explicitly pending per the canonical brand doc itself.
4. Five required service-pillar pages are unbuilt — is building them the next priority, or is something else (e.g., resolving CL-1/CL-2 first) higher priority? Recommend resolving P0 truth/pricing conflicts first, per the contract's own "STATE 4: IMPLEMENT... highest priority first" guidance, but this is a sequencing call the CEO may want to weigh in on given the five-pillar service architecture is central to the brand's positioning.

## Decision D3: GitHub Actions billing lock — no workaround attempted

Per the contract's own precedent (documented identically for the sibling AIPS repo), this is a CEO/admin billing action, not something to route around with alternate CI or credential changes. No workaround was attempted this session.
