# AITP Windows Capability & Access Report

Run date: 2026-08-02 (Asia/Dhaka)

## Model / tool identity
- Claude Code CLI version: 2.1.220
- Model for this session: Claude Sonnet 5 (set via `/model` earlier in this conversation)
- Working directory verified: `C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium`

## Brand-firewall check (performed before any edit)
- `git remote -v` → `https://github.com/sysmoai/AI-Team-Premium.git` — confirmed AITP, not AIPS.
- No AIPS strings, WhatsApp number, or `aipremiumshop.com` references found in this checkout during this session's work.
- **Note for future sessions:** this same Windows machine also hosts `apps/AI-Premium-Shop` (a sibling, unrelated business under the same GitHub org). A prior session in this conversation worked there. Always verify `git remote -v` before editing — folder names alone are not proof.

## Local system
- Git, Node.js (v24.15.0), pnpm/npm available. `gh` CLI authenticated as `sysmoai` (scopes: gist, read:org, repo, workflow).
- No Python, no dedicated secret-scanner or Lighthouse CLI confirmed installed.

## GitHub
- Repository: `sysmoai/AI-Team-Premium`, default branch `main`.
- Local `main` was in sync with `origin/main` at session start (`444c241`), no divergence.
- Uncommitted, untracked files were present directly on `main` from earlier work in this same conversation (150+ products integration scaffolding: scripts + planning docs). Moved onto a dedicated feature branch this session rather than left loose on `main` — see `docs/context/DECISIONS.md`.
- One pre-existing open PR: `fix/aiteampremium-domain-migration` (draft, opened 2026-07-18) — not touched this session.
- **GitHub Actions is billing-locked account-wide on `sysmoai`** — identical condition to the sibling AIPS repo. Every workflow (`CI — Build & Test`, `E2E — Full 25-Tool Test Suite`, `📊 Monitor Production Health`) fails within seconds with "account is locked due to a billing issue." The repeatedly-failing "Monitor Production Health" schedule is a false alarm caused by this lock, not a real production incident — confirmed by directly curling the live site (see `AITP_CURRENT_PRODUCTION_TRUTH.md`).

## Notion
- MCP connected (verified in the prior AIPS-side work this session; same connection). Workspace: "EMON HOSSAIN".
- Read this session: "AITP Audit Checkpoint — v3.2" (content dated 2026-07-26, page touched 2026-07-30), "AI Team Premium — Canonical Brand & Business Operating System" (touched 2026-08-02, same day as this session).
- A Notion page titled exactly "AITP Windows Claude Code — Full Strategic Autonomous Execution OS v4.0 — 2026-08-02" exists and matches the user's pasted execution contract almost verbatim — confirms the contract is sourced live from Notion, not improvised.
- Not yet read this session (deferred — see Next Actions): Master Autonomous Execution Harness, Bangladesh Customer Intelligence System, Rebrand Migration & Eradication Ledger, Product Intelligence & Offer Eligibility Protocol, Website Experience & Conversion Builder Protocol, Continuous Verification & Audit Protocol, Market/SEO/Competitor Growth Report, Claude Code Website Implementation & 50K Traffic Spec, Revenue & Customer Growth Operating Framework.

## Production and hosting — see full detail in `AITP_CURRENT_PRODUCTION_TRUTH.md`
Headline: measured reality (Vercel, live, richly built) diverges sharply from what the most recent Notion checkpoint describes (Replit primary/Cloudflare mirror, F32 unverified, "thin 3-plan homepage"). This is the single most important finding of this session and is logged as CL-1 in the conflict ledger.

## Replit
- Not inspected this session (no Replit credentials/session presented; the checkpoint's own Repl reference `ai-team-premium.replit.app` was not queried). Recorded as a gap, not assumed resolved either way. The checkpoint's own hard rule — zero Replit AI Agent credit spend — was respected by simply not touching Replit at all this session.

## Summary judgement
Sufficient access existed to do real, safe, evidenced work: local repo (read/write on a feature branch), GitHub (read + branch push), Notion (full read), live site (read-only via curl/DNS). No red-lane action was taken. Two items were found and are reported, not acted on: (1) GitHub Actions billing lock (CEO/admin, account-wide, shared with AIPS), (2) legal operator/ownership wording explicitly marked "pending written management decision" in the canonical brand doc — this session made no ownership or operator claim anywhere.
