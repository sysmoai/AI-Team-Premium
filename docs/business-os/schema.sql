-- docs/business-os/schema.sql — DESIGN ONLY. Not provisioned, not migrated.
-- Target: one dedicated Cloudflare D1 database owned by AI Team Premium's
-- Cloudflare account (U05), created only after the owner authorises it.
-- Mirrors lib/business-os/* rules at the storage layer (defence in depth).
-- No table may hold passwords, OTPs, card data or provider credentials.

CREATE TABLE staff_grants (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  subject TEXT NOT NULL, role TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 0,
  granted_by TEXT NOT NULL, granted_at TEXT NOT NULL, expires_at TEXT, revoked_at TEXT
);

CREATE TABLE leads (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  source TEXT NOT NULL, contact TEXT, consent_marketing INTEGER NOT NULL DEFAULT 0,
  consent_at TEXT, interest TEXT, need TEXT, budget TEXT, assigned_to TEXT,
  stage TEXT NOT NULL DEFAULT 'NEW', last_contact_at TEXT, next_action TEXT,
  delete_after TEXT NOT NULL,
  CHECK (contact IS NULL OR consent_marketing = 1)
);

CREATE TABLE quotes (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  offer_kind TEXT NOT NULL CHECK (offer_kind IN ('product','service')), offer_id TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 50), unit TEXT,
  unit_price_bdt INTEGER NOT NULL CHECK (unit_price_bdt > 0), total_bdt INTEGER NOT NULL,
  terms_version TEXT NOT NULL, payment_policy_version TEXT NOT NULL,
  customer_ref TEXT, created_at TEXT NOT NULL, expires_at TEXT NOT NULL,
  prepared_by TEXT NOT NULL, customer_acceptance TEXT NOT NULL DEFAULT 'PENDING'
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  quote_id TEXT NOT NULL REFERENCES quotes(id), idempotency_key TEXT NOT NULL UNIQUE,
  customer_ref TEXT, amount_bdt INTEGER NOT NULL, state TEXT NOT NULL,
  tracking_token TEXT NOT NULL UNIQUE, assignee TEXT, created_at TEXT NOT NULL
);

-- Append-only, hash-chained. Application never UPDATEs or DELETEs.
CREATE TABLE order_events (
  seq INTEGER PRIMARY KEY AUTOINCREMENT, order_id TEXT NOT NULL REFERENCES orders(id),
  type TEXT NOT NULL, actor TEXT NOT NULL, data TEXT, at TEXT NOT NULL,
  prev_hash TEXT NOT NULL, hash TEXT NOT NULL UNIQUE
);
CREATE TRIGGER order_events_no_update BEFORE UPDATE ON order_events BEGIN SELECT RAISE(ABORT, 'append-only'); END;
CREATE TRIGGER order_events_no_delete BEFORE DELETE ON order_events BEGIN SELECT RAISE(ABORT, 'append-only'); END;
CREATE TRIGGER orders_terminal_immutable BEFORE UPDATE OF state ON orders
  WHEN OLD.state IN ('CLOSED','CANCELLED','REFUNDED') BEGIN SELECT RAISE(ABORT, 'terminal state'); END;

-- Receiving-side statement lines only (never a screenshot).
CREATE TABLE settlements (
  reference TEXT PRIMARY KEY, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  receiving_account_ref TEXT NOT NULL, amount_bdt INTEGER NOT NULL CHECK (amount_bdt > 0),
  source TEXT NOT NULL CHECK (source = 'receiving_side_statement'),
  allocated_to TEXT UNIQUE REFERENCES orders(id), recorded_by TEXT NOT NULL, at TEXT NOT NULL
);
CREATE TRIGGER orders_verified_needs_settlement BEFORE UPDATE OF state ON orders
  WHEN NEW.state = 'PAYMENT_VERIFIED' AND NOT EXISTS (SELECT 1 FROM settlements WHERE allocated_to = NEW.id AND amount_bdt = NEW.amount_bdt)
  BEGIN SELECT RAISE(ABORT, 'no matching settlement'); END;

CREATE TABLE customer_payment_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT, order_id TEXT NOT NULL REFERENCES orders(id),
  method TEXT, reference TEXT, screenshot_ref TEXT, at TEXT NOT NULL
);

CREATE TABLE outbox (
  id INTEGER PRIMARY KEY AUTOINCREMENT, order_id TEXT, kind TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING','SENT','DEAD_LETTER')),
  last_error TEXT, created_at TEXT NOT NULL
);

CREATE TABLE tickets (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  order_id TEXT REFERENCES orders(id), category TEXT, priority TEXT, assignee TEXT,
  status TEXT NOT NULL DEFAULT 'OPEN', customer_confirmed_resolution INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ticket_events (id INTEGER PRIMARY KEY AUTOINCREMENT, ticket_id TEXT NOT NULL REFERENCES tickets(id), to_status TEXT NOT NULL, actor TEXT NOT NULL, note TEXT, at TEXT NOT NULL);

CREATE TABLE subscriptions_terms (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  order_id TEXT REFERENCES orders(id), provider_permitted INTEGER NOT NULL DEFAULT 0,
  term_ends_at TEXT NOT NULL, consent_to_remind INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE renewal_reminders (key TEXT PRIMARY KEY, subscription_id TEXT NOT NULL, sent_at TEXT NOT NULL);

-- Costs are nullable on purpose: NULL means UNKNOWN, never 0.
CREATE TABLE order_costs (
  order_id TEXT PRIMARY KEY REFERENCES orders(id), recognized_revenue_bdt INTEGER,
  supplier_cost INTEGER, processing_fee INTEGER, fulfillment_labor INTEGER, support_labor INTEGER,
  refunds INTEGER, acquisition_cost INTEGER, recorded_by TEXT, at TEXT
);
CREATE TABLE fixed_overheads (period TEXT PRIMARY KEY, amount_bdt INTEGER, source TEXT NOT NULL);

CREATE TABLE audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, actor TEXT, capability TEXT, code TEXT, at TEXT NOT NULL);
CREATE TABLE agent_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT, actor TEXT NOT NULL, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  source TEXT, task_id TEXT, permission TEXT, input_class TEXT, result TEXT, evidence TEXT,
  cost_usd REAL, approval TEXT, status TEXT, at TEXT NOT NULL
);
