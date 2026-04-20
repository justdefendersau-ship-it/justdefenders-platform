-- =====================================================================================
-- JustDefenders Parts Table
-- Timestamp: 19 April 2026 18:05
-- =====================================================================================

drop table if exists parts;

create table parts (
  id uuid primary key default gen_random_uuid(),

  supplier text,
  part_number text,
  description text,
  price numeric,

  stock text,
  url text,
  type text,

  created_at timestamp default now()
);

create unique index parts_unique_idx
on parts (supplier, part_number);
