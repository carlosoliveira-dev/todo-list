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
  
  const counterTasks = counter();
  
  // cria uma div que serve de container para a nova tarefa
  const task = document.createElement("div");
  task.setAttribute("id", `task${counterTasks}`);
  document.getElementById("container").appendChild(task);

  // cria um checkbox para a tarefa
  const buttonOfTask = document.createElement("button");
  buttonOfTask.innerText = "Delete Task";
  document.getElementById(`task${counterTasks}`).appendChild(buttonOfTask);
  
  // criando o nome da tarefa
  const inputOfTask = document.getElementById("inputOfTasks");
  const nameOfTask = document.createElement("span");
  nameOfTask.setAttribute("id", `name${counterTasks}`);
  let text = document.getElementById("inputOfTasks").value;
  document.getElementById(`task${counterTasks}`).appendChild(nameOfTask);
  document.getElementById(`name${counterTasks}`).innerText = text;  


  // fazer com que ao clicar no botão deletar a task.
  buttonOfTask.onclick = function() {
    console.log("botão delete clicado!");
    task.remove();
  };

  // adiciona a tarefa na página
  document.getElementById("container").appendChild(task);
}