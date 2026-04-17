-- Timestamp: 11 March 2026 22:57
-- Contributor reputation tracking

create table if not exists contributor_reputation (

 id uuid primary key default gen_random_uuid(),

 member_id uuid,

 reputation_score integer default 0,

 articles_submitted integer default 0,

 created_at timestamp default now()

);