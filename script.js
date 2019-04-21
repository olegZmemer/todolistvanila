(function todoList() {
    let addForm = document.querySelector('#add-task-form'),
        removeButton = document.querySelector('.task-remove'),
        taskNameInput = document.querySelector('#add-task'),
        dataObject = {
            tasks: [],
            id: 0
        },
        serializedDataObject = JSON.stringify(dataObject);
    if (localStorage.getItem('mainData')) {
        (function loadStorage() {
            let data = JSON.parse(localStorage.getItem("mainData"));
            let tasks = data.tasks;
            dataObject.id = JSON.parse(localStorage.getItem('mainData')).id;
            dataObject.tasks = JSON.parse(localStorage.getItem('mainData')).tasks;
            data.id = dataObject.id;
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
    }

    function addTask() {
        let task = {};
        dataObject.id++;
        task.id = dataObject.id;
        task.name = taskNameInput.value;
        task.isChecked = false;

        dataObject.tasks.push(task);
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
        taskBlock.id = dataObject.id;
        document.querySelector('.active-tasks-list').appendChild(taskBlock);
        taskNameInput.value = '';
        taskNameInput.focus();
        console.log(localStorage.getItem('mainData'));
        checkTask(taskBlock, task);
    }

    function checkTask(taskBlock, task) {
        taskBlock.querySelector('.check-task-button').addEventListener('change', function (e) {
            if (e.target.closest('.task-block').id == task.id) {
                task.isChecked = true;
                let taskBlock = document.getElementById(task.id);
                taskBlock.querySelector('.check-task-button').setAttribute('disabled', true);
                document.querySelector('.checked-tasks-list').appendChild(taskBlock);
                saveToLocaleStorage();
            }
        });
        taskBlock.querySelector('.task-remove').addEventListener('click', function(e){
            if(e.target.closest('.task-block').id == task.id){
                document.getElementById(task.id).remove();
                dataObject.tasks.forEach(function(elem,pos){
                    if(elem.id == task.id){
                        dataObject.tasks.splice(pos, 1);
                        saveToLocaleStorage();
                    }
                })
            }
        })
    }

    function saveToLocaleStorage() {
        serializedDataObject = JSON.stringify(dataObject);
        return localStorage.setItem('mainData', serializedDataObject);
    }
    addForm.addEventListener('submit', addTask);
    //localStorage.clear();
})()