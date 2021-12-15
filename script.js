let tasks = [];
let selectedTask;

function initialize() {
  /** Source: https://app.betrybe.com/course/fundamentals/javascript-dom-eventos-e-web-storage/javascript-web-storage/b332393f-7548-4075-83e3-f632735efb95/conteudos/a69f590a-b7be-4821-959e-75204430d057/local-e-session-storage/6da4a8cf-1a42-47c9-b271-a4df5f2ba5a3?use_case=side_bar */
  const storage = JSON.parse(localStorage.getItem('tasks'));

  if (storage != null) {
    tasks = storage;
  }
}

function listTasks() {
  selectedTask = null;
  const list = document.getElementById('lista-tarefas');

  list.innerHTML = null;

  for (let i in tasks) {
    let element = document.createElement('li');

    element.innerText = tasks[i].task;
    if (tasks[i].completed === true) {
      element.classList.add('completed');
    }
    list.appendChild(element);
    element.addEventListener('click', taskSelector);
    element.addEventListener('dblclick', taskComplete);
  }
}

function addTask(event) {
  event.preventDefault();

  const task = document.getElementById('texto-tarefa');

  tasks.push({
    task: task.value,
    completed: false,
  });
  task.value = '';
  listTasks();
}

function taskSelector(event) {
  if (selectedTask != null) {
    selectedTask.classList.remove('selected');
  }

  selectedTask = event.target;
  event.target.classList.add('selected');
}

function taskComplete(event) {
  selectedTask = null;
  event.target.classList.remove('selected');
  event.target.classList.toggle('completed');

  let items = document.getElementsByTagName('li');

  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains('completed')) {
      tasks[i].completed = true;
    } else {
      tasks[i].completed = false;
    }
  }
}

function removeAll() {
  tasks = [];
  listTasks();
}

function removeCompletes() {
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (tasks[i].completed === true) {
      tasks.splice(i, 1);
    }
  }
  listTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function findIndex(task) {
  for (var index = -1; task != null; index++) {
    task = task.previousSibling;
  }
  return index;
}

function moveUp() {
  let index = findIndex(selectedTask);
  let taskBackup = tasks[index];

  if (index > 0 && selectedTask != null) {
    tasks[index] = tasks[index - 1];
    tasks[index - 1] = taskBackup;
    listTasks();

    selectedTask = document.getElementsByTagName('li')[index - 1];
    selectedTask.classList.add('selected');
  }
}

function moveDown() {
  let index = findIndex(selectedTask);
  let taskBackup = tasks[index];

  if (index < tasks.length - 1 && selectedTask != null) {
    tasks[index] = tasks[index + 1];
    tasks[index + 1] = taskBackup;
    listTasks();

    selectedTask = document.getElementsByTagName('li')[index + 1];
    selectedTask.classList.add('selected');
  }
}

window.onload = function () {
  initialize();
  listTasks();
  document.querySelector('form').addEventListener('submit', addTask);
  document.querySelector('#apaga-tudo').addEventListener('click', removeAll);
  document.querySelector('#remover-finalizados').addEventListener('click', removeCompletes);
  document.querySelector('#salvar-tarefas').addEventListener('click', saveTasks);
  document.querySelector('#mover-cima').addEventListener('click', moveUp);
  document.querySelector('#mover-baixo').addEventListener('click', moveDown);
};
