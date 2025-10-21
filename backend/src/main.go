package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
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

	router := gin.Default()

	router.GET("/tasks", func(c *gin.Context) {
		tasks, err := repoPostgres.GetAll()

		if err != nil {
			fmt.Println("Erro:", err)
			return
		}

		c.IndentedJSON(http.StatusOK, tasks)
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
