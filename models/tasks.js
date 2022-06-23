require('colors');

const Task = require("./task");

class Tasks {

    _listado = {};

    get listadoAsArray(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const task = this._listado[key];
            listado.push(task);
        });
        return listado;
    }
    
    constructor() {
        this._listado = {};
    }

    loadTaskFromArray( tasks = [] ) {
        tasks.forEach( (item) => {
            const task = item;
            this._listado[task.id] = task;
        })
    }

    createTask(description = ''){
        const task = new Task(description);
        this._listado[task.id] = task;
    }

    listarTasks() {
        const list = this.listadoAsArray;
        if(list.length === 0){
            return 'Aun no hay tareas agregadas';
        }

        let listToString = '\n';

        list.forEach((task, index) => {
            const state = task.completed ? 'Completada'.green : 'Pendiente'.red;
            listToString += `${((index+1)+'.').green} ${task.description} :: ${state}\n`;
        })

        return listToString;
    }

    listarTaskCompletedOrPending( completed = true) {
        const list = this.listadoAsArray;
        if(list.length === 0){
            return 'Aun no hay tareas agregadas';
        }

        let listToString = '\n';
        let index = 1;
        list.forEach((task) => {
            const state = task.completed? `${task.completed}`.green : 'Pendiente'.red;
            const complet = task.completed ? true : false;
            if ( complet === completed ){
                listToString += `${((index)+'.').green} ${task.description} :: ${state}\n`;   
                index++;
            }
        })

        return listToString === '\n' 
                ? completed 
                    ? 'No hay tareas completadas'
                    : 'No hay tareas pendientes'  
                : listToString;
    }

    deleteTask ( id = '') {
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    toggleCompletedTasks( ids = [] ){
        ids.forEach( id => {
            const task = this._listado[id];
            if ( !task.completed ){
                task.completed = new Date().toISOString();
            }
        })

        this.listadoAsArray.forEach( task => {
            if(!ids.includes(task.id)){
                this._listado[task.id].completed = null;
            }
        })
    }
}

module.exports = Tasks;