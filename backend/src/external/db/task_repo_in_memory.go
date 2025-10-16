package db

import "todo-list/backend/src/core/task/model"

type TaskRepoInMemory struct {
	tasks []model.Task
}

func NewTaskRepoInMemory() *TaskRepoInMemory {
	return &TaskRepoInMemory{
		tasks: make([]model.Task, 0),
	}
}

func (tr *TaskRepoInMemory) Add(t *model.Task) error {
	tr.tasks = append(tr.tasks, *t)
	return nil
}

func (tr *TaskRepoInMemory) GetAll() ([]model.Task, error) {
	return tr.tasks, nil
}
