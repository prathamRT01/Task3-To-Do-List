function taskAdder(){
    const title = document.getElementById("title").value;
    const date = new Date(document.getElementById("date").value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let isValid = true; 

    if (isValid) {
        const formData = {
            dueDate: date.toISOString().split('T')[0], 
            completed: false 
        };
        localStorage.setItem(`task_${title}`, JSON.stringify(formData));
        alert('Form submitted successfully!');
        closeButton(); 
    }
}

window.onload = () => {
    const items = Object.entries(localStorage); 

    items.forEach(([title, data]) => {
        if (title.startsWith('task_')) { 
            const task = JSON.parse(data); 
            if (typeof task === 'object' && task !== null) { 
                rows(title, task); 
            }
        }
    });
};

function rows(title, task) {
    const row = document.createElement('tr');

    if (task.completed === true) {
        row.classList.add('completed');
    }

    const today = new Date().toISOString().split('T')[0];

    if (task.dueDate < today && !task.completed) {
        row.classList.add('overdue');
    }

    row.innerHTML = `
        <td>${title.replace('task_', '')}</td> <!-- Task title without the "task_" prefix -->
        <td>${task.dueDate}</td> <!-- Due date -->
        <td>${task.completed ? 'Completed' : 'Pending'}</td> <!-- Status -->
        <td>
            ${!task.completed ? `<button onclick="completeConfirm('${title}')" class="complete-btn">Complete</button>` : ''}
            <button onclick="deleteTask('${title}')" class="delete-btn">Delete</button>
        </td>
    `;

    document.getElementById("itemTable").appendChild(row);
}

function completeConfirm(title, button) {
    const confirmation = confirm('Are you sure you want to mark this task as completed?');
    if (confirmation) {
        const task = JSON.parse(localStorage.getItem(title));
        task.completed = true;
        localStorage.setItem(title, JSON.stringify(task));
        location.reload();
    }
}

function deleteTask(title, button) {
    const confirmation = confirm('Do you want to delete this task?');
    if (confirmation) {
        location.reload();
        localStorage.removeItem(title);
    }
}
// Modal functionality
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementsByClassName("close")[0];

openModalBtn.onclick = function() {
    modal.style.display = "block";
};

closeBtn.onclick = function() {
    closeButton();
};

function closeButton() {
    modal.style.display = "none";
}
