-- This file contains the SQL commands to create the "collections" table and set up row-level security policies.
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to collections"
  ON collections
  FOR SELECT
  TO public
  USING (true);