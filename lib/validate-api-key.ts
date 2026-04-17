-- Timestamp 7 March 2026
-- SaaS API Key System


CREATE TABLE IF NOT EXISTS api_keys (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id uuid,

    key_hash text,

    key_name text,

    created_at timestamp with time zone DEFAULT now(),

    status text DEFAULT 'active'

);


CREATE INDEX IF NOT EXISTS idx_api_org
ON api_keys(organization_id);