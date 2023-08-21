const form = document.querySelector('form');
const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const ul = document.querySelector('#taskList'); // Added an ID to the <ul> element

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    const lis = ul.querySelectorAll('li');
    lis.forEach(li => {
        tasks.push(li.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            ul.appendChild(li);
            li.classList.add('new-task');

            const iconsDiv = document.createElement('div');
            const icon = document.createElement('i');
            icon.className = 'far fa-trash-alt';

            iconsDiv.appendChild(icon);
            li.appendChild(iconsDiv);

            icon.addEventListener('click', () => {
                ul.removeChild(li);
                saveTasksToLocalStorage(); // Update localStorage after removing task
            });
        });
    }
}

const ToDo = (e) => {
    e.preventDefault();
    if (input.value !== '') {
        const li = document.createElement('li');
        li.textContent = input.value;
        ul.appendChild(li);
        input.value = '';

        li.classList.add('new-task');

        const iconsDiv = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = 'far fa-trash-alt';

        iconsDiv.appendChild(icon);
        li.appendChild(iconsDiv);

        icon.addEventListener('click', () => {
            ul.removeChild(li);
            saveTasksToLocalStorage(); // Update localStorage after removing task
        });

        saveTasksToLocalStorage(); // Save tasks to localStorage after adding new task
    }
};

function displayDate() {
    let date = new Date();
    date = date.toString().split(' ')
    document.querySelector('#date').innerHTML = date[1] + ' ' + date[2] + " " + date[3]
}

window.onload = function () {
    displayDate();
    loadTasksFromLocalStorage(); // Load tasks from localStorage on page load
}

form.addEventListener('submit', ToDo);

