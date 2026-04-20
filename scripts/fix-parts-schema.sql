-- =====================================================================================
-- SAFE PARTS TABLE FIX (NO DROP)
-- =====================================================================================

-- Add missing columns if they don't exist

alter table parts add column if not exists description text;
alter table parts add column if not exists stock text;
alter table parts add column if not exists url text;
alter table parts add column if not exists type text;
alter table parts add column if not exists created_at timestamp default now();

-- Ensure part_number exists (common issue)
alter table parts add column if not exists part_number text;

-- OPTIONAL: If old column exists, copy data
-- (run only if needed)

-- update parts set part_number = partnumber where part_number is null;

-- Create index safely
create unique index if not exists parts_unique_idx
on parts (supplier, part_number);

