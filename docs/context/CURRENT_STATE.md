# AITP Current State (measured, 2026-08-02)

**Authority sources read this session:** `client/src/data/products-catalog.json`, `git log`/`git status`/`gh run list`/`gh pr list`, live `curl`/DNS against `aiteampremium.com`, Notion "AITP Audit Checkpoint — v3.2" and "Canonical Brand & Business Operating System." Full evidence in `docs/audit/AITP_CURRENT_PRODUCTION_TRUTH.md` and `docs/context/CONFLICT_LEDGER.md` — this file is a compact index, not a duplicate.

## Identity
- Brand: AI Team Premium (AITP). Domain: `https://aiteampremium.com`, `www` canonical, apex 308-redirects to `www`.
- Repository: `sysmoai/AI-Team-Premium`, default branch `main`, HEAD at session start `444c241`.
- Legal operator/ownership: **explicitly undecided** per the canonical brand doc — do not state one.

## Production
- Hosting: **Vercel**, auto-deploys from `main` via Git integration, independent of GitHub Actions (billing-locked account-wide).
- Live and current with `main` HEAD as of this session's checks.
- **Diverges sharply from the Notion checkpoint's last recorded state** (which described Replit-primary hosting and an unverified/blocked, thin homepage) — see CL-1.

## Catalog
- 129 plan/tier records, 72 unique brands, in `client/src/data/products-catalog.json`.
- A separate, disconnected catalog system (`data/catalog.json` + `lib/floor-guard.js`) exists from earlier scaffolding work but is **not** what the live site renders from.
- Known violation: CapCut priced at ৳399, contradicting a recorded CEO decision (relist ৳2,510+/৳3,350+) — see CL-2. Not fixed this session (price change = CEO gate).
- Known correct implementation: ChatGPT Pro Premium Shared correctly shows "Request price," matching the recorded HOLD decision — see production-truth doc.

## Structure present (from prior sessions in this repo, confirmed still on `main`)
- 12 category pages, 322 blog posts, ~67 routes with SEO metadata, header/footer navigation generated from the catalog, `/pricing` generated from the catalog.
- Five required service-pillar pages (`/services/ai-advisory`, `/services/ai-setup-security`, `/services/ai-training`, `/services/ai-automation`, `/services/managed-ai-operations`) **do not exist** — only unrelated service pages (`AppDevelopment.tsx`, `BrandDesign.tsx`, `DigitalMarketing.tsx`, `WebDevelopment.tsx`, `AIOpsSprint.tsx`, `ServiceComingSoon.tsx`). This is a real, unbuilt gap against the canonical brand OS's "Service architecture" section.

## Uncommitted work found at session start
Seven files (150+ products integration scaffolding: planning docs + scripts) were uncommitted on local `main` from earlier in this conversation. Moved to feature branch `feat/aitp-truth-reconciliation-20260802` this session — see `docs/context/DECISIONS.md` for disposition.

## What this session did NOT do
No price changed. No merge to `main`. No production deploy. No Replit inspected (zero credits spent, per hard rule — simply not touched). No ownership/operator claim made anywhere.
