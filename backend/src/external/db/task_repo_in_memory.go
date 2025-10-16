package db

import (
	"fmt"
	"todo-list/backend/src/core/task/model"
)

type TaskRepoInMemory struct {
	tasks []model.Task
}

func NewTaskRepoInMemory() *TaskRepoInMemory {
	return &TaskRepoInMemory{
		tasks: make([]model.Task, 0),
	}
}

var lastID int = 0

func (tr *TaskRepoInMemory) Add(t *model.Task) error {
	lastID++
	t.Id = lastID
	tr.tasks = append(tr.tasks, *t)
	fmt.Println(t)
	return nil
}

func (tr *TaskRepoInMemory) GetAll() ([]model.Task, error) {
	return tr.tasks, nil
}
