(function todoList() {
    let addForm = document.querySelector('#add-task-form'),
        removeButton = document.querySelector('.task-remove'),
        taskNameInput = document.querySelector('#add-task'),
        dataObject = { // Main object with data
            tasks: [],
            id: 0
        },
        serializedDataObject = JSON.stringify(dataObject); // Serialized main object
    if (localStorage.getItem('mainData')) {
        (function loadStorage() { // Function whick load data from localStorage if there is something

            let data = JSON.parse(localStorage.getItem("mainData")), // Take data from the localStorage
                tasks = data.tasks;
            dataObject.id = data.id; // Set last ID to main object
            dataObject.tasks = data.tasks; // Set last version of task-array to main object

            tasks.forEach(function (task) { // Create elements by localStorage data
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
                    taskBlock.querySelector('.check-task-button').checked = true;
                    document.querySelector('.checked-tasks-list').appendChild(taskBlock);
                }
                checkTask(taskBlock, task);
            });
        })();
    }

    function addTask() {
        dataObject.id++; // Refresh id
        let task = { // Main task data object 
            id: dataObject.id,
            name:taskNameInput.value,
            isChecked :false
        };
        dataObject.tasks.push(task);
        saveToLocaleStorage(); // Save new task-array to main object 
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

    function checkTask(taskBlock, task) { // Set eventListeners to every element. 
        taskBlock.querySelector('.check-task-button').addEventListener('change', function () {
            if (taskBlock.id == task.id) {
                let taskBlock = document.getElementById(task.id);
                taskBlock.querySelector('.check-task-button').setAttribute('disabled', true);
                taskBlock.querySelector('.check-task-button').checked = true;
                document.querySelector('.checked-tasks-list').appendChild(taskBlock);
                dataObject.tasks.forEach(function (elem) {
                    if (elem.id == taskBlock.id) {
                        task.isChecked = true;
                        saveToLocaleStorage();
                    }
                })
            }
        });
        taskBlock.querySelector('.task-remove').addEventListener('click', function () { // Event listener for REMOVE button
            if (taskBlock.id == task.id) {
                document.getElementById(task.id).remove();
                dataObject.tasks.forEach(function (elem, pos) {
                    if (elem.id == task.id) {
                        dataObject.tasks.splice(pos, 1);
                        saveToLocaleStorage();
                    }
                })
            }
        })
    }

    function saveToLocaleStorage() { // Function which save data to localStorage
        serializedDataObject = JSON.stringify(dataObject);
        return localStorage.setItem('mainData', serializedDataObject);
    }
    addForm.addEventListener('submit', addTask);
})()