-- ============================================================================
--  Forma Mentis ODV — Schema database Supabase
--  Esegui questo file nel SQL Editor di Supabase (una sola volta).
-- ============================================================================

-- Estensione per uuid_generate_v4 (di norma già attiva su Supabase)
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
--  Tabella: projects
-- ----------------------------------------------------------------------------
create table if not exists public.projects (
  id                   uuid primary key default gen_random_uuid(),
  nome                 text not null,
  slug                 text not null unique,
  descrizione_breve    text not null default '',
  descrizione_completa text not null default '',
  immagine_url         text,
  link_esterno         text,
  cta_label            text,
  ordine               integer not null default 0,
  attivo               boolean not null default true,
  created_at           timestamptz not null default now()
);

create index if not exists projects_ordine_idx on public.projects (ordine);
create index if not exists projects_attivo_idx on public.projects (attivo);

-- ----------------------------------------------------------------------------
--  Tabella: team_members
-- ----------------------------------------------------------------------------
create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null,
  ruolo      text not null default '',
  foto_url   text,
  ordine     integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists team_members_ordine_idx on public.team_members (ordine);

-- ----------------------------------------------------------------------------
--  Tabella: settings (coppie chiave/valore)
-- ----------------------------------------------------------------------------
create table if not exists public.settings (
  id     uuid primary key default gen_random_uuid(),
  chiave text not null unique,
  valore text not null default ''
);

-- ============================================================================
--  Row Level Security
--  - Lettura pubblica (anon) per il sito.
--  - Scrittura riservata agli utenti autenticati (pannello admin).
-- ============================================================================
alter table public.projects     enable row level security;
alter table public.team_members enable row level security;
alter table public.settings     enable row level security;

-- PROJECTS ---------------------------------------------------------------
drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
  on public.projects for select
  using (true);

drop policy if exists "projects_auth_write" on public.projects;
create policy "projects_auth_write"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- TEAM MEMBERS -----------------------------------------------------------
drop policy if exists "team_public_read" on public.team_members;
create policy "team_public_read"
  on public.team_members for select
  using (true);

drop policy if exists "team_auth_write" on public.team_members;
create policy "team_auth_write"
  on public.team_members for all
  to authenticated
  using (true)
  with check (true);

-- SETTINGS ---------------------------------------------------------------
drop policy if exists "settings_public_read" on public.settings;
create policy "settings_public_read"
  on public.settings for select
  using (true);

drop policy if exists "settings_auth_write" on public.settings;
create policy "settings_auth_write"
  on public.settings for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
--  Storage: bucket pubblico "media" per immagini progetti e team
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Lettura pubblica degli oggetti del bucket media
drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

-- Upload / update / delete riservati agli utenti autenticati
drop policy if exists "media_auth_insert" on storage.objects;
create policy "media_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "media_auth_update" on storage.objects;
create policy "media_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "media_auth_delete" on storage.objects;
create policy "media_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
