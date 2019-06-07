import {elements} from './base';

export const showPopup = (task)=>{
    elements.taskPopup.querySelector('.task-popup__title').setAttribute('placeholder', `${task.title}`);
    elements.taskPopup.classList.remove('task-popup-inactive');
    elements.taskPopup.dataset.popid = task.id
}
export const dinamicallyInput = ()=>{
    elements.taskPopupTitleInput.value = elements.taskPopupTitleInput.getAttribute('placeholder')
}
export const closePopup = ()=>{
    elements.taskPopup.classList.add('task-popup-inactive');
    clearInputs()
} 
export const clearInputs = ()=>{
    const inputs = document.querySelectorAll('.task-popup input, .task-popup textarea');
    [].forEach.call(inputs, (e)=>{
        e.value = '';
    })
}