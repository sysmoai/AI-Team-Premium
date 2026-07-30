# Working on this site

Live: **https://www.aiteampremium.com** (canonical). `aiteampremium.com` 308-redirects to it.

## The loop

```bash
npm run dev          # fast local dev (Vite HMR)
npm run preview      # serve the production build locally — real SEO + real 404s
npm run ship         # typecheck + build + verify — run before every push
git add -A && git commit -m "..." && git push
npm run verify:live  # ~1 min after the push, confirm production
```

`npm run dev` uses Vite middleware, which serves the raw template for every
path — so per-route metadata and 404s are **invisible** there. After touching
routes or metadata, check `npm run preview` instead: it runs the real production
path, so `/nope-xyz` returns a genuine 404 and each page shows its own title.

`npm run ship` is the gate, and **it runs automatically on every push** via
`.githooks/pre-push` — a failing check blocks the push before it can deploy.
Override only if you are certain: `git push --no-verify`.

**GitHub Actions cannot gate for you right now** — the account is billing-locked,
so every workflow fails before it starts. This hook is the only safety net until
that is resolved, and there is no CI email if something slips through.

Pushing to `main` is what deploys. Vercel's Git integration builds from GitHub
directly; it does not use GitHub Actions. A deploy takes roughly 30-60 seconds.

## Adding a page

Three files, in this order:

1. `client/src/pages/YourPage.tsx` — the component
2. `client/src/App.tsx` — `<Route path="/your-page" component={YourPage} />`
3. `lib/route-meta.js` — a `ROUTE_META` entry with `title`, `description`, `canonical`

Then add the URL to `client/public/sitemap.xml`, and check it with
`npm run preview`.

`npm run verify` fails if you add a route in step 2 and forget step 3, which
would otherwise ship a page that returns HTTP 404 to Google while still rendering
fine in a browser — the kind of bug nobody notices for months.

`lib/route-meta.js` is the single source of truth. Both the production handler
(`api/index.js`) and the local dev server (`server/seo.ts`) import it, so they
cannot disagree about what a page's metadata is.

## Editing products

The catalog lives in `client/src/data/products-all.json` (56 entries). `npm run
verify` checks every product has the eleven fields the catalog renders, that
`capabilities` is an array, and that `id` is unique — a product missing `price`
still builds and renders as a blank cell, and an empty `whatsappMsg` ships an
order button that sends you nothing.

`slug` is intentionally shared across tiers of a brand (all five Claude products
use `claude-pro-bangladesh`) and is deliberately not checked for uniqueness.

## What the gate does NOT check

It verifies structure, not judgement. It will not catch a wrong price, bad copy,
a broken layout, a wrong WhatsApp number, or a React component that throws at
runtime. Look at the page in `npm run preview` before you push.

## Always use www

Every canonical, sitemap entry and JSON-LD URL must be `https://www.aiteampremium.com`.
The bare apex previously appeared in the client hook, JSON-LD, sitemap and
robots.txt while the server used www — so React overwrote every correct canonical
with one pointing at a host that was, at the time, dead. `npm run verify` now
fails on any bare-apex URL in a host-sensitive file.

## Architecture, briefly

- **`/` and `/assets/*`** are static files served from the CDN (`outputDirectory: dist/public`).
- **Everything else** falls through `vercel.json`'s rewrite to `api/index.js`, which
  returns the SPA shell with that route's metadata injected, then React takes over.
- `dist/` is generated. It is gitignored and not committed; Vercel rebuilds it.

Three constraints in `vercel.json` / `api/index.js` are load-bearing. Changing any
of them silently breaks the whole site, so they are worth knowing:

- `outputDirectory` must be `dist/public`. The key `public` is a *boolean* in
  Vercel's schema, not a path — setting `"public": "dist/public"` leaves Vite's
  default `dist/` as the static root, and `/` then matches `dist/index.cjs` and
  serves a 1.1 MB `application/node` blob instead of the site.
- Anything in `api/` must be **ESM**. `package.json` sets `"type": "module"`, so a
  `require()`/`module.exports` handler returns `FUNCTION_INVOCATION_FAILED` on
  every request.
- The rewrite targets bare `/api`. A bracketed catch-all filename
  (`api/[...path].js`) does *not* register as a catch-all here — only `/api`
  resolved, so every nested route 404'd while single-segment routes worked.

Any file placed in `api/` becomes its own serverless function, which is why shared
modules live in `lib/`.

## If production looks broken

Check for a false alarm first. Vercel's automatic DDoS mitigation challenges
bursts of automated requests from one IP: every route starts returning **403 with
`X-Vercel-Mitigated: challenge`**, which is indistinguishable from an outage in a
script but harmless to real visitors.

```bash
curl -sI https://www.aiteampremium.com/ | grep -i x-vercel-mitigated
```

If that header is present, it is rate limiting, not a fault — open the site in a
browser to confirm. `npm run verify:live` already reports this as *inconclusive*
rather than failing. Bot Protection is off and there are no custom firewall rules,
so normal customers are never challenged.

To roll back, use **Instant Rollback** on the Vercel deployment you want, or
revert the commit and push.

## DNS (Squarespace)

The zone also holds Zoho email — **never touch the MX or TXT records** while
editing web records.

| Type | Name | Value |
|------|------|-------|
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `cname.vercel.sh` |
| MX ×3 | `@` | `mx.zoho.com`, `mx2`, `mx3` |
| TXT | `@`, `zoho._domainkey` | SPF, domain verification, DKIM |

`76.76.19.165` was the old apex A record and is dead — it accepts no TCP at all.
That was the cause of the bare domain not resolving.
