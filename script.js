// toda data
const todo = {
  title: 'Advance Todo Card (Interactive & stateful)',
  description: 'Build an accessible todo card component with semantic HTML, keyboard support, synchronization rules, expandable notes, and robust edit state handling for Stage 1a grading.',
  priority: 'High',
  dueDate: new Date(Date.now() + 2 * 86400000 + 3 * 3600000),
  status: 'In Progress',
  completed: false
};

let expanded = false, timer;
const threshold = 90;
let snapshot = null;

const $ = id => document.getElementById(id);

function priorityClass(p) { return p.toLowerCase().replace(' ', '') }

// functionality that handles renders
function render() {
  $('title').textContent = todo.title;
  $('title').className = todo.completed ? 'done' : '';
  const badge = $('priorityBadge'); badge.textContent = todo.priority; badge.className = 'badge ' + priorityClass(todo.priority);
  $('priorityIndicator').className = 'indicator ' + priorityClass(todo.priority);
  const long = todo.description.length > threshold;
  $('description').textContent = (long && !expanded) ? todo.description.slice(0, threshold) + '...' : todo.description;
  $('expandBtn').style.display = long ? 'inline-block' : 'none';
  $('expandBtn').setAttribute('aria-expanded', String(expanded));
  $('expandBtn').textContent = expanded ? 'Collapse' : 'Expand';
  $('dueDate').dateTime = todo.dueDate.toISOString();
  $('dueDate').textContent = 'Due ' + todo.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  $('statusText').textContent = todo.status;
  $('statusControl').value = todo.status;
  $('checkbox').checked = todo.completed;
  updateTime();
}

// functionality to updateTime
function updateTime() {
  if (todo.status === 'Done') { $('timeRemaining').textContent = 'Completed'; $('overdueIndicator').classList.add('hidden'); return; }
  const diff = todo.dueDate - new Date(); const abs = Math.abs(diff);
  const m = Math.floor(abs / 60000), h = Math.floor(abs / 3600000), d = Math.floor(abs / 86400000);
  let text = '';
  if (diff < 0) text = 'Overdue by ' + (d >= 1 ? d + ' day' : h >= 1 ? h + ' hour' : Math.max(m, 1) + ' minute') + ((d || h || m) !== 1 ? 's' : '');
  else text = 'Due in ' + (d >= 1 ? d + ' day' : h >= 1 ? h + ' hour' : Math.max(m, 1) + ' minute') + ((d || h || m) !== 1 ? 's' : '');
  $('timeRemaining').textContent = text;
  $('overdueIndicator').classList.toggle('hidden', !(diff < 0));
}

// functionality to startTimer
function startTimer() { clearInterval(timer); if (todo.status !== 'Done') timer = setInterval(updateTime, 30000); }


$('checkbox').onchange = e => { todo.completed = e.target.checked; todo.status = e.target.checked ? 'Done' : 'Pending'; render(); startTimer(); };
$('statusControl').onchange = e => { todo.status = e.target.value; todo.completed = todo.status === 'Done'; render(); startTimer(); };
$('expandBtn').onclick = () => { expanded = !expanded; render(); };
$('editBtn').onclick = () => {
  snapshot = JSON.parse(JSON.stringify(todo));
  $('editTitle').value = todo.title; $('editDescription').value = todo.description; $('editPriority').value = todo.priority;
  $('editDue').value = new Date(todo.dueDate).toISOString().slice(0, 16);
  $('viewMode').classList.add('hidden'); $('editForm').classList.remove('hidden'); $('editTitle').focus();
};
$('saveBtn').onclick = (e) => {
  e.preventDefault()
  todo.title = $('editTitle').value; todo.description = $('editDescription').value; todo.priority = $('editPriority').value; todo.dueDate = new Date($('editDue').value);
  $('editForm').classList.add('hidden'); $('viewMode').classList.remove('hidden'); render(); startTimer(); $('editBtn').focus();
};
$('cancelBtn').onclick = () => {
  Object.assign(todo, { ...snapshot, dueDate: new Date(snapshot.dueDate) });
  $('editForm').classList.add('hidden'); $('viewMode').classList.remove('hidden'); render(); $('editBtn').focus();
};
$('deleteBtn').onclick = () => alert('Delete clicked');
render(); startTimer();