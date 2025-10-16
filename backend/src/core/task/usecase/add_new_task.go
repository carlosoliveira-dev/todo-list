package usecase

import (
	"fmt"
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

func (task *AddTask) Execute(input model.Task) (model.Task, error) {
	task.Repo.Add(&input)

	fmt.Println("Tarefa sendo adicionada:")
	fmt.Println("id:", input.Id)
	fmt.Println("title:", input.Title)
	fmt.Println("description:", input.Description)

	return input, nil
}
