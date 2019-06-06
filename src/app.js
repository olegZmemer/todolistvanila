import styles from './css/app.css';
import Todo from './js/todoList/Todo';
import * as todoView from './js/todoList/todoView';
import {
    elements,
    clearInput,
    setFocusOnInput
} from './js/todoList/base';

// Global data object
const data = {};

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
    }
})
window.addEventListener('load', (e)=>{
    data.tasks = new Todo();
    data.tasks.loadData();
    data.tasks.tasks.forEach(el=>{
        todoView.renderTask(el);
    })
});
