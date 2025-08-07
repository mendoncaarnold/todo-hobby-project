const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const searchBox = document.getElementById('search-box');
const dueDateInput = document.getElementById('due-date');
const undoBtn = document.getElementById('undo-btn');
const resetBtn = document.getElementById('reset-btn');

let currentFilter = 'all';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let lastDeletedTask = null;
let lastDeletedIndex = null;

function renderTasks() {
  taskList.innerHTML = '';
  const searchText = searchBox.value.toLowerCase();

  tasks.forEach((task, index) => {
    const matchesFilter =
      currentFilter === 'all' ||
      (currentFilter === 'completed' && task.completed) ||
      (currentFilter === 'pending' && !task.completed);

    const matchesSearch = task.text.toLowerCase().includes(searchText);

    if (matchesFilter && matchesSearch) {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';

      const span = document.createElement('span');
      span.textContent = task.text + (task.dueDate ? ' ⏰ ' + task.dueDate : '');
      span.style.flex = '1';
      span.style.cursor = 'pointer';
      span.addEventListener('click', () => toggleTask(index));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.title = 'Delete task';
      deleteBtn.addEventListener('click', () => deleteTask(index));

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  if (text !== '') {
    tasks.push({ text, dueDate, completed: false });
    taskInput.value = '';
    dueDateInput.value = '';
    saveAndRender();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  lastDeletedTask = tasks[index];
  lastDeletedIndex = index;

  tasks.splice(index, 1);
  saveAndRender();

  undoBtn.disabled = false;  // Enable Undo button
}

function undoDelete() {
  if (lastDeletedTask !== null && lastDeletedIndex !== null) {
    tasks.splice(lastDeletedIndex, 0, lastDeletedTask);
    saveAndRender();

    lastDeletedTask = null;
    lastDeletedIndex = null;

    undoBtn.disabled = true;  // Disable Undo button
  }
}

function resetAll() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    tasks = [];
    saveAndRender();

    lastDeletedTask = null;
    lastDeletedIndex = null;

    undoBtn.disabled = true;
  }
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
searchBox.addEventListener('input', renderTasks);
undoBtn.addEventListener('click', undoDelete);
resetBtn.addEventListener('click', resetAll);

// Theme toggle
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load theme
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  renderTasks();
  undoBtn.disabled = true; // Undo disabled initially
});
