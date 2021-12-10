let tasks;

function initialize() {
  const storage = localStorage.getItem('tasks');

  if (storage != null) {
    /** Source: https://app.betrybe.com/course/fundamentals/javascript-dom-eventos-e-web-storage/javascript-web-storage/b332393f-7548-4075-83e3-f632735efb95/conteudos/a69f590a-b7be-4821-959e-75204430d057/local-e-session-storage/6da4a8cf-1a42-47c9-b271-a4df5f2ba5a3?use_case=side_bar */
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } else {
    tasks = [];
  }
}

function listTasks() {
  const list = document.getElementById('lista-tarefas');
  for (let task of tasks) {
    let element = document.createElement('li');
    element.innerText = task;
    list.appendChild(element);
  }
}

function addTask() {
  let task = document.getElementById('texto-tarefa').value;

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.onload = function () {
  initialize();
  listTasks();
  document.getElementById('criar-tarefa').addEventListener('click', addTask);
};
