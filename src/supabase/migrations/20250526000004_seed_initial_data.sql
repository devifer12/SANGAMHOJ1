-- Seed initial categories if they don't exist
INSERT INTO categories (id, title, image)
SELECT 
  uuid_generate_v4(),
  'CHAINS',
  'https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/Chains.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0NoYWlucy5wbmciLCJpYXQiOjE3Mzc4NzkzNTIsImV4cCI6MTc2OTQxNTM1Mn0.qF_Kjbv6bV60rFhe8vypEQqH1xKhKxHFE0sjfgi0SKg&t=2025-01-26T08%3A15%3A52.359Z'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE title = 'CHAINS');

INSERT INTO categories (id, title, image)
SELECT 
  uuid_generate_v4(),
  'JEWELLERY',
  'https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/JEWELLERY%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWSAoMSkuanBnIiwiaWF0IjoxNzM3ODc5MzMyLCJleHAiOjE3Njk0MTUzMzJ9.xGNeWNHFUZhluc2vjUocFEOVyNnVFseuDOZrqxM4AUU'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE title = 'JEWELLERY');

INSERT INTO categories (id, title, image)
SELECT 
  uuid_generate_v4(),
  'BANGLES',
  'https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/BANGLES%20(1).JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMgKDEpLkpQRyIsImlhdCI6MTczNzg3OTM4MiwiZXhwIjoxNzY5NDE1MzgyfQ.3AbrVYsG3fG47CKkhjQzsH3jNwWffvECKOV9q0oe0ts'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE title = 'BANGLES');

-- Seed initial products if they don't exist
DO $$
DECLARE
  chains_id UUID;
  jewellery_id UUID;
  bangles_id UUID;
BEGIN
  -- Get category IDs
  SELECT id INTO chains_id FROM categories WHERE title = 'CHAINS' LIMIT 1;
  SELECT id INTO jewellery_id FROM categories WHERE title = 'JEWELLERY' LIMIT 1;
  SELECT id INTO bangles_id FROM categories WHERE title = 'BANGLES' LIMIT 1;
  
  -- Insert products if they don't exist
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'IRIS CHAIN') THEN
    INSERT INTO products (name, description, image_url, type, category_id, is_newest_pick)
    VALUES (
      'IRIS CHAIN',
      'Elegant C-Z inspired design in pure gold',
      'https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Cherrynecklace.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQ2hlcnJ5bmVja2xhY2UuanBnIiwiaWF0IjoxNzM3ODc5NTE1LCJleHAiOjE3Njk0MTU1MTV9.GlmFsHFmJXp9OrB9dIuTYZj_DDN2TYZe4bLFzbFk6MQ',
      'CHAIN',
      chains_id,
      true
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'Traditional JEWELLERY') THEN
    INSERT INTO products (name, description, image_url, type, category_id, is_newest_pick)
    VALUES (
      'Traditional JEWELLERY',
      'Classic design with intricate detailing',
      'https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/JEWELLERY%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWSAoMSkuanBnIiwiaWF0IjoxNzM3ODc5MzMyLCJleHAiOjE3Njk0MTUzMzJ9.xGNeWNHFUZhluc2vjUocFEOVyNnVFseuDOZrqxM4AUU',
      'JEWELLERY',
      jewellery_id,
      true
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'Antique Bangle') THEN
    INSERT INTO products (name, description, image_url, type, category_id, is_newest_pick)
    VALUES (
      'Antique Bangle',
      'Traditional antique-finish bangle',
      'https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/BANGLES%20(1).JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMgKDEpLkpQRyIsImlhdCI6MTczNzg3OTM4MiwiZXhwIjoxNzY5NDE1MzgyfQ.3AbrVYsG3fG47CKkhjQzsH3jNwWffvECKOV9q0oe0ts',
      'ANTIQUE',
      bangles_id,
      true
    );
  END IF;
END $$;