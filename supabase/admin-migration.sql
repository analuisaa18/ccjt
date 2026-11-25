-- Casa de Cultura: migração para o painel administrativo WordPress-like.
-- Execute no Supabase SQL Editor antes de publicar a nova versão.

-- 1) Campos adicionais de eventos (mantém os eventos existentes publicados).
alter table public.events add column if not exists image_url text;
alter table public.events add column if not exists category text;
alter table public.events add column if not exists additional_info text;
alter table public.events add column if not exists status text not null default 'published';
update public.events set status = 'published' where status is null;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'events_status_check') then
    alter table public.events add constraint events_status_check check (status in ('draft','published'));
  end if;
end $$;

-- 2) Lista explícita de contas que podem administrar o site.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
drop policy if exists "admins can read own admin record" on public.admin_users;
create policy "admins can read own admin record" on public.admin_users
  for select to authenticated using (user_id = auth.uid());

-- SECURITY DEFINER evita recursão de RLS ao consultar a lista de administradores.
create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
grant execute on function public.is_site_admin() to anon, authenticated;

-- 3) Conteúdo do site: leitura pública; escrita apenas por administradores.
drop policy if exists "authenticated team updates website content" on public.site_content;
drop policy if exists "site admins manage website content" on public.site_content;
create policy "site admins manage website content" on public.site_content
  for all to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

-- 4) Eventos: visitantes veem apenas publicados; administradores gerenciam todos.
drop policy if exists "authenticated team manages events" on public.events;
drop policy if exists "public reads events" on public.events;
drop policy if exists "public reads published events" on public.events;
drop policy if exists "site admins manage events" on public.events;
create policy "public reads published events" on public.events
  for select to anon, authenticated using (status = 'published' or public.is_site_admin());
create policy "site admins manage events" on public.events
  for all to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

-- 5) Memórias: envio público pendente e leitura pública somente das aprovadas.
drop policy if exists "authenticated team manages memories" on public.memories;
drop policy if exists "public reads approved memories" on public.memories;
drop policy if exists "public submits pending memories" on public.memories;
drop policy if exists "site admins manage memories" on public.memories;
create policy "public reads approved memories" on public.memories
  for select to anon, authenticated using (status = 'approved' or public.is_site_admin());
create policy "public submits pending memories" on public.memories
  for insert to anon, authenticated with check (status = 'pending');
create policy "site admins manage memories" on public.memories
  for all to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

-- 6) Arquivos: imagens do site são públicas para leitura e apenas admins alteram.
drop policy if exists "authenticated team uploads site images" on storage.objects;
drop policy if exists "authenticated team updates site images" on storage.objects;
drop policy if exists "authenticated team deletes site images" on storage.objects;
drop policy if exists "site admins upload site images" on storage.objects;
drop policy if exists "site admins update site images" on storage.objects;
drop policy if exists "site admins delete site images" on storage.objects;
create policy "site admins upload site images" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media' and public.is_site_admin());
create policy "site admins update site images" on storage.objects
  for update to authenticated using (bucket_id = 'site-media' and public.is_site_admin()) with check (bucket_id = 'site-media' and public.is_site_admin());
create policy "site admins delete site images" on storage.objects
  for delete to authenticated using (bucket_id = 'site-media' and public.is_site_admin());

-- 7) O bucket deve existir e ser público para exibir imagens no site.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media','site-media',true,10485760,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true;

-- Restringe também a exclusão de arquivos enviados junto às memórias.
drop policy if exists "authenticated team deletes memory media" on storage.objects;
drop policy if exists "site admins delete memory media" on storage.objects;
create policy "site admins delete memory media" on storage.objects
  for delete to authenticated using (bucket_id = 'memories' and public.is_site_admin());
