// Get references to DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("theme-toggle");

// Store tasks in an array
let tasks = [];

// Render tasks based on filter
function renderTasks(filter = "all") {
  taskList.innerHTML = ""; // Clear current list

  tasks.forEach((task, index) => {
    // Filter logic
    if (filter === "completed" && !task.done) return;
    if (filter === "active" && task.done) return;

    // Create list item
    const li = document.createElement("li");

    // Create left side (checkbox + text)
    const taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    // Toggle task status when checkbox is changed
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks(filter);
    });

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("completed");

    // Add checkbox and text to left side
    taskLeft.append(checkbox, span);

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => {
      li.classList.add("removed"); // trigger CSS animation
      setTimeout(() => {
        tasks.splice(index, 1);
        renderTasks(filter);
      }, 300); // match animation time in CSS
    });

    // Add everything to the list item
    li.append(taskLeft, delBtn);
    taskList.appendChild(li);
  });
}

// Add task when clicking "Add"
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    taskInput.value = "";
    renderTasks();
  }
});

// Filter buttons
filters.forEach(button => {
  button.addEventListener("click", () => {
    renderTasks(button.dataset.filter);
  });
});

// Toggle light/dark theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initial render
renderTasks();
