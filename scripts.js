 // Get tasks from local storage if available, or initialize an empty array
 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

 // Function to update the tasks in both the array and the display
 function updateTasks() {
     const taskList = document.getElementById("task-list");
     taskList.innerHTML = "";

     for (let i = 0; i < tasks.length; i++) {
         const task = tasks[i];
         const li = document.createElement("li");
         li.innerHTML = `
             <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
             <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
             <button class="delete-button" data-index="${i}">Delete</button>
         `;
         taskList.appendChild(li);
     }

     // Save tasks to local storage
     localStorage.setItem("tasks", JSON.stringify(tasks));
 }

 // Function to add a new task
 function addTask() {
     const taskInput = document.getElementById("task-input");
     const taskText = taskInput.value.trim();

     if (taskText !== "") {
         tasks.push({ text: taskText, completed: false });
         updateTasks();
         taskInput.value = "";
     }
 }

 // Function to remove a task
 function removeTask(index) {
     tasks.splice(index, 1);
     updateTasks();
 }

 // Function to toggle task completion status
 function completeTask(index) {
     tasks[index].completed = !tasks[index].completed;
     updateTasks();
 }

 // Function to filter completed tasks
 function filterTasks() {
     const showCompleted = document.getElementById("show-completed").checked;

     if (showCompleted) {
         updateTasks();
     } else {
         const activeTasks = tasks.filter(task => !task.completed);
         tasks = activeTasks;
         updateTasks();
     }
 }

 // Add event listeners
 document.getElementById("add-task").addEventListener("click", addTask);
 document.getElementById("show-completed").addEventListener("change", filterTasks);

 document.getElementById("task-list").addEventListener("change", function (event) {
     if (event.target.classList.contains("task-checkbox")) {
         const index = event.target.parentElement.querySelector(".delete-button").getAttribute("data-index");
         completeTask(index);
     }
 });

 document.getElementById("task-list").addEventListener("click", function (event) {
     if (event.target.classList.contains("delete-button")) {
         const index = event.target.getAttribute("data-index");
         removeTask(index);
     }
 });

 // Initial task display
 updateTasks();
