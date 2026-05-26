import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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

  return httpServer;
}