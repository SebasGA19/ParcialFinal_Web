DROP TABLE IF EXISTS users;

CREATE TABLE users (
    names TEXT NOT NULL,
    last_names TEXT NOT NULL,
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL
);