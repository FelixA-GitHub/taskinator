// targets the forms's id and the ul's id
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to create a new li, add css styling, add text, and append it to the ul
var createTaskHandler = function(event) {

    event.preventDefault(); //prevents browser's default behavior
    var taskNameInput = document.querySelector("input[name='task-name']").value;//[] used because we are selecting the input HTML element that has a name attribute set to task-name
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    var listItemEl = document.createElement("li");//creates new li item
    listItemEl.className = "task-item"; //applies task-item class styling

    var taskInfoEl = document.createElement("div");// create div to hold task info and add to list item
    taskInfoEl.className = "task-info";//applies task-item class styling
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);

    tasksToDoEl.appendChild(listItemEl);// add entire list item to list

};
  //every time button is clicked with a value of submit, it will dynamically add a new li item in the ul using createTaskHandler function from above
  formEl.addEventListener("submit", createTaskHandler);