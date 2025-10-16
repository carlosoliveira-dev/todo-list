package main

import (
	"fmt"
	"log"
	"net/http"
	"todo-list/backend/src/core/task/model"
	"todo-list/backend/src/core/task/usecase"
	"todo-list/backend/src/external/db"
)

func hello(w http.ResponseWriter, req *http.Request) {

	fmt.Fprintf(w, "hello\n")
}

func headers(w http.ResponseWriter, req *http.Request) {

	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

func main() {

	taskInput := model.Task{
		Id:          "1",
		Title:       "pintar",
		Description: "pintar o portão"}

	repoInMemo := db.NewTaskRepoInMemory()

	addTask := usecase.NewAddTask(repoInMemo)

	output, err := addTask.Execute(taskInput)

	if err != nil {
		log.Fatalf("ERRO AO ADICIONAR TAREFA: %v", err)
		return
	}

	println("Id impresso no main:", output.Id)

	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	http.ListenAndServe(":8090", nil)
}
