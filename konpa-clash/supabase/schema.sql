-- =====================================================================
-- Konpa Clash — full schema (Phase 2)
-- Paste this WHOLE file into: Supabase → SQL Editor → New query → Run.
-- Safe to re-run (uses IF NOT EXISTS / ON CONFLICT everywhere).
-- =====================================================================

-- ------------------------------------
-- 1. Tables
-- ------------------------------------

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  country text,
  created_at timestamptz not null default now()
);

create table if not exists questions (
  id bigserial primary key,
  category text not null,
  question_kreyol text not null,
  hint text,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_index int not null check (correct_index between 0 and 3),
  difficulty text not null default 'green' check (difficulty in ('green', 'yellow', 'red', 'purple')),
  verified boolean not null default false,
  era text,
  genre text,
  created_at timestamptz not null default now()
);

create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  question_ids bigint[] not null,
  mode text not null check (mode in ('async', 'live')),
  status text not null default 'waiting' check (status in ('waiting', 'complete')),
  player_a uuid references auth.users(id) on delete set null,
  player_b uuid references auth.users(id) on delete set null,
  score_a int,
  score_b int,
  winner uuid references auth.users(id) on delete set null,
  is_draw boolean default false,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists match_plays (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  score int not null default 0,
  results boolean[] not null default '{}',
  played_at timestamptz not null default now(),
  unique (match_id, user_id)
);

create table if not exists stats (
  user_id uuid primary key references auth.users(id) on delete cascade,
  wins int not null default 0,
  losses int not null default 0,
  draws int not null default 0,
  win_streak int not null default 0,
  best_win_streak int not null default 0,
  matches_played int not null default 0,
  coins int not null default 0,      -- Pwen (spendable)
  xp int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists daily_challenge (
  id bigserial primary key,
  date date unique not null,
  question_ids bigint[] not null
);

create table if not exists daily_challenge_plays (
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  score int not null default 0,
  primary key (user_id, date)
);

create table if not exists badges (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_key text not null,
  earned_at timestamptz not null default now(),
  unique (user_id, badge_key)
);

create table if not exists shop_items (
  id bigserial primary key,
  key text unique not null,
  name_kreyol text not null,
  description_kreyol text,
  category text not null check (category in ('pouwa', 'packs', 'aparans')),
  cost_coins int not null,
  icon text
);

create table if not exists purchases (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  spent_coins int not null,
  created_at timestamptz not null default now()
);

create table if not exists inventory (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  quantity int not null default 0,
  primary key (user_id, item_key)
);

-- ------------------------------------
-- 2. Auto-create profile + stats on signup
-- ------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
    values (new.id, split_part(coalesce(new.email, 'jwe'), '@', 1))
    on conflict (id) do nothing;
  insert into public.stats (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------
-- 3. Row Level Security (RLS)
-- ------------------------------------

alter table profiles enable row level security;
alter table questions enable row level security;
alter table matches enable row level security;
alter table match_plays enable row level security;
alter table stats enable row level security;
alter table daily_challenge enable row level security;
alter table daily_challenge_plays enable row level security;
alter table badges enable row level security;
alter table shop_items enable row level security;
alter table purchases enable row level security;
alter table inventory enable row level security;

-- Drop and recreate policies so re-runs stay idempotent
drop policy if exists "profiles readable by all" on profiles;
create policy "profiles readable by all" on profiles for select using (true);

drop policy if exists "profile updated by owner" on profiles;
create policy "profile updated by owner" on profiles for update using (auth.uid() = id);

drop policy if exists "verified questions readable by all" on questions;
create policy "verified questions readable by all" on questions
  for select using (verified = true);

drop policy if exists "matches readable by all" on matches;
create policy "matches readable by all" on matches for select using (true);

drop policy if exists "user reads own plays" on match_plays;
create policy "user reads own plays" on match_plays for select using (auth.uid() = user_id);

drop policy if exists "user inserts own play" on match_plays;
create policy "user inserts own play" on match_plays for insert with check (auth.uid() = user_id);

drop policy if exists "stats readable by all" on stats;
create policy "stats readable by all" on stats for select using (true);

drop policy if exists "daily challenge readable by all" on daily_challenge;
create policy "daily challenge readable by all" on daily_challenge for select using (true);

drop policy if exists "user reads own daily plays" on daily_challenge_plays;
create policy "user reads own daily plays" on daily_challenge_plays
  for select using (auth.uid() = user_id);

drop policy if exists "user inserts own daily play" on daily_challenge_plays;
create policy "user inserts own daily play" on daily_challenge_plays
  for insert with check (auth.uid() = user_id);

drop policy if exists "badges readable by all" on badges;
create policy "badges readable by all" on badges for select using (true);

drop policy if exists "shop items readable by all" on shop_items;
create policy "shop items readable by all" on shop_items for select using (true);

drop policy if exists "user reads own purchases" on purchases;
create policy "user reads own purchases" on purchases for select using (auth.uid() = user_id);

drop policy if exists "user reads own inventory" on inventory;
create policy "user reads own inventory" on inventory for select using (auth.uid() = user_id);

-- ------------------------------------
-- 4. Seed the 6 verified Phase 1 questions
-- ------------------------------------

insert into questions
  (category, question_kreyol, hint, option_a, option_b, option_c, option_d, correct_index, difficulty, verified, era, genre)
values
  ('Klasik', 'Kiyès yo konsidere kòm papa konpa a?', 'Fondatè son an, 1955.',
   'Nemours Jean-Baptiste', 'Webert Sicot', 'Coupé Cloué', 'Tabou Combo',
   0, 'green', true, '1950s', 'konpa'),
  ('Ane', 'Nan ki ane konpa dirèk te kreye?', 'Yon dat istorik.',
   '1945', '1955', '1962', '1971',
   1, 'yellow', true, '1950s', 'konpa'),
  ('Old-School', 'Nan ki vil Carimi te fòme?', 'Pa Ayiti…',
   'Pòtoprens', 'New York City', 'Mayami', 'Monreyal',
   1, 'yellow', true, '2000s', 'konpa'),
  ('Atis', 'Non ''Carimi'' soti nan premye lèt ki twa non?', 'Ca-Ri-Mi.',
   'Carl, Rico, Miki', 'Carlo, Richard, Mickael', 'Carlos, Rita, Max', 'Carla, Ricky, Milo',
   1, 'green', true, '2000s', 'konpa'),
  ('Difisil', 'Nan ki ane Carimi te lanse albòm ''Buzz'' la?', 'Pa konfonn ak Nasty Biznis (2004).',
   '2004', '2006', '2009', '2013',
   2, 'red', true, '2000s', 'konpa'),
  ('Nouvo Jenerasyon', 'Apre Carimi, ki gwoup Richard Cavé te fonde?', 'Dènye vag la.',
   'Nu Look', 'Kaï', '5lan', 'Harmonik',
   1, 'yellow', true, '2010s', 'konpa')
on conflict do nothing;

-- ------------------------------------
-- 5. Seed the 4 Phase-1 power-up shop items
-- ------------------------------------

insert into shop_items (key, name_kreyol, description_kreyol, category, cost_coins, icon) values
  ('5050',          '50-50',           'Elimine 2 move repons',              'pouwa', 100, '50-50'),
  ('skip',          'Sote Kesyon',     'Sote kesyon aktyèl la',              'pouwa', 150, '»»'),
  ('add_time',      'Tan Siplemantè',  'Ajoute 15 segonn',                   'pouwa', 100, '+15s'),
  ('double_points', 'Double Pwen',     'Double pwen pwochèn kesyon an',      'pouwa', 200, 'x2')
on conflict (key) do nothing;

-- Done. If you see "Success. No rows returned" that means everything ran.
