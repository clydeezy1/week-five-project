const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoError = document.querySelector("#todoError");
const todoCount = document.querySelector("#todoCount");
const taskProgress = document.querySelector("#taskProgress");
const todoEnergy = document.querySelector("#todoEnergy");

const filterButtons = document.querySelectorAll("[data-filter]");
let currentFilter = "all";

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    
    filterButtons.forEach((filterButton) => {
      filterButton.setAttribute(
        "aria-pressed",
        String(filterButton === button)
      );
    });

    renderTodos();
  });
});

const todos = JSON.parse(localStorage.getItem("nextUpTodos")) || [];
function saveTodos() {
  localStorage.setItem("nextUpTodos", JSON.stringify(todos));
}

function updateTodoCount() {
  const completedCount = todos.filter((todo) => todo.completed).length;

  const precentage = todos.length === 0 
  ? 0 
  : (completedCount / todos.length) * 100;

  todoCount.textContent = 
  `${completedCount} of ${todos.length} tasks completed.`;
  
  taskProgress.value = precentage;
}

function renderTodos() {
  todoList.innerHTML = "";
  updateTodoCount();

  todos.forEach((todo, index) => {
    if (currentFilter === "active" && todo.completed) return;
    if (currentFilter === "completed" && !todo.completed) return;

    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    text.textContent = todo.text;

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });
    
    text.classList.toggle("completed", todo.completed);

    label.appendChild(checkbox);
    label.appendChild(text);
    const energyLabel = document.createElement("small");
    energyLabel.className = "energy-label";

    energyLabel.textContent = todo.completed ? "Completed" : `${todo.energy || "low"} energy`;

      label.appendChild(energyLabel)

    li.appendChild(label);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
      });

      li.appendChild(deleteButton);

    todoList.appendChild(li);
  });
  }

renderTodos();

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    todoError.textContent = "Please enter a task.";
    return;
  }
  todoError.textContent = "";

  todos.push({
    text: todoText,
    completed: false,
    energy: todoEnergy.value
  });
  
  saveTodos();
  renderTodos();
  todoForm.reset();
});