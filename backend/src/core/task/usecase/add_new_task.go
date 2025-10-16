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

func (addtask *AddTask) Execute(task model.Task) (model.Task, error) {
	addtask.Repo.Add(&task)

	fmt.Println("Tarefa sendo adicionada:")
	fmt.Println("title:", task.Title)
	fmt.Println("description:", task.Description)

	return task, nil
}
