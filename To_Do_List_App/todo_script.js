// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");
const exploreMoreShow = document.querySelector("#explore-more");

// Event Listners
document, addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOptions.addEventListener("click", filterTodo);


// Functions

function addTodo(e) {
  //Prevent form from submiitting
  e.preventDefault();
  //ToDo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // ADD TODO TO LOCALSTORAGE
  saveToLocalStorage(todoInput.value);
  //CHECK MARK BTN
  const completedBtn = document.createElement("button");

  completedBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);

  //Create Li
  const newTodo = document.createElement("li");
  newTodo.textContent = todoInput.value;
  console.log(newTodo);
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Create EDIT BTN

  //Create TRASH BTN
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"> </i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);
  //Append To List
  todoList.appendChild(todoDiv);

  // CLEAR TODO INPUT VALUE
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // ANIMATION
    todo.classList.add("fall");
    removeLocalTodosFromLocalStorage(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(item);
    const checkBtn = item.firstChild;
    checkBtn.classList.toggle("check");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// localstorage function

function saveToLocalStorage(todo) {
  //  CHECK DO I ALREADY HAVE THINGS IN THERE?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //  CHECK DO I ALREADY HAVE THINGS IN THERE?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //ToDo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //CHECK MARK BTN
    const completedBtn = document.createElement("button");

    completedBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.textContent = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Create EDIT BTN

    //Create TRASH BTN
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    //Append To List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodosFromLocalStorage(todo) {
  //  CHECK DO I ALREADY HAVE THINGS IN THERE?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[1].textContent;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  // todo.splice(todos.indexof(todoIndex), 1);
}
