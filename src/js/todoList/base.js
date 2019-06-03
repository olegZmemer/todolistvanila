export const elements = {
    activeTasksList: document.querySelector('.active-tasks-list'),
    checkedTasksList: document.querySelector('.checked-tasks-list'),
    taskNameInput: document.querySelector('#add-task'),
    addTaskForm: document.querySelector('#add-task-form'),
    tasksLists: document.querySelector('.tasks-container')
}

export const clearInput = ()=> elements.taskNameInput.value = '';
export const setFocusOnInput = ()=> elements.taskNameInput.focus();