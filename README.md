# Todo List

## Mental model for the app

```
User Interaction
      ↓
Event Listener
      ↓
Update Data (todos array)
      ↓
Save Data (localStorage)
      ↓
Re-render UI (displayTodos)
```

## Features

- Add task
  - capture user input
  - store the data
  - update the html to display item
- Delete task

## Concepts used

- Arrays
- Objects
- Event handling
- Filter
- DOM rendering
- localStorage (Allows access to a Storage object to save stored data across browser sessions which is beneficial for a todo app)

## Code breakdown

**1. DOM Element Selection**

```js
// Grabbing the form element to listen for a "submit" event
const todoForm = document.querySelector("#todo-form");
// The input element where the user types in their todo
const todoInput = document.querySelector("#todo");
// The container where all the todos will be displayed in
const todoContainer = document.querySelector(".todo-container");
```

**2. Application State**

```js
// Source of truth for the app, the todos array will store the todos. This is the data the UI will be generated from
let todos = [];
```

**3. Form Event Listener**

```js
// The form now listens for a submit event that grabs the event object to prevent page reload
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Accesses the value the user typed in to the input field
  const text = todoInput.value;
  // Pass that value into an addTodo function
  addTodo(text);
});
```

**4. addTodo() Function**

```js
function addTodo(text) {
  // This function will handle the logic for creating a new todo item
}
```

STEP 1 - INPUT VALIDATION

```js
// Before moving on with the function, check for valid input and if not break out of the function and let the user know immediately
if (text.trim() === "") {
  alert("Please enter a task!");
  return;
}
```

STEP 2 - CREATE A TODO OBJECT

```js
const newTodo = {
  // Creates a unique timestamp id for unique identification
  id: Date.now(),
  //   The input value gets stored as the value for the text property
  text: text,
  completed: false,
};
```

```js
// Example todo object
{
    id: 1715200000000,
    text: "Study JavaScript",
    completed: false
}
```

STEP 3 - UPDATE THE APPLICATION STATE

```js
// The object of the new todo gets pushed to the todos array created at the beginning
todos.push(newTodo);
```

```
Before
todos = []

After
todos = [{todo1}]

Later
todos = [{todo1}, {todo2}, {todo3}]
```

STEP 4 - SAVING TO LOCALSTORAGE

- localStorage only stores strings, so saving the array of objects directly will not work
- JSON.stringify converts the array into a string

```js
localStorage.setItem("todos", JSON.stringify(todos));
```

```
this:
[{id:1,text:"hello"}]

becomes:
"[{\"id\":1,\"text\":\"hello\"}]"
```

STEP 5 - RE-RENDER THE UI

- Once the state is updated, refresh the UI

```js
displayTodos();
```

STEP 6 - CLEAR THE INPUT

```js
todoInput.value = "";
```

**5. displayTodos() Function**

- This function renders the UI from the data

STEP 1 - CLEAR THE EXISTING UI

```js
// Clear existing container to avoid duplicates
todoContainer.textContent = "";
```

STEP 2 - LOOP THROUGH TODOS

```js
todos.forEach((todo) => {});
```

STEP 3 - CREATE HTML

```js
const li = document.createElement("li");
```

STEP 4 - ADD A CLASS

```js
li.classList.add("todo-item");
```

STEP 5 - INSERT HTML

```js
li.innerHTML = `${todo.text} <button class="btn btn-delete" onClick="deleteTodo(${todo.id})">DELETE</button>`;

todoContainer.appendChild(li);
```

**6. The deleteTodo() Function**

```js
function deleteTodo(id)
```

STEP 1 - FILTER THE ITEM OUT OF THE ARRAY

```js
// Remove data from data structure
todos = todos.filter((todo) => todo.id !== id);
```

STEP 2 - UPDATE LOCALSTORAGE TO REFLECT THE CHANGE

```js
// Update localStorage
localStorage.setItem("todos", JSON.stringify(todos));
```

STEP 3 - DISPLAY NEW LIST

```js
// Display the updated list of todos - no need to target the list items directly, just call displayTodos to refresh the entire list
displayTodos();
```

**7. App Initialization**

- This runs when the app starts

```js
function init()
```

STEP 1 - LOAD SAVED DATA

```js
// Load todos from localStorage
const storedTodos = localStorage.getItem("todos");
```

STEP 2 - IF THERE ARE TODOS, CONVERT THE STRING TO AN OBJECT

```js
if (storedTodos) {
    try {
      const parsedTodos = JSON.parse(storedTodos);
    }
}
```

STEP 3 - VALIDATE THE DATA THEN ADD TODOS TO STATE

```js
if (Array.isArray(parsedTodos)) {
  todos.push(...parsedTodos);
}
```

STEP 4 - RENDER UI

```js
displayTodos();
```
