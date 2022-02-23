//references to be used throughout
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

// targets the forms's id and the ul's id
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to create a new li, add css styling, add text, and append it to the ul
var taskFormHandler = function(event) {

    event.preventDefault(); //prevents browser's default behavior
    var taskNameInput = document.querySelector("input[name='task-name']").value;//[] used because we are selecting the input HTML element that has a name attribute set to task-name
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty input strings, if they are the function stops and alerts
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    //this will refresh the form after correct inputs are added
    formEl.reset();
    
    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) { 
    
    var listItemEl = document.createElement("li");//creates new li item
    listItemEl.className = "task-item"; //applies task-item class styling

    //add task-id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div");// create div to hold task info and add to list item
    taskInfoEl.className = "task-info";//applies task-item class styling
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEl.appendChild(taskInfoEl);

    //uses taskIdCounter as the argument to create buttons that correspond to the current task-id
    var taskActionsEl = createTaskActions(taskIdCounter); //createTaskActions() returns a DOM elemnt that is stored in taskActionsEl that can be used anywhere
    
    tasksToDoEl.appendChild(listItemEl);// add entire list item to list

    //increase task counter for next unique id. keeps each id unique.
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");//this creates a container for the other elements
    actionContainerEl.className = "task-actions";//applies task-actions styling

    // create edit button
    var editButtonEl = document.createElement("button");//creates button
    editButtonEl.textContent = "Edit";//adds text to button
    editButtonEl.className = "btn edit-btn";//adds this styling to the button
    editButtonEl.setAttribute("data-task-id", taskId);//adds task-id as a custom attribute

    actionContainerEl.appendChild(editButtonEl);//adds all above to the edit button to container

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);//adds all above to the delete button to container

    //create dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    //create array for choices in dropdown
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {//keeps loop running as long as the number of items(length) is less than i, then increments the counter by one each loop
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);//returns the value of the array at the given index
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }
    
    return actionContainerEl;
};

var taskButtonHandler = function(event) {
   // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    //lets user know we are in edit mode
    document.querySelector("#save-task").textContent = "Save Task";

    //adds the taskId to a data-task-id attribute on the form itself
    formEl.setAttribute("data-task-id", taskId);

};

var deleteTask = function(taskId) {//creates deleteTask function to remove task, to be used on delete button and li element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};


//
pageContentEl.addEventListener("click", taskButtonHandler);

//every time button is clicked with a value of submit, it will dynamically add a new li item in the ul using taskFormHandler function from above
formEl.addEventListener("submit", taskFormHandler);