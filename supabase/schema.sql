-- Casa de Cultura Juarez Teixeira
create extension if not exists pgcrypto;

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  author_name text not null check (char_length(author_name) between 1 and 120),
  category text not null default 'História/Narrativa',
  memory_date date,
  content_type text not null check (content_type in ('text','audio','image','video')),
  body text not null check (char_length(body) between 1 and 10000),
  media_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz not null,
  location text not null default 'Casa de Cultura',
  price text,
  created_at timestamptz not null default now()
);

create table if not exists public.pedagogical_materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  created_at timestamptz not null default now()
);

alter table public.memories enable row level security;
alter table public.events enable row level security;
alter table public.pedagogical_materials enable row level security;

-- Visitors can see only approved memories and public programming/materials.
drop policy if exists "public reads approved memories" on public.memories;
create policy "public reads approved memories" on public.memories
  for select to anon, authenticated using (status = 'approved');
drop policy if exists "public submits pending memories" on public.memories;
create policy "public submits pending memories" on public.memories
  for insert to anon, authenticated
  with check (status = 'pending');
drop policy if exists "authenticated team manages memories" on public.memories;
create policy "authenticated team manages memories" on public.memories
  for all to authenticated using (true) with check (true);

drop policy if exists "public reads events" on public.events;
create policy "public reads events" on public.events
  for select to anon, authenticated using (true);
drop policy if exists "authenticated team manages events" on public.events;
create policy "authenticated team manages events" on public.events
  for all to authenticated using (true) with check (true);

drop policy if exists "public reads pedagogical materials" on public.pedagogical_materials;
create policy "public reads pedagogical materials" on public.pedagogical_materials
  for select to anon, authenticated using (true);
drop policy if exists "authenticated team manages pedagogical materials" on public.pedagogical_materials;
create policy "authenticated team manages pedagogical materials" on public.pedagogical_materials
  for all to authenticated using (true) with check (true);

-- Public bucket is used for approved media references. Configure file-size/MIME
-- restrictions in Storage settings before launch.
insert into storage.buckets (id, name, public)
values ('memories', 'memories', true)
on conflict (id) do nothing;

drop policy if exists "visitors upload memory media" on storage.objects;
create policy "visitors upload memory media" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'memories');
drop policy if exists "public reads memory media" on storage.objects;
create policy "public reads memory media" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'memories');
drop policy if exists "authenticated team deletes memory media" on storage.objects;
create policy "authenticated team deletes memory media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'memories');


-- Editable website content (single JSON document managed by the team).
create table if not exists public.site_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "public reads website content" on public.site_content;
create policy "public reads website content" on public.site_content
  for select to anon, authenticated using (id = 'main');
drop policy if exists "authenticated team updates website content" on public.site_content;
create policy "authenticated team updates website content" on public.site_content
  for all to authenticated using (true) with check (true);

-- Separate public bucket for page images managed from the editorial panel.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 10485760, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
drop policy if exists "public reads site images" on storage.objects;
create policy "public reads site images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'site-media');
drop policy if exists "authenticated team uploads site images" on storage.objects;
create policy "authenticated team uploads site images" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media');
drop policy if exists "authenticated team updates site images" on storage.objects;
create policy "authenticated team updates site images" on storage.objects
  for update to authenticated using (bucket_id = 'site-media') with check (bucket_id = 'site-media');
drop policy if exists "authenticated team deletes site images" on storage.objects;
create policy "authenticated team deletes site images" on storage.objects
  for delete to authenticated using (bucket_id = 'site-media');
