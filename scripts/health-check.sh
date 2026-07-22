#!/bin/bash
# AI Team Premium Health Check
# Part of CORTEX OS — Continuous monitoring

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SERVICE_URL=${1:-$(gcloud run services describe ai-team-premium --region=us-central1 --format='value(status.url)' 2>/dev/null)}

if [ -z "$SERVICE_URL" ]; then
  echo -e "${RED}❌ Cloud Run service URL not found${NC}"
  exit 1
fi

echo "=== AI Team Premium Health Check · $(date '+%Y-%m-%d %H:%M:%S') ==="
echo "URL: $SERVICE_URL"
echo ""

# 1. Health endpoint
HEALTH_STATUS=$(curl -sf "$SERVICE_URL/api/health" -o /dev/null -w "%{http_code}" 2>/dev/null || echo "000")
if [ "$HEALTH_STATUS" = "200" ]; then
  echo -e "${GREEN}✅ Health Check: OK${NC}"
else
  echo -e "${RED}❌ Health Check: FAILED (HTTP $HEALTH_STATUS)${NC}"
fi

# 2. Exchange rate API
RATE_STATUS=$(curl -sf "$SERVICE_URL/api/exchange-rate" -o /dev/null -w "%{http_code}" 2>/dev/null || echo "000")
if [ "$RATE_STATUS" = "200" ]; then
  echo -e "${GREEN}✅ Exchange Rate API: OK${NC}"
else
  echo -e "${YELLOW}⚠️  Exchange Rate API: HTTP $RATE_STATUS${NC}"
fi

# 3. Database connectivity (via contact form OPTIONS)
DB_STATUS=$(curl -sf -X OPTIONS "$SERVICE_URL/api/contacts" -o /dev/null -w "%{http_code}" 2>/dev/null || echo "000")
if [ "$DB_STATUS" != "000" ]; then
  echo -e "${GREEN}✅ API Reachable: OK${NC}"
else
  echo -e "${RED}❌ API Reachable: FAILED${NC}"
fi

# 4. GitHub sync
cd "$(dirname "$0")/.." && git fetch origin 2>/dev/null && \
  LOCAL=$(git rev-parse HEAD) && REMOTE=$(git rev-parse origin/main) && \
  if [ "$LOCAL" = "$REMOTE" ]; then
    echo -e "${GREEN}✅ GitHub: synced${NC}"
  else
    echo -e "${YELLOW}⚠️  GitHub: behind remote — pull needed${NC}"
  fi

echo ""
echo "=== Health Check Complete ==="
