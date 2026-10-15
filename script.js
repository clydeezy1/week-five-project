const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoError = document.querySelector("#todoError");

const todos =[];

function renderTodos() {
  todoList.innerHTML = "";

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
  
  renderTodos();
  todoForm.reset();
});