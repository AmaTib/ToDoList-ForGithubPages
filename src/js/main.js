import { Logger } from "sass";
import "./../scss/style.scss";

class Task {
  toDo;
  completed;
  constructor(toDo, completed = false) {
    this.toDo = toDo;
    this.completed = completed;
  }
  markAsCompleted() {
    this.completed = true;
  }
  markAsUndone() {
    this.completed = false;
  }
}

const task1 = new Task("Wake up");
const task2 = new Task("Eat");
const task3 = new Task("Sleep");
const task4 = new Task("Repeat");

let toDoList = [task1, task2, task3, task4];
const completedTasksList = [];

const input = document.querySelector("input");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");

//skapar html för "att göra" listan. Anropas direkt under funktionen.
function htmlForToDo() {
  taskList.innerHTML = "";
  //placerar uppgifterna som en li i en ul lista
  toDoList.forEach((task, i) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const removeButton = document.createElement("button");
    const liContainer = document.createElement("div");
    removeButton.innerHTML = "Ta bort";
    p.innerHTML = task.toDo;

    //tar bort uppgift från "att göra" och lägger den i "avklarat" listan när man klickar på ta bort knappen
    removeButton.addEventListener("click", () => {
      toDoList.splice(i, 1);
      completedTasksList.push(task);
      task.markAsCompleted();
      htmlForCompleted();
      htmlForToDo();

      console.log(toDoList);
      console.log(completedTasksList);
    });

    liContainer.appendChild(p);
    liContainer.appendChild(removeButton);
    li.appendChild(liContainer);
    taskList.appendChild(li);
  });
}
htmlForToDo();

//skapar html för avklarat listan. Anropas när man klickar på ta bort knappen
function htmlForCompleted() {
  completedList.innerHTML = "";

  completedTasksList.forEach((removedTask, i) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const undoButton = document.createElement("button");
    const liContainer = document.createElement("div");
    undoButton.innerHTML = "Ångra";
    p.innerHTML = removedTask.toDo;

    //klickevent för ångra knappen
    undoButton.addEventListener("click", () => {
      completedTasksList.splice(i, 1);
      toDoList.push(removedTask);
      removedTask.markAsUndone();
      htmlForCompleted();
      htmlForToDo();

      console.log(completedTasksList);
      console.log(toDoList);
    });

    liContainer.appendChild(p);
    liContainer.appendChild(undoButton);
    li.appendChild(liContainer);
    completedList.appendChild(li);
  });
}

//skapar nya uppgifter som läggs till i att göra listan (och i array) när man klickar på lägg till knappen
addButton.addEventListener("click", () => {
  let newTask = input.value;
  const task5 = new Task(newTask);

  toDoList.push(task5);

  console.log(toDoList);
  const newLi = document.createElement("li");
  const newP = document.createElement("p");
  const newRemoveButton = document.createElement("button");
  const newLiContainer = document.createElement("div");
  newRemoveButton.innerHTML = "Ta bort";
  newP.innerHTML = newTask;

  newRemoveButton.addEventListener("click", () => {
    toDoList.splice(toDoList.indexOf(task5), 1);
    completedTasksList.push(task5);
    task5.markAsCompleted();
    htmlForCompleted();
    htmlForToDo();

    console.log(toDoList);
    console.log(completedTasksList);
  });

  newLiContainer.appendChild(newP);
  newLiContainer.appendChild(newRemoveButton);
  newLi.appendChild(newLiContainer);
  taskList.appendChild(newLi);
  input.value = "";
});
