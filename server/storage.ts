import { db } from "./db";
import {
  contacts,
  productRegistry,
  auditLog,
  auditIssues,
  type InsertContact,
  type Contact,
  type ProductRegistry,
  type InsertProductRegistry,
  type AuditLogEntry,
  type InsertAuditLog,
  type AuditIssue,
  type InsertAuditIssue,
} from "@shared/schema";
import { and, desc, eq, sql } from "drizzle-orm";

export interface AuditLogFilter {
  productId?: number;
  severity?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface AuditIssueFilter {
  severity?: string;
  status?: string;
}

export interface AuditDashboardSummary {
  totalProducts: number;
  p0Open: number;
  p1Open: number;
  p2Open: number;
  changesToday: number;
  brokenLinks: number;
  priceChanges: number;
}

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getProductRegistry(): Promise<ProductRegistry[]>;
  getProductById(id: number): Promise<ProductRegistry | undefined>;
  seedProductRegistry(rows: InsertProductRegistry[]): Promise<void>;
  updateProductLastAudited(id: number, staleScore: string): Promise<void>;
  getAuditLog(filter?: AuditLogFilter): Promise<AuditLogEntry[]>;
  createAuditLogEntry(entry: InsertAuditLog): Promise<AuditLogEntry>;
  getAuditIssues(filter?: AuditIssueFilter): Promise<AuditIssue[]>;
  createAuditIssue(issue: InsertAuditIssue): Promise<AuditIssue>;
  resolveAuditIssue(id: number): Promise<AuditIssue | undefined>;
  getAuditDashboardSummary(): Promise<AuditDashboardSummary>;
}

export class DatabaseStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async getProductRegistry(): Promise<ProductRegistry[]> {
    return await db.select().from(productRegistry).orderBy(productRegistry.priority, productRegistry.name);
  }

  async getProductById(id: number): Promise<ProductRegistry | undefined> {
    const [row] = await db.select().from(productRegistry).where(eq(productRegistry.id, id));
    return row;
  }

  async seedProductRegistry(rows: InsertProductRegistry[]): Promise<void> {
    const existing = await db.select({ c: sql<number>`count(*)::int` }).from(productRegistry);
    if ((existing[0]?.c ?? 0) > 0) return;
    await db.insert(productRegistry).values(rows);
  }

  async updateProductLastAudited(id: number, staleScore: string): Promise<void> {
    await db
      .update(productRegistry)
      .set({ lastAuditedAt: new Date(), lastVerifiedAt: new Date(), staleScore })
      .where(eq(productRegistry.id, id));
  }

  async getAuditLog(filter: AuditLogFilter = {}): Promise<AuditLogEntry[]> {
    const conds = [] as any[];
    if (filter.productId) conds.push(eq(auditLog.productId, filter.productId));
    if (filter.severity) conds.push(eq(auditLog.severity, filter.severity));
    if (filter.status) conds.push(eq(auditLog.status, filter.status));
    const q = db.select().from(auditLog);
    const filtered = conds.length ? q.where(and(...conds)) : q;
    return await filtered.orderBy(desc(auditLog.createdAt)).limit(filter.limit ?? 100).offset(filter.offset ?? 0);
  }

  async createAuditLogEntry(entry: InsertAuditLog): Promise<AuditLogEntry> {
    const [row] = await db.insert(auditLog).values(entry).returning();
    return row;
  }

  async getAuditIssues(filter: AuditIssueFilter = {}): Promise<AuditIssue[]> {
    const conds = [] as any[];
    if (filter.severity) conds.push(eq(auditIssues.severity, filter.severity));
    if (filter.status) conds.push(eq(auditIssues.status, filter.status));
    const q = db.select().from(auditIssues);
    const filtered = conds.length ? q.where(and(...conds)) : q;
    return await filtered.orderBy(desc(auditIssues.detectedAt)).limit(500);
  }

  async createAuditIssue(issue: InsertAuditIssue): Promise<AuditIssue> {
    const [row] = await db.insert(auditIssues).values(issue).returning();
    return row;
  }

  async resolveAuditIssue(id: number): Promise<AuditIssue | undefined> {
    const [row] = await db
      .update(auditIssues)
      .set({ status: "resolved", resolvedAt: new Date() })
      .where(eq(auditIssues.id, id))
      .returning();
    return row;
  }

  async getAuditDashboardSummary(): Promise<AuditDashboardSummary> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const [productCount] = await db.select({ c: sql<number>`count(*)::int` }).from(productRegistry);
    const openIssues = await db
      .select({ severity: auditIssues.severity, c: sql<number>`count(*)::int` })
      .from(auditIssues)
      .where(eq(auditIssues.status, "open"))
      .groupBy(auditIssues.severity);
    const sevMap: Record<string, number> = {};
    for (const r of openIssues) sevMap[r.severity] = r.c;
    const [changesToday] = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(auditLog)
      .where(sql`${auditLog.createdAt} >= ${startOfDay}`);
    const [brokenLinks] = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(auditIssues)
      .where(and(eq(auditIssues.issueType, "broken_link"), eq(auditIssues.status, "open")));
    const [priceChanges] = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(auditLog)
      .where(and(eq(auditLog.field, "price_usd"), sql`${auditLog.createdAt} >= ${startOfDay}`));
    return {
      totalProducts: productCount?.c ?? 0,
      p0Open: sevMap["P0"] ?? 0,
      p1Open: sevMap["P1"] ?? 0,
      p2Open: sevMap["P2"] ?? 0,
      changesToday: changesToday?.c ?? 0,
      brokenLinks: brokenLinks?.c ?? 0,
      priceChanges: priceChanges?.c ?? 0,
    };
  }
}

export const storage = new DatabaseStorage();
