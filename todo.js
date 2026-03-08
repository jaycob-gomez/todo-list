const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoContainer = document.querySelector(".todo-container");

// A place to store todos
let todos = [];

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value;
  addTodo(text);
});

function addTodo(text) {
  // Validate input (prevent empty todos)
  if (text.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  // Save the todo to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
  todoInput.value = ""; // Clear input field
}

function displayTodos() {
  // Clear existing container to avoid duplicates
  todoContainer.textContent = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `${todo.text} <button class="btn btn-delete" onClick="deleteTodo(${todo.id})">DELETE</button>`;
    todoContainer.appendChild(li);
  });
}

function deleteTodo(id) {
  // Remove the item from DOM
  const todoItem = document.querySelector(
    `.todo-item button[onClick="deleteTodo(${id})"]`,
  ).parentElement;
  if (todoItem) {
    todoContainer.removeChild(todoItem);
  }

  // Remove data from data structure
  todos = todos.filter((todo) => todo.id !== id);

  // Update localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function init() {
  // Load todos from localStorage
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos) {
    try {
      const parsedTodos = JSON.parse(storedTodos);
      if (Array.isArray(parsedTodos)) {
        todos.push(...parsedTodos);
      }
    } catch (e) {
      console.log("Failed to parse todos from localStorage", e);
    }
  }
  displayTodos();
}

init();
