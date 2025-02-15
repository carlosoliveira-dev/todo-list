"use strict"
function createTask() {
  // mostra no console quando a função é chamada.
  console.log("CreateTask sendo executado!");

  // cria uma div que serve de container para a nova tarefa
  const task = document.createElement("div");
  task.setAttribute("id", `task${1}`);
  document.getElementById("container").appendChild(task);

  // cria um checkbox para a tarefa
  const buttonOfTask = document.createElement("button");
  buttonOfTask.innerText = "Delete Task";
  document.getElementById(`task${1}`).appendChild(buttonOfTask);
  // fazer com que ao clicar no botão deletar a task.


  // adiciona a tarefa na página
  document.getElementById("container").appendChild(task);
}