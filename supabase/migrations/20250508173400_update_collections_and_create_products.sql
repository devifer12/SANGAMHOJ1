-- Update collections table to only have collection_name
ALTER TABLE collections RENAME COLUMN name TO collection_name;
ALTER TABLE collections DROP COLUMN IF EXISTS description;
ALTER TABLE collections DROP COLUMN IF EXISTS image_url;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  product_name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id)
);

-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
DROP POLICY IF EXISTS "Users can view their own products" ON products;
CREATE POLICY "Users can view their own products"
ON products FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own products" ON products;
CREATE POLICY "Users can insert their own products"
ON products FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own products" ON products;
CREATE POLICY "Users can update their own products"
ON products FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own products" ON products;
CREATE POLICY "Users can delete their own products"
ON products FOR DELETE
USING (auth.uid() = user_id);

-- Enable realtime for products table
alter publication supabase_realtime add table products;
