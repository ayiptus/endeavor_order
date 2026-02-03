-- Seed initial vault admin user
-- Password: ModulexVault2026! (bcrypt hashed)
-- You should change this password after first login

INSERT INTO vault_users (email, password_hash, name)
VALUES (
  'admin@modulex.com',
  '$2a$10$8K1p/a0dL1LXMw1Z5sQQKO.YzQF6hKqxJzL5X3Z.XVJY.W0GzKQeW',
  'Vault Admin'
)
ON CONFLICT (email) DO NOTHING;

-- Add additional admin if needed
INSERT INTO vault_users (email, password_hash, name)
VALUES (
  'jimmie.castillo@modulex.com',
  '$2a$10$8K1p/a0dL1LXMw1Z5sQQKO.YzQF6hKqxJzL5X3Z.XVJY.W0GzKQeW',
  'Jimmie Castillo'
)
ON CONFLICT (email) DO NOTHING;
