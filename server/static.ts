// server/static.ts — Static file serving with SEO injection
import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { handleSeoRequest } from "./seo";

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // Catch-all: serve index.html with per-route SEO meta injection
  // Returns 200 for known routes, 404 for unknown routes
  // All routes get unique title, meta description, canonical URL, OG tags, and hreflang
  app.use("/{*path}", handleSeoRequest);
}