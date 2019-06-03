import styles from '../../css/app.css';
import Todo from './Todo';
import * as todoView from './todoView';
import {
    elements,
    clearInput,
    setFocusOnInput
} from './base';

// Global data object
const data = {};

// Controller 
const todoController = () => {
    const taskName = todoView.getInput();
    if (!taskName) data.tasks = new Todo();
    // Update data
    const newTask = data.tasks.addTask(taskName);
    // Update front-end
    todoView.renderTask(newTask);
    clearInput();
    setFocusOnInput();
    // Save data to localStorage
    data.tasks.saveData();
}
elements.addTaskForm.addEventListener('submit', todoController)