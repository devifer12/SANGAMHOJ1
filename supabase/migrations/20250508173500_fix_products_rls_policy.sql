-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON products;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON products;

-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for the products table
CREATE POLICY "Enable read access for all users"
ON products FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for users based on user_id"
ON products FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id"
ON products FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Make sure the products table is in the realtime publication
-- Commented out to avoid potential error if it's already in the publication
-- alter publication supabase_realtime add table products;
