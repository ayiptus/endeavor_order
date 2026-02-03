-- Create orders table for Order Vault
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL UNIQUE,
  app VARCHAR(10) NOT NULL CHECK (app IN ('DR', 'EH')),
  is_test BOOLEAN NOT NULL DEFAULT FALSE,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  property_address TEXT,
  items JSONB NOT NULL,
  total_amount DECIMAL(12, 2),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_app ON orders(app);
CREATE INDEX IF NOT EXISTS idx_orders_is_test ON orders(is_test);
CREATE INDEX IF NOT EXISTS idx_orders_submitted_at ON orders(submitted_at);
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);

-- Create vault_users table for authentication
CREATE TABLE IF NOT EXISTS vault_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create sessions table for session management
CREATE TABLE IF NOT EXISTS vault_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES vault_users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vault_sessions_token ON vault_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_vault_sessions_expires ON vault_sessions(expires_at);
