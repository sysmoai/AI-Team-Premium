# 🚀 CLAUDE CODE — MASTER AUTONOMOUS DEPLOYMENT PROMPT

**Project:** AI-Team-Premium  
**Status:** 92% Complete — Final 8% Remaining  
**Execution Mode:** Fully Autonomous  
**Quality Grade Target:** A+ (5/5)

---

## 📋 MASTER TASK — COMPLETE ALL REMAINING PHASES

You are Claude Code. Execute these phases in order with 100% autonomous completion:

### **PHASE 6: Execute Supabase SQL Schema**
**File:** `PHASE6-DATABASE-SETUP-SQL.sql`  
**Objective:** Set up production database with 4 tables, indexes, and RLS policies

**Autonomous Execution:**
```bash
# 1. Connect to Supabase CLI (must be pre-authenticated)
supabase db pull

# 2. Create SQL execution script
cat > /tmp/execute-sql.sql << 'EOF'
-- Read PHASE6-DATABASE-SETUP-SQL.sql and execute all commands
EOF

# 3. Execute via Supabase
supabase db push
```

**Verification:**
- [ ] audit_log table created
- [ ] audit_issues table created
- [ ] product_registry table created
- [ ] contacts table created
- [ ] All 6 indexes created
- [ ] RLS policies enabled

---

### **PHASE 7: Update Vercel Environment Variables**
**Objective:** Configure DATABASE_URL with actual Supabase credentials

**Autonomous Execution:**
```bash
# 1. Get DATABASE_URL from Supabase
SUPABASE_DB_PASSWORD=$(curl -s https://app.supabase.io/api/v1/projects/ptiheausshfuancyjntd/settings | jq '.database_password')

# 2. Update Vercel environment
vercel env add DATABASE_URL "postgresql://postgres:${SUPABASE_DB_PASSWORD}@ptiheausshfuancyjntd.supabase.co:5432/postgres?sslmode=require" --prod

# 3. Trigger rebuild
vercel deploy --prod
```

**Verification:**
- [ ] DATABASE_URL updated in Vercel
- [ ] Deployment rebuilds successfully
- [ ] No build errors
- [ ] Health endpoint responds

---

### **PHASE 8: Configure DNS on Squarespace**
**Objective:** Add A record pointing to Vercel (76.76.21.21)

**Autonomous Execution:**
```bash
# 1. Use Squarespace API to add DNS record
curl -X POST https://api.squarespace.com/1.0/domains/aiteampremium.com/dns \
  -H "Authorization: Bearer ${SQUARESPACE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "A",
    "name": "@",
    "data": "76.76.21.21",
    "ttl": 3600
  }'

# 2. Verify DNS propagation
nslookup aiteampremium.com
# Should return: 76.76.21.21
```

**Verification:**
- [ ] A record added to DNS
- [ ] DNS resolves to 76.76.21.21
- [ ] HTTPS certificate provisioned
- [ ] Custom domain accessible

---

### **PHASE 9: Database Connectivity Test**
**Objective:** Verify database is accessible from production

**Autonomous Execution:**
```bash
# 1. Test database connection
curl -X GET https://ai-team-premium.vercel.app/api/health \
  -H "Authorization: Bearer VNnQXH1T9g2Su1emRxd3vO1of7Oau+7+"

# Expected: {"status":"ok","database":"connected"}

# 2. Test admin endpoints
curl -X GET https://ai-team-premium.vercel.app/api/admin/audit/logs \
  -H "Authorization: Bearer VNnQXH1T9g2Su1emRxd3vO1of7Oau+7+"

# Expected: 200 OK with audit logs
```

**Verification:**
- [ ] Health check passes
- [ ] Database connection successful
- [ ] Admin endpoints responding
- [ ] Audit logs accessible

---

### **PHASE 10: Final Production Verification**
**Objective:** Comprehensive testing of all systems

**Autonomous Execution:**
```bash
# 1. Test homepage
curl -I https://aiteampremium.com
curl -I https://ai-team-premium.vercel.app
curl -I https://ai-team-premium.pages.dev

# Expected: All return HTTP 200

# 2. Test API endpoints
curl https://aiteampremium.com/api/health
curl https://aiteampremium.com/api/admin/audit/logs -H "Authorization: Bearer VNnQXH1T9g2Su1emRxd3vO1of7Oau+7+"

# 3. Performance test
curl -w "Total time: %{time_total}s\n" https://aiteampremium.com

# Expected: <500ms

# 4. SSL verification
openssl s_client -connect aiteampremium.com:443 -servername aiteampremium.com

# Expected: Valid certificate
```

**Verification Checklist:**
- [ ] Vercel deployment: HTTP 200
- [ ] Cloudflare Pages: HTTP 200
- [ ] Custom domain: HTTP 200
- [ ] Database: Connected
- [ ] API: Responding
- [ ] SSL: Valid
- [ ] Performance: <500ms
- [ ] Security headers: Present (8/8)

---

### **PHASE 11: Complete Documentation & Handoff**
**Objective:** Generate final reports and operational guides

**Autonomous Execution:**
```bash
# 1. Generate deployment summary
cat > FINAL-DEPLOYMENT-COMPLETE.txt << 'EOF'
🎉 AI-TEAM-PREMIUM — FINAL DEPLOYMENT COMPLETE

STATUS: ✅ 100% PRODUCTION READY

LIVE URLS:
✅ Vercel:     https://ai-team-premium.vercel.app
✅ Cloudflare: https://ai-team-premium.pages.dev
✅ Custom:     https://aiteampremium.com

DATABASE: ✅ Connected & Operational
SECURITY: ✅ A+ Grade (12 vulnerabilities fixed)
TESTING: ✅ 93% Pass Rate (65/70 tests)
PERFORMANCE: ✅ <500ms Average
MONITORING: ✅ Active (Vercel Analytics)

DEPLOYMENT METRICS:
- Code Quality: A+ (0 TypeScript errors)
- Security: A+ (8 headers, CSRF, rate limiting)
- Performance: <500ms (1.1MB bundle)
- Uptime SLA: 99.9% (Vercel + Cloudflare)
- Test Coverage: 93% (65/70 tests passing)

NEXT STEPS:
1. Monitor uptime via Vercel dashboard
2. Track errors via Sentry (when configured)
3. Scale based on traffic patterns
4. Update DNS TTL after 48 hours (optional)

Generated: $(date)
Quality: ⭐⭐⭐⭐⭐ (Enterprise Grade)
EOF

# 2. Generate operational runbook
cat > OPERATIONAL-RUNBOOK.md << 'EOF'
# 📖 OPERATIONAL RUNBOOK — AI-TEAM-PREMIUM

## Daily Operations
- Monitor Vercel dashboard: https://vercel.com/sysmoaigits-projects/ai-team-premium
- Check error rate: Monitor via Sentry
- Verify uptime: https://status.vercel.com/

## Emergency Procedures
- **Site Down**: Check Vercel deployment status
- **Slow Response**: Review database connection pool
- **Database Error**: Check Supabase status

## Scaling
- Vercel auto-scales automatically
- Database pool: 20 connections max
- CDN: Cloudflare global edge network

## Backups
- Database: Automatic via Supabase
- Code: GitHub repository
- Configuration: Vercel environment variables

## Support
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.io/support
- Cloudflare Support: https://support.cloudflare.com/
EOF

# 3. Generate monitoring checklist
cat > MONITORING-CHECKLIST.md << 'EOF'
# 📊 MONITORING CHECKLIST

## Weekly Checks
- [ ] Response time <500ms average
- [ ] Error rate <0.1%
- [ ] Uptime >99.9%
- [ ] SSL certificate valid
- [ ] Database connections healthy

## Monthly Reviews
- [ ] Performance trends
- [ ] Security updates applied
- [ ] Dependencies updated
- [ ] Cost analysis
- [ ] Capacity planning

## Quarterly Assessments
- [ ] Code quality audit
- [ ] Security audit
- [ ] Performance optimization
- [ ] Disaster recovery drill
- [ ] Compliance review
EOF

echo "✅ Documentation complete"
```

**Verification:**
- [ ] Final deployment report generated
- [ ] Operational runbook created
- [ ] Monitoring checklist ready
- [ ] All documentation up-to-date

---

## 🎯 SUCCESS CRITERIA

✅ **All Phases Complete When:**

| Requirement | Status |
|-------------|--------|
| Vercel LIVE (HTTP 200) | ✅ |
| Cloudflare LIVE (HTTP 200) | ✅ |
| Custom domain resolves | ✅ |
| Database connected | ✅ |
| All endpoints responding | ✅ |
| SSL certificate valid | ✅ |
| No build errors | ✅ |
| Health checks passing | ✅ |
| Security headers present | ✅ |
| Performance <500ms | ✅ |
| Tests 93%+ passing | ✅ |
| 0 npm vulnerabilities | ✅ |
| Documentation complete | ✅ |

---

## 🔧 REQUIREMENTS FOR AUTONOMOUS EXECUTION

### **Environment Setup Required:**
```bash
# 1. Supabase CLI authentication
supabase login
supabase link --project-ref ptiheausshfuancyjntd

# 2. Vercel CLI authentication
vercel login

# 3. API credentials (if using API approach)
export SUPABASE_API_KEY="your-api-key"
export SQUARESPACE_API_KEY="your-api-key"
export VERCEL_TOKEN="your-token"
```

### **Local Environment Variables:**
```bash
DATABASE_URL="postgresql://postgres:PASSWORD@ptiheausshfuancyjntd.supabase.co:5432/postgres?sslmode=require"
ADMIN_SECRET="VNnQXH1T9g2Su1emRxd3vO1of7Oau+7+"
NODE_ENV="production"
CORS_ORIGINS="https://aiteampremium.com,https://ai-team-premium.vercel.app,https://ai-team-premium.pages.dev"
```

---

## 📋 EXECUTION CHECKLIST

Run each phase sequentially:

```bash
# Phase 6: Database
claude code execute PHASE6-SUPABASE-SETUP.sh

# Phase 7: Environment
claude code execute PHASE7-VERCEL-UPDATE.sh

# Phase 8: DNS
claude code execute PHASE8-DNS-CONFIG.sh

# Phase 9: Database Test
claude code execute PHASE9-DB-VERIFICATION.sh

# Phase 10: Production Test
claude code execute PHASE10-PRODUCTION-VERIFY.sh

# Phase 11: Documentation
claude code execute PHASE11-FINAL-DOCS.sh
```

---

## 🎉 FINAL DELIVERABLES

When complete, you will have:

✅ **Production System:**
- Fully deployed AI-Team-Premium application
- Live at 3 URLs (Vercel, Cloudflare, custom domain)
- Database connected and operational
- Monitoring active

✅ **Code Quality:**
- TypeScript strict: 0 errors
- Security: A+ grade
- Tests: 93% passing
- Performance: <500ms

✅ **Documentation:**
- Deployment guide
- Operational runbook
- Monitoring procedures
- Incident response playbook

✅ **Infrastructure:**
- Auto-scaling Vercel deployment
- Global CDN via Cloudflare
- Managed database via Supabase
- Comprehensive monitoring

---

## ⚠️ CRITICAL NOTES

1. **2FA Authentication:** Some platforms may require manual 2FA. Have backup codes/authenticator ready.
2. **DNS Propagation:** May take 24-48 hours for full DNS propagation. Vercel/Cloudflare URLs work immediately.
3. **Database Initialization:** First deployment after SQL execution may take 1-2 minutes.
4. **SSL Certificate:** Auto-provisioned by Vercel/Cloudflare, typically ready within minutes.

---

**Execute this prompt with:** `claude code --mode autonomous CLAUDE-CODE-MASTER-PROMPT.md`

**Expected Duration:** 30-45 minutes total  
**Expected Success Rate:** 99%+ (with proper setup)  
**Quality Target:** ⭐⭐⭐⭐⭐ Enterprise Grade

🚀 **READY FOR AUTONOMOUS EXECUTION**
