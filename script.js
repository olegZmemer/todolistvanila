(function todoList() {
    let addForm = document.querySelector('#add-task-form');
    removeButton = document.querySelector('.task-remove'),
        taskNameInput = document.querySelector('#add-task'),
        checkTaskButtons = document.querySelectorAll('.check-task-button'),
        tasks = [],
        id = 0,
        dataObject = {
            tasks: tasks
        },
        serializedDataObject = JSON.stringify(dataObject);
        (function loadStorage() {
            let data = JSON.parse(localStorage.getItem("mainData"));
            let tasks = data.tasks;
            tasks.forEach(function (task) {
                let taskBlock = document.createElement('div');
                taskBlock.classList.add('task-block');
                taskBlock.innerHTML = `
            <div class="task-info">
                <label><input type="checkbox" class="check-task-button">${task.name}</label>
                <div class="task-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            </div>
            <button class="task-remove">X</button>
        `;
                taskBlock.id = task.id;
                document.querySelector('.active-tasks-list').appendChild(taskBlock);
                if (task.isChecked) {
                    taskBlock.querySelector('.check-task-button').setAttribute('disabled', true);
                    document.querySelector('.checked-tasks-list').appendChild(taskBlock);
                }
                checkTask(taskBlock, task);
            });
        })();

    function addTask() {
        let task = {};
        id++;
        task.id = id;
        task.name = taskNameInput.value;
        task.isChecked = false;

        tasks.push(task);
        saveToLocaleStorage();
        let taskBlock = document.createElement('div');
        taskBlock.classList.add('task-block');
        taskBlock.innerHTML = `
            <div class="task-info">
                <label><input type="checkbox" class="check-task-button">${task.name}</label>
                <div class="task-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            </div>
            <button class="task-remove">X</button>
        `;
        taskBlock.id = id;
        document.querySelector('.active-tasks-list').appendChild(taskBlock);
        taskNameInput.value = '';
        taskNameInput.focus();
        console.log(tasks);
        console.log(serializedDataObject);
        // taskBlock.querySelector('.check-task-button').addEventListener('change', function (e) {
        //     tasks.forEach(function (element) {
        //         if (e.target.closest('.task-block').id == element.id) {
        //             element.isChecked = true;
        //             let taskBlock = document.getElementById(element.id);
        //             taskBlock.querySelector('.check-task-button').setAttribute('disabled', true);
        //             document.querySelector('.checked-tasks-list').appendChild(taskBlock);
        //             saveToLocaleStorage();
        //         }
        //     })
        // })
        checkTask(taskBlock, task);
    }
    function checkTask(taskBlock, task){
        taskBlock.querySelector('.check-task-button').addEventListener('change', function (e) {
                if (e.target.closest('.task-block').id == task.id) {
                    task.isChecked = true;
                    let taskBlock = document.getElementById(task.id);
                    taskBlock.querySelector('.check-task-button').setAttribute('disabled', true);
                    document.querySelector('.checked-tasks-list').appendChild(taskBlock);
                    saveToLocaleStorage();
                }
            })
    }
    function saveToLocaleStorage() {
        serializedDataObject = JSON.stringify(dataObject);
        return localStorage.setItem('mainData', serializedDataObject);
    }
    addForm.addEventListener('submit', addTask);
})()