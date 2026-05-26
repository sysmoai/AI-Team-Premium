import { storage } from "./storage";
import { RETIRED_MODELS } from "./audit-seed";
import type { ProductRegistry } from "@shared/schema";

/**
 * 8-phase audit protocol.
 * Phase 1: Baseline capture (from registry)
 * Phase 2: Source check (manual — flag if URL changed)
 * Phase 3: Diff against last known
 * Phase 4: Severity classification
 * Phase 5: Issue creation (flag for human review)
 * Phase 6: Notification (stub)
 * Phase 7: Log write
 * Phase 8: Stale score calculation
 */

function computeStaleScore(product: ProductRegistry): "fresh" | "aging" | "stale" | "rotten" {
  if (!product.lastAuditedAt) return "rotten";
  const ageDays = (Date.now() - new Date(product.lastAuditedAt).getTime()) / (1000 * 60 * 60 * 24);
  const freq = product.auditFrequencyDays || 7;
  const ratio = ageDays / freq;
  if (ratio < 0.5) return "fresh";
  if (ratio < 1) return "aging";
  if (ratio < 2) return "stale";
  return "rotten";
}

export function staleScoreFor(product: ProductRegistry): string {
  return computeStaleScore(product);
}

function scanRetiredModels(text: string): string[] {
  const hits: string[] = [];
  for (const m of RETIRED_MODELS) {
    const re = new RegExp(`\\b${m.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) hits.push(m);
  }
  return hits;
}

export async function runAuditForProduct(productId: number): Promise<{ ok: boolean; issuesCreated: number; logsCreated: number }> {
  const product = await storage.getProductById(productId);
  if (!product) return { ok: false, issuesCreated: 0, logsCreated: 0 };

  let issuesCreated = 0;
  let logsCreated = 0;

  const baseline = (product.baselineData as Record<string, unknown> | null) || {};
  const baselineModel = typeof baseline.model === "string" ? (baseline.model as string) : "";

  if (baselineModel) {
    const retiredHits = scanRetiredModels(baselineModel);
    for (const m of retiredHits) {
      await storage.createAuditIssue({
        productId,
        phase: 5,
        issueType: "retired_model",
        description: `Retired model "${m}" detected in baseline for ${product.name}. Update to current model.`,
        severity: "P0",
        status: "open",
      });
      await storage.createAuditLogEntry({
        productId,
        phase: 5,
        field: "model",
        oldValue: m,
        newValue: null,
        sourceUrl: product.officialUrls?.[0] || null,
        severity: "P0",
        status: "flagged",
        notes: "Retired model name found",
      });
      issuesCreated++;
      logsCreated++;
    }
  }

  await storage.createAuditLogEntry({
    productId,
    phase: 7,
    field: "audit_cycle",
    oldValue: null,
    newValue: "completed",
    sourceUrl: product.officialUrls?.[0] || null,
    severity: product.priority,
    status: "ok",
    notes: `Audit cycle completed at ${new Date().toISOString()}`,
  });
  logsCreated++;

  const refreshed = await storage.getProductById(productId);
  const newScore = refreshed ? computeStaleScore({ ...refreshed, lastAuditedAt: new Date() } as ProductRegistry) : "fresh";
  await storage.updateProductLastAudited(productId, newScore);

  return { ok: true, issuesCreated, logsCreated };
}

export async function runAuditAll(): Promise<{ scanned: number; issuesCreated: number; logsCreated: number }> {
  const products = await storage.getProductRegistry();
  let scanned = 0;
  let issuesCreated = 0;
  let logsCreated = 0;
  for (const p of products) {
    const r = await runAuditForProduct(p.id);
    if (r.ok) scanned++;
    issuesCreated += r.issuesCreated;
    logsCreated += r.logsCreated;
  }
  return { scanned, issuesCreated, logsCreated };
}
