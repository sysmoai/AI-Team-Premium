# AITP Current Production Truth (measured, 2026-08-02)

This supersedes any hosting/architecture/count claim in the Notion "AITP Audit Checkpoint — v3.2" (content dated 2026-07-26) until reconciled with a current CEO decision. Every fact below is tagged with how it was verified.

## Hosting and deployment — CONFLICTS WITH NOTION (see CONFLICT_LEDGER CL-1)

| Fact | Notion checkpoint (2026-07-26/30) says | Measured this session (2026-08-02) |
|---|---|---|
| Primary hosting | Replit (`ai-team-premium.replit.app`) | **Vercel** — `Server: Vercel` header, DNS `www` → `cname.vercel.sh`, apex → Vercel IP `216.198.79.1` |
| Secondary/mirror | Cloudflare Pages | Not checked this session; apex 308-redirects to `www`, both served by Vercel |
| Cutover status | NOT STARTED (CEO-approval-only) | N/A — the site is not running on Replit or Cloudflare at all right now; there is no "cutover" pending because Vercel already appears to be where GitHub pushes land |
| F32 production verification | **UNVERIFIED / BLOCKED** — "no completed production PASS/FAIL checklist was found," public checks for the domain/robots/sitemap "could not resolve in the available verification environment" | **LIVE, current, and functioning.** `curl -I https://www.aiteampremium.com/` → `200 OK`, `Last-Modified` timestamp is within ~34 seconds of the last GitHub push's CI-trigger timestamp — confirms Vercel deploys directly from GitHub pushes via its own Git integration, independent of the billing-locked GitHub Actions |
| Homepage state | "still the thin 3-plan version" | Rich homepage: title "ChatGPT, Claude & AI Tools in Bangladesh | from ৳190/mo", meta references "78 premium AI tools," ChatGPT/Claude/Gemini/Midjourney/Canva, bKash/Nagad, 5-30 min delivery, 30-day warranty |
| Catalog size | "107 catalog rows · 99 unique after dedups" | **129 records, 72 unique brands** in `client/src/data/products-catalog.json` (current `main` HEAD `444c241`) |
| Deploy mechanism | Implied manual "paste into Repl" workflow (F23–F32 steps) | Direct `git push origin main` → Vercel Git integration auto-deploys in under a minute; confirmed by this session's own prior work (see Session history below) |

**How to reproduce the measured column:**
```
nslookup www.aiteampremium.com
curl -I https://www.aiteampremium.com/
curl -s https://www.aiteampremium.com/ | head -c 2000
node -e "const d=require('./client/src/data/products-catalog.json'); console.log(d.length, new Set(d.map(p=>p.brand)).size)"
```

### What this means, precisely
This is **not** a case of Notion being wrong about a fact that can be resolved by trusting measurement over documentation. Per the contract's own authority order, the Audit Checkpoint and Canonical Brand OS outrank measured repository/production state for *decisions and approvals* (tiers 3–4 vs. 7–8). But the checkpoint's claims here are not decisions — they are its own record of *measured* state ("F32 UNVERIFIED," "thin 3-plan homepage," "107 rows") from **2026-07-26**, and that record is simply stale relative to what has actually been built and shipped since. A very large amount of engineering work — 322 blog posts, 12 category pages, a corrected pricing pass across 21+ tool pages, SEO metadata on 67 routes — has happened via direct GitHub commits and Vercel auto-deploy, evidently **outside** the Notion-described F23–F32 "paste into Repl" build process. This is a real, material process deviation that the CEO/owner should be made aware of, not a documentation typo to silently correct.

**Recommendation, not yet executed:** update the Notion checkpoint's hosting/cutover/count fields to match measured reality, but flag explicitly that this reflects a different execution path than the one the checkpoint described, so the CEO can decide whether that path is approved going forward or needs reconciling back to the documented process.

## Catalog verification against specific recorded CEO decisions

### ChatGPT Pro Premium Shared — CONFIRMED CORRECTLY IMPLEMENTED
Notion checkpoint F27 (2026-07-26): CEO decision = **HOLD** — no published price, "Request price on WhatsApp" only, quoted above the ৳29,900 floor; "৳4,500/৳4,990 must not appear anywhere."

Measured: `client/src/data/products-catalog.json` record `chatgpt-pro-premium-shared` carries `"priceOnRequest": true` with reason text matching this decision's spirit, and `whatsappMsg: "Hi, I want a price for ChatGPT Pro — Premium Shared"` (no price quoted). The rendering component `ProductDetail.tsx` (serving the dynamic `/tools/:slug` route, confirmed via `App.tsx` route table) checks `priceOnRequest` in nine separate places and renders "Request price" / "On request" instead of a number whenever it is true. A live `curl` of `https://www.aiteampremium.com/tools/chatgpt-pro-bangladesh` contains no occurrence of "4500" or "4,500" anywhere in the served HTML.

**Status: CORRECTLY IMPLEMENTED, matches CEO decision.** The record's own internal `price: 4500` field appears to be a reference/floor number only, never rendered — worth flagging as a naming clarity risk (see Known Risks) but not a live defect.

### CapCut — CONFIRMED VIOLATION (P0)
Notion checkpoint F27 (2026-07-26): official CapCut Pro re-verified at $19.99/mo · $179.99/yr; no official published BDT rate exists (in-app regional pricing only). CEO decision: the old ৳1,299 stays **UNPUBLISHED**; relist at **৳2,510+ (annual) / ৳3,350+ (monthly)**.

Measured: `client/src/data/products-catalog.json` contains exactly one CapCut record — `capcut-pro-starter-shared`, badge "P0 Hot Add" — priced at **৳399/mo**, `officialUSD: 7.99`. This is below both the CEO's rejected-and-superseded ৳1,299 figure and the approved ৳2,510+/৳3,350+ relist range, and below even the generic cost-floor formula recorded elsewhere in the checkpoint (`floor = (USD×130)×1.15, rounded up to nearest ৳16`, which for $7.99 (note: a *different* USD figure than the $19.99 official Pro price used in the CEO's own calculation — see below) would compute to roughly ৳1,200 — still far above ৳399).

**Two distinct problems, not one:**
1. The live price (৳399) is far below any approved figure.
2. The record's `officialUSD: 7.99` does not match the checkpoint's own re-verified official price ($19.99/mo). It's unclear whether $7.99 refers to some other CapCut tier (a lower "basic" plan) that was never the subject of the CEO's P18 decision, or whether it's simply wrong. This needs source verification before any price is corrected — do not just swap in ৳2,510 without confirming which actual CapCut plan this record is meant to represent.

**Status: violation, not corrected this session** (a pricing change is explicitly a CEO/approval-gated action per the contract's red lane — "changing approved prices" — even though the current price appears to violate an *existing* CEO decision rather than need a new one; recommend flagging to CEO for a quick confirm-and-fix rather than silently editing).

### Structural gap found: two disconnected catalog systems
`lib/floor-guard.js` (a cost-floor validator with a flat ৳29,900 floor) exists in this repo, but it validates against `data/catalog.json` — a schema (`product.pricing.monthly.amount`, etc.) that is **not** the catalog the live site actually renders from. The live site's real catalog is `client/src/data/products-catalog.json` (129 records), validated only by `scripts/audit-prices.mjs` (checks tool-page-vs-catalog price *consistency*, not cost-floor *violations*). **No automated check currently would have caught the CapCut ৳399 violation.** This is the kind of systemic gap the checkpoint's Section 59 ledger process is meant to catch, and it should be treated as a process/tooling gap, not just a one-off pricing mistake.

## Session history relevant to this truth doc (from this same conversation, prior turns)
The current 129-record catalog, 322 blog posts, 12 category pages, and 67-route SEO metadata coverage are the result of a long prior commit history (`git log --oneline` shows dozens of commits: "Blog posts: Fix WhatsApp, remove forbidden pricing, FTC compliance (322 posts)", "Give each of the 12 categories its own page", "Generate /pricing from the catalog", etc.) plus this conversation's own prior-turn work fixing 21 tool-page price mismatches and adding SEO metadata to `AllProducts.tsx` (commit `444c241`, currently at `origin/main` HEAD). None of that history is visible from the Notion checkpoint, which stopped tracking in detail after F32-prep (2026-07-26).
