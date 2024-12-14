
document.body.innerHTML = `
  <div class="container">
    <h1>TODO</h1>
    <div class="row">
      <div class="col p-3 bg-primary text-white filter" data-filter="all">All</div>
      <div class="col p-3 bg-dark text-white filter" data-filter="active">Active</div>
      <div class="col p-3 bg-primary text-white filter" data-filter="complete">Completed</div>
    </div>
    <div class="search my-3">
      <input type="text" class="form-control" placeholder="add details" id="new-task">
      <button type="button" class="btn btn-primary" id="add-task">Add</button>
    </div>
    <ul id="task-list" class="list-group"></ul>
    <button type="button" class="btn btn-danger mt-3" id="clear-tasks">Clear All</button>
  </div>
`;

const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const clearTasksButton = document.getElementById("clear-tasks");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "complete") return task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => toggleTaskCompletion(index));

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.append(checkbox, span, deleteButton);
    taskList.appendChild(li);
  });

  saveTasks();
}

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    newTaskInput.value = "";
    renderTasks();
  }
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function clearTasks() {
  tasks = [];
  renderTasks();
}

function changeFilter(filter) {
  currentFilter = filter;
  filters.forEach((btn) => btn.classList.remove("bg-dark"));
  document.querySelector(`[data-filter="${filter}"]`).classList.add("bg-dark");
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


addTaskButton.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
clearTasksButton.addEventListener("click", clearTasks);
filters.forEach((btn) => {
  btn.addEventListener("click", () => changeFilter(btn.dataset.filter));
});

renderTasks();
