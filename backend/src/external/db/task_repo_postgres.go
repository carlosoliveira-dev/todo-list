package db

import (
	"context"
	"fmt"
	"todo-list/backend/src/core/task/model"

	"github.com/jackc/pgx/v5"
)

type TaskRepoPostgres struct {
	conn *pgx.Conn
}

func NewTaskRepoPostgres(conn *pgx.Conn) *TaskRepoPostgres {
	return &TaskRepoPostgres{conn: conn}
}

func (tr *TaskRepoPostgres) Add(t *model.Task) error {
	_, err := tr.conn.Exec(context.Background(),
		"INSERT INTO tasks (title, description) VALUES ($1, $2)",
		t.Title, t.Description,
	)
	if err != nil {
		fmt.Printf("ERRO ao inserir task(TaskRepoPostgres.Add): %v", err)
		return err
	}
	return nil
}

func (tr *TaskRepoPostgres) GetAll() ([]model.Task, error) {
	rows, err := tr.conn.Query(context.Background(), "SELECT * FROM tasks")
	if err != nil {
		fmt.Printf("Query error: %v", err)
		return nil, err
	}

	defer rows.Close()

	var tasks []model.Task

	for rows.Next() {
		var id int
		var title string
		var description string

		err = rows.Scan(&id, &title, &description)
		if err != nil {
			fmt.Printf("Scan error: %v", err)
			return nil, err
		}

		task := model.Task{
			Id:          id,
			Title:       title,
			Description: description,
		}

		tasks = append(tasks, task)
	}

	if rows.Err() != nil {
		fmt.Printf("rows error: %v", rows.Err())
		return nil, rows.Err()
	}

	return tasks, nil
}
