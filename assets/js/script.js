// targets the forms's id and the ul's id
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to create a new li, add css styling, add text, and append it to the ul
var createTaskHandler = function(event) {

    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  };
  //every time button is clicked with a value of submit, it will dynamically add a new li item in the ul using createTaskHandler function from above
  formEl.addEventListener("submit", createTaskHandler);