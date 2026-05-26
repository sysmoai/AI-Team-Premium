# AI Team Premium BD — Deployment Guide

## Live Deployment

| Item | Value |
|------|-------|
| **Platform** | GCP Cloud Run (gen2) |
| **Project** | sysmoai-hq-prod |
| **Region** | us-central1 |
| **Service URL** | https://ai-team-premium-bd-1005103726650.us-central1.run.app |
| **Latest Revision** | ai-team-premium-bd-00009-8jg |
| **Database** | Supabase PostgreSQL (ai-team-premium-bd) |
| **Registry** | us-central1-docker.pkg.dev/sysmoai-hq-prod/cortex/ai-team-premium-bd |

## Tech Stack

- **Backend:** Express.js + TypeScript
- **Frontend:** Vite + React + TypeScript + Tailwind CSS
- **ORM:** Drizzle ORM
- **Database:** PostgreSQL (Supabase)
- **Router:** Wouter
- **UI:** shadcn/ui + Radix UI

## Scripts

```bash
# Development
npm run dev

# Type check
npm run check

# Build (client + server)
npm run build

# Production start
npm run start

# Database push
npm run db:push
```

## Build Output

- Server: `dist/index.cjs` (~1.0MB)
- Client: `dist/public/` (~918KB JS, ~242KB gzipped)

## Environment Variables

| Variable | Source | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | GCP Secret Manager (`ai-team-premium-bd-db-url`) | PostgreSQL connection |
| `NODE_ENV` | set in Dockerfile / runtime | production/development |
| `PORT` | set in Dockerfile (8080) | HTTP server port |

## Deployment Steps

### Manual Deploy (current method)

```bash
# 1. Build and push Docker image
gcloud builds submit --tag us-central1-docker.pkg.dev/sysmoai-hq-prod/cortex/ai-team-premium-bd:latest

# 2. Deploy to Cloud Run
gcloud run deploy ai-team-premium-bd \
  --image us-central1-docker.pkg.dev/sysmoai-hq-prod/cortex/ai-team-premium-bd:latest \
  --region us-central1 \
  --project sysmoai-hq-prod
```

### GitHub Actions (configured but not active)

`.github/workflows/deploy.yml` exists but requires:
1. Push access to `sysmoai/AITeamPremiumBD` repo
2. `GCP_SA_KEY` secret configured in GitHub

## Infrastructure

| Resource | Name | Status |
|----------|------|--------|
| Artifact Registry | `cortex` repo | ✅ |
| Cloud Run Service | `ai-team-premium-bd` | ✅ |
| Secret Manager | `ai-team-premium-bd-db-url` | ✅ |
| Supabase Project | `ai-team-premium-bd` | ✅ |
| Cloud Build | Enabled | ✅ |

## Health & Monitoring

- **Health endpoint:** `GET /api/health`
- **Startup probe:** `/api/health`
- **Liveness probe:** `/api/health`
- **Response:** `{"status":"ok","service":"ai-team-premium-bd","timestamp":"..."}`

## Migration

Database migration endpoint:
```bash
POST /api/admin/migrate
# Runs migrations/0001_init.sql
```
