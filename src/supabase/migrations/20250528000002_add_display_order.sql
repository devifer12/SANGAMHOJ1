-- Add display_order column to products table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'products' 
                   AND column_name = 'display_order') THEN
        ALTER TABLE products ADD COLUMN display_order INTEGER DEFAULT 0;
    END IF;
END$$;
