// targets the button's id and the ul's id
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to create a new li, add css styling, add text, and append it to the ul
var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  };
  //every time button is clicked, it will dynamically add a new li item in the ul using createTaskHandler function from above
  buttonEl.addEventListener("click", createTaskHandler);