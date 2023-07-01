//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EventLiseners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deletcheckedit);
filterOption.addEventListener('click', filterTodo);

let todosAray = [];


//Functions
function addTodo(event){
    if(todoInput.value === ''){
        alert("Plese enter task ...")
    }else{

        let todoTitle = todoInput.value;
        let newTodoobj = {
            id: todosAray.length + 1,
            title: todoTitle,
            complete : false
        }
        todosAray.push(newTodoobj);
        
        //add todo to local
        saveLocalTodos(todosAray);

        //prevent form from submiting
        event.preventDefault();
        //todo div 
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);


        //edit btn
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);
        //completed btn
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //trash btn
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //apend to list
        todoList.appendChild(todoDiv);
    }
        //clear input
        todoInput.value = "";

}


function deletcheckedit(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        //removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    //completed todo
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

    //edit todo
    if(item.classList[0] === "edit-btn"){
        
        const todo = item.parentElement;
        const editValue = prompt('edit the selected item', e.value);
        todo.children[0].innerHTML = editValue;
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
            case "active":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    localStorage.setItem('todos', JSON.stringify(todo));
}


function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        //todo div 
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo.title;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //edit btn
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);
        editButton.setAttribute('onclick', 'editTodo('+ todo.id+ ')');

        //completed btn
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        completedButton.setAttribute('onclick', 'compeletTodo('+ todo.id+ ')');
        //trash btn
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        trashButton.setAttribute('onclick', 'removeTodo('+ todo.id+ ')');
        //apend to list
        todoList.appendChild(todoDiv);
    });
}




function editTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
    todosAray = localStorageTodos;
    todosAray.forEach(function (todo){
        if (todo.id === todoId) {
            todo.title = ""
        }
    })
    saveLocalTodos(todosAray);
}


function compeletTodo(todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
    todosAray = localStorageTodos;
    todosAray.forEach(function (todo){
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })
    saveLocalTodos(todosAray);
}

function removeTodo(todoId) {
    if(localStorage.getItem("todos") === null){
        todosAray = []
    }else{
        let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
        todosAray = localStorageTodos;
        let mainTodoIndex = todosAray.findIndex(function (todo){
            return todo.id === todoId
        })
        todosAray.splice(mainTodoIndex, 1);
        saveLocalTodos(todosAray);
    }
}