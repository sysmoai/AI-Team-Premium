# AI Team Premium BD

Bangladesh-focused AI subscription access, setup assistance, and Bangla support. The public brand name remains **AI Team Premium BD (AITPBD)**.

## URLs and source of truth

| Purpose | URL | Rule |
|---|---|---|
| Canonical public website | https://aiteampremium.com | Use in customer links, SEO, structured data, sitemap, social sharing, and marketing |
| Production origin | https://ai-team-premium-bd-1005103726650.us-central1.run.app | Infrastructure origin only; do not advertise as the public website |
| Replit development preview | `*.pike.replit.dev` | Preview/testing only; never canonical, indexed, or customer-facing |
| Retired domain | `aiteampremiumbd.com` | Do not renew, publish, redirect from unverified ownership, or reuse in active content |

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend:** Express.js + TypeScript
- **Router:** Wouter
- **State:** TanStack React Query
- **ORM:** Drizzle ORM + PostgreSQL
- **Build:** esbuild (server) + Vite (client)

## Getting Started

```bash
npm install
npm run check
npm run build
npm run audit
npm run start
```

## Project Structure

```text
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── hooks/
│   └── public/
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── migrations/      # Database migrations
├── scripts/         # Quality and migration audits
└── script/          # Build scripts
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NODE_ENV` | Auto | `development` or `production` |
| `PORT` | Auto | Server port; Cloud Run uses 8080 |

## Deployment

The current production workload is deployed to GCP Cloud Run. Connecting `aiteampremium.com` is an infrastructure/DNS step separate from this code migration.

```bash
gcloud builds submit --tag us-central1-docker.pkg.dev/sysmoai-hq-prod/cortex/ai-team-premium-bd:latest .
gcloud run services replace cloud-run-service.yaml --region=us-central1
```

## Domain migration safeguards

- `SITE_URL` in `client/src/lib/config.ts` is the canonical runtime source.
- Canonical tags, Open Graph URLs, JSON-LD, robots.txt, and sitemap must use `https://aiteampremium.com`.
- `npm run audit` fails when the retired domain or the known Replit preview hostname appears in active runtime files.
- Historical reports may preserve old URLs only when clearly labelled historical.

## Health Check

```bash
curl https://ai-team-premium-bd-1005103726650.us-central1.run.app/api/health
```

## License

MIT
