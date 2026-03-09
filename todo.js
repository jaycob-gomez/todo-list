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

  saveTodos();
  displayTodos();
  todoInput.value = ""; // Clear input field
}

// Saves the current state of todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {
  // Clear existing container to avoid duplicates
  todoContainer.textContent = "";
  // Loop through the todos
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    li.classList.add("todo-item");
    button.classList.add("btn", "btn-delete");

    li.textContent = todo.text + " ";
    button.textContent = "DELETE";

    // Event listener attached to each button
    button.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    // add li to container
    todoContainer.appendChild(li);
    // put button inside li
    li.appendChild(button);
  });
}

function deleteTodo(id) {
  // Remove data from data structure
  todos = todos.filter((todo) => todo.id !== id);

  // Update localStorage
  saveTodos();

  // Display the updated list of todos - no need to target the list items directly, just call displayTodos to refresh the entire list
  displayTodos();
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
