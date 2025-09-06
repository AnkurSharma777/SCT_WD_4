// todo.js
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDatetime = document.getElementById('task-datetime');
const taskList = document.getElementById('task-list');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const title = document.createElement('span');
    title.className = 'task-title' + (task.completed ? ' completed' : '');
    title.textContent = task.title;

    const datetime = document.createElement('span');
    datetime.className = 'task-datetime';
    datetime.textContent = task.datetime ? `(${task.datetime})` : '';

    const actions = document.createElement('span');
    actions.className = 'task-actions';

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Done';
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      const newTitle = prompt('Edit task title:', task.title);
      if (newTitle !== null && newTitle.trim() !== '') {
        task.title = newTitle.trim();
      }
      const newDatetime = prompt('Edit date & time (YYYY-MM-DDTHH:MM):', task.datetime);
      if (newDatetime !== null && newDatetime.trim() !== '') {
        task.datetime = newDatetime.trim();
      }
      renderTasks();
    };

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      tasks.splice(idx, 1);
      renderTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(title);
    li.appendChild(datetime);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

taskForm.onsubmit = function(e) {
  e.preventDefault();
  const title = taskInput.value.trim();
  const datetime = taskDatetime.value;
  if (title && datetime) {
    tasks.push({ title, datetime, completed: false });
    taskInput.value = '';
    taskDatetime.value = '';
    renderTasks();
  }
};

renderTasks();