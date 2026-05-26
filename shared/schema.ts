import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  service: text("service"),
  needs: text("needs").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(2, "Name must be at least 2 characters"),
    whatsapp: z
      .string()
      .min(10, "Please enter a valid WhatsApp number")
      .regex(/^[\+\d\s\-\(\)]+$/, "Please enter a valid phone number"),
    service: z.string().optional(),
    needs: z.string().min(10, "Please describe your needs in at least 10 characters"),
  });

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export const productRegistry = pgTable("product_registry", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  officialUrls: text("official_urls").array().notNull(),
  auditFrequencyDays: integer("audit_frequency_days").notNull(),
  priority: text("priority").notNull(),
  baselinePriceUsd: integer("baseline_price_usd"),
  baselineData: jsonb("baseline_data"),
  lastAuditedAt: timestamp("last_audited_at"),
  lastVerifiedAt: timestamp("last_verified_at"),
  staleScore: text("stale_score").notNull().default("fresh"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const auditLog = pgTable("audit_log", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  phase: integer("phase").notNull(),
  field: text("field").notNull(),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  sourceUrl: text("source_url"),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("flagged"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const auditIssues = pgTable("audit_issues", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  phase: integer("phase").notNull(),
  issueType: text("issue_type").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("open"),
  detectedAt: timestamp("detected_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const insertProductRegistrySchema = createInsertSchema(productRegistry).omit({
  id: true,
  createdAt: true,
});
export const insertAuditLogSchema = createInsertSchema(auditLog).omit({ id: true, createdAt: true });
export const insertAuditIssueSchema = createInsertSchema(auditIssues).omit({
  id: true,
  detectedAt: true,
  resolvedAt: true,
});

export type ProductRegistry = typeof productRegistry.$inferSelect;
export type InsertProductRegistry = z.infer<typeof insertProductRegistrySchema>;
export type AuditLogEntry = typeof auditLog.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;
export type AuditIssue = typeof auditIssues.$inferSelect;
export type InsertAuditIssue = z.infer<typeof insertAuditIssueSchema>;
