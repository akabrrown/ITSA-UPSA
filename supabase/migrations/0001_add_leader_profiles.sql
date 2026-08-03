-- Add detailed bio and social links to department_authorities
ALTER TABLE public.department_authorities
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS twitter_url text,
  ADD COLUMN IF NOT EXISTS Phone_Number text;

-- Add social links to itsa_executives (bio already exists)
ALTER TABLE public.itsa_executives
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS twitter_url text,
  ADD COLUMN IF NOT EXISTS instagram_url text,
  ADD COLUMN IF NOT EXISTS Phone_Number text;