"use strict"
// cria uma closuje para contar as tarefas
function myCounter() {
  let counter = 0;
  return function() {
    counter++;
    return counter;
  };
}

const counter = myCounter();

function createTask() {
  // mostra no console quando a função é chamada.
  console.log("CreateTask sendo executado!");
  
  const counterTasks = counter();
  
  // cria uma div que serve de container para a nova tarefa
  const task = document.createElement("div");
  task.setAttribute("id", `task${counterTasks}`);
  document.getElementById("container").appendChild(task);

  // cria um checkbox para a tarefa
  const buttonOfTask = document.createElement("button");
  buttonOfTask.innerText = "Delete Task";
  document.getElementById(`task${counterTasks}`).appendChild(buttonOfTask);
  // fazer com que ao clicar no botão deletar a task.
  buttonOfTask.onclick = function() {
    console.log("botão delete clicado!");
    task.remove();
  };

  // adiciona a tarefa na página
  document.getElementById("container").appendChild(task);
}