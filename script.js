(function todoList() {
    let addTaskButton = document.querySelector('.add-button');
    let removeButton = document.querySelector('.task-remove');
    let taskNameInput = document.querySelector('#add-task');
    let checkTaskButtons = document.querySelectorAll('.check-task-button');
    let tasks = [];
    let id = 0;

    function addTask() {
        let task = {};
        id++;
        task.id = id;
        task.name = taskNameInput.value;
        task.isChecked = false;

        tasks.push(task);
        let taskBlock = document.createElement('div');
        taskBlock.classList.add('task-block');
        taskBlock.innerHTML = `
        <input type="checkbox" class='check-task-button'>
        <div class="task-info">
            <div class="task-name">${task.name}</div>
        </div>
        <button class="task-remove">X</button>
        `;
        taskBlock.id = id;
        document.querySelector('.active-tasks-list').appendChild(taskBlock);
        console.log(tasks);
        taskBlock.querySelector('.check-task-button').addEventListener('change', function (e) {
            tasks.forEach(function (element) {
                if (e.target.parentElement.id == element.id) {
                    element.isChecked = true;
                    document.getElementById(element.id).remove();
                }
            })
        })
    }

    addTaskButton.addEventListener('click', addTask);
})()