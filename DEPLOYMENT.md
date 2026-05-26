# AI Team Premium BD — Deployment Guide

## Current Deployment

| Item | Value |
|------|-------|
| **Platform** | GCP Cloud Run |
| **Project** | sysmoai-hq-prod |
| **Region** | us-central1 |
| **Service Name** | ai-team-premium-bd |
| **Live URL** | https://ai-team-premium-bd-1005103726650.us-central1.run.app |
| **Container Registry** | us-central1-docker.pkg.dev/sysmoai-hq-prod/cortex/ai-team-premium-bd |

## Database

| Item | Value |
|------|-------|
| **Provider** | Supabase |
| **Project Name** | ai-team-premium-bd |
| **Project Ref** | spotfasgcffarraooqxh |
| **Secret Name** | ai-team-premium-bd-db-url |
| **Secret Location** | GCP Secret Manager |

## Build & Deploy Commands

```bash
# Local development
npm install
npm run dev

# Type check
npm run check

# Production build
npm run build

# Production start
npm run start

# Deploy (manual)
gcloud builds submit --tag us-central1-docker.pkg.dev/sysmoai-hq-prod/cortex/ai-team-premium-bd:latest .
gcloud run services replace cloud-run-service.yaml --region=us-central1
```

## Environment Variables

| Variable | Source | Description |
|----------|--------|-------------|
| `NODE_ENV` | hardcoded in build | production |
| `PORT` | Cloud Run injects | 8080 |
| `DATABASE_URL` | Secret Manager | Supabase PostgreSQL connection |

## CI/CD

GitHub Actions workflow at `.github/workflows/deploy.yml`:
- Triggers on push to `main`
- Runs type check → build → Cloud Build → Cloud Run deploy
- **Status:** Configured but not active (push permissions blocked)

## Health Checks

- **Endpoint:** `GET /api/health`
- **Response:** `{ status: "ok", service: "ai-team-premium-bd", timestamp: "..." }`
- **Script:** `./scripts/health-check.sh`
