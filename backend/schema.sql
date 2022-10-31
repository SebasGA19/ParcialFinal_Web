CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    names TEXT NOT NULL,
    last_names TEXT NOT NULL,
    password TEXT NOT NULL
);