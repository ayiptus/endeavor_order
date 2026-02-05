-- Create order_sequences table for persistent sequence tracking
CREATE TABLE IF NOT EXISTS order_sequences (
  app VARCHAR(10) PRIMARY KEY,   -- 'DR' or 'EH'
  next_seq INTEGER NOT NULL DEFAULT 1
);

-- Seed initial values
INSERT INTO order_sequences (app, next_seq)
VALUES ('DR', 1), ('EH', 1)
ON CONFLICT (app) DO NOTHING;

-- Add seq column to orders table if it doesn't exist
ALTER TABLE orders ADD COLUMN IF NOT EXISTS seq INTEGER;
