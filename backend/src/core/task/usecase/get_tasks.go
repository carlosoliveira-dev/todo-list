package usecase

import (
	"fmt"
	"todo-list/backend/src/core/task/model"
	"todo-list/backend/src/core/task/service"
)

type GetTasks struct {
	Repo service.TaskRepo
}

func NewGetTasks(repo service.TaskRepo) *GetTasks {
	return &GetTasks{
		Repo: repo,
	}
}

func (getalltask *GetTasks) Execute() ([]model.TaskWithID, error) {
	tasks, err := getalltask.Repo.GetAll()
	if err != nil {
		fmt.Printf("Usecase GetAllTask error: %v", err)
		return nil, err
	}
	return tasks, nil
}
