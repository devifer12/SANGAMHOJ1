-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON collections;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON collections;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON collections;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON collections;

-- Enable RLS on collections table
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Create policies for the collections table
CREATE POLICY "Enable read access for all users"
ON collections FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON collections FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for users based on user_id"
ON collections FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id"
ON collections FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Make sure the collections table is in the realtime publication
-- Commented out to avoid the error since it's already in the publication
-- alter publication supabase_realtime add table collections;
