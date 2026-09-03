#!/usr/bin/env node
// Generates lib/structured-data.js — the JSON-LD the SERVER emits.
//
//   npm run gen:schema
//
// Why this exists: every page ships as an empty SPA shell. `curl` on any route
// returns ~3.9KB with <div id="root"></div> and, until now, zero JSON-LD —
// all structured data was injected by React after hydration.
//
// robots.txt explicitly welcomes GPTBot, PerplexityBot, ClaudeBot, CCBot and
// Applebot-Extended. Those crawlers largely do not execute JavaScript, so they
// were being invited to a blank page with no machine-readable description of
// what this site sells. Googlebot renders JS and was fine; the answer engines
// were not.
//
// The @id values deliberately match client/src/components/OrganizationSchema.tsx
// and the client ProductSchema, so when React does hydrate, the two graphs merge
// on @id rather than describing the same entity twice with different values.
//
// Deliberately NOT emitted:
//   aggregateRating  no review system produced any rating, and the catalog build
//                    already strips fabricated ones. Inventing them here would
//                    reintroduce exactly what that scrub removed.
//   FAQPage          only valid where the questions are visible on the page. The
//                    server shell renders no visible text at all, so emitting it
//                    server-side would mark up content a user cannot see.
//   LocalBusiness    needs a verified address and legal identity; we publish only
//                    a city and country.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.aiteampremium.com";

const catalog = JSON.parse(
  readFileSync(resolve(ROOT, "client/src/data/products-catalog.json"), "utf-8")
);
const { ROUTE_META } = await import(
  pathToFileURL(resolve(ROOT, "lib/route-meta.js")).href
);

// ---------------------------------------------------------------- site-wide
const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "AI Team Premium",
  alternateName: ["AI Team Premium Bangladesh"],
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/favicon.png`, width: 512, height: 512 },
  areaServed: { "@type": "Country", name: "Bangladesh" },
  address: { "@type": "PostalAddress", addressCountry: "BD", addressRegion: "Dhaka" },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+8801533262758",
      contactType: "customer support",
      availableLanguage: ["Bengali", "English"],
      areaServed: "BD",
    },
  ],
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "AI Team Premium",
  inLanguage: "en-BD",
  publisher: { "@id": `${SITE}/#organization` },
};

// ---------------------------------------------------------------- products
// One Product per catalog family, with an offer per purchasable tier. A tier
// kept on request has no published price, so it is omitted from offers rather
// than shipped with its internal reference number.
const families = new Map();
for (const p of catalog) {
  if (!families.has(p.slug)) families.set(p.slug, []);
  families.get(p.slug).push(p);
}

const PRODUCT_SCHEMA = {};
for (const [slug, tiers] of families) {
  const path = `/tools/${slug}`;
  const meta = ROUTE_META[path];
  if (!meta) continue;

  const sellable = tiers.filter((t) => t.price > 0 && !t.priceOnRequest);
  const head = tiers[0];

  const product = {
    "@type": "Product",
    "@id": `${SITE}${path}#product`,
    name: head.brand,
    description: meta.description,
    url: `${SITE}${path}`,
    category: head.category,
    brand: { "@type": "Brand", name: head.brand },
    image: `${SITE}/favicon.png`,
  };

  if (sellable.length === 1) {
    product.offers = {
      "@type": "Offer",
      url: `${SITE}${path}`,
      priceCurrency: "BDT",
      price: String(sellable[0].price),
      areaServed: "BD",
      seller: { "@id": `${SITE}/#organization` },
    };
  } else if (sellable.length > 1) {
    const prices = sellable.map((t) => t.price);
    product.offers = {
      "@type": "AggregateOffer",
      url: `${SITE}${path}`,
      priceCurrency: "BDT",
      lowPrice: String(Math.min(...prices)),
      highPrice: String(Math.max(...prices)),
      offerCount: String(sellable.length),
      areaServed: "BD",
      seller: { "@id": `${SITE}/#organization` },
    };
  }
  // No sellable tier => no offers key at all. A Product with a 0 price would
  // claim it is free.

  PRODUCT_SCHEMA[path] = product;
}

// ---------------------------------------------------------------- articles
// The 18 blog posts had no schema at all — a crawler saw a page with a title and
// no signal that it was an article, who published it, or when. BlogPosting is on
// the approved list; Article fields come from blog-posts.ts via gen:blog.
//
// dateModified is NOT emitted: the posts record only a published date, and
// repeating it as a modified date would assert the post has never been revised.
const { BLOG_ARTICLES } = await import(
  pathToFileURL(resolve(ROOT, "lib/blog-routes.js")).href
);

const ARTICLE_SCHEMA = {};
for (const [path, a] of Object.entries(BLOG_ARTICLES)) {
  const node = {
    "@type": "BlogPosting",
    "@id": `${SITE}${path}#article`,
    headline: a.headline,
    description: a.description,
    url: `${SITE}${path}`,
    inLanguage: a.lang === "bn" ? "bn-BD" : "en-BD",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${path}` },
    author: { "@id": `${SITE}/#organization` },
    publisher: { "@id": `${SITE}/#organization` },
  };
  if (a.datePublished) node.datePublished = a.datePublished;
  ARTICLE_SCHEMA[path] = node;
}

const out = `// GENERATED FILE — do not edit by hand.
// Source: client/src/data/products-catalog.json + lib/route-meta.js
// Regenerate: npm run gen:schema
//
// Emitted into the served HTML by api/index.js, so a crawler that does not run
// JavaScript still gets a machine-readable description of the page. See
// scripts/gen-structured-data.mjs for what is deliberately left out and why.

const SITE = ${JSON.stringify(SITE)};

export const ORGANIZATION = ${JSON.stringify(ORGANIZATION, null, 2)};

export const WEBSITE = ${JSON.stringify(WEBSITE, null, 2)};

export const PRODUCT_SCHEMA = ${JSON.stringify(PRODUCT_SCHEMA, null, 2)};

export const ARTICLE_SCHEMA = ${JSON.stringify(ARTICLE_SCHEMA, null, 2)};

// Breadcrumbs use the canonical destination, not an alias path. Product pages
// point to the real product hub rather than /tools, because /tools is not a public hub.
function breadcrumbFor(path, meta) {
  if (path === "/") return null;
  const canonicalUrl = meta.canonical || SITE + path;
  const canonicalPath = new URL(canonicalUrl).pathname;
  const parts = canonicalPath.split("/").filter(Boolean);
  const items = [{ name: "Home", item: SITE + "/" }];
  if (parts.length > 1) {
    const section = parts[0];
    if (section === "tools") items.push({ name: "Products", item: SITE + "/all-products" });
    else if (section === "blog") items.push({ name: "Blog", item: SITE + "/blog" });
    else {
      const label = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ");
      items.push({ name: label, item: SITE + "/" + section });
    }
  }
  items.push({ name: meta.title.split(" — ")[0].split(" | ")[0], item: canonicalUrl });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.item })),
  };
}

// The graph for a path: always the site-wide entities, plus a breadcrumb, plus
// a Product where the path is a catalog product page. Returns a single
// @graph object ready to serialise.
export function jsonLdFor(path, meta) {
  const graph = [ORGANIZATION, WEBSITE];
  const crumb = breadcrumbFor(path, meta);
  if (crumb) graph.push(crumb);
  const product = PRODUCT_SCHEMA[path];
  if (product) graph.push(product);
  const article = ARTICLE_SCHEMA[path];
  if (article) graph.push(article);
  return { "@context": "https://schema.org", "@graph": graph };
}
`;

writeFileSync(resolve(ROOT, "lib/structured-data.js"), out.replace(/\r\n/g, "\n"), "utf-8");

const withOffers = Object.values(PRODUCT_SCHEMA).filter((p) => p.offers).length;
console.log(
  `gen:schema  wrote lib/structured-data.js — ${Object.keys(PRODUCT_SCHEMA).length} products ` +
    `(${withOffers} with offers, ${Object.keys(PRODUCT_SCHEMA).length - withOffers} price-on-request)`
);
