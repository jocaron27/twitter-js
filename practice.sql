-- // CREATE TABLE users (
-- //     id SERIAL PRIMARY KEY,
-- //     name TEXT DEFAULT NULL,
-- //     picture_url TEXT
-- //     );
    
-- //     CREATE TABLE tweets (
-- //     id SERIAL PRIMARY KEY,
-- //     user_id INTEGER REFERENCES users(id) NOT NULL,
-- //     content TEXT DEFAULT NULL
-- //     );

SELECT users.name, tweets.content FROM users INNER JOIN tweets ON users.id = tweets.user_id;

SELECT tweets.content from tweets INNER JOIN users ON users.id = tweets.user_id;

SELECT users.name, tweets.content, tweets.id FROM tweets INNER JOIN users ON users.id = tweets.user_id;

INSERT INTO users (name) VALUES (`${name}`);
INSERT INTO tweets (content) VALUES (`${text}`);