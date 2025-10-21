package usecase

import (
	"todo-list/backend/src/core/task/service"
)

type RemoveTask struct {
	Repo service.TaskRepo
}

func NewRemoveTask(repo service.TaskRepo) *RemoveTask {
	return &RemoveTask{
		Repo: repo,
	}
}

func (removetask *RemoveTask) Execute(id int) error {
	removetask.Repo.Remove(id)
	return nil
}
