-- Create newest_picks table
CREATE TABLE IF NOT EXISTS newest_picks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id)
);

-- Enable RLS
ALTER TABLE newest_picks ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own newest picks" ON newest_picks;
CREATE POLICY "Users can view their own newest picks"
  ON newest_picks FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own newest picks" ON newest_picks;
CREATE POLICY "Users can insert their own newest picks"
  ON newest_picks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own newest picks" ON newest_picks;
CREATE POLICY "Users can update their own newest picks"
  ON newest_picks FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own newest picks" ON newest_picks;
CREATE POLICY "Users can delete their own newest picks"
  ON newest_picks FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime
-- Check if table is already in publication before adding
DO $
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'newest_picks'
  ) THEN
    alter publication supabase_realtime add table newest_picks;
  END IF;
END
$;
