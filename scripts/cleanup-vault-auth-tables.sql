-- Drop unused vault authentication tables (now using Basic Auth)
DROP TABLE IF EXISTS vault_sessions;
DROP TABLE IF EXISTS vault_users;
