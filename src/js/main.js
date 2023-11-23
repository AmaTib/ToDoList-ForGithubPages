import { Logger } from "sass";
import "./../scss/style.scss";

class Task {
  toDo;

  constructor(toDo) {
    this.toDo = toDo;
  }
}

const task1 = new Task("Wake up");
const task2 = new Task("Eat");
const task3 = new Task("Sleep");
const task4 = new Task("Repeat");

let toDoList = [task1, task2, task3, task4];
let completedTasksList = [];

const input = document.querySelector("input");
const form = document.getElementById("form");
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");

function storeLocal() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));

  localStorage.setItem("completedList", JSON.stringify(completedTasksList));
}

if (localStorage.getItem("toDoList")) {
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
}
if (localStorage.getItem("completedList")) {
  completedTasksList = JSON.parse(localStorage.getItem("completedList"));
}

storeLocal();

console.log(toDoList);
console.log(completedTasksList);

//skapar html för "att göra" listan. Anropas direkt under funktionen.
function htmlForToDo() {
  taskList.innerHTML = "";
  //placerar uppgifterna som en li i en ul lista
  toDoList.forEach((task, i) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Klart";
    p.innerHTML = task.toDo;

    //tar bort uppgift från "att göra" och lägger den i "avklarat" listan när man klickar på ta bort knappen
    removeButton.addEventListener("click", () => {
      toDoList.splice(i, 1);
      completedTasksList.push(task);
      htmlForCompleted();
      htmlForToDo();

      storeLocal();

      console.log(toDoList);
      console.log(completedTasksList);
    });

    const sort = document.getElementById("sort");
    sort.addEventListener("click", () => {
      toDoList.sort((a, b) => (a.toDo > b.toDo ? 1 : -1));
      htmlForToDo();
    });

    li.appendChild(p);
    li.appendChild(removeButton);
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
    undoButton.innerHTML = "Ångra";
    p.innerHTML = removedTask.toDo;

    //klickevent för ångra knappen
    undoButton.addEventListener("click", () => {
      completedTasksList.splice(i, 1);
      toDoList.push(removedTask);
      htmlForCompleted();
      htmlForToDo();

      storeLocal();

      console.log(completedTasksList);
      console.log(toDoList);
    });

    li.appendChild(p);
    li.appendChild(undoButton);
    completedList.appendChild(li);
  });
}
htmlForCompleted();

//skapar nya uppgifter som läggs till i att göra listan (och i array) när man klickar på lägg till knappen
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    alert("skriv något då, din latmask!");
  } else {
    let newTask = input.value;
    const task5 = new Task(newTask);
    toDoList.push(task5);

    console.log(toDoList);

    const newLi = document.createElement("li");
    const newP = document.createElement("p");
    const newRemoveButton = document.createElement("button");
    newRemoveButton.innerHTML = "klart";
    newP.innerHTML = newTask;

    storeLocal();

    newRemoveButton.addEventListener("click", () => {
      toDoList.splice(toDoList.indexOf(task5), 1);
      completedTasksList.push(task5);
      htmlForCompleted();
      htmlForToDo();

      storeLocal();

      console.log(toDoList);
      console.log(completedTasksList);
    });

    newLi.appendChild(newP);
    newLi.appendChild(newRemoveButton);
    taskList.appendChild(newLi);
    input.value = "";
  }
});
