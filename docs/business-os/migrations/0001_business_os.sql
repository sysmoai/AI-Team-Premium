-- docs/business-os/migrations/0001_business_os.sql
-- AI Team Premium (U05) Business OS — D1/SQLite schema. DESIGN + LOCAL TEST ONLY:
-- not applied to any remote database. Applied by scripts/business-os/migrate.mjs
-- (local) or `wrangler d1 migrations apply` (only after the owner creates the DB).
-- The database itself enforces the money and consent rules, so a bug or a
-- compromised application path cannot create a paid order or an acceptance
-- that the rules forbid. (A privileged DB operator can still drop triggers —
-- external signed checkpoints, table audit_checkpoints, cover that case.)

CREATE TABLE staff_grants (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  subject TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('business_owner','strategic_admin','operations_manager','sales_support','content_editor','finance_reviewer','fulfillment_operator','auditor')),
  active INTEGER NOT NULL DEFAULT 0 CHECK (active IN (0,1)),
  granted_by TEXT NOT NULL,
  granted_at TEXT NOT NULL,
  expires_at TEXT,
  revoked_at TEXT,
  UNIQUE (subject, role)
);

CREATE TABLE quotes (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  version_digest TEXT NOT NULL,
  offer_kind TEXT NOT NULL CHECK (offer_kind IN ('product','service')),
  offer_id TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 50),
  unit TEXT,
  unit_price_bdt INTEGER NOT NULL CHECK (unit_price_bdt > 0),
  total_bdt INTEGER NOT NULL CHECK (total_bdt = unit_price_bdt * quantity),
  terms_version TEXT NOT NULL,
  payment_policy_version TEXT NOT NULL,
  customer_ref TEXT NOT NULL,
  body_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  prepared_by TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'PENDING' CHECK (state IN ('PENDING','ACCEPTED','CONVERTED')),
  synthetic INTEGER NOT NULL DEFAULT 0 CHECK (synthetic IN (0,1))
);
-- Quote content is immutable once written.
CREATE TRIGGER quotes_content_immutable BEFORE UPDATE OF version_digest, offer_kind, offer_id, quantity, unit_price_bdt, total_bdt, terms_version, customer_ref, body_json, expires_at ON quotes
BEGIN SELECT RAISE(ABORT, 'quote content is immutable'); END;
CREATE TRIGGER quotes_state_machine BEFORE UPDATE OF state ON quotes
WHEN NOT ((OLD.state = 'PENDING' AND NEW.state = 'ACCEPTED') OR (OLD.state = 'ACCEPTED' AND NEW.state = 'CONVERTED'))
BEGIN SELECT RAISE(ABORT, 'invalid quote state change'); END;
CREATE TRIGGER quotes_accept_needs_customer_acceptance BEFORE UPDATE OF state ON quotes
WHEN NEW.state = 'ACCEPTED' AND NOT EXISTS (SELECT 1 FROM quote_acceptances a WHERE a.quote_id = NEW.id AND a.quote_version = NEW.version_digest)
BEGIN SELECT RAISE(ABORT, 'no customer acceptance for this quote version'); END;

-- One-time acceptance challenges delivered to the CUSTOMER's channel. Only the
-- hash of the secret is stored; staff never see the secret.
CREATE TABLE acceptance_challenges (
  id TEXT PRIMARY KEY,
  nonce_hash TEXT NOT NULL UNIQUE,
  quote_id TEXT NOT NULL REFERENCES quotes(id),
  quote_version TEXT NOT NULL,
  customer_ref TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  consumed_at TEXT
);
CREATE TRIGGER challenge_single_use BEFORE UPDATE ON acceptance_challenges
WHEN OLD.consumed_at IS NOT NULL OR NEW.nonce_hash != OLD.nonce_hash OR NEW.quote_version != OLD.quote_version OR NEW.customer_ref != OLD.customer_ref
BEGIN SELECT RAISE(ABORT, 'challenge already used or altered'); END;

CREATE TABLE quote_acceptances (
  quote_id TEXT PRIMARY KEY REFERENCES quotes(id),
  challenge_id TEXT NOT NULL UNIQUE REFERENCES acceptance_challenges(id),
  quote_version TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('customer_link','trusted_channel_signature')),
  evidence_id TEXT NOT NULL,
  accepted_at TEXT NOT NULL,
  terms_version TEXT NOT NULL,
  customer_ref TEXT NOT NULL
);
CREATE TRIGGER acceptance_requires_consumed_matching_challenge BEFORE INSERT ON quote_acceptances
WHEN NOT EXISTS (
  SELECT 1 FROM acceptance_challenges c JOIN quotes q ON q.id = c.quote_id
  WHERE c.id = NEW.challenge_id AND c.quote_id = NEW.quote_id AND c.consumed_at IS NOT NULL
    AND c.quote_version = NEW.quote_version AND q.version_digest = NEW.quote_version
    AND c.customer_ref = NEW.customer_ref AND q.customer_ref = NEW.customer_ref
    AND q.terms_version = NEW.terms_version AND q.state = 'PENDING' AND q.expires_at > NEW.accepted_at)
BEGIN SELECT RAISE(ABORT, 'acceptance does not match a consumed customer challenge'); END;
CREATE TRIGGER acceptance_immutable_u BEFORE UPDATE ON quote_acceptances BEGIN SELECT RAISE(ABORT, 'acceptance is immutable'); END;
CREATE TRIGGER acceptance_immutable_d BEFORE DELETE ON quote_acceptances BEGIN SELECT RAISE(ABORT, 'acceptance is immutable'); END;

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  quote_id TEXT NOT NULL UNIQUE REFERENCES quotes(id),
  idempotency_key TEXT NOT NULL UNIQUE,
  customer_ref TEXT NOT NULL,
  amount_bdt INTEGER NOT NULL CHECK (amount_bdt > 0),
  state TEXT NOT NULL CHECK (state = 'PAYMENT_REVIEW' OR state IN ('PAYMENT_VERIFIED','ASSIGNED','FULFILLING','DELIVERED','CLOSED','CANCELLED','FAILED','DISPUTED','REFUND_REVIEW','REFUNDED')),
  tracking_token_hash TEXT NOT NULL UNIQUE,
  assignee TEXT,
  created_at TEXT NOT NULL,
  synthetic INTEGER NOT NULL DEFAULT 0 CHECK (synthetic IN (0,1))
);
CREATE TRIGGER orders_only_from_accepted_quote BEFORE INSERT ON orders
WHEN NEW.state != 'PAYMENT_REVIEW' OR NOT EXISTS (
  SELECT 1 FROM quotes q WHERE q.id = NEW.quote_id AND q.state = 'ACCEPTED'
    AND q.total_bdt = NEW.amount_bdt AND q.customer_ref = NEW.customer_ref AND q.synthetic = NEW.synthetic)
BEGIN SELECT RAISE(ABORT, 'order must come from an accepted quote with the same amount and customer'); END;
CREATE TRIGGER orders_amount_customer_immutable BEFORE UPDATE OF amount_bdt, customer_ref, quote_id, idempotency_key, tracking_token_hash, synthetic ON orders
BEGIN SELECT RAISE(ABORT, 'order identity and amount are immutable'); END;

CREATE TABLE allowed_transitions (from_state TEXT NOT NULL, to_state TEXT NOT NULL, PRIMARY KEY (from_state, to_state));
INSERT INTO allowed_transitions VALUES
 ('PAYMENT_REVIEW','PAYMENT_VERIFIED'),('PAYMENT_REVIEW','CANCELLED'),('PAYMENT_REVIEW','DISPUTED'),
 ('PAYMENT_VERIFIED','ASSIGNED'),('PAYMENT_VERIFIED','REFUND_REVIEW'),
 ('ASSIGNED','FULFILLING'),('ASSIGNED','REFUND_REVIEW'),
 ('FULFILLING','DELIVERED'),('FULFILLING','FAILED'),('FULFILLING','REFUND_REVIEW'),
 ('FAILED','FULFILLING'),('FAILED','REFUND_REVIEW'),
 ('DELIVERED','CLOSED'),('DELIVERED','DISPUTED'),('DELIVERED','REFUND_REVIEW'),
 ('DISPUTED','REFUND_REVIEW'),('DISPUTED','DELIVERED'),('DISPUTED','CANCELLED'),
 ('REFUND_REVIEW','REFUNDED'),('REFUND_REVIEW','DELIVERED');
CREATE TRIGGER allowed_transitions_frozen_i BEFORE INSERT ON allowed_transitions BEGIN SELECT RAISE(ABORT, 'transition table is fixed by migration'); END;
CREATE TRIGGER allowed_transitions_frozen_u BEFORE UPDATE ON allowed_transitions BEGIN SELECT RAISE(ABORT, 'transition table is fixed by migration'); END;
CREATE TRIGGER allowed_transitions_frozen_d BEFORE DELETE ON allowed_transitions BEGIN SELECT RAISE(ABORT, 'transition table is fixed by migration'); END;

CREATE TRIGGER orders_state_machine BEFORE UPDATE OF state ON orders
WHEN NOT EXISTS (SELECT 1 FROM allowed_transitions t WHERE t.from_state = OLD.state AND t.to_state = NEW.state)
BEGIN SELECT RAISE(ABORT, 'invalid order transition'); END;
CREATE TRIGGER orders_verified_needs_settlement BEFORE UPDATE OF state ON orders
WHEN NEW.state = 'PAYMENT_VERIFIED' AND NOT EXISTS (
  SELECT 1 FROM settlements s WHERE s.allocated_to = NEW.id AND s.amount_poisha = NEW.amount_bdt * 100)
BEGIN SELECT RAISE(ABORT, 'no allocated receiving-side settlement for this order amount'); END;

-- Trusted statement sources: the PRIVATE signing key stays with the importer,
-- outside this system. Only the owner can register a source.
CREATE TABLE statement_sources (
  source_id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  receiving_account_ref TEXT NOT NULL,
  public_key_jwk TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0,1)),
  registered_by TEXT NOT NULL,
  registered_at TEXT NOT NULL
);
CREATE TABLE settlements (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES statement_sources(source_id),
  transaction_id TEXT NOT NULL,
  statement_ref TEXT NOT NULL,
  receiving_account_ref TEXT NOT NULL,
  currency TEXT NOT NULL CHECK (currency = 'BDT'),
  amount_poisha INTEGER NOT NULL CHECK (amount_poisha > 0),
  tx_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status = 'settled'),
  signature TEXT NOT NULL,
  imported_by TEXT NOT NULL,
  imported_at TEXT NOT NULL,
  allocated_to TEXT UNIQUE REFERENCES orders(id),
  UNIQUE (source_id, transaction_id)
);
CREATE TRIGGER settlements_from_active_source BEFORE INSERT ON settlements
WHEN NEW.allocated_to IS NOT NULL OR NOT EXISTS (
  SELECT 1 FROM statement_sources s WHERE s.source_id = NEW.source_id AND s.active = 1 AND s.receiving_account_ref = NEW.receiving_account_ref)
BEGIN SELECT RAISE(ABORT, 'settlement must come unallocated from an active source for its own receiving account'); END;
CREATE TRIGGER settlements_allocate_once BEFORE UPDATE ON settlements
WHEN OLD.allocated_to IS NOT NULL
  OR NEW.amount_poisha != OLD.amount_poisha OR NEW.transaction_id != OLD.transaction_id OR NEW.source_id != OLD.source_id
  OR NEW.receiving_account_ref != OLD.receiving_account_ref OR NEW.signature != OLD.signature
  OR NOT EXISTS (SELECT 1 FROM orders o WHERE o.id = NEW.allocated_to AND o.amount_bdt * 100 = NEW.amount_poisha AND o.state = 'PAYMENT_REVIEW')
BEGIN SELECT RAISE(ABORT, 'settlement can be allocated once, to one PAYMENT_REVIEW order of the same amount'); END;
CREATE TRIGGER settlements_no_delete BEFORE DELETE ON settlements BEGIN SELECT RAISE(ABORT, 'settlements are append-only'); END;

CREATE TABLE customer_payment_reports (
  id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id),
  method TEXT, reference TEXT, screenshot_ref TEXT, reported_by TEXT NOT NULL, at TEXT NOT NULL
);

-- Hash-chained, append-only event log. chain_head is advanced only by the
-- trigger, and an insert must name the current head (compare-and-set), so two
-- concurrent writers cannot both succeed and nothing can be inserted mid-chain.
CREATE TABLE chain_head (id INTEGER PRIMARY KEY CHECK (id = 1), count INTEGER NOT NULL, hash TEXT NOT NULL);
INSERT INTO chain_head VALUES (1, 0, 'GENESIS');
CREATE TABLE order_events (
  chain_seq INTEGER PRIMARY KEY,
  order_id TEXT REFERENCES orders(id),
  type TEXT NOT NULL,
  actor TEXT NOT NULL,
  from_state TEXT,
  to_state TEXT,
  data TEXT,
  at TEXT NOT NULL,
  prev_hash TEXT NOT NULL,
  hash TEXT NOT NULL UNIQUE
);
CREATE TRIGGER events_compare_and_set BEFORE INSERT ON order_events
WHEN NEW.prev_hash != (SELECT hash FROM chain_head WHERE id = 1) OR NEW.chain_seq != (SELECT count + 1 FROM chain_head WHERE id = 1)
BEGIN SELECT RAISE(ABORT, 'event chain head moved'); END;
CREATE TRIGGER events_state_matches BEFORE INSERT ON order_events
WHEN NEW.to_state IS NOT NULL AND (SELECT state FROM orders WHERE id = NEW.order_id) IS NOT NEW.from_state
BEGIN SELECT RAISE(ABORT, 'event from_state does not match the order'); END;
CREATE TRIGGER events_advance_head AFTER INSERT ON order_events
BEGIN UPDATE chain_head SET count = NEW.chain_seq, hash = NEW.hash WHERE id = 1; END;
CREATE TRIGGER events_no_update BEFORE UPDATE ON order_events BEGIN SELECT RAISE(ABORT, 'events are append-only'); END;
CREATE TRIGGER events_no_delete BEFORE DELETE ON order_events BEGIN SELECT RAISE(ABORT, 'events are append-only'); END;
CREATE TRIGGER chain_head_forward_only BEFORE UPDATE ON chain_head
WHEN NEW.count != OLD.count + 1 OR NEW.hash != (SELECT hash FROM order_events WHERE chain_seq = NEW.count)
BEGIN SELECT RAISE(ABORT, 'chain head can only follow the event log'); END;

-- Copies of externally signed checkpoints (the authoritative copy is exported
-- to the owner, outside this database).
CREATE TABLE audit_checkpoints (count INTEGER PRIMARY KEY, head TEXT NOT NULL, signed_at TEXT NOT NULL, signature TEXT NOT NULL);

CREATE TABLE outbox (
  id TEXT PRIMARY KEY, order_id TEXT REFERENCES orders(id), kind TEXT NOT NULL,
  recipient_channel TEXT NOT NULL CHECK (recipient_channel IN ('customer','staff')),
  payload TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','SENT','DEAD_LETTER')),
  last_error TEXT, created_at TEXT NOT NULL,
  -- customer payloads (one-time links) are stored only encrypted, and nothing is kept after delivery ends
  CHECK (recipient_channel <> 'customer' OR payload = '{}' OR payload LIKE '{"sealed":"%"}'),
  CHECK (status = 'PENDING' OR payload = '{}')
);

CREATE TABLE tickets (
  id TEXT PRIMARY KEY, business_id TEXT NOT NULL CHECK (business_id = 'U05'),
  order_id TEXT REFERENCES orders(id), category TEXT, status TEXT NOT NULL DEFAULT 'OPEN',
  customer_confirmed_resolution INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL
);
CREATE TABLE ticket_events (id INTEGER PRIMARY KEY AUTOINCREMENT, ticket_id TEXT NOT NULL REFERENCES tickets(id), to_status TEXT NOT NULL, actor TEXT NOT NULL, note TEXT, at TEXT NOT NULL);

-- NULL means UNKNOWN, never 0.
CREATE TABLE order_costs (
  order_id TEXT PRIMARY KEY REFERENCES orders(id),
  recognized_revenue_bdt INTEGER, supplier_cost INTEGER, processing_fee INTEGER,
  fulfillment_labor INTEGER, support_labor INTEGER, refunds INTEGER, acquisition_cost INTEGER,
  recorded_by TEXT NOT NULL, at TEXT NOT NULL
);

CREATE TABLE audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, actor TEXT, capability TEXT, code TEXT, ref TEXT, at TEXT NOT NULL);
CREATE TRIGGER audit_log_no_update BEFORE UPDATE ON audit_log BEGIN SELECT RAISE(ABORT, 'audit log is append-only'); END;
CREATE TRIGGER audit_log_no_delete BEFORE DELETE ON audit_log BEGIN SELECT RAISE(ABORT, 'audit log is append-only'); END;
