const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoError = document.querySelector("#todoError");

const todos =[];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
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
  
  renderTodos();
  todoForm.reset();
});