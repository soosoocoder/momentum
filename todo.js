const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");

const TODOS_LS = "toDos";

function filterFn(toDo){
    return toDo.id === 1;
}

let toDos = [];

function deleteTodo(event){
const btn = event.target;
const li = btn.parentNode;
todoList.removeChild(li);
const cleanTodos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
});
toDos = cleanTodos;
saveTodos();
};

function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text){
const li = document.createElement("li");
const delBtn = document.createElement("button");
const span = document.createElement("span");
const newID = toDos.length + 1;
delBtn.innerText = "✔";
delBtn.addEventListener("click", deleteTodo);
span.innerText = `- ${text}`;
li.id = newID;
li.appendChild(span);
li.appendChild(delBtn);
todoList.appendChild(li);
const todoObj = {
    text : text,
    id : newID
};
toDos.push(todoObj);
saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadToDos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
if(loadedTodos !== null){
const parsedTodos = JSON.parse(loadedTodos);
parsedTodos.forEach(function(todo) {
    paintTodo(todo.text)
})
} 
}

function init(){
    loadToDos();
todoForm.addEventListener("submit", handleSubmit);
}

init();