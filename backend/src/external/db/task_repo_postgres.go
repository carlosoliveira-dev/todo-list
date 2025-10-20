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
		"INSERT INTO tasks (title, description, done) VALUES ($1, $2, $3)",
		t.Title, t.Description, t.Done)
	if err != nil {
		fmt.Printf("ERRO ao inserir task(TaskRepoPostgres.Add): %v", err)
		return err
	}
	return nil
}

func (tr *TaskRepoPostgres) GetAll() ([]model.TaskWithID, error) {
	rows, err := tr.conn.Query(context.Background(), "SELECT * FROM tasks")
	if err != nil {
		fmt.Printf("Query error: %v", err)
		return nil, err
	}

	defer rows.Close()

	var tasks []model.TaskWithID

	for rows.Next() {
		var id int
		var title string
		var description string
		var done bool

		err = rows.Scan(&id, &title, &description, &done)
		if err != nil {
			fmt.Printf("Scan error: %v", err)
			return nil, err
		}

		task := model.TaskWithID{
			Id:          id,
			Title:       title,
			Description: description,
			Done:        done,
		}

		tasks = append(tasks, task)
	}

	if rows.Err() != nil {
		fmt.Printf("rows error: %v", rows.Err())
		return nil, rows.Err()
	}

	return tasks, nil
}
