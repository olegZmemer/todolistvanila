const uniqid = require('uniqid');
export default class todoList {
    constructor(){
        this.tasks = [];
    }
    addTask(title){
        const task = {
            title,
            isChecked: false,
            id: uniqid()
        }
        this.tasks.push(task);
        this.saveData();
        return task;
    }
    deleteTask(id){
        const taskIndex = this.tasks.findIndex(el=>el.id===id);
        this.tasks.splice(taskIndex, 1);
        this.saveData();
    }
    checkTask(id){
        const task = this.tasks.find(el=>el.id===id);
        task.isChecked = true;
        this.saveData();
    }
    saveData(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    loadData(){
        const storage = JSON.parse(localStorage.getItem('tasks'));
        
        if(storage) this.tasks = storage
    }
}