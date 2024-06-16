const apiUrl = 'http://localhost:3000/tasks';

async function addTask(event) {
  event.preventDefault();
  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: taskTitle,
      description: taskDescription,
    }),
  });

  const newTask = await response.json();
  form.reset();
  loadTasks();
}

async function editTask(event) {
  event.preventDefault();
  const form = document.querySelector('#editTaskForm');
  const formData = new FormData(form);

  const taskId = Number(formData.get('id'));
  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  await fetch(`${apiUrl}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: taskTitle,
      description: taskDescription,
    }),
  });

  closeDialog();
  loadTasks();
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const task = tasks.find((task) => task.id === taskId);

  const dialog = document.querySelector('#editTaskDialog');

  const editId = document.querySelector('#editTaskForm #id');
  const editTitle = document.querySelector('#editTaskForm #title');
  const editDescription = document.querySelector('#editTaskForm #description');

  editId.value = taskId;
  editTitle.value = task.title;
  editDescription.value = task.description;

  dialog.showModal();
}

function closeDialog() {
  const dialog = document.querySelector('dialog');
  dialog.close();
}

async function removeTask(id) {
  await fetch(`${apiUrl}/${Number(id)}`, {
    method: 'DELETE',
  });

  loadTasks();
}

async function loadTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();

  localStorage.setItem('tasks', JSON.stringify(tasks));

  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <button title="Editar tarefa" onClick="openEditDialog(${task.id})" style="margin-right: 3px;">✏️</button>
        <button title="Excluir tarefa" onClick="removeTask(${task.id})" style="margin-left: 3px;">❌</button>
      </li>
    `
    )
    .join('');
}

document.querySelector('#filterButton').addEventListener('click', () => {
  const filterDialog = document.querySelector('#filterDialog');
  filterDialog.showModal();
});

document.querySelector('#filterForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const filterTitle = document.querySelector('#filterTitle').value.toLowerCase();
  filterTasks(filterTitle);
  document.querySelector('#filterDialog').close();
  document.getElementById("filterForm").reset()
});

function filterTasks(filterTitle) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filterTitle)
  );

  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = filteredTasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <button title="Editar tarefa" onClick="openEditDialog(${task.id})" style="margin-right: 3px;">✏️</button>
        <button title="Excluir tarefa" onClick="removeTask(${task.id})" style="margin-left: 3px;">❌</button>
      </li>
    `
    )
    .join('');
}

window.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});
