# Threat Model

## Project Overview

AITP is a publicly deployed marketing and lead-capture site for selling AI subscriptions and AI support services in Bangladesh. The stack is React/Vite on the client, a small Express backend on Node.js, and PostgreSQL via Drizzle ORM. In production, `NODE_ENV` is assumed to be `production`, the site is served over platform-managed TLS, and the deployment is public (`https://aiteampremium.com`).

The production application appears to have a narrow server-side surface: one public contact-submission API plus static delivery of the SPA. Development-only tooling such as Vite dev middleware should be treated as out of scope unless production reachability is demonstrated.

## Assets

- **Contact lead data** — names, WhatsApp numbers, selected service, and free-form project descriptions submitted through the contact form. This is customer PII and business lead data.
- **Application secrets** — `DATABASE_URL` and any future service credentials present via environment variables. Exposure would enable database compromise or service impersonation.
- **Database availability and integrity** — the `contacts` table stores inbound sales/support inquiries. Abuse or corruption can disrupt operations and destroy lead quality.
- **Brand trust and operator workflow** — this is a public commercial site. Spam submissions, misleading submissions, or exposed contact data can cause reputational harm and operational burden even without user accounts.

## Trust Boundaries

- **Browser to Express API** — all client input crossing into `POST /api/contact` is untrusted and must be validated, rate-limited, and handled safely.
- **Express API to PostgreSQL** — the backend has direct write access to the `contacts` table. Query construction and stored data handling must prevent injection and unnecessary exposure.
- **Public internet to public deployment** — because deployment visibility is public, any unauthenticated route is reachable by arbitrary internet clients and bots.
- **Production vs development tooling** — `server/vite.ts`, hot-reload helpers, and similar dev middleware are out of scope unless referenced from the production path when `NODE_ENV=production`.
- **Server to logs/observability** — request and response logging crosses a boundary into operator-visible systems; sensitive lead data should not be emitted more broadly than necessary.

## Scan Anchors

- **Production entry point:** `server/index.ts`
- **Implemented API surface:** `server/routes.ts` with schemas in `shared/routes.ts` and `shared/schema.ts`
- **Database write path:** `server/storage.ts` and `server/db.ts`
- **Client path for untrusted input:** `client/src/pages/Contact.tsx` and `client/src/hooks/use-contacts.ts`
- **Dev-only areas usually ignorable:** `server/vite.ts`, build scripts, and local Vite-only behavior
- **Public vs authenticated/admin:** current production surface appears entirely public; no authenticated or admin server routes were identified in this scan

## Threat Categories

### Spoofing

There is no user authentication surface in the current production code, but the public contact endpoint can be called directly by arbitrary clients and bots. The system must not treat network origin, browser behavior, or form UX as proof that a submission came from a real customer.

Required guarantees:
- Public write endpoints MUST assume the caller can be scripted.
- Any future protected routes MUST enforce authentication server-side, not in the client.

### Tampering

The main tampering risk is untrusted input entering the contact pipeline. The current schema validation is the primary protection here and must remain authoritative at the server boundary.

Required guarantees:
- `POST /api/contact` MUST validate request bodies server-side before database writes.
- Database writes MUST continue to use parameterized ORM/query-builder behavior rather than string-built SQL.
- Free-form user input MUST never be interpreted as HTML, code, or query fragments.

### Information Disclosure

The application stores customer contact details and project descriptions. Because those values are sensitive sales leads, the system must avoid exposing them through logs, error responses, or unintended API behavior.

Required guarantees:
- Contact submissions MUST NOT be disclosed to other internet users.
- Error responses MUST avoid stack traces, raw SQL errors, or secret material.
- Logs and observability output SHOULD avoid storing full lead contents unless there is a clear operational need and access is tightly restricted.

### Denial of Service

The most relevant production risk is automated abuse of the public contact endpoint. A public, unauthenticated write endpoint can be flooded by bots, causing spam records, operator fatigue, database growth, and autoscaling cost.

Required guarantees:
- Public write endpoints MUST enforce abuse controls appropriate to public internet exposure, such as rate limiting, bot checks, or equivalent throttling.
- Request parsing and downstream storage MUST keep bounded resource usage.
- Expensive or state-changing operations MUST not be triggerable at unlimited volume by anonymous clients.

### Elevation of Privilege

There is no current admin or multi-role privilege model in the production code. The most relevant elevation path would be a future injection issue in the API-to-database boundary.

Required guarantees:
- All database access MUST remain parameterized.
- Future admin or back-office functionality MUST enforce authorization on the server.
- Development middleware and tooling MUST remain unreachable in production.