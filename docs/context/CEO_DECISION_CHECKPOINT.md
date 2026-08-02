# AITP — CEO DECISION CHECKPOINT · 2026-08-02
## Complete status + pending decisions for Notion sync

---

## 📊 PRODUCTION STATUS (resolved — no decision needed)

| Item | Status |
|------|--------|
| Site live at www.aiteampremium.com | ✅ Vercel, auto-deploy on push |
| Production commit | `444c241` on `main` |
| Active development branch | `feat/aitp-truth-reconciliation-20260802` |
| Catalog | 129 products, 72 brands |
| Sitemap URLs | 230 |
| Routes with SEO metadata | 77 |
| Blog posts | 50 (all with BlogPosting schema) |
| Service pages | 10 |
| Trust pages | 5 |
| npm run ship | 42/42 passing |
| GitHub Actions | ❌ Account-wide billing lock (all workflows fail) |

---

## 🔴 P0 — REQUIRES CEO DECISION

### 1. SHARED-ACCESS LEGITIMACY (32 records)
**Question:** Should we continue selling shared-access products without documented provider authorization?

**What this means:** 32 catalog records are `accessType: "shared"`. None carry any documented evidence that the provider's terms of service permit credential sharing or multi-user access on a single account.

**Risk tiers:**
- **Tier A (15 records):** Providers DO publish official multi-seat plans (ChatGPT, Claude, Grammarly, Canva, etc.). Legitimate path exists — we need to verify the workspace/seat model is properly implemented.
- **Tier B (17 records — ELEVATED RISK):** No official multi-seat plan known. These are individual-plan products being sold as "shared." Examples: Perplexity, Midjourney, Leonardo, CapCut, ElevenLabs.

**Current state:** All 32 are QUARANTINED — not purchasable at fixed prices, showing "Request Price" with neutral messaging.

**Your decision needed:**
- [ ] **Option A:** Keep all 32 quarantined until each is individually verified. Safe. Takes time.
- [ ] **Option B:** Release Tier A (workspace vendors) now, keep Tier B quarantined. Moderate risk — haven't verified actual implementation.
- [ ] **Option C:** Release all, note the risk. Not recommended — legal/ToS exposure.
- [ ] **Your own approach:** _________________

---

### 2. CapCut PRICING CONFLICT
**What happened:** CapCut is listed at ৳399 with `officialUSD: 7.99` but F27 (CEO decision from 2026-07-26) re-verified official Pro at $19.99 and approved pricing at ৳2,510+ annual / ৳3,350+ monthly.

**Question 1:** Which CapCut plan does `officialUSD: 7.99` actually represent?
**Question 2:** What should the correct BDT price be?

**Current state:** QUARANTINED. Not purchasable. Shows "Request current price."

**Your decision:**
- [ ] Official plan: _________________
- [ ] Approved BDT price: _________________
- [ ] Access model (shared/personal/etc): _________________

---

### 3. NOTION BUSINESS — PRICING + DISCOUNT CLAIM
**What happened:**
1. `notion-business-monthly` priced at ৳800 with "73% Off" badge
2. `notion-business-6m` priced at ৳4,800
3. Both are `accessType: "personal"` — no Team/Shared Notion tier in catalog
4. Formula check: pricing is ~73% below cost basis
5. "73% Off" badge is hardcoded string — no computation, no evidence

**Question 1:** What do these 2 Notion records actually represent? (Official named seat? Customer-owned? Annual plan resold short-term? Managed workspace?)

**Question 2:** Is there a legitimate cost basis that explains the pricing?

**Question 3:** Should "73% Off" claim exist — and if so, where's the evidence?

**Current state:** Both QUARANTINED. "73% Off" badge removed. Showing "Request Price."

**Your decision:**
- [ ] Actual product: _________________
- [ ] Legitimate cost basis: _________________
- [ ] Approved BDT price: _________________
- [ ] Discount claim: Keep / Remove / Replace with: _________________

---

### 4. PRODUCTION/NOTION DIVERGENCE
**What happened:** The Notion Audit Checkpoint describes a different reality than what's actually live:
- Notion says: Replit primary, Cloudflare mirror, 107 rows / 99 unique
- Reality: Vercel primary, 129 products, 230 sitemap URLs, 50 blog posts

**Question:** Do you acknowledge this divergence and accept the Vercel/GitHub reality as the current production architecture?

**Your decision:**
- [ ] **Accept:** Update Notion checkpoint to match measured reality
- [ ] **Investigate further:** Need more info before deciding
- [ ] **Reverse:** Want to go back to Replit/Cloudflare setup (needs plan)

---

### 5. OWNERSHIP/OPERATOR WORDING
**The conflict:** Two of YOUR OWN Notion documents contradict each other:
- **Canonical Brand OS** (touched 2026-08-02): "Legal operator and ownership wording: Pending written management decision"
- **Market/SEO Report** (2026-07-30): "AI Team Premium is an independent business operated by Refat Ara Rumi. Emon Hossain may be described only as technical/SEO/design/infrastructure support when authorised. Do not claim that Emon owns AITP, earns its revenue or controls its operations."

**Note from engineer:** Current codebase makes NO ownership claims anywhere. This is deliberate — we're waiting for your written decision.

**Your decision:**
Who is the legal operator/owner of AI Team Premium?
_________________

How should Emon Hossain be described publicly?
_________________

---

### 6. GITHUB ACTIONS BILLING LOCK
**Issue:** All GitHub Actions workflows on `sysmoai` account fail instantly — billing locked. Affects both AITP and sibling AIPS repos.

**Impact:** No CI/CD gating on PRs. Pre-push git hook is the only safety net (and it works — 42/42 on every commit).

**Your action needed:** Log in to GitHub → Billing → resolve. This is account-wide, not per-repo.

---

## 🟡 P1 — NICE TO CONFIRM

### 7. SERVICE PILLAR PAGES — STATUS
**DONE:** All 5 canonical service pillars now built and live:
- /services/ai-advisory — Strategy consulting
- /services/ai-setup-security — Account hardening (guide-based)
- /services/ai-training — Team workshops
- /services/ai-automation — Workflow integration
- /services/managed-ai-operations — Ongoing management

Also on /support page and footer. No further action needed.

### 8. AI TOOLS VAULT — QUARANTINE COMPLETE
**DONE:** Vault page fully cleaned:
- Price removed, replaced with "Request current price"
- 6-hour delivery claim withdrawn
- 30-day warranty claim withdrawn
- 24-hour replacement claim withdrawn
- ProductSchema removed
- FAQ updated with honest "we're verifying this" language

Ready for review. To reactivate: set `VAULT_QUARANTINE.quarantined = false` in `shared/bundle-prices.js` once access model is evidenced and price is approved.

### 9. BLOG CONTENT — COMPLETE
**DONE:** Expanded from 18 to 50 posts. All carry BlogPosting schema. Covers: buying guides, comparisons, career guides, how-to guides, industry guides, Bangla content. Sitemap at 230 URLs. Good foundation for 50K/month organic traffic target.

### 10. TRUST FOUNDATION — COMPLETE
**DONE:** 4 trust pages built:
- /pricing-how-it-works — Transparent pricing breakdown
- /non-affiliation — Third-party trademark disclosure
- /corrections — Error correction policy with live examples
- /incident-escalation — Support escalation process

All linked in footer and accessible from site.

---

## 📝 WHAT TO DO IN NOTION

1. **Review each P0 item above** (1-6)
2. **Write your decision** for each in Notion
3. **Update the Notion Audit Checkpoint** with current production reality:
   - Hosting: Vercel (not Replit)
   - Catalog: 129 products (not 107)
   - Blog: 50 posts
   - Sitemap: 230 URLs
   - Feature branch with 44 new pages built
4. **Resolve ownership wording** in both conflicting Notion documents
5. **Fix GitHub billing** on sysmoai account
6. **Return here** and say "Notion updated — continue"

---

## 🚀 WHAT HAPPENS NEXT (after your decisions)

1. CapCut price fixed to your approved number
2. Notion Business records classified and priced
3. Shared-access records processed per your chosen approach
4. Ownership language applied everywhere
5. PR #3 reviewed and merged to main
6. Production updated
7. Continue building: blog expansion, backlinks, organic traffic engine

---

**Generated:** 2026-08-02 | **Resume token:** AITP-WINDOWS-AUTONOMOUS-ENABLEMENT-V7-20260802-COMPLETE
**Repository:** C:\Users\emonh\SYSmoAI-Stack\apps\AI-Team-Premium
**Branch:** feat/aitp-truth-reconciliation-20260802
