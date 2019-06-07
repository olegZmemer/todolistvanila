import {elements} from './base';

export const showPopup = (task)=>{
    elements.taskPopup.querySelector('.task-popup__title').setAttribute('placeholder', `${task.title}`);
    elements.taskPopup.classList.remove('task-popup-inactive');
    elements.taskPopup.dataset.popupid = task.id
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
export const formProccess = ()=>{
    const inputs  = elements.taskPopupForm.querySelectorAll('input, textarea');
    let task = {
        id: elements.taskPopup.dataset.popupid
    }
    inputs.forEach(input=>{
        if(input.value){
            task[input.name] = input.value;
        }
    });
    return task
}