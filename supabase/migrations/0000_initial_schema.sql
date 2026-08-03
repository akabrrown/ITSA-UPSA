-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Admins Table
create table public.admins (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  email text unique not null,
  created_at timestamptz default now()
);

-- News Posts Table
create table public.news_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  summary text,
  body text,
  cover_image_url text,
  is_published boolean default false,
  published_at timestamptz,
  created_by uuid references public.admins(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Banner Slides Table
create table public.banner_slides (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  headline text,
  link_url text,
  display_order int default 0,
  is_active boolean default true
);

-- President Speech Table
create table public.president_speech (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  title text not null,
  photo_url text,
  message text,
  video_url text,
  updated_at timestamptz default now()
);

-- Tutorials Table
create table public.tutorials (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  video_url text not null,
  thumbnail_url text,
  course text,
  level text,
  lecturer_name text,
  view_count int default 0,
  is_published boolean default true,
  created_by uuid references public.admins(id),
  created_at timestamptz default now()
);

-- Academic Resources Table
create table public.academic_resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  resource_type text not null check (resource_type in ('slide', 'past_question')),
  course text,
  level text,
  academic_year text,
  file_url text not null,
  file_size_kb int,
  download_count int default 0,
  created_by uuid references public.admins(id),
  created_at timestamptz default now()
);

-- Activities Table
create table public.activities (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  cover_image_url text,
  gallery_urls text[],
  venue text,
  start_date timestamptz not null,
  end_date timestamptz,
  status text check (status in ('upcoming', 'past')),
  rsvp_link text,
  created_by uuid references public.admins(id),
  created_at timestamptz default now()
);

-- Department Info Table
create table public.department_info (
  id uuid primary key default uuid_generate_v4(),
  description text,
  mission text,
  updated_at timestamptz default now()
);

-- Department Authorities Table
create table public.department_authorities (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  title text not null,
  photo_url text,
  display_order int default 0
);

-- ITSA Executives Table
create table public.itsa_executives (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  position text not null,
  photo_url text,
  bio text,
  social_link text,
  display_order int default 0
);

-- Set up Row Level Security (RLS)

alter table public.admins enable row level security;
alter table public.news_posts enable row level security;
alter table public.banner_slides enable row level security;
alter table public.president_speech enable row level security;
alter table public.tutorials enable row level security;
alter table public.academic_resources enable row level security;
alter table public.activities enable row level security;
alter table public.department_info enable row level security;
alter table public.department_authorities enable row level security;
alter table public.itsa_executives enable row level security;

-- Create Policies

-- Read Access (Public for published/active content)
create policy "Public can view published news" on public.news_posts for select using (is_published = true);
create policy "Public can view active banner slides" on public.banner_slides for select using (is_active = true);
create policy "Public can view president speech" on public.president_speech for select using (true);
create policy "Public can view published tutorials" on public.tutorials for select using (is_published = true);
create policy "Public can view academic resources" on public.academic_resources for select using (true);
create policy "Public can view activities" on public.activities for select using (true);
create policy "Public can view department info" on public.department_info for select using (true);
create policy "Public can view authorities" on public.department_authorities for select using (true);
create policy "Public can view executives" on public.itsa_executives for select using (true);

-- Write Access (Admins only)
-- Note: Assuming auth.uid() exists in admins table for these checks, or just checking if user is authenticated for MVP
create policy "Admins can insert news" on public.news_posts for insert with check (auth.uid() in (select id from public.admins));
create policy "Admins can update news" on public.news_posts for update using (auth.uid() in (select id from public.admins));
create policy "Admins can delete news" on public.news_posts for delete using (auth.uid() in (select id from public.admins));

create policy "Admins can insert tutorials" on public.tutorials for insert with check (auth.uid() in (select id from public.admins));
create policy "Admins can update tutorials" on public.tutorials for update using (auth.uid() in (select id from public.admins));
create policy "Admins can delete tutorials" on public.tutorials for delete using (auth.uid() in (select id from public.admins));

create policy "Admins can insert academic resources" on public.academic_resources for insert with check (auth.uid() in (select id from public.admins));
create policy "Admins can update academic resources" on public.academic_resources for update using (auth.uid() in (select id from public.admins));
create policy "Admins can delete academic resources" on public.academic_resources for delete using (auth.uid() in (select id from public.admins));

create policy "Admins can insert activities" on public.activities for insert with check (auth.uid() in (select id from public.admins));
create policy "Admins can update activities" on public.activities for update using (auth.uid() in (select id from public.admins));
create policy "Admins can delete activities" on public.activities for delete using (auth.uid() in (select id from public.admins));

-- Similar admin write policies for other tables
create policy "Admins can manage banners" on public.banner_slides for all using (auth.uid() in (select id from public.admins));
create policy "Admins can manage president speech" on public.president_speech for all using (auth.uid() in (select id from public.admins));
create policy "Admins can manage department info" on public.department_info for all using (auth.uid() in (select id from public.admins));
create policy "Admins can manage authorities" on public.department_authorities for all using (auth.uid() in (select id from public.admins));
create policy "Admins can manage executives" on public.itsa_executives for all using (auth.uid() in (select id from public.admins));
