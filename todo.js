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
    const checkbox = document.createElement("input");
    const button = document.createElement("button");

    // Add a check to ensure 'todo' is not null or undefined
    if (!todo) {
      console.warn("Skipping a null or undefined todo item.");
      return; // Skip this iteration if todo is null
    }
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("list-item-checkbox");

    checkbox.addEventListener("change", () => {
      toggleTodo(todo.id);
    });

    // A label for text improves accessibility
    const label = document.createElement("label");
    label.textContent = todo.text;
    label.classList.add("list-item-label");

    li.classList.add("todo-item");
    button.classList.add("btn", "btn-delete");

    button.textContent = "DELETE";

    // Event listener attached to each button
    button.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    // put button inside li
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(button);

    // add li to container
    todoContainer.appendChild(li);
  });
}

// If the todo is clicked, toggle the completed property to the opposite of its current value: t -> f OR f -> t
function toggleTodo(id) {
  todos = todos.map((todo) => {
    return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
  });

  saveTodos();
  displayTodos();
}

function deleteTodo(id) {
  // Remove data from data structure
  todos = todos.filter((todo) => todo !== null && todo.id !== id);

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
