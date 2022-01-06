const multiList = document.querySelectorAll('.fa-ellipsis-h');
const listClick = document.querySelector('.fa-folder-plus');
const cardBody = document.querySelector('.card-body');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('.list-group');
const inTodoList = document.querySelector('.list-group-item');
const dateDay = document.querySelector('.dateDay');
const dateMonth = document.querySelector('.dateMonth');
const next = document.querySelector('.fa-chevron-right');
const prev = document.querySelector('.fa-chevron-left');

eventListeners();

function eventListeners() {
  listClick.addEventListener('click', addTodo);
  document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
}

//Date Options

//Date.toLocaleString() yöntemini kullandim
//Haftanin hangi gunu oldugunu string sekilde aldim
let today = new Date().toLocaleString('en-us', { weekday: 'long' });
dateDay.innerHTML = today;

let month = new Date().toLocaleDateString('en-us', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
dateMonth.innerHTML = month;

//Sayfa Yenilendiginde Todolarin Kalmasi
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

//to-do ekleyecek
function addTodo(e) {
  const newTodo = todoInput.value.trim(); //trim func bastaki ve sondaki gereksiz bosluklari silmis olur

  addTodoToUI(newTodo);
  addTodoToStorage(newTodo);

  e.preventDefault();
}

//to-do ları storage ekleme
function getTodosFromStorage() {
  //storagedan bütün todolari alacak
  let todos;

  if (localStorage.getItem('todos') === null) {
    // To dos seklinde bir key var mi
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

//Arayuzde ne gozukecek

function addTodoToUI(newTodo) {
  const listItem = document.createElement('li');
  const icon = document.createElement('icon');
  const check = document.createElement('input');
  const text = document.createElement('label');
  const icon2 = document.createElement('icon');

  listItem.className = 'list-group-item notSelect';
  icon.className = 'fas fa-thumbtack notSelect';
  check.type = 'checkbox';
  text.type = 'label notSelect';
  text.className = 'text-input';
  icon2.className = 'fas fa-ellipsis-h';

  //sabitleyici iconu
  icon.style.display = 'none';

  /* Hidden */
  const unList = document.createElement('ul');
  const hiddenList1 = document.createElement('li');
  const hiddenList2 = document.createElement('li');
  const hiddenList3 = document.createElement('li');
  const hiLi1 = document.createElement('img');
  const hiLi2 = document.createElement('img');
  const hiLi3 = document.createElement('img');
  const text1 = document.createElement('span');
  const text2 = document.createElement('span');
  const text3 = document.createElement('span');

  text1.innerText = 'Pin on the top';
  text2.innerText = 'Add a memo';
  text3.innerText = 'Delete';

  unList.className = 'hidden';
  hiddenList1.className = 'hiddenList';
  hiddenList2.className = 'hiddenList';
  hiddenList3.className = 'hiddenList';

  hiLi1.src = 'img/mark.png';
  hiLi2.src = 'img/file.png';
  hiLi3.src = 'img/delete.png';

  hiddenList1.appendChild(hiLi1);
  hiddenList2.appendChild(hiLi2);
  hiddenList3.appendChild(hiLi3);

  hiddenList1.appendChild(text1);
  hiddenList2.appendChild(text2);
  hiddenList3.appendChild(text3);

  listItem.appendChild(icon);
  listItem.appendChild(check);
  listItem.appendChild(text);
  listItem.appendChild(icon2);
  listItem.appendChild(unList);

  //add list

  text.appendChild(document.createTextNode(newTodo));

  todoList.appendChild(listItem);
  unList.appendChild(hiddenList1);
  unList.appendChild(hiddenList2);
  unList.appendChild(hiddenList3);

  icon2.onclick = function () {
    if (unList.style.display === 'block') {
      unList.style.display = 'none';
    } else {
      unList.style.display = 'block';
    }
  };

  //Mark

  hiddenList1.onclick = function () {
    console.log('merhaba');
  };
  hiddenList2.onclick = function () {
    console.log('merhaba');
  };
  //delete
  hiddenList3.onclick = function () {
    let storageTodo = text.textContent;
    console.log(storageTodo);
    text.parentElement.remove();
    deleteTodoFromStorage();
  };

  function deleteTodoFromStorage() {
    let storageTodo = text.textContent;
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
      if (todo === storageTodo) {
        todos.splice(index, 1);
      }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(todos);
  }
  todoInput.value = '';
}
