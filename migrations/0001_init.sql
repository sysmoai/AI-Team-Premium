-- AI Team Premium — Initial Schema
-- Created for CORTEX OS deployment

CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"whatsapp" text NOT NULL,
	"service" text,
	"needs" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "product_registry" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"company" text NOT NULL,
	"official_urls" text[] NOT NULL,
	"audit_frequency_days" integer NOT NULL,
	"priority" text NOT NULL,
	"baseline_price_usd" integer,
	"baseline_data" jsonb,
	"last_audited_at" timestamp,
	"last_verified_at" timestamp,
	"stale_score" text NOT NULL DEFAULT 'fresh',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "product_registry_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"phase" integer NOT NULL,
	"field" text NOT NULL,
	"old_value" text,
	"new_value" text,
	"source_url" text,
	"severity" text NOT NULL,
	"status" text NOT NULL DEFAULT 'flagged',
	"notes" text,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "audit_issues" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"phase" integer NOT NULL,
	"issue_type" text NOT NULL,
	"description" text NOT NULL,
	"severity" text NOT NULL,
	"status" text NOT NULL DEFAULT 'open',
	"detected_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
