CREATE TABLE IF NOT EXISTS tasks (
 id SERIAL PRIMARY KEY,
 title VARCHAR(100),
 description VARCHAR(100)
);

INSERT INTO tasks (title, description) VALUES
 ('Programar', 'Projeto todo-list'),
 ('Estudar', 'Linguagem Go'),
 ('Caminhar', 'Durante 1 hora');