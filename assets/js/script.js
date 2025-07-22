// Get references to DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("theme-toggle");

// Store all tasks in an array
let tasks = [];

// Render tasks to the page based on the current filter
function renderTasks(filter = "all") {
  taskList.innerHTML = ""; // Clear the list before re-rendering

  tasks.forEach((task, index) => {
    // Apply filtering logic
    if (filter === "completed" && !task.done) return;
    if (filter === "active" && task.done) return;

    // Create list item
    const li = document.createElement("li");

    // Create the task text span
    const span = document.createElement("span");
    span.textContent = task.text;

    // Add "completed" class if task is done
    if (task.done) span.classList.add("completed");

    // Toggle task completion when clicked
    span.addEventListener("click", () => {
      task.done = !task.done;
      renderTasks(filter); // Refresh the view
    });

    // Create delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";

    // Remove task when delete button is clicked
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks(filter);
    });

    // Add the text and delete button to the list item
    li.append(span, delBtn);

    // Add the list item to the task list
    taskList.appendChild(li);
  });
}

// Add a new task when the "Add" button is clicked
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    taskInput.value = ""; // Clear input field
    renderTasks();
  }
});

// Filter buttons: All / Active / Completed
filters.forEach(button => {
  button.addEventListener("click", () => {
    renderTasks(button.dataset.filter);
  });
});

// Toggle light/dark theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initial render when page loads
renderTasks();

console.log("JavaScript is connected!"); // Checking if the js file is connected correctly
