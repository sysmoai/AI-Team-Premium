# AI Team Premium BD — Blockers & External Dependencies

## Resolved
- ✅ Cloud Run deployment — service is live (revision 00008-xwl)
- ✅ Database migration — all tables created
- ✅ TypeScript errors — all fixed (npm run check passes)
- ✅ Build passes — verified (npm run build passes)
- ✅ All 50 routes return HTTP 200
- ✅ All static assets serve correctly
- ✅ Health endpoint responding
- ✅ "Official" language removed from product pages
- ✅ Pricing inconsistencies fixed
- ✅ WhatsApp CTAs use prefilled messages (48/48)
- ✅ Audit script passes 55/55
- ✅ SEO assets created (apple-touch-icon.png, manifest.json)
- ✅ External image dependency removed (hero-bg.jpg local)

## Active Blocker — Category B: Missing Deployment Credential

### GitHub Push Permissions
- **Classification:** B (Missing deployment credential)
- **Issue:** `sysmoaigit` account cannot push to `github.com/sysmoai/AITeamPremiumBD`
- **Error:** `remote: Permission to sysmoai/AITeamPremiumBD.git denied to sysmoaigit. fatal: unable to access 'https://github.com/sysmoai/AITeamPremiumBD.git/': The requested URL returned error: 403`
- **SSH also failed:** `git@github.com: Permission denied (publickey).`
- **Impact:**
  - 10 local commits on `main` cannot be pushed to GitHub
  - `.github/workflows/deploy.yml` not active (code exists but not in remote)
  - CI/CD pipeline cannot trigger
  - Team cannot see changes in the repository
- **Commits ready to push:**
  - `8d47ecd` — feat: production harden AI Team Premium BD website
  - `94d327e` — feat: add audit script, download hero image locally, fix legal page WhatsApp links
  - `eb0b037` — fix: soften superlative claims on Home and RefundPolicy
  - `35cc95d` — fix: remove remaining 'official' language, fix pricing inconsistencies, clean unused imports
  - `f5bd740` — fix: remove incorrect 'unlimited usage' claims from ChatGPT Pro
  - `1d3ff97` — docs: update WORKLOG, QA_CHECKLIST, DEPLOYMENT, BLOCKERS
  - `14a855a` — fix: remove misleading 'official' language, fix WhatsApp CTAs, add SEO assets
  - `dec3ece` — kimi-desktop: fix Pricing.tsx TS build error + add delivery times + redeploy
  - (plus 2 earlier commits)
- **Exact credential/action needed:**
  1. Go to https://github.com/sysmoai/AITeamPremiumBD/settings/access
  2. Add `sysmoaigit` as a collaborator with **Write** (or **Admin**) role
  3. OR push manually from the repo owner's account: `git push https://github.com/sysmoai/AITeamPremiumBD.git main`
- **Workaround used:** Direct Cloud Run deployment via `gcloud builds submit` + `gcloud run deploy` bypasses GitHub entirely. Site is live and functional without GitHub push.

## Non-Blockers (Observations)
- Mobile breakpoint verification requires browser/Playwright (external tool limitation)
- Lighthouse performance audit requires browser (external tool limitation)
- Bundle chunk size warning from Vite (~918KB / 242KB gzipped) — non-blocking
