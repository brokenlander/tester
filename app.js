const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCounter() {
    const remaining = todos.filter(t => !t.done).length;
    counter.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
}

function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.done) li.classList.add('done');

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('click', () => {
            todos[index].done = !todos[index].done;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
    updateCounter();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        todos.push({ text, done: false });
        saveTodos();
        renderTodos();
        input.value = '';
    }
});

renderTodos();
// second change
