CREATE TABLE IF NOT EXISTS tasks (
 id SERIAL PRIMARY KEY,
 description TEXT NOT NULL,
 done BOOLEAN
);

INSERT INTO tasks (description, done) VALUES
 ('Programar', FALSE),
 ('Estudar', TRUE),
 ('Caminhar', FALSE);