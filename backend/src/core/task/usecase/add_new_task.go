package usecase

import (
	"todo-list/backend/src/core/task/model"
	"todo-list/backend/src/core/task/service"
)

type AddTask struct {
	Repo service.TaskRepo
}

func NewAddTask(repo service.TaskRepo) *AddTask {
	return &AddTask{
		Repo: repo,
	}
}

func (addtask *AddTask) Execute(task model.Task) (model.Task, error) {
	addtask.Repo.Add(&task)
	return task, nil
}
