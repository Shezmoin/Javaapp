// Get references to DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("theme-toggle");

// Store all tasks in an array
let tasks = [];

// Render tasks based on selected filter
function renderTasks(filter = "all") {
  taskList.innerHTML = ""; // Clear current list

  tasks.forEach((task, index) => {
    // Apply filtering
    if (filter === "completed" && !task.done) return;
    if (filter === "active" && task.done) return;

    // Create list item
    const li = document.createElement("li");

    // ✅ Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks(filter); // Re-render with updated status
    });

    // Task label
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("completed");

    // Delete button with animation
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => {
      li.classList.add("removed"); // add animation class
      setTimeout(() => {
        tasks.splice(index, 1); // remove from array
        renderTasks(filter);    // refresh UI
      }, 300); // match CSS animation duration
    });

    // Append elements to list item
    li.append(checkbox, span, delBtn);
    taskList.appendChild(li);
  });
}

// Add a new task when clicking "Add"
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    taskInput.value = "";
    renderTasks();
  }
});

// Filter buttons: All / Active / Completed
filters.forEach(button => {
  button.addEventListener("click", () => {
    renderTasks(button.dataset.filter);
  });
});

// Toggle dark/light theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initial render
renderTasks();
