-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  type TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  collection_id UUID,
  is_newest_pick BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
DROP POLICY IF EXISTS "Users can manage their own products" ON products;
CREATE POLICY "Users can manage their own products"
ON products
USING (true);

-- Enable realtime
alter publication supabase_realtime add table products;