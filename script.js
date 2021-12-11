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
    element.addEventListener('click', taskSelector);
    element.addEventListener('dblclick', taskComplete);
  }
}

function addTask(event) {
  event.preventDefault();

  const list = document.getElementById('lista-tarefas');
  const task = document.getElementById('texto-tarefa');

  tasks.push(task.value);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  task.value = '';
  reinitializeList();
}

function reinitializeList() {
  const list = document.getElementById('lista-tarefas');
  list.innerHTML = null;
  listTasks();
}

function taskSelector(event) {
  let selectedTask = document.querySelector('.selected');

  if (selectedTask != null) {
    selectedTask.classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function taskComplete(event) {
  event.target.classList.remove('selected');
  event.target.classList.toggle('completed');
}

function removeAll() {
  tasks = [];
  reinitializeList();
}

window.onload = function () {
  initialize();
  listTasks();
  document.querySelector('form').addEventListener('submit', addTask);
  document.getElementById('apaga-tudo').addEventListener('click', removeAll);
};
