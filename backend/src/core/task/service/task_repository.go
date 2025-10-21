package service

import "todo-list/backend/src/core/task/model"

type TaskRepo interface {
	Add(t *model.Task) error
	GetAll() ([]model.TaskWithID, error)
	Remove(id int) error
	Update(id int, t model.Task) error
}
