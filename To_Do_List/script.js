"use strict";
let todos = [];

checkTodos();

$(".addBtn").click(evt => {
  let todo = $(".todo-input").val();

  if (todo == "")
  {
    alert("Please enter a to do item");
  } else {
    let todosData = localStorage.getItem("todos");
    if(todosData == null) {
      todos = [];
    } else {
      todos = JSON.parse(todosData);
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    $(".todo-input").val("");

    checkTodos();
  }
});

$(".clear-all").click(evt => {
  let todosData = localStorage.getItem("todos");
  todos = JSON.parse(todosData);
  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
  checkTodos();
});


$("input").on("keypress", (e) => {
  let todo = $(".todo-input").val();

  if ((e.which === 13) && todo != "") {
    let todosData = localStorage.getItem("todos");
  if(todosData == null) {
      todos = [];
    } else {
      todos = JSON.parse(todosData);
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    $(".todo-input").val("");

     checkTodos();
  }

});

function removeTodo(index) {
  let todosData = localStorage.getItem("todos");
  todos = JSON.parse(todosData);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  checkTodos();
}

function checkTodos() {
  let lsData = localStorage.getItem("todos");

  if (lsData == null) {
    todos = [];
  } else {
    todos = JSON.parse(lsData);
  }

  let html = "";
  todos.forEach((todo, index) => {
    html += `
    <li>
    <span class="close" onclick='removeTodo(${index});'>\u00D7</span>
    ${todo}
    </li>
    `;
  });
  $(".todo-items").empty().append(html);
}

let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);