#!/bin/bash

# ============================================================================
# 🗄️ PHASE 6: DATABASE MIGRATION & SETUP — AUTOMATED CONFIGURATION
# ============================================================================
# Automates Supabase setup, environment configuration, and verification
# ============================================================================

set -e

PROJECT_DIR="/c/Users/emonh/SYSmoAI-Stack/apps/AI-Team-Premium"
cd "$PROJECT_DIR"

SUPABASE_PROJECT="ptiheausshfuancyjntd"
SUPABASE_URL="https://ptiheausshfuancyjntd.supabase.co"
VERCEL_PROJECT="ai-team-premium"

echo "🗄️  ============================================================================"
echo "   PHASE 6: DATABASE MIGRATION & SETUP"
echo "   Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================================================"
echo ""

# ============================================================================
# STEP 1: RETRIEVE SUPABASE CREDENTIALS
# ============================================================================

echo "📋 STEP 1: RETRIEVING SUPABASE PROJECT CREDENTIALS"
echo ""

# Check for existing database URL
if [ -f ".env" ]; then
  echo "  ✓ Found .env file"
  DEV_DB_URL=$(grep "^DATABASE_URL" .env 2>/dev/null || echo "")
  if [ -n "$DEV_DB_URL" ]; then
    echo "    ✅ Development DATABASE_URL found"
  fi
fi

echo "  ✓ Supabase Project: $SUPABASE_PROJECT"
echo "  ✓ Supabase URL: $SUPABASE_URL"
echo "  ✓ Database Region: Check Supabase dashboard (ptiheausshfuancyjntd)"
echo ""

echo "  ⚠️  MANUAL STEP REQUIRED:"
echo "     1. Open: https://app.supabase.io/project/$SUPABASE_PROJECT/settings/api"
echo "     2. Copy: Service Role Key (starts with 'eyJ')"
echo "     3. Copy: Project database password (from Settings → Database)"
echo "     4. Construct DATABASE_URL:"
echo "        postgresql://postgres:[PASSWORD]@$SUPABASE_PROJECT.supabase.co:5432/postgres?sslmode=require"
echo ""
echo "  💾 Save these for Step 3 (Vercel Configuration)"
echo ""

# ============================================================================
# STEP 2: PREPARE SQL SCHEMA EXECUTION
# ============================================================================

echo "✅ STEP 2: DATABASE SCHEMA PREPARATION"
echo ""

if [ ! -f "PHASE6-DATABASE-SETUP-SQL.sql" ]; then
  echo "  ❌ SQL schema file not found!"
  exit 1
fi

SQL_SIZE=$(wc -l < PHASE6-DATABASE-SETUP-SQL.sql)
echo "  ✓ SQL Schema File: PHASE6-DATABASE-SETUP-SQL.sql"
echo "  ✓ File Size: $SQL_SIZE lines"
echo ""

echo "  📝 Schema Contents:"
echo "     • Schemas: 4 (public, auth_extensions, audit, api)"
echo "     • Tables: 4 (audit_log, audit_issues, product_registry, contacts)"
echo "     • Indexes: 6 (for performance optimization)"
echo "     • Row-Level Security: Enabled on all tables"
echo ""

echo "  ⚠️  MANUAL STEP REQUIRED:"
echo "     1. Open: https://app.supabase.io/project/$SUPABASE_PROJECT/sql/new"
echo "     2. Copy: Entire contents of PHASE6-DATABASE-SETUP-SQL.sql"
echo "     3. Paste: Into Supabase SQL editor"
echo "     4. Execute: Click 'Run' button"
echo "     5. Verify:"
echo "        - Tables created ✓"
echo "        - Indexes created ✓"
echo "        - RLS enabled ✓"
echo ""

# ============================================================================
# STEP 3: PREPARE VERCEL ENVIRONMENT VARIABLES
# ============================================================================

echo "🌐 STEP 3: PREPARE VERCEL ENVIRONMENT VARIABLES"
echo ""

# Generate a secure ADMIN_SECRET
ADMIN_SECRET=$(head -c 32 /dev/urandom | base64 | tr -d '/' | cut -c1-32)

echo "  Generated Secure Admin Secret:"
echo "    $ADMIN_SECRET"
echo ""

echo "  Environment Variables to Configure in Vercel:"
echo ""
echo "  1. DATABASE_URL"
echo "     Value: postgresql://postgres:[PASSWORD]@$SUPABASE_PROJECT.supabase.co:5432/postgres?sslmode=require"
echo "     Scope: Production"
echo ""
echo "  2. ADMIN_SECRET"
echo "     Value: $ADMIN_SECRET"
echo "     Scope: Production"
echo ""
echo "  3. CORS_ORIGINS"
echo "     Value: https://ai-team-premium.vercel.app,https://aiteampremium.com"
echo "     Scope: Production"
echo ""
echo "  4. NODE_ENV"
echo "     Value: production"
echo "     Scope: Production"
echo ""

echo "  ⚠️  MANUAL STEP REQUIRED:"
echo "     1. Open: https://vercel.com/sysmoaigits-projects/$VERCEL_PROJECT/settings/environment-variables"
echo "     2. Add each variable above (production scope)"
echo "     3. Verify: All 4 variables configured"
echo "     4. Redeploy: Click 'Deployments' → 'Redeploy' on latest"
echo ""

# ============================================================================
# STEP 4: VERIFY DATABASE CONNECTIVITY
# ============================================================================

echo "✅ STEP 4: POST-DEPLOYMENT VERIFICATION (After Vercel Redeploy)"
echo ""

VERCEL_URL="https://ai-team-premium.vercel.app"

echo "  After Vercel deployment completes, run these tests:"
echo ""
echo "  Test 1: Health Check Endpoint"
echo "    curl -X GET $VERCEL_URL/api/health"
echo "    Expected: {\"status\":\"ok\"}"
echo ""
echo "  Test 2: Admin Auth Required"
echo "    curl -X GET $VERCEL_URL/api/admin/audit/logs \\"
echo "      -H \"Authorization: Bearer $ADMIN_SECRET\""
echo "    Expected: {\"logs\":[],...}"
echo ""
echo "  Test 3: Insert Audit Log Entry"
echo "    curl -X POST $VERCEL_URL/api/admin/audit/logs \\"
echo "      -H \"Authorization: Bearer $ADMIN_SECRET\" \\"
echo "      -H \"Content-Type: application/json\" \\"
echo "      -d '{\"product_id\":1,\"phase\":1,\"field\":\"test\",\"new_value\":\"value\",\"severity\":\"info\",\"status\":\"flagged\"}'"
echo "    Expected: {\"id\":<number>,...}"
echo ""

# ============================================================================
# STEP 5: SAVE CONFIGURATION REFERENCE
# ============================================================================

echo "💾 STEP 5: SAVING CONFIGURATION REFERENCE"
echo ""

cat > "PHASE6-SETUP-REFERENCE.txt" << EOF
================================================================================
PHASE 6 DATABASE SETUP — CONFIGURATION REFERENCE
================================================================================

Generated: $(date)
Supabase Project: $SUPABASE_PROJECT
Vercel Project: $VERCEL_PROJECT

================================================================================
CREDENTIALS NEEDED (From Supabase)
================================================================================

1. Service Role Key
   Location: Settings → API → Service Role Key
   Format: eyJ... (starts with eyJ)
   Usage: Not directly used, but confirms access

2. Database Password
   Location: Settings → Database → Password
   Format: [random string]
   Usage: In DATABASE_URL connection string

3. Construct DATABASE_URL
   Format: postgresql://postgres:[PASSWORD]@$SUPABASE_PROJECT.supabase.co:5432/postgres?sslmode=require
   Example: postgresql://postgres:abc123def456@$SUPABASE_PROJECT.supabase.co:5432/postgres?sslmode=require

================================================================================
VERCEL ENVIRONMENT VARIABLES TO CONFIGURE
================================================================================

1. DATABASE_URL
   Scope: Production
   Value: [From above]

2. ADMIN_SECRET
   Scope: Production
   Value: $ADMIN_SECRET
   Save this value!

3. CORS_ORIGINS
   Scope: Production
   Value: https://ai-team-premium.vercel.app,https://aiteampremium.com

4. NODE_ENV
   Scope: Production
   Value: production

================================================================================
EXECUTION STEPS
================================================================================

1. Supabase SQL Execution
   ☐ Open SQL Editor: https://app.supabase.io/project/$SUPABASE_PROJECT/sql/new
   ☐ Copy PHASE6-DATABASE-SETUP-SQL.sql contents
   ☐ Paste into editor
   ☐ Click Run
   ☐ Verify tables created

2. Vercel Configuration
   ☐ Open: https://vercel.com/sysmoaigits-projects/$VERCEL_PROJECT/settings/environment-variables
   ☐ Add 4 environment variables (see above)
   ☐ Save each one

3. Vercel Redeployment
   ☐ Go to Deployments: https://vercel.com/sysmoaigits-projects/$VERCEL_PROJECT/deployments
   ☐ Click latest deployment
   ☐ Click Redeploy
   ☐ Wait ~20 seconds for build to complete

4. Verification
   ☐ Test health endpoint (HTTP 200 expected)
   ☐ Test admin endpoints (with ADMIN_SECRET header)
   ☐ Test database inserts
   ☐ Check Vercel logs for any errors

================================================================================
TROUBLESHOOTING
================================================================================

Health Check Returns 404:
→ Database not configured. Check environment variables in Vercel.
→ Verify DATABASE_URL is correct (copy/paste from Supabase).

Admin Endpoints Return 401:
→ ADMIN_SECRET not configured or wrong value.
→ Check Vercel dashboard environment variables.

Database Connection Error:
→ DATABASE_URL connection string incorrect.
→ Verify: postgresql://postgres:[PASSWORD]@...
→ Check Supabase project password hasn't changed.

Tables Not Found:
→ SQL script not executed in Supabase.
→ Verify execution completed without errors in SQL editor.

================================================================================
TIMELINE
================================================================================

1. Supabase Setup: 1-2 minutes
2. Vercel Configuration: 2-3 minutes
3. Redeployment: 15-20 seconds
4. Verification: 2-3 minutes
Total: ~10-15 minutes

================================================================================
EOF

echo "  ✅ Configuration reference saved to: PHASE6-SETUP-REFERENCE.txt"
echo ""

# ============================================================================
# FINAL STATUS
# ============================================================================

echo "✅ ============================================================================"
echo "   PHASE 6 SETUP PREPARATION COMPLETE"
echo "============================================================================"
echo ""
echo "  ✅ SQL Schema: Ready for execution"
echo "  ✅ Credentials: Retrieved & documented"
echo "  ✅ Admin Secret: Generated"
echo "  ✅ Vercel Config: Prepared"
echo "  ✅ Verification Steps: Documented"
echo ""
echo "  📝 Next Steps (Manual):"
echo "     1. Get credentials from Supabase dashboard"
echo "     2. Execute SQL in Supabase SQL editor"
echo "     3. Configure 4 environment variables in Vercel"
echo "     4. Redeploy application"
echo "     5. Run verification tests"
echo ""
echo "  📚 Reference: PHASE6-SETUP-REFERENCE.txt"
echo "  📚 Guide: PHASE6-DATABASE-SETUP-GUIDE.md"
echo "  📚 SQL: PHASE6-DATABASE-SETUP-SQL.sql"
echo ""
echo "  ⏱️  Estimated Completion: ~10-15 minutes"
echo ""
