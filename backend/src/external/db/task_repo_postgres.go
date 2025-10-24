package db

import (
	"context"
	"fmt"
	"todo-list/backend/src/core/task/model"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TaskRepoPostgres struct {
	pool *pgxpool.Pool
}

func NewTaskRepoPostgres(pool *pgxpool.Pool) *TaskRepoPostgres {
	return &TaskRepoPostgres{pool: pool}
}

func (tr *TaskRepoPostgres) Add(t *model.Task) error {
	_, err := tr.pool.Exec(context.Background(),
		"INSERT INTO tasks (description, done) VALUES ($1, $2)",
		t.Description, t.Done)
	if err != nil {
		fmt.Printf("ERRO ao inserir task(TaskRepoPostgres.Add): %v", err)
		return err
	}
	return nil
}

func (tr *TaskRepoPostgres) Remove(id int) error {
	_, err := tr.pool.Exec(context.Background(),
		"DELETE FROM tasks WHERE id = $1", id)
	if err != nil {
		fmt.Printf("ERRO ao remover task (TaskRepoPostgres.Remove): %v", err)
		return err
	}
	return nil
}

func (tr *TaskRepoPostgres) Update(id int, t model.Task) error {
	_, err := tr.pool.Exec(context.Background(),
		"UPDATE tasks SET description = $1, done = $2 WHERE id = $3",
		t.Description, t.Done, id)

	if err != nil {
		fmt.Printf("ERRO ao modificar a descrição da task: %v", err)
		return err
	}
	return nil
}

func (tr *TaskRepoPostgres) GetAll() ([]model.TaskWithID, error) {
	var t model.TaskWithID
	var tasks []model.TaskWithID

	rows, _ := tr.pool.Query(context.Background(), "SELECT id, description, done FROM tasks ORDER BY id ASC;")
	_, err := pgx.ForEachRow(rows, []any{&t.Id, &t.Description, &t.Done}, func() error {
		tasks = append(tasks, t)
		return nil
	})

	if err != nil {
		fmt.Printf("Query error: %v", err)
		return nil, err
	}

	return tasks, nil
}
