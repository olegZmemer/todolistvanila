import {
    elements
} from './base';

export const getInput = () => elements.taskNameInput.value
export const renderTask = (task) => {
    const markup = `
        <div class="task ${task.isChecked ? 'task__checked' : ''}" data-taskid = '${task.id}'>
            <div class="task__info">
                <label><input type="checkbox" class="task__check-button" ${task.isChecked ? 'disabled checked' : ''}>${task.title}</label>
                <div class="task__description">Something</div>
            </div>
            <button class="task__remove">X</button>
        </div>
    `
    if (!task.isChecked) {
        elements.activeTasksList.insertAdjacentHTML('beforeend', markup)
    } else{
        elements.checkedTasksList.insertAdjacentHTML('beforeend', markup);
    }
}
export const deleteTask = (id) => {
    const task = document.querySelector(`.task[data-taskid='${id}']`);
    task.remove();
}
export const checkTask = (id) => {
    const task = document.querySelector(`div[data-taskid=${id}]`);
    task.classList.add('task__checked');
    task.querySelector('.task__check-button').setAttribute('disabled', true);
    task.querySelector('.task__check-button').setAttribute('checked', true);

    elements.checkedTasksList.insertAdjacentElement('beforeend', task);
}