# AI Team Premium

Bangladesh's trusted AI subscription provider. Buy ChatGPT Plus, Claude Pro, Gemini Advanced, Canva Pro, Grammarly Premium, and more — payable via bKash, Nagad, and Bank Transfer.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend:** Express.js + TypeScript
- **Router:** Wouter (lightweight React router)
- **State:** TanStack React Query
- **ORM:** Drizzle ORM + PostgreSQL (node-postgres)
- **Build:** esbuild (server) + Vite (client)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run check

# Production build
npm run build

# Production start
npm run start
```

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level pages
│   │   ├── lib/         # Utilities, configs, hooks
│   │   └── hooks/       # Custom React hooks
│   └── public/      # Static assets
├── server/          # Express backend
│   ├── index.ts     # Server entry
│   ├── routes.ts    # API routes
│   ├── db.ts        # Database connection
│   └── storage.ts   # Data access layer
├── shared/          # Shared types and schemas
├── migrations/      # Database migrations
└── script/          # Build scripts
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Vite HMR |
| `npm run build` | Build production client + server |
| `npm run start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npm run db:push` | Push Drizzle schema to database |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NODE_ENV` | Auto | `development` or `production` |
| `PORT` | Auto | Server port (default: 5000) |

## Deployment

### GCP Cloud Run (Current)

```bash
# Build and push container
gcloud builds submit --tag us-central1-docker.pkg.dev/sysmoai-hq-prod/cortex/ai-team-premium-bd:latest .

# Deploy service
gcloud run services replace cloud-run-service.yaml --region=us-central1
```

**Live URL:** https://ai-team-premium-bd-1005103726650.us-central1.run.app

### Database

- **Provider:** Supabase
- **Project:** ai-team-premium-bd
- **Migration:** `npm run db:push` or use `/api/admin/migrate` endpoint

## Health Check

```bash
curl https://ai-team-premium-bd-1005103726650.us-central1.run.app/api/health
```

## License

MIT
