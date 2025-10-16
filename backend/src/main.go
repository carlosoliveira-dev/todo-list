package main

import (
	"fmt"
	"log"
	"net/http"
	"todo-list/backend/src/core/task/model"
	"todo-list/backend/src/core/task/usecase"
	"todo-list/backend/src/external/db"

	"github.com/gin-gonic/gin"
)

func main() {
	repoInMemo := db.NewTaskRepoInMemory()
	addTask := usecase.NewAddTask(repoInMemo)

	router := gin.Default()

	router.GET("/tasks", func(c *gin.Context) {
		tasks, err := repoInMemo.GetAll()

		if err != nil {
			fmt.Println("Erro:", err)
			return // ou tratar de outra forma
		}

		c.IndentedJSON(http.StatusOK, tasks)
	})

	router.POST("/tasks", func(c *gin.Context) {
		var task model.Task

		if err := c.BindJSON(&task); err != nil {
			return
		}

		_, err := addTask.Execute(task)

		if err != nil {
			log.Fatalf("ERRO AO ADICIONAR TAREFA: %v", err)
			return
		}

		c.IndentedJSON(http.StatusCreated, task)
	})

	router.Run(":8090")
}
