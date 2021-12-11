let tasks = [];
let selectedTask;

function initialize() {
  const storage = localStorage.getItem('tasks');

  if (storage != null) {
    /** Source: https://app.betrybe.com/course/fundamentals/javascript-dom-eventos-e-web-storage/javascript-web-storage/b332393f-7548-4075-83e3-f632735efb95/conteudos/a69f590a-b7be-4821-959e-75204430d057/local-e-session-storage/6da4a8cf-1a42-47c9-b271-a4df5f2ba5a3?use_case=side_bar */
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i in savedTasks) {
      let task = {
        task: savedTasks[i],
        completed: false,
      };
      tasks.push(task);
    }
  }
}

function listTasks() {
  const list = document.getElementById('lista-tarefas');

  list.innerHTML = null;

  for (let i in tasks) {
    let element = document.createElement('li');

    element.innerText = tasks[i].task;
    list.appendChild(element);
    element.addEventListener('click', taskSelector);
    element.addEventListener('dblclick', taskComplete);
  }
}

function addTask(event) {
  event.preventDefault();

  const list = document.getElementById('lista-tarefas');
  const task = document.getElementById('texto-tarefa');

  tasks.push({
    task: task.value,
    completed: false,
  });
  task.value = '';
  listTasks();
}

function taskSelector(event) {
  selectedTask = document.querySelector('.selected');

  if (selectedTask != null) {
    selectedTask.classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function taskComplete(event) {
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

window.onload = function () {
  initialize();
  listTasks();
  document.querySelector('form').addEventListener('submit', addTask);
  document.querySelector('#apaga-tudo').addEventListener('click', removeAll);
  document.querySelector('#remover-finalizados').addEventListener('click', removeCompletes);
};
