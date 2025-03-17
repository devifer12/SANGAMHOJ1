-- Create collections table if it doesn't exist
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
DROP POLICY IF EXISTS "Allow all access to collections" ON collections;
CREATE POLICY "Allow all access to collections"
ON collections
USING (true);

-- Enable realtime
alter publication supabase_realtime add table collections;

-- Add trigger to sync categories with collections
CREATE OR REPLACE FUNCTION sync_category_to_collection()
RETURNS TRIGGER AS $$
BEGIN
  -- When a new category is created, create a corresponding collection
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO collections (name, description, image_url, category_id)
    VALUES (NEW.title, 'Collection for ' || NEW.title, NEW.image, NEW.id);
  -- When a category is updated, update the corresponding collection
  ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE collections
    SET name = NEW.title,
        image_url = NEW.image,
        updated_at = NOW()
    WHERE category_id = NEW.id;
  -- When a category is deleted, the collection will be deleted via CASCADE
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for category changes
DROP TRIGGER IF EXISTS category_collection_sync ON categories;
CREATE TRIGGER category_collection_sync
AFTER INSERT OR UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION sync_category_to_collection();
