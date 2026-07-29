-- ============================================================================
-- AI TEAM PREMIUM — SUPABASE DATABASE PRODUCTION SETUP
-- ============================================================================
-- Supabase Project #2: pithaeusshfuancyjntd.supabase.co
-- Execute this SQL in the Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- SCHEMAS
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS auth_extensions;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS api;

-- ============================================================================
-- AUDIT TABLES
-- ============================================================================

-- Audit Log Table
CREATE TABLE IF NOT EXISTS public.audit_log (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  phase INTEGER NOT NULL,
  field TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  source_url TEXT,
  severity TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'flagged',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for audit_log
CREATE INDEX IF NOT EXISTS audit_log_product_id_idx ON public.audit_log(product_id);
CREATE INDEX IF NOT EXISTS audit_log_created_at_idx ON public.audit_log(created_at);
CREATE INDEX IF NOT EXISTS audit_log_status_idx ON public.audit_log(status);

-- Audit Issues Table
CREATE TABLE IF NOT EXISTS public.audit_issues (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  phase INTEGER NOT NULL,
  issue_type TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for audit_issues
CREATE INDEX IF NOT EXISTS audit_issues_product_id_idx ON public.audit_issues(product_id);
CREATE INDEX IF NOT EXISTS audit_issues_status_idx ON public.audit_issues(status);
CREATE INDEX IF NOT EXISTS audit_issues_severity_idx ON public.audit_issues(severity);

-- Product Registry Table
CREATE TABLE IF NOT EXISTS public.product_registry (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  official_urls TEXT[] NOT NULL,
  audit_frequency_days INTEGER NOT NULL,
  priority TEXT NOT NULL,
  baseline_price_usd INTEGER,
  baseline_data JSONB,
  last_audited_at TIMESTAMP WITH TIME ZONE,
  last_verified_at TIMESTAMP WITH TIME ZONE,
  stale_score TEXT NOT NULL DEFAULT 'fresh',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for product_registry
CREATE INDEX IF NOT EXISTS product_registry_slug_idx ON public.product_registry(slug);
CREATE INDEX IF NOT EXISTS product_registry_priority_idx ON public.product_registry(priority);

-- Contacts Table
CREATE TABLE IF NOT EXISTS public.contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  service TEXT,
  needs TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for contacts
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for audit_log (public read for authenticated)
CREATE POLICY "audit_log_select_policy" ON public.audit_log
  FOR SELECT USING (true);

CREATE POLICY "audit_log_insert_policy" ON public.audit_log
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for audit_issues (public read for authenticated)
CREATE POLICY "audit_issues_select_policy" ON public.audit_issues
  FOR SELECT USING (true);

CREATE POLICY "audit_issues_update_policy" ON public.audit_issues
  FOR UPDATE USING (true);

-- Create RLS policies for product_registry (public read)
CREATE POLICY "product_registry_select_policy" ON public.product_registry
  FOR SELECT USING (true);

-- Create RLS policies for contacts (public insert for form submissions)
CREATE POLICY "contacts_insert_policy" ON public.contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "contacts_select_policy" ON public.contacts
  FOR SELECT USING (true);

-- ============================================================================
-- SAMPLE DATA (For Testing)
-- ============================================================================

-- Insert sample product
INSERT INTO public.product_registry (
  slug, name, company, official_urls, audit_frequency_days, priority, baseline_price_usd
) VALUES (
  'ai-team-premium',
  'AI Team Premium',
  'SYSmoAI',
  ARRAY['https://aiteampremium.com'],
  7,
  'high',
  99
) ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- GRANTS
-- ============================================================================

-- Grant permissions to anon and authenticated users
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify tables created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Verify indexes created
SELECT indexname FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY indexname;

-- ============================================================================
-- COMPLETION CHECK
-- ============================================================================
-- If all queries execute successfully, database is ready for production
-- Next: Configure environment variables and test connections
-- ============================================================================
