import './assets/sass/main.sass';
import './assets/css/app.css';

import Todo from './js/todoList/Todo';
import Popup from './js/todoList/Popup';

import * as todoView from './js/todoList/todoView';
import * as popupView from './js/todoList/popupView'
import {
    elements,
    clearInput,
    setFocusOnInput
} from './js/todoList/base';

// Global data object
const data = {};
console.log(data);
// Controller 
const todoController = () => {
    const taskName = todoView.getInput();
    if (!data.tasks) data.tasks = new Todo();
    // Update data
    const newTask = data.tasks.addTask(taskName);
    // Update front-end
    todoView.renderTask(newTask);
    clearInput();
    setFocusOnInput();
}

// Event listeners
elements.addTaskForm.addEventListener('submit', todoController);
elements.tasksLists.addEventListener('click', (e) => {
    if (e.target.classList.contains('task__remove')) {
        const taskId = e.target.closest(`.task`).dataset.taskid;
        data.tasks.deleteTask(taskId);
        todoView.deleteTask(taskId)
    } else if (e.target.classList.contains('task__check-button')) {
        const taskId = e.target.closest(`.task`).dataset.taskid;
        data.tasks.checkTask(taskId);
        todoView.checkTask(taskId);
    } else if (e.target.matches('.task, .task *') && !e.target.matches('.task__check-button, .task__remove')) {
        const task = data.tasks.tasks.find(el => e.target.closest('.task').dataset.taskid === el.id);
        popupView.showPopup(task);
        popupView.dinamicallyInput();
    }
})
window.addEventListener('load', (e) => {
    data.tasks = new Todo();
    data.tasks.loadData();
    data.tasks.tasks.forEach(el => {
        todoView.renderTask(el);
    })
});
elements.taskPopup.addEventListener('click', (e) => {
    if (!e.target.matches('.task-popup__block, .task-popup__block *')) {
        popupView.closePopup();
    }
})
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        popupView.closePopup();
    }
})
elements.taskPopupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newTask = popupView.formProccess();
    data.tasks.processPopup(newTask);
    // todoView.deleteTask(newTask.id);
    // todoView.renderTask(data.tasks.tasks.find(el=>el.id === newTask.id));
    todoView.updateTask(newTask.id, data.tasks.tasks.find(el=>el.id === newTask.id))
    popupView.closePopup();
})