CREATE TABLE IF NOT EXISTS tasks (
 id SERIAL PRIMARY KEY,
 title VARCHAR(100),
 description VARCHAR(100)
 done BOOLEAN
);

INSERT INTO tasks (title, description, done) VALUES
 ('Programar', 'Projeto todo-list', FALSE),
 ('Estudar', 'Linguagem Go', TRUE),
 ('Caminhar', 'Durante 1 hora', FALSE);