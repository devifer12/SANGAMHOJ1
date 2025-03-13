/*
  # Create collections table

  1. New Tables
    - `collections`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `type` (text, not null)
      - `image_url` (text)
      - `created_at` (timestamp with time zone)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on collections table
    - Add policies for authenticated users to:
      - Read all collections
      - Create their own collections
      - Update their own collections
      - Delete their own collections
*/

CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Allow users to read all collections
CREATE POLICY "Anyone can view collections"
  ON collections
  FOR SELECT
  USING (true);

-- Allow authenticated users to create their own collections
CREATE POLICY "Users can create their own collections"
  ON collections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own collections
CREATE POLICY "Users can update their own collections"
  ON collections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own collections
CREATE POLICY "Users can delete their own collections"
  ON collections
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);