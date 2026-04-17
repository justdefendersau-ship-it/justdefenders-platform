create table if not exists feature_flags (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  feature_name text not null,
  enabled boolean default true,
  created_at timestamptz default now(),
  unique (organization_id, feature_name)
);

alter table feature_flags enable row level security;

create policy "Org can manage own flags"
on feature_flags
for all
using (
  organization_id =
  (select organization_id from profiles where id = auth.uid())
);