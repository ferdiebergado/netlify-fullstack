CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    google_id TEXT UNIQUE NOT NULL,
    name TEXT,
    email TEXT UNIQUE,
    picture TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    is_active INTEGER DEFAULT 1 CHECK (is_active IN (0, 1)),
    last_login_at TEXT DEFAULT (STRFTIME ('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
    created_at TEXT DEFAULT (STRFTIME ('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
    updated_at TEXT DEFAULT (STRFTIME ('%Y-%m-%dT%H:%M:%fZ', 'NOW'))
);

CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY,
    session_id TEXT UNIQUE NOT NULL,
    user_id INTEGER NOT NULL,
    expires_at TEXT NOT NULL,
    last_active_at TEXT DEFAULT (STRFTIME ('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
    created_at TEXT DEFAULT (STRFTIME ('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
    updated_at TEXT DEFAULT (STRFTIME ('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
    deleted_at TEXT,
    is_revoked INTEGER DEFAULT 0 CHECK (is_revoked IN (0, 1)),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);

CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions (session_id);

CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);

CREATE TRIGGER IF NOT EXISTS update_user_timestamp AFTER
UPDATE ON users BEGIN
UPDATE users
SET
    updated_at = (STRFTIME ('%Y-%m-%dT%H:%M:%fZ', 'NOW'))
WHERE
    id = old.id;

END;