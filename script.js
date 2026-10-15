const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoError = document.querySelector("#todoError");
const todoCount = document.querySelector("#todoCount");

const todos = JSON.parse(localStorage.getItem("nextUpTodos")) || [];
function saveTodos() {
  localStorage.setItem("nextUpTodos", JSON.stringify(todos));
}

function updateTodoCount() {
  const completedCount = todos.filter((todo) => todo.completed).length;
  todoCount.textContent = `${completedCount} of ${todos.length} tasks completed.`;
}
function renderTodos() {
  todoList.innerHTML = "";
  updateTodoCount();

  todos.forEach((todo, index) => {
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
      updateTodoCount();
      text.classList.toggle("completed", todo.completed);
    });
    
    text.classList.toggle("completed", todo.completed);

    label.appendChild(checkbox);
    label.appendChild(text);
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
    completed: false
  });
  
  saveTodos();
  renderTodos();
  todoForm.reset();
});