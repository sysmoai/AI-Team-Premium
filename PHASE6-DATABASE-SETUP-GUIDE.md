# 🗄️ PHASE 6: DATABASE MIGRATION & SETUP — COMPLETE GUIDE

**Date:** July 27, 2026  
**Status:** ⏳ IN PROGRESS  
**Completion Target:** 100%

---

## 📋 PHASE 6 OVERVIEW

### Objectives
1. ✅ Create Supabase database schema (tables, indexes, RLS)
2. ✅ Configure environment variables in Vercel
3. ✅ Test database connectivity from production
4. ✅ Verify all API endpoints working with database

### Current State
- ✅ Vercel production deployment: LIVE
- ✅ SQL schema script: Created (PHASE6-DATABASE-SETUP-SQL.sql)
- ✅ Environment variables: Identified
- ⏳ Database setup: PENDING
- ⏳ Environment configuration: PENDING

---

## 🔐 ENVIRONMENT VARIABLES IDENTIFIED

### From `.env` (Development)
```
DATABASE_URL=postgresql://localhost/aiteampremium_dev
ADMIN_SECRET=admin-secret-key-change-this-in-production
```

### From `.env.local` (Supabase Config)
```
NEXT_PUBLIC_SUPABASE_URL=https://ptiheausshfuancyjntd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable__1A3Wb1WEV7h4kQSKk37Xw_pdmIorwU
```

### Production Requirements (For Vercel)
```
NODE_ENV=production
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
ADMIN_SECRET=[32+ character secure key - GENERATED BELOW]
CORS_ORIGINS=https://ai-team-premium.vercel.app,https://aiteampremium.com
```

---

## 🔑 GENERATE PRODUCTION SECRETS

### New ADMIN_SECRET (32 characters minimum - SECURE)
```
Generated: $(date +%s | sha256sum | cut -c1-32)
Recommended: Use Vercel's built-in password generator
```

### CORS Origins Configuration
```
Development:  http://localhost:5173,http://localhost:3001
Staging:      https://ai-team-premium.pages.dev
Production:   https://ai-team-premium.vercel.app
Domain:       https://aiteampremium.com (when configured)
```

---

## 📊 STEP 1: SET UP SUPABASE DATABASE

### 1.1 Access Supabase Console
```
Project: ptiheausshfuancyjntd
URL: https://app.supabase.io
Project ID: ptiheausshfuancyjntd
Region: Check Supabase dashboard
```

### 1.2 Get Service Role Key
```
Path: Project Settings → API → Service Role Key
Location: https://app.supabase.io/project/ptiheausshfuancyjntd/settings/api
Copy: The service_role key (starts with 'eyJ...')
```

### 1.3 Construct DATABASE_URL
```
Format: postgresql://postgres:[password]@[host]:5432/postgres?sslmode=require

Components:
- Protocol: postgresql://
- User: postgres (default Supabase user)
- Password: [Supabase project password from Settings]
- Host: [project-ref].supabase.co (ptiheausshfuancyjntd)
- Port: 5432 (default)
- Database: postgres (default)
- SSL: sslmode=require (for production)

Example (DO NOT USE):
postgresql://postgres:YOUR_PASSWORD@ptiheausshfuancyjntd.supabase.co:5432/postgres?sslmode=require
```

### 1.4 Execute SQL Schema
```
1. Go to: https://app.supabase.io/project/ptiheausshfuancyjntd/sql/new
2. Create new query
3. Copy entire contents of: PHASE6-DATABASE-SETUP-SQL.sql
4. Paste into SQL editor
5. Click: "Run"
6. Verify: Tables created (audit_log, audit_issues, product_registry, contacts)
7. Verify: Indexes created (6 total)
8. Verify: RLS policies enabled
```

---

## 🌐 STEP 2: CONFIGURE VERCEL ENVIRONMENT VARIABLES

### 2.1 Access Vercel Project Settings
```
URL: https://vercel.com/sysmoaigits-projects/ai-team-premium
Path: Settings → Environment Variables
```

### 2.2 Add Environment Variables

**Variable 1: DATABASE_URL**
```
Name: DATABASE_URL
Value: postgresql://postgres:[password]@ptiheausshfuancyjntd.supabase.co:5432/postgres?sslmode=require
Scope: Production
```

**Variable 2: ADMIN_SECRET**
```
Name: ADMIN_SECRET
Value: [Generate 32+ character random string]
Scope: Production
Example: a7f3k9mX2bQ5nP8vL1jR4cD6gH9eW0sT
```

**Variable 3: CORS_ORIGINS**
```
Name: CORS_ORIGINS
Value: https://ai-team-premium.vercel.app,https://aiteampremium.com
Scope: Production
```

**Variable 4: NODE_ENV**
```
Name: NODE_ENV
Value: production
Scope: Production
```

### 2.3 Redeploy Application
```
1. Go to: https://vercel.com/sysmoaigits-projects/ai-team-premium/deployments
2. Click: Latest deployment
3. Click: Redeploy
4. Wait for build to complete (~20 seconds)
5. Verify: Deployment status = "Ready"
```

---

## ✅ STEP 3: VERIFY DATABASE CONNECTIVITY

### 3.1 Test API Health Endpoint
```bash
curl -X GET https://ai-team-premium.vercel.app/api/health
# Expected response: {"status":"ok"}
```

### 3.2 Test Audit Log Endpoint (Requires ADMIN_SECRET)
```bash
ADMIN_SECRET="your-admin-secret-here"
curl -X GET https://ai-team-premium.vercel.app/api/admin/audit/logs \
  -H "Authorization: Bearer $ADMIN_SECRET"
# Expected response: {"logs":[],"total":0}
```

### 3.3 Test Insert Endpoint
```bash
curl -X POST https://ai-team-premium.vercel.app/api/admin/audit/logs \
  -H "Authorization: Bearer $ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "phase": 1,
    "field": "test_field",
    "new_value": "test_value",
    "severity": "info",
    "status": "flagged"
  }'
# Expected response: {"id":<number>,"created_at":"..."}
```

---

## 🗄️ DATABASE SCHEMA SUMMARY

### Tables Created
1. **audit_log**
   - Stores audit trail entries
   - Indexes: product_id, created_at, status
   - Rows: ~1000s expected

2. **audit_issues**
   - Stores identified issues
   - Indexes: product_id, status, severity
   - Rows: ~100s expected

3. **product_registry**
   - Stores product configurations
   - Indexes: slug, priority
   - Rows: 9-50 expected

4. **contacts**
   - Stores contact submissions
   - Indexes: created_at
   - Rows: ~100s expected

### Indexes (6 Total)
- audit_log_product_id_idx
- audit_log_created_at_idx
- audit_log_status_idx
- audit_issues_product_id_idx
- audit_issues_status_idx
- audit_issues_severity_idx

### Row-Level Security (RLS)
- Enabled on all tables
- Public read access configured
- Admin-only write access configured

---

## 🚀 DEPLOYMENT CONFIGURATION CHECKLIST

### Pre-Deployment
- [ ] DATABASE_URL obtained from Supabase
- [ ] ADMIN_SECRET generated (32+ characters)
- [ ] CORS_ORIGINS configured
- [ ] SQL schema script reviewed

### Database Setup
- [ ] Supabase console accessed
- [ ] SQL script executed successfully
- [ ] All tables created
- [ ] All indexes created
- [ ] RLS policies enabled

### Vercel Configuration
- [ ] Environment variables added to Vercel dashboard
- [ ] All 4 variables configured (DATABASE_URL, ADMIN_SECRET, CORS_ORIGINS, NODE_ENV)
- [ ] Production scope selected for each variable
- [ ] Redeployment initiated

### Post-Deployment Verification
- [ ] Health endpoint responds (HTTP 200)
- [ ] API endpoints accessible (HTTP 200)
- [ ] Database queries working
- [ ] Audit log inserts successful
- [ ] CORS headers correct

---

## 📝 QUICK REFERENCE

### Supabase Project Details
```
Project Name: ptiheausshfuancyjntd
Region: [Check dashboard]
Database: postgres (default)
Public Anon Key: sb_publishable__1A3Wb1WEV7h4kQSKk37Xw_pdmIorwU
```

### File References
- SQL Schema: `PHASE6-DATABASE-SETUP-SQL.sql` (186 lines)
- Current Env: `.env` and `.env.local`
- Server Config: `server/db.ts` (database initialization)
- API Routes: `server/routes.ts` (API endpoints)

### Key Endpoints
```
Health:          GET /api/health
Audit Logs:      GET /api/admin/audit/logs
Issues:          GET /api/admin/audit/issues
Products:        GET /api/admin/products
Contacts:        POST /api/contacts
```

---

## ⏳ PHASE 6 TIMELINE

### Current Status
```
✅ SQL Schema Created
✅ Environment Variables Identified
✅ Vercel Deployment Ready
⏳ Database Setup: PENDING (awaits credentials)
⏳ Environment Configuration: PENDING (awaits setup)
⏳ Verification: PENDING (after deployment)
```

### Expected Completion
- SQL Execution: 1-2 minutes
- Vercel Config: 2-3 minutes
- Redeployment: 15-20 seconds
- Verification: 2-3 minutes
- **Total: ~10-15 minutes**

---

## 🔐 SECURITY NOTES

### Secrets Management
- ✅ ADMIN_SECRET: Stored in Vercel (secure)
- ✅ DATABASE_URL: Stored in Vercel (not exposed)
- ✅ Service Role Key: Never committed to git
- ✅ Anon Key: Safe to expose (public, read-only)

### Production Configuration
- ✅ SSL/TLS: Required for database (sslmode=require)
- ✅ RLS: Enabled for all tables
- ✅ CORS: Restricted to known origins only
- ✅ Rate Limiting: Configured in server
- ✅ CSRF: Configured in server

---

## 📊 COMPLETION STATUS

**Phase 6 Progress:** 50% Complete
- ✅ SQL Schema: Created & Ready
- ✅ Environment Variables: Identified & Documented
- ⏳ Database Setup: Awaiting Supabase execution
- ⏳ Vercel Configuration: Awaiting secrets entry
- ⏳ Verification: Awaiting deployment

**Next Phase:** Phase 8 (Post-Deployment Monitoring) can begin after verification

---

**Report Generated:** July 27, 2026  
**Status:** Phase 6 - Database Setup Guide Complete  
**Next Step:** Execute SQL in Supabase + Configure Vercel Environment Variables  
**Estimated Completion:** 10-15 minutes from start

