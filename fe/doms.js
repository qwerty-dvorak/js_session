// Get references to DOM elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Add task when button is clicked or Enter key is pressed
addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === '') return; 

  const li = document.createElement('li');
  li.className = 'todo-item';

  // Create span for text
  const span = document.createElement('span');
  span.textContent = taskText;
  li.appendChild(span);

  // Create a "Done" button
  const doneBtn = document.createElement('button');
  doneBtn.textContent = 'Done';
  doneBtn.className = 'done-btn';
  li.appendChild(doneBtn);

  // Create a "Remove" button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  li.appendChild(removeBtn);

  // Add the <li> to the list
  list.appendChild(li);

  // Clear input field
  input.value = '';
  input.focus();
}

// Event delegation: handle clicks on "Done" or "Remove" for all tasks
list.addEventListener('click', function(event) {
  const li = event.target.closest('li');
  if (!li) return;

  if (event.target.classList.contains('done-btn')) {
    li.querySelector('span').style.textDecoration = 'line-through';
    li.querySelector('span').style.color = '#888';
    event.target.disabled = true; // Disable the Done button
  }
  if (event.target.classList.contains('remove-btn')) {
    li.remove();
  }
});
