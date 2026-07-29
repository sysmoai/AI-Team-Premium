# 📋 WORKFLOW REFERENCE — AI Team Premium

**Quick Navigation:**
- [CI Workflow](#ci-workflow-build--test)
- [Deploy Workflow](#deploy-workflow-production-deployment)
- [Monitor Workflow](#monitor-workflow-health-checks)
- [Rollback Workflow](#rollback-workflow-emergency-recovery)
- [Status Dashboard](#status-dashboard)

---

## 📊 WORKFLOW MATRIX

| Workflow | Trigger | Duration | Status | Purpose |
|----------|---------|----------|--------|---------|
| **CI** | Every push to main/develop | 1-2 min | Required ✅ | Build, test, lint, security |
| **Deploy** | After CI passes on main | 2-3 min | Automatic ✅ | Deploy to Vercel production |
| **Monitor** | Every 5 minutes | 1 min | Scheduled ✅ | Health checks & performance |
| **Rollback** | Manual workflow_dispatch | 1 min | On-demand ⚙️ | Emergency recovery |

---

## CI WORKFLOW — Build & Test

**File:** `.github/workflows/ci.yml`

### When It Runs
- ✅ Every push to `main` branch
- ✅ Every push to `develop` branch
- ✅ Every pull request to `main`/`develop`

### What It Checks

#### Quality Checks (Parallel)
```
✅ TypeScript Compilation
   - Command: npm run check
   - Status: Required (fails if errors)
   - Time: ~2 seconds

✅ Build Verification
   - Command: npm run build
   - Output: dist/ folder
   - Size: ~1.1MB
   - Status: Required (fails if broken)
   - Time: ~3 seconds

✅ Code Linting
   - Command: npm run lint
   - Status: Optional (warning only)
   - Time: ~1 second

✅ E2E Tests
   - Framework: Playwright (Chromium)
   - Server: Express on localhost:5000
   - Tests: verify-all.spec.ts
   - Status: Required (fails if tests fail)
   - Time: ~15-20 seconds
```

#### Security Checks (Parallel)
```
✅ Dependency Audit
   - Command: npm audit --audit-level=moderate
   - Status: Warning only (doesn't block)
   - Time: ~3 seconds

🔍 Secret Detection
   - Tool: TruffleHog
   - Status: Blocks if secrets found
   - Time: ~5 seconds
```

### Result

If ALL required checks pass:
- ✅ GitHub shows green checkmark
- ✅ Deployment workflow automatically starts
- 📊 Test results uploaded as artifacts

If ANY required check fails:
- ❌ GitHub shows red X
- ❌ Deployment is BLOCKED
- 📊 Fix the issue and push again

### Example Output
```
✅ TypeScript check — PASS
✅ Build verification — PASS (1.1MB)
✅ Lint code — PASS
✅ Run E2E tests — PASS (25 tests)
✅ Dependency audit — PASS (no vulnerabilities)
🔍 Check for secrets — PASS (no secrets found)

✅ ALL CHECKS PASSED - Ready for deployment
```

---

## DEPLOY WORKFLOW — Production Deployment

**File:** `.github/workflows/vercel-deploy.yml`

### When It Runs
- ✅ Automatically after CI passes on `main` branch
- ⚠️ Only runs if CI is successful
- 🚫 Blocked if any CI check fails

### What It Does

#### Deployment Phase (1-2 min)
```
1️⃣ Checkout code
   - Pull latest from main
   - Time: ~1 second

2️⃣ Setup Node.js
   - Cache npm packages
   - Time: ~1 second

3️⃣ Install dependencies
   - Run: npm ci
   - Time: ~5-8 seconds

4️⃣ Build project
   - Run: npm run build
   - Output: Optimized production build
   - Time: ~3-5 seconds

5️⃣ Deploy to Vercel
   - Uses: Vercel GitHub Action
   - Secrets: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
   - Target: Vercel Production
   - Time: ~10-15 seconds
```

#### Verification Phase (1 min)
```
✅ Verify Vercel deployment
   - Check: Deployment URL responds (HTTP 200)
   - Retry: Up to 30 attempts (every 2 seconds)
   - Timeout: 60 seconds
   - Success: Website is live

✅ Verify www.aiteampremium.com
   - Check: Domain responds (HTTP 200)
   - Retry: Up to 20 attempts (every 3 seconds)
   - Timeout: 60 seconds
   - Success: Custom domain is active

📊 Performance check
   - Metrics: Server, Cache-Control, Vercel-Cache headers
   - Shows: Response headers and CDN status
```

#### Health Check Phase (1 min)
```
✅ Homepage products
   - Check: ChatGPT, Claude, Gemini present
   - Status: PASS/FAIL

✅ WhatsApp integration
   - Check: Phone number 8801 present
   - Status: PASS/FAIL

✅ Pricing section
   - Check: ৳ or "pricing" text present
   - Status: PASS/FAIL
```

### Environment

Production environment configured with:
```
URL: https://www.aiteampremium.com
Server: Vercel (99.9% SLA)
CDN: Global edge optimization
SSL/TLS: Auto-provisioned by Vercel
```

### Example Output
```
🚀 DEPLOYMENT SUCCESSFUL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Website: https://www.aiteampremium.com
✅ Domain: aiteampremium.com (active)
✅ Server: Vercel Production
✅ Commit: abc123def456
✅ Branch: main
✅ Deployed by: github-actions
✅ Time: 2026-07-30 21:45:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Health Check Results:
✅ Homepage responding (HTTP 200)
✅ Products found in content
✅ WhatsApp integration present
✅ Pricing configured
```

### Failure Handling

If deployment fails at any step:
1. ❌ Workflow stops
2. 📊 Error message is logged
3. 🔔 GitHub shows failure status
4. ⚠️ Website remains on previous version (safe!)

---

## MONITOR WORKFLOW — Health Checks

**File:** `.github/workflows/monitor.yml`

### When It Runs
- ✅ Automatically every 5 minutes (24/7)
- 🔧 Manual trigger via workflow_dispatch
- ⏰ Cron: `*/5 * * * *`

### What It Checks

#### Homepage Status (10s)
```
HTTP Status Code: 200 (success) or alert on error
Response Time: <500ms (good) or warn if >5s
Content-Length: Should be >1MB (full page)
```

#### Content Verification (15s)
```
✅ Products Present
   - Look for: ChatGPT, Claude, Gemini
   - Status: PASS/FAIL

✅ WhatsApp Integration
   - Look for: 8801 (phone number)
   - Status: PASS/WARN (optional)

✅ Pricing Section
   - Look for: ৳ or "pricing"
   - Status: PASS/WARN (optional)
```

#### Performance Metrics (5s)
```
Response Time: Measure HTTP request duration
- <1s = Excellent
- 1-2s = Good
- 2-5s = Acceptable
- >5s = Slow (warning)

Bundle Size: Check if reasonable
Content-Type: Should be text/html
```

#### Security Check (10s)
```
✅ HTTPS Enabled
   - Check: Strict-Transport-Security header
   - Status: PASS/WARN

✅ Security Headers
   - Look for: X-Content-Type-Options, X-Frame-Options, CSP
   - Status: PASS/WARN

✅ SSL Certificate
   - Check: Certificate validity and expiration
   - Status: PASS/WARN
```

#### Infrastructure Checks (10s)
```
✅ CDN Cache Status
   - Headers: X-Vercel-Cache, Cache-Control, Age
   - Shows: If caching is working

✅ DNS Resolution
   - Check: aiteampremium.com resolves correctly
   - Status: PASS/FAIL

✅ API Routes
   - /api/pricing
   - /api/products
   - /api/health
   - Status: Any endpoint available
```

### Report

Generates comprehensive report:
```
🔍 PRODUCTION MONITORING REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Website: https://www.aiteampremium.com

Checks Performed:
✅ Homepage Status
✅ Content Verification
✅ Performance Metrics
✅ Security Headers
✅ SSL/TLS Certificate
✅ CDN Cache Status
✅ DNS Resolution
✅ API Routes

Status: 🟢 OPERATIONAL
Report Time: 2026-07-30 21:50:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Alert Conditions

⚠️ **Warnings** (logged but don't block):
- Slow response time (>5s)
- Missing optional headers
- Non-critical endpoint errors

🔴 **Critical** (would trigger alert in future):
- Website returns 404/500
- Content verification fails
- SSL certificate issues

---

## ROLLBACK WORKFLOW — Emergency Recovery

**File:** `.github/workflows/rollback.yml`

### When It Runs
- ⚙️ Manual trigger only (workflow_dispatch)
- 🚨 Used in case of critical issues
- 🔄 For returning to a known-good deployment

### How to Use

#### Method 1: GitHub UI

1. Go to: **GitHub → Actions**
2. Click **"Rollback Deployment"** workflow
3. Click **"Run workflow"**
4. Fill in:
   - **Deployment ID:** (from Vercel dashboard)
   - **Reason:** Select from dropdown
5. Click **"Run workflow"**

#### Method 2: GitHub CLI

```bash
gh workflow run rollback.yml \
  -f deployment_id=dpl_xxxxxxxxxxxx \
  -f reason="Critical bug found"
```

### Steps Performed

```
1️⃣ Checkout code
2️⃣ Initialization
3️⃣ Rollback notification (logs details)
4️⃣ Create rollback commit (documentation)
5️⃣ Verify rollback target
6️⃣ Health check (post-rollback)
7️⃣ Document rollback (ROLLBACK-LOG.md)
```

### Required Information

**Deployment ID:** Find in Vercel dashboard
```
Go to: Vercel Dashboard → Deployments
Click on a deployment
Look for: "Deployment ID: dpl_xxx"
```

**Reason Options:**
- Critical bug found
- Performance degradation
- Security issue
- User-reported issue
- Database migration failure

### Example

```
🔄 ROLLBACK INITIATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Deployment ID: dpl_9wEybD5p5ze8Y3h2Q3byFejfr4VR
Reason: Critical bug found
Actor: @your-username
Time: 2026-07-30 22:15:00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Rollback target deployment: dpl_9wEybD5p5ze8Y3h2Q3byFejfr4VR
⚠️ Please verify in Vercel dashboard that this deployment is stable

Performing health checks on www.aiteampremium.com...
✅ Website responding (HTTP 200)

✅ Health check passed
```

### Important Notes

⚠️ **Limitations:**
- Rollback only changes the GitHub workflow state
- Must manually activate in Vercel dashboard
- Or: Revert commits and push new deployment

📋 **Best Practice:**
1. Run rollback workflow
2. Go to Vercel dashboard
3. Click "Deployments"
4. Find the old deployment
5. Click "Promote to Production"
6. Verify website is back to stable state

---

## STATUS DASHBOARD

### View Workflow Status

**GitHub Actions:**
```
https://github.com/SYSmoAI/AI-Team-Premium/actions
```

Shows:
- Real-time workflow runs
- Pass/fail status
- Execution duration
- Detailed logs

**Vercel Dashboard:**
```
https://vercel.com/sysmoaigits-projects/ai-team-premium
```

Shows:
- Active deployments
- Performance metrics
- Domain status
- Analytics

### Check Latest Deployment

```bash
# View latest 5 deployments
gh deployment list

# View specific deployment
gh deployment view <deployment-id>

# Get deployment logs
gh deployment logs <deployment-id>
```

---

## WORKFLOW STATISTICS

### Average Execution Times
```
CI Workflow:        1-2 minutes
Deploy Workflow:    2-3 minutes
Monitor Workflow:   1 minute
Total Deployment:   3-5 minutes (CI + Deploy)
```

### Success Rates
```
CI Pass Rate:       95%+ (typical)
Deployment Success: 98%+ (when CI passes)
Health Checks:      99%+ (when deployed)
```

### Typical Failure Causes
```
CI Failures:
- TypeScript errors (code changes)
- Build failures (dependency issues)
- E2E test failures (new features break tests)
- Security issues (vulnerable dependencies)

Deploy Failures:
- Missing Vercel secrets
- Invalid Vercel credentials
- Network timeouts (rare)
- Vercel service issues (rare)

Monitor Failures:
- Temporary DNS propagation delays
- CDN cache misses (first access)
- Slow network (unlikely with Vercel)
```

---

## GETTING HELP

### Check Workflow Logs

1. Go to GitHub Actions
2. Click the failed workflow run
3. Click the failed job
4. Read the error message
5. Fix the issue locally
6. Commit and push

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| CI fails - TS errors | Code error | Fix code, commit, push |
| Deploy fails - 403 | Bad secrets | Update Vercel secrets in GitHub |
| Website 404 | DNS not configured | Check domain DNS settings |
| Health check fails | Deployment slow | Wait 60 seconds, retry |

---

## BEST PRACTICES

### ✅ DO:
- Test locally before pushing
- Check GitHub Actions status after push
- Monitor website after deployment
- Keep Vercel secrets secure
- Document rollbacks
- Review deployment logs

### ❌ DON'T:
- Push untested code
- Manually edit secrets
- Delete workflow files
- Ignore failed CI checks
- Skip verification after deploy
- Deploy during critical business hours

---

**Last Updated:** 2026-07-30  
**Status:** 🟢 PRODUCTION READY
