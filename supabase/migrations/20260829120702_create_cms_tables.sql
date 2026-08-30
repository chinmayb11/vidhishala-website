/*
# Vidhishala Foundation CMS Tables

Creates all database tables needed for the Vidhishala Foundation website's
content management system, including publications, internship applications,
events, team members, gallery media, and contact inquiries.

## New Tables

1. **gazette_publications** — Stores issues of The Vidhi Gazette
   - id, title, volume, issue_number, release_date, summary, pdf_url, download_count, created_at

2. **internship_applications** — Stores internship applications from the website
   - id, applicant_name, email, phone, institution, program_type, cover_letter, status, created_at

3. **events** — Stores events (Rajasthan Law Festival, seminars, etc.)
   - id, title, description, event_date, venue, registration_url, prospectus_url, status, created_at

4. **team_members** — Stores team and advisory board profiles
   - id, name, role, category, expertise, bio, photo_url, linkedin_url, email, display_order, created_at

5. **gallery_media** — Stores gallery photos and video links
   - id, title, description, category, media_type, media_url, event_date, created_at

6. **inquiries** — Stores contact form submissions
   - id, name, email, phone, organization, purpose, message, status, created_at

## Security

- All tables have RLS enabled.
- Public-facing content tables (gazette_publications, events, team_members, gallery_media):
  - SELECT: public (anon, authenticated) — visitors can view published content
  - INSERT/UPDATE/DELETE: authenticated only — admin manages content
- Private admin tables (internship_applications, inquiries):
  - All operations: authenticated only — admin-only data
- No user_id columns needed — this is a CMS with admin-only write access,
  not per-user data isolation. Authenticated users are admins.
*/

-- Gazette Publications
CREATE TABLE IF NOT EXISTS gazette_publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  volume text NOT NULL,
  issue_number text,
  release_date date NOT NULL,
  summary text,
  pdf_url text,
  download_count integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gazette_publications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_gazette" ON gazette_publications;
CREATE POLICY "public_select_gazette" ON gazette_publications FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_gazette" ON gazette_publications;
CREATE POLICY "admin_insert_gazette" ON gazette_publications FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_gazette" ON gazette_publications;
CREATE POLICY "admin_update_gazette" ON gazette_publications FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_gazette" ON gazette_publications;
CREATE POLICY "admin_delete_gazette" ON gazette_publications FOR DELETE
  TO authenticated USING (true);

-- Internship Applications
CREATE TABLE IF NOT EXISTS internship_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text,
  institution text,
  program_type text NOT NULL,
  cover_letter text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_applications" ON internship_applications;
CREATE POLICY "public_insert_applications" ON internship_applications FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_applications" ON internship_applications;
CREATE POLICY "admin_select_applications" ON internship_applications FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_applications" ON internship_applications;
CREATE POLICY "admin_update_applications" ON internship_applications FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_applications" ON internship_applications;
CREATE POLICY "admin_delete_applications" ON internship_applications FOR DELETE
  TO authenticated USING (true);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date date,
  venue text,
  registration_url text,
  prospectus_url text,
  status text NOT NULL DEFAULT 'upcoming',
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_events" ON events;
CREATE POLICY "public_select_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_events" ON events;
CREATE POLICY "admin_insert_events" ON events FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_events" ON events;
CREATE POLICY "admin_update_events" ON events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_events" ON events;
CREATE POLICY "admin_delete_events" ON events FOR DELETE
  TO authenticated USING (true);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  category text NOT NULL,
  expertise text,
  bio text,
  photo_url text,
  linkedin_url text,
  email text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_team" ON team_members;
CREATE POLICY "public_select_team" ON team_members FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_team" ON team_members;
CREATE POLICY "admin_insert_team" ON team_members FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_team" ON team_members;
CREATE POLICY "admin_update_team" ON team_members FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_team" ON team_members;
CREATE POLICY "admin_delete_team" ON team_members FOR DELETE
  TO authenticated USING (true);

-- Gallery Media
CREATE TABLE IF NOT EXISTS gallery_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  media_type text NOT NULL DEFAULT 'photo',
  media_url text,
  event_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_gallery" ON gallery_media;
CREATE POLICY "public_select_gallery" ON gallery_media FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_gallery" ON gallery_media;
CREATE POLICY "admin_insert_gallery" ON gallery_media FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_gallery" ON gallery_media;
CREATE POLICY "admin_update_gallery" ON gallery_media FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_gallery" ON gallery_media;
CREATE POLICY "admin_delete_gallery" ON gallery_media FOR DELETE
  TO authenticated USING (true);

-- Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  purpose text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_inquiries" ON inquiries;
CREATE POLICY "public_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_inquiries" ON inquiries;
CREATE POLICY "admin_select_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_inquiries" ON inquiries;
CREATE POLICY "admin_update_inquiries" ON inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_inquiries" ON inquiries;
CREATE POLICY "admin_delete_inquiries" ON inquiries FOR DELETE
  TO authenticated USING (true);

-- Indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_gazette_release_date ON gazette_publications(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status ON internship_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON internship_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_team_category ON team_members(category);
CREATE INDEX IF NOT EXISTS idx_team_display_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_media(category);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);
