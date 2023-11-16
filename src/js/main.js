import { Logger } from "sass";
import "./../scss/style.scss";

const toDoList = ["Wake up", "Eat", "Sleep", "Repeat"];
const changedList = [];

const input = document.querySelector("input");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");

//placerar uppgifterna som en li i en ul lista
toDoList.forEach((task, i) => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const removeButton = document.createElement("button");
  const liContainer = document.createElement("div");
  removeButton.innerHTML = "Ta bort";
  p.innerHTML = task;

  liContainer.appendChild(p);
  liContainer.appendChild(removeButton);
  li.appendChild(liContainer);
  taskList.appendChild(li);

  //tar bort uppgift och lägger den i avklarat listan när man klickar på ta bort knappen
  removeButton.addEventListener("click", () => {
    toDoList.splice(task, i);

    htmlForCompleted();

    console.log(toDoList);
  });

  //skapar html för avklarat listan. Anropas när man klickar på ta bort knappen
  function htmlForCompleted() {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const removeButton = document.createElement("button");
    const liContainer = document.createElement("div");
    removeButton.innerHTML = "Ångra";
    p.innerHTML = task;

    liContainer.appendChild(p);
    liContainer.appendChild(removeButton);
    li.appendChild(liContainer);
    completedList.appendChild(li);
  }
});

//försök att skapa klickevent för att lägga till uppgift
addButton.addEventListener("click", () => {
  let newTask = input.value;
  toDoList.push(newTask);

  const newLi = document.createElement("li");
  const newP = document.createElement("p");
  const newRemoveButton = document.createElement("button");
  const newLiContainer = document.createElement("div");
  newRemoveButton.innerHTML = "Ta bort";
  newP.innerHTML = newTask;

  newLiContainer.appendChild(newP);
  newLiContainer.appendChild(newRemoveButton);
  newLi.appendChild(newLiContainer);
  taskList.appendChild(newLi);

  console.log(toDoList);
});

//skapar nya uppgifter som läggs till i att göra listan (och i array) när man klickar på lägg till knappen
// addButton.addEventListener("click", () => {
//   const newLi = document.createElement("li");
//   const newP = document.createElement("p");
//   const newButton = document.createElement("button");
//   const newLiContainer = document.createElement("div");
//   newButton.innerHTML = "Ta bort";
//   newP.innerHTML = input.value;

//   newLiContainer.appendChild(newP);
//   newLiContainer.appendChild(newButton);
//   newLi.appendChild(newLiContainer);
//   taskList.appendChild(newLi);

//   //tar bort uppgift och lägger den i avklarat listan när man klickar på ta bort knappen
//   newButton.addEventListener("click", () => {
//     console.log("du klickade");
//   });
// });
