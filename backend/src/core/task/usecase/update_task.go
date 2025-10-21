package usecase

import (
	"todo-list/backend/src/core/task/model"
	"todo-list/backend/src/core/task/service"
)

type UpdateTask struct {
	Repo service.TaskRepo
}

func NewUpdateTask(repo service.TaskRepo) *UpdateTask {
	return &UpdateTask{
		Repo: repo,
	}
}

func (updatetask *UpdateTask) Execute(id int, t model.Task) error {
	updatetask.Repo.Update(id, t)
	return nil
}
