# AI Team Premium — Shared-Access Enumeration · 2026-08-02

Exact 32 shared or variable-access records as enumerated from `data/commercial-governance.json`. All records are `commercial_status: pending_evidence`, `price_on_request: true`, `access_model: UNVERIFIED_SHARED`.

---

## Tier A — Vendor publishes official multi-seat plans (15 records)
Compliant path plausibly exists (workspace seat model). CEO must verify per-record.

| # | ID | Provider | Product Family | Official Plan | Risk Flags |
|---|-----|----------|---------------|---------------|------------|
| 1 | `chatgpt-plus-starter-shared` | OpenAI | ChatGPT | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 2 | `chatgpt-plus-premium-shared` | OpenAI | ChatGPT | Premium Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 3 | `chatgpt-business-starter-shared` | OpenAI | ChatGPT | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 4 | `chatgpt-business-premium-shared` | OpenAI | ChatGPT | Premium Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 5 | `chatgpt-pro-premium-shared` | OpenAI | ChatGPT | Premium Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 6 | `claude-pro-premium-shared` | Anthropic | Claude | Premium Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 7 | `otter-ai-shared` | Otter.ai | Otter.ai | Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 8 | `gamma-plus-shared` | Gamma | Gamma | Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 9 | `grammarly-premium-starter-shared` | Grammarly | Grammarly | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 10 | `canva-pro-starter-shared` | Canva | Canva | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 11 | `microsoft-copilot-pro-starter-shared` | Microsoft | Microsoft | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 12 | `jasper-ai-starter-shared` | Jasper | Jasper | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 13 | `adobe-firefly-starter-shared` | Adobe | Adobe | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 14 | `descript-pro-starter-shared` | Descript | Descript | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |
| 15 | `synthesia-starter-shared` | Synthesia | Synthesia | Starter Shared | shared-access-unevidenced, vendor-sells-official-seats-verify-workspace-model |

---

## Tier B — NO official multi-seat plan known (17 records — ELEVATED RISK)
Individual-plan products being sold as "shared." Highest priority for provider-terms review.

| # | ID | Provider | Product Family | Official Plan | Risk Flags |
|---|-----|----------|---------------|---------------|------------|
| 16 | `perplexity-pro-shared` | Perplexity | Perplexity | Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 17 | `midjourney-std-shared` | Midjourney | Midjourney | Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 18 | `midjourney-std-premium-shared` | Midjourney | Midjourney | Premium Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 19 | `midjourney-pro-shared` | Midjourney | Midjourney | Pro Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 20 | `leonardo-ai-shared` | Leonardo AI | Leonardo AI | Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 21 | `capcut-pro-starter-shared` | ByteDance | CapCut | Starter Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk**, conflicts-with-recorded-ceo-decision, officialUSD-mismatch |
| 22 | `heygen-creator-shared` | HeyGen | HeyGen | Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 23 | `udio-pro-shared` | Udio | Udio | Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 24 | `v0-dev-shared` | Vercel | v0.dev | Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 25 | `writesonic-shared` | Writesonic | Writesonic | Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 26 | `quillbot-premium-starter-shared` | QuillBot | QuillBot | Starter Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 27 | `pika-labs-starter-shared` | Pika | Pika | Starter Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 28 | `opus-clip-starter-shared` | Opus | Opus | Starter Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 29 | `murf-ai-starter-shared` | Murf | Murf | Starter Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 30 | `freepik-premium-shared` | Freepik | Freepik | Premium Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 31 | `kling-ai-starter-shared` | Kling AI | Kling AI | Starter Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |
| 32 | `windsurf-pro-shared` | Codeium | Windsurf | Pro Shared | shared-access-unevidenced, **no-official-multiseat-plan-known-elevated-risk** |

---

## Separate P0 — outside the catalog governance layer

`client/src/pages/AIToolsVault.tsx` (Vault bundle) — quarantined in `shared/bundle-prices.js`. Not in commercial-governance.json. Hardcoded price withdrawn. ProductSchema removed. All claims suspended.

---

## Status summary

| Tier | Count | Status |
|------|-------|--------|
| Tier A (multi-seat vendors) | 15 | Quarantined, pending workspace-seat verification |
| Tier B (no multi-seat known) | 17 | Quarantined, elevated risk, priority for provider-ToS review |
| Vault bundle | 1 | Quarantined in separate mechanism |
| **Total shared** | **32 (+1)** | **All non-purchasable at fixed prices** |

---

**Generated:** 2026-08-02
**Source:** data/commercial-governance.json (live governance overlay)
**Verified by:** node scripts/validate-commercial.mjs (0 hard failures)
