// Get references to DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("theme-toggle");

// Store all tasks in an array
let tasks = [];

// Render tasks based on filter
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    // Skip tasks based on filter
    if (filter === "completed" && !task.done) return;
    if (filter === "active" && task.done) return;

    // Create list item
    const li = document.createElement("li");

    // Add 'new' class if the task was just added
    if (task.isNew) {
      li.classList.add("new");
      setTimeout(() => {
        task.isNew = false; // remove flag so it doesn't animate again
      }, 10);
    }

    // Create left section for checkbox + text
    const taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks(filter);
    });

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("completed");

    taskLeft.append(checkbox, span);

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => {
      li.classList.add("removed");
      setTimeout(() => {
        tasks.splice(index, 1);
        renderTasks(filter);
      }, 300);
    });

    li.append(taskLeft, delBtn);
    taskList.appendChild(li);
  });
}

// Add task on click
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false, isNew: true }); // mark as new for animation
    taskInput.value = "";
    renderTasks();
  }
});

// Filter buttons (All, Active, Completed)
filters.forEach(button => {
  button.addEventListener("click", () => {
    renderTasks(button.dataset.filter);
  });
});

// Toggle light/dark theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Set tooltip using JS (optional if not using `title` attribute)
themeToggle.setAttribute("data-tooltip", "Toggle dark mode");

// Initial render
renderTasks();
