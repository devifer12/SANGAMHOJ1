-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own newest picks" ON newest_picks;
DROP POLICY IF EXISTS "Users can insert their own newest picks" ON newest_picks;
DROP POLICY IF EXISTS "Users can update their own newest picks" ON newest_picks;
DROP POLICY IF EXISTS "Users can delete their own newest picks" ON newest_picks;

-- Create more permissive policies
-- Allow anyone to view newest picks
CREATE POLICY "Anyone can view newest picks"
  ON newest_picks FOR SELECT
  USING (true);

-- Allow authenticated users to insert newest picks
CREATE POLICY "Authenticated users can insert newest picks"
  ON newest_picks FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to update newest picks
CREATE POLICY "Authenticated users can update newest picks"
  ON newest_picks FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to delete newest picks
CREATE POLICY "Authenticated users can delete newest picks"
  ON newest_picks FOR DELETE
  USING (auth.uid() IS NOT NULL);