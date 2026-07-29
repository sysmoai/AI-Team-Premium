# 🚀 CI/CD PIPELINE SETUP GUIDE

**Status:** ✅ Production Ready  
**Last Updated:** 2026-07-30  
**Domain:** aiteampremium.com → www.aiteampremium.com

---

## QUICK START

This CI/CD pipeline enables **INSTANT AUTOMATIC DEPLOYMENT** every time you push to the `main` branch.

### 1️⃣ What Happens When You Push

```
You commit → Push to main
    ↓
CI Tests Run (build, lint, E2E tests, security scan)
    ↓
If Tests Pass → Deploy to Vercel
    ↓
If Deploy Success → Website Live at www.aiteampremium.com
    ↓
Health Checks Verify Everything Works
```

---

## REQUIRED SETUP (One-Time)

### Step 1: Add Vercel Secrets to GitHub

Go to: **GitHub → Settings → Secrets and variables → Actions**

Add these three secrets:

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `VERCEL_TOKEN` | Your Vercel API token | [Vercel Settings > Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Your Vercel Organization ID | [Vercel Settings > General](https://vercel.com/account/general) |
| `VERCEL_PROJECT_ID` | AI-Team-Premium project ID | [Vercel Dashboard > Project Settings](https://vercel.com/sysmoaigits-projects/ai-team-premium) |

**How to get VERCEL_TOKEN:**
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name: `github-actions`
4. Copy the token
5. Paste into GitHub Secrets

**How to get VERCEL_ORG_ID:**
1. Go to [vercel.com/account/general](https://vercel.com/account/general)
2. Look for "Team ID"
3. Copy it

**How to get VERCEL_PROJECT_ID:**
1. Go to your project: [Vercel Dashboard](https://vercel.com/sysmoaigits-projects/ai-team-premium)
2. Click "Settings"
3. Look for "Project ID"
4. Copy it

### Step 2: Verify GitHub Actions is Enabled

1. Go to: **GitHub → Settings → Actions → General**
2. Make sure "Allow all actions and reusable workflows" is selected
3. Click "Save"

### Step 3: Verify Workflow Files Exist

```bash
# Check that all workflows are in place
ls -la .github/workflows/

# Expected files:
# ci.yml                 (Build, test, lint, security scan)
# vercel-deploy.yml      (Deploy to Vercel)
# monitor.yml            (Health checks every 5 min)
# rollback.yml           (Manual rollback if needed)
```

---

## WORKFLOWS EXPLAINED

### 📋 CI Workflow (`ci.yml`)

**Triggered:** Every push to `main` or `develop`

**What it does:**
1. ✅ TypeScript type checking
2. ✅ Build verification (Vite)
3. ✅ Lint code style
4. ✅ Run E2E tests (Playwright)
5. ✅ Security scan (dependency audit + secret detection)

**If all pass:** Deployment workflow starts

**If any fail:** Deployment is BLOCKED

### 🚀 Deploy Workflow (`vercel-deploy.yml`)

**Triggered:** After CI passes on `main` branch

**What it does:**
1. 🏗️ Build the project
2. 📤 Deploy to Vercel production
3. ✅ Verify deployment is live
4. ✅ Verify www.aiteampremium.com is accessible
5. 🏥 Run health checks
6. 📊 Report performance metrics

**Result:** Website instantly live at https://www.aiteampremium.com

### 📊 Monitor Workflow (`monitor.yml`)

**Triggered:** Every 5 minutes (automatic)

**What it checks:**
- ✅ Homepage responds (HTTP 200)
- ✅ All products present in content
- ✅ WhatsApp integration working
- ✅ Pricing section present
- ✅ Response time (<5s)
- ✅ Security headers present
- ✅ SSL/TLS certificate valid
- ✅ CDN caching working
- ✅ DNS resolving correctly

### 🔄 Rollback Workflow (`rollback.yml`)

**Triggered:** Manual (workflow_dispatch)

**When to use:**
- Critical bug found in production
- Performance degradation detected
- Security issue discovered
- Database migration failure

**How to use:**
1. Go to: **GitHub → Actions → "Rollback Deployment"**
2. Click "Run workflow"
3. Select deployment ID to rollback to
4. Select reason
5. Click "Run workflow"

---

## DEPLOYMENT VERIFICATION

After each deployment, verify:

### ✅ Manual Verification

```bash
# Check website is live
curl -I https://www.aiteampremium.com

# Expected:
# HTTP/2 200
# Content-Length: 1100000+ (should be large)
# Server: Vercel

# Check products are present
curl https://www.aiteampremium.com | grep "ChatGPT\|Claude"

# Check WhatsApp integration
curl https://www.aiteampremium.com | grep "8801"
```

### ✅ Automatic Verification

All checks run automatically after deployment:
1. ✅ Health checks (10 attempts, every 3 seconds)
2. ✅ Content verification (products, pricing, integration)
3. ✅ Performance metrics
4. ✅ Security validation

### ✅ GitHub Actions View

Watch deployment live:
1. Go to: **GitHub → Actions**
2. Click latest workflow run
3. See real-time logs
4. Check each step status

---

## TROUBLESHOOTING

### Issue: CI fails - Build broken

**Solution:**
1. Check the failed step in GitHub Actions
2. Read the error message
3. Fix the code locally
4. Test with `npm run build`
5. Commit and push again

### Issue: Deployment fails - Deploy step errors

**Solution:**
1. Check Vercel secrets are correct
2. Verify VERCEL_TOKEN is valid (not expired)
3. Verify VERCEL_PROJECT_ID matches actual project
4. Check project settings in Vercel dashboard

### Issue: Website not updating after deployment

**Solution:**
1. Check DNS is pointing to Vercel
2. Wait 60-90 seconds for CDN propagation
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private window
5. Check workflow completed successfully in GitHub Actions

### Issue: Health check fails - 404 errors

**Solution:**
1. Website might still be deploying (takes 30-60s)
2. Check if DNS is properly configured
3. Verify A record points to Vercel (76.76.19.165)
4. Verify CNAME record is cname.vercel.sh

### Issue: Manual rollback didn't work

**Solution:**
1. Rollback only changes GitHub (deployment choice)
2. Still need to point domain to old Vercel deployment
3. Use Vercel dashboard to manage active deployment:
   - Go to [Vercel Dashboard](https://vercel.com/sysmoaigits-projects/ai-team-premium)
   - Click "Deployments"
   - Find the deployment you want
   - Click "Promote to Production"

---

## MONITORING DASHBOARD

View real-time status:

### GitHub Actions
**Status:** https://github.com/SYSmoAI/AI-Team-Premium/actions

Shows:
- ✅ Latest CI/CD runs
- 🟢 Pass/fail status
- ⏱️ Execution time
- 📊 Build logs

### Vercel Dashboard
**Status:** https://vercel.com/sysmoaigits-projects/ai-team-premium

Shows:
- 🚀 Active deployments
- 📈 Performance metrics
- 🔗 Domain status
- 📊 Analytics

### Monitor Logs
**Automatic:** Every 5 minutes via `monitor.yml` workflow

**Manual:** GitHub Actions → "Monitor Production Health" workflow

---

## ENVIRONMENT VARIABLES

### Build-time Variables

Set in Vercel Project Settings:

```env
NODE_ENV=production
VITE_API_URL=https://www.aiteampremium.com/api
VITE_WA_PHONE=8801533262758
```

### Runtime Variables

Already configured in code:
- WhatsApp phone: +8801533262758
- Website domain: aiteampremium.com (apex) / www.aiteampremium.com (primary)

---

## DEPLOYMENT LOG EXAMPLE

When you push to main, you'll see this flow in GitHub Actions:

```
✅ Checkout code (2s)
✅ Setup Node.js (1s)
✅ Install dependencies (8s)
✅ TypeScript check (2s)
✅ Build verification (3s)
✅ Lint code (2s)
✅ Run E2E tests (25s)
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All CI checks passed - Ready for deployment
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Deploy to Vercel (15s)
✅ Verify Vercel deployment (30s)
✅ Verify www.aiteampremium.com (20s)
✅ Performance check (2s)
✅ Health check (5s)
━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 DEPLOYMENT SUCCESSFUL
✅ Website: https://www.aiteampremium.com
✅ Domain: aiteampremium.com (active)
✅ Server: Vercel Production
✅ Deployed by: github-actions
✅ Time: 2026-07-30 21:45 UTC
━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## BEST PRACTICES

### ✅ DO:
- Commit often, push frequently
- Write meaningful commit messages
- Test locally before pushing (`npm run build`)
- Monitor GitHub Actions for deployment status
- Review health checks after deployment

### ❌ DON'T:
- Push directly to production without testing
- Skip the CI checks (they protect you)
- Delete workflow files
- Change secrets without authorization
- Merge PRs without passing tests

---

## NEXT STEPS

1. ✅ Add the three Vercel secrets to GitHub
2. ✅ Enable GitHub Actions
3. ✅ Push a commit to main
4. ✅ Watch deployment in GitHub Actions
5. ✅ Verify website is live at www.aiteampremium.com

---

## CONTINUOUS DEVELOPMENT WORKFLOW

Once CI/CD is set up:

```
1. Make code changes locally
2. Test locally: npm run build && npm run test
3. Commit: git commit -m "your message"
4. Push: git push origin main
5. GitHub Actions runs automatically
6. Website updates instantly (if all tests pass)
7. You get notifications of success/failure
```

**Result:** Zero-manual-effort deployments. Every commit = Live website update.

---

## SUPPORT

For issues:
1. Check GitHub Actions logs
2. Check Vercel dashboard
3. Check domain DNS configuration
4. Verify all secrets are set correctly

---

**Status:** 🟢 READY FOR PRODUCTION  
**Next Review:** 2026-08-06
