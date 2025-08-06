const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const searchBox = document.getElementById('search-box');
const dueDateInput = document.getElementById('due-date');
let currentFilter = 'all';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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
      li.innerHTML = `
        <span onclick="toggleTask(${index})">
          ${task.text}${task.dueDate ? ' ⏰ ' + task.dueDate : ''}
        </span>
        <button class="delete-btn" onclick="deleteTask(${index})">X</button>
      `;
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
  tasks.splice(index, 1);
  saveAndRender();
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
});
