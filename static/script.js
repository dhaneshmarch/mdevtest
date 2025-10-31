document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    
    // Bug 7: Wrong selector method
    const taskForm = document.querySelector('taskForm');
    taskForm.addEventListener('submit', handleFormSubmit);
});

function loadTasks() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '<div class="loading">Loading tasks...</div>';
    
    // Bug 8: Wrong endpoint URL
    fetch('/api/task')
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
            tasksList.innerHTML = '<div class="error">Failed to load tasks</div>';
        });
}

function displayTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '<p>No tasks found. Add your first task!</p>';
        return;
    }
    
    let tasksHTML = '';
    tasks.forEach(task => {
        tasksHTML += `
            <div class="task-item">
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">${task.description}</div>
                    <span class="task-status status-${task.status.toLowerCase()}">${task.status}</span>
                </div>
                <div class="task-actions">
                    <button class="btn-edit" onclick="editTask(${task.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `;
    });
    
    tasksList.innerHTML = tasksHTML;
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const taskData = {
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status')
    };
    
    // Bug 9: Missing Content-Type header for JSON
    fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task created:', data);
        event.target.reset();
        loadTasks();
    })
    .catch(error => {
        console.error('Error creating task:', error);
        alert('Failed to create task');
    });
}

function editTask(taskId) {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    const newStatus = prompt('Enter status (Pending/Done):');
    
    if (newTitle && newDescription && newStatus) {
        const taskData = {
            title: newTitle,
            description: newDescription,
            status: newStatus
        };
        
        fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task updated:', data);
            loadTasks();
        })
        .catch(error => {
            console.error('Error updating task:', error);
            alert('Failed to update task');
        });
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        // Bug 10: Wrong HTTP method in fetch
        fetch(`/api/tasks/${taskId}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task deleted:', data);
            loadTasks();
        })
        .catch(error => {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        });
    }
}
