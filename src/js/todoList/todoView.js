import {
    elements
} from './base';

export const getInput = () => elements.taskNameInput.value
export const renderTask = (task) => {
    const markup = `
        <div class="task ${task.isChecked ? 'task__checked' : ''}" data-taskid = '${task.id}'>
        <input type="checkbox" class="task__check-button" ${task.isChecked ? 'disabled checked' : ''}>
            <div class="task__info">
                <div class='task__title'>${task.title}</div>
                <div class="task__description">${task.desc ? task.desc : 'Click to add the description'}</div>
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
export const updateTask = (id, data)=>{
    const task = document.querySelector(`div[data-taskid='${id}']`);
    if(data.isChecked) checkTask(id);
    if(data.title) task.querySelector('.task__title').textContent = data.title;
    if(data.desc) task.querySelector('.task__description').textContent = data.desc;
}