package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"todo-list/backend/src/core/task/model"
	"todo-list/backend/src/core/task/usecase"
	"todo-list/backend/src/external/db"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	pool, err := pgxpool.New(context.Background(), "postgres://postgres:secret@postgres:5432/todo-list-db?sslmode=disable")

	if err != nil {
		fmt.Println("Erro ao iniciar a conexão ao banco de dados:", err)
		return
	}

	repoPostgres := db.NewTaskRepoPostgres(pool)

	addTask := usecase.NewAddTask(repoPostgres)
	removeTask := usecase.NewRemoveTask(repoPostgres)
	getTasks := usecase.NewGetTasks(repoPostgres)

	router := gin.Default()

	router.GET("/tasks", func(c *gin.Context) {
		tasks, err := getTasks.Execute()

		if err != nil {
			log.Fatalf("ERRO AO BUSCAR TODAS AS TAREFAS: %v", err)
			return
		}

		c.IndentedJSON(http.StatusOK, tasks)
	})

	router.DELETE("/tasks/:id", func(c *gin.Context) {
		id := c.Param("id")

		num, err := strconv.ParseInt(id, 10, 64)

		if err != nil {
			fmt.Println("Error:", err)
			return
		}

		removeTask.Execute(int(num))

		c.Status(http.StatusNoContent)
	})

	router.POST("/tasks", func(c *gin.Context) {
		var task model.Task

		if err := c.BindJSON(&task); err != nil {
			return
		}

		taskresp, err := addTask.Execute(task)

		if err != nil {
			log.Fatalf("ERRO AO ADICIONAR TAREFA: %v", err)
			return
		}

		c.IndentedJSON(http.StatusCreated, taskresp)
	})

	router.Run(":8090")
}
