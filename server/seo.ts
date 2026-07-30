// server/seo.ts — Per-route SEO meta injection + 404 handler
// Used only by the local dev server; production serves through api/index.js.
import { type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import { lookupMeta, SITE_URL } from "../lib/route-meta.js";

// Route metadata and the path-matching rule live in lib/route-meta.js so the
// Vercel function (api/index.js) and this dev server cannot drift apart.
const DIST_PATH = path.resolve(process.cwd(), "dist", "public");

export function handleSeoRequest(req: Request, res: Response): void {
  const requestPath = req.path;
  const indexPath = path.resolve(DIST_PATH, "index.html");

  if (!fs.existsSync(indexPath)) {
    res.status(500).send("Server error: index.html not found");
    return;
  }

  let template: string;
  try {
    template = fs.readFileSync(indexPath, "utf-8");
  } catch {
    res.status(500).send("Server error: could not read index.html");
    return;
  }

  // Look up route meta
  const meta = lookupMeta(requestPath);

  if (!meta) {
    // Unknown path -> return 404 with proper meta
    let result = template
      .replace(/<title>.*?<\/title>/, "<title>404 - Page Not Found | AIPT — AI Premium Tools</title>")
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, '<meta name="description" content="The page you requested was not found. Browse our AI subscriptions or return home." />')
      .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${SITE_URL}${requestPath}" />`);

    // Add hreflang on 404 too
    const hreflang = `    <link rel="alternate" hreflang="en" href="${SITE_URL}${requestPath}" />\n    <link rel="alternate" hreflang="x-default" href="${SITE_URL}${requestPath}" />\n  `;
    result = result.replace("</head>", hreflang + "\n</head>");

    res.type('text/html').status(404).send(result);
    return;
  }

  // Inject per-route meta tags
  let result = template
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${meta.canonical}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${meta.description}" />`);

  // Remove hardcoded canonical from index.html and set per-route
  if (result.includes('rel="canonical"')) {
    result = result.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${meta.canonical}" />`);
  } else {
    result = result.replace("</head>", `  <link rel="canonical" href="${meta.canonical}" />\n</head>`);
  }

  // Add hreflang tags for multi-language support
  const hreflangTags = `    <link rel="alternate" hreflang="en" href="${meta.canonical}" />\n    <link rel="alternate" hreflang="bn" href="${meta.canonical}?lang=bn" />\n    <link rel="alternate" hreflang="x-default" href="${meta.canonical}" />\n  `;
  result = result.replace("</head>", hreflangTags + "\n</head>");

  res.type('text/html').status(200).send(result);
}