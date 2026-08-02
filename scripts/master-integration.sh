#!/bin/bash
# MASTER INTEGRATION ORCHESTRATOR
# Executes full 150+ product integration pipeline with zero manual steps

set -e

echo "🚀 MASTER PRODUCT INTEGRATION PIPELINE"
echo "══════════════════════════════════════════════════════════"
echo ""

INPUT_FILE="${1:-products-to-add.json}"

if [ ! -f "$INPUT_FILE" ]; then
  echo "❌ ERROR: Input file not found: $INPUT_FILE"
  echo "Usage: ./scripts/master-integration.sh <products.json>"
  exit 1
fi

echo "📊 STEP 1: BULK PRODUCT INTEGRATION"
echo "─────────────────────────────────────────────────────────"
node scripts/integrate-bulk-products.mjs "$INPUT_FILE"
echo ""

echo "🔍 STEP 2: SEO OPTIMIZATION"
echo "─────────────────────────────────────────────────────────"
node scripts/optimize-seo.mjs
echo ""

echo "🔧 STEP 3: AUTO-GENERATE PRODUCT PAGES"
echo "─────────────────────────────────────────────────────────"
node scripts/generate-product-pages.mjs
echo ""

echo "✅ STEP 4: VALIDATION & TESTING"
echo "─────────────────────────────────────────────────────────"
npm run check
npm run validate:catalog
echo ""

echo "🏗️  STEP 5: BUILD"
echo "─────────────────────────────────────────────────────────"
npm run build
echo ""

echo "🔐 STEP 6: PRE-DEPLOYMENT VERIFICATION"
echo "─────────────────────────────────────────────────────────"
npm run verify
echo ""

echo "✨ ALL STEPS COMPLETE"
echo "══════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff --stat"
echo "2. Commit: git add -A && git commit -m 'Add 150+ products + SEO'"
echo "3. Deploy: git push origin main"
echo ""
echo "✅ Ready for production deployment!"
