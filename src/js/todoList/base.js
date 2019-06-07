export const elements = {
    activeTasksList: document.querySelector('.active-tasks-list'),
    checkedTasksList: document.querySelector('.checked-tasks-list'),
    taskNameInput: document.querySelector('#add-task'),
    addTaskForm: document.querySelector('#add-task-form'),
    tasksLists: document.querySelector('.tasks-container'),
    
    taskPopup: document.querySelector('.task-popup'),
    taskPopupTitleInput: document.querySelector('.task-popup__title'),
    taskPopupForm: document.querySelector('#task-popup-form')
}

export const clearInput = ()=> elements.taskNameInput.value = '';
export const setFocusOnInput = ()=> elements.taskNameInput.focus();