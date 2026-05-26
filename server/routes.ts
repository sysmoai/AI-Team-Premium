import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { runAuditForProduct, runAuditAll, staleScoreFor } from "./audit-engine";
import { PRODUCT_SEED } from "./audit-seed";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { readFileSync } from "fs";
import { join } from "path";

const FALLBACK_USD_BDT = 121.5;
const RATE_TTL_MS = 24 * 60 * 60 * 1000;
const rateCache: { rate: number; fetchedAt: number; source: string } = {
  rate: FALLBACK_USD_BDT,
  fetchedAt: 0,
  source: "fallback",
};

async function fetchUsdToBdt(): Promise<{ rate: number; source: string }> {
  try {
    const r = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=BDT", {
      signal: AbortSignal.timeout(4000),
    });
    if (r.ok) {
      const data = (await r.json()) as { rates?: { BDT?: number } };
      const v = data?.rates?.BDT;
      if (typeof v === "number" && v > 60 && v < 200) {
        return { rate: v, source: "exchangerate.host" };
      }
    }
  } catch {}
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/USD", {
      signal: AbortSignal.timeout(4000),
    });
    if (r.ok) {
      const data = (await r.json()) as { rates?: { BDT?: number } };
      const v = data?.rates?.BDT;
      if (typeof v === "number" && v > 60 && v < 200) {
        return { rate: v, source: "open.er-api.com" };
      }
    }
  } catch {}
  return { rate: FALLBACK_USD_BDT, source: "fallback" };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health check for Cloud Run / load balancer probes
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "ai-team-premium-bd", timestamp: new Date().toISOString() });
  });

  // Seed product registry on startup (no-op if rows exist)
  storage.seedProductRegistry(PRODUCT_SEED).catch((err) => {
    console.error("[audit-seed] failed:", err);
  });

  app.get("/api/exchange-rate", async (_req, res) => {
    const now = Date.now();
    const fresh = now - rateCache.fetchedAt < RATE_TTL_MS && rateCache.source !== "fallback";
    if (!fresh) {
      const fetched = await fetchUsdToBdt();
      rateCache.rate = fetched.rate;
      rateCache.source = fetched.source;
      rateCache.fetchedAt = now;
    }
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.json({
      pair: "USD_BDT",
      rate: rateCache.rate,
      source: rateCache.source,
      fetchedAt: rateCache.fetchedAt,
      ttlMs: RATE_TTL_MS,
    });
  });

  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // ===== AUDIT DASHBOARD API =====
  app.get("/api/admin/audit/dashboard", async (_req, res) => {
    try {
      const summary = await storage.getAuditDashboardSummary();
      res.json(summary);
    } catch (err) {
      console.error("[audit] dashboard:", err);
      res.status(500).json({ message: "Failed to load dashboard" });
    }
  });

  app.get("/api/admin/audit/products", async (_req, res) => {
    try {
      const [products, counts] = await Promise.all([
        storage.getProductRegistry(),
        storage.getOpenIssueCountsByProduct(),
      ]);
      const withScores = products.map((p) => ({
        ...p,
        staleScore: staleScoreFor(p),
        openIssues: counts[p.id] ?? { P0: 0, P1: 0, P2: 0 },
      }));
      res.json(withScores);
    } catch (err) {
      console.error("[audit] products:", err);
      res.status(500).json({ message: "Failed to load products" });
    }
  });

  app.get("/api/admin/audit/log", async (req, res) => {
    try {
      const limit = Math.min(parseInt(String(req.query.limit || "100"), 10) || 100, 500);
      const offset = parseInt(String(req.query.offset || "0"), 10) || 0;
      const productId = req.query.productId ? parseInt(String(req.query.productId), 10) : undefined;
      const severity = req.query.severity ? String(req.query.severity) : undefined;
      const status = req.query.status ? String(req.query.status) : undefined;
      const log = await storage.getAuditLog({ limit, offset, productId, severity, status });
      res.json(log);
    } catch (err) {
      console.error("[audit] log:", err);
      res.status(500).json({ message: "Failed to load log" });
    }
  });

  app.get("/api/admin/audit/issues", async (req, res) => {
    try {
      const severity = req.query.severity ? String(req.query.severity) : undefined;
      const status = req.query.status ? String(req.query.status) : "open";
      const issues = await storage.getAuditIssues({ severity, status });
      res.json(issues);
    } catch (err) {
      console.error("[audit] issues:", err);
      res.status(500).json({ message: "Failed to load issues" });
    }
  });

  app.post("/api/admin/audit/run/:productId", async (req, res) => {
    try {
      const id = parseInt(req.params.productId, 10);
      if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid productId" });
      const result = await runAuditForProduct(id);
      if (!result.ok) return res.status(404).json({ message: "Product not found" });
      res.json(result);
    } catch (err) {
      console.error("[audit] run:", err);
      res.status(500).json({ message: "Audit failed" });
    }
  });

  app.post("/api/admin/audit/run-all", async (_req, res) => {
    try {
      const result = await runAuditAll();
      res.json(result);
    } catch (err) {
      console.error("[audit] run-all:", err);
      res.status(500).json({ message: "Audit failed" });
    }
  });

  app.post("/api/admin/migrate", async (_req, res) => {
    try {
      const migrationPath = join(process.cwd(), "migrations", "0001_init.sql");
      const sqlContent = readFileSync(migrationPath, "utf-8");
      await db.execute(sql.raw(sqlContent));
      res.json({ message: "Migration completed successfully" });
    } catch (err: any) {
      console.error("[migrate] failed:", err);
      res.status(500).json({ message: "Migration failed", error: err.message });
    }
  });

  app.patch("/api/admin/audit/issues/:id/resolve", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid id" });
      const issue = await storage.resolveAuditIssue(id);
      if (!issue) return res.status(404).json({ message: "Issue not found" });
      res.json(issue);
    } catch (err) {
      console.error("[audit] resolve:", err);
      res.status(500).json({ message: "Failed to resolve issue" });
    }
  });

  return httpServer;
}
