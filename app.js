const { saveDB, readDB } = require('./dataBase/saveFile');
const { inquirerMenu, pause, readInput, listadoTasksDelete, confirmDelete, showTaskChecklist } = require('./helpers/inquirer');
const Task = require('./models/task');
const Tasks = require('./models/tasks');

require('colors');

console.clear();

const main = async() => {
    let option = '';
    const tasks = new Tasks();
    
    const taskDB = readDB();

    if (taskDB){
        tasks.loadTaskFromArray(taskDB);
    }

    do{

        option = await inquirerMenu();
        switch (option) {
            case '1':
                const description = await readInput('Descripcion: ');
                tasks.createTask(description);
                break;
        
            case '2':
                console.log(tasks.listarTasks());
                break;
            
            case '3':
                console.log(tasks.listarTaskCompletedOrPending(true));
                break;

            case '4':
                console.log(tasks.listarTaskCompletedOrPending(false));
                break;
        
            case '5':
                const taskCheckList = await showTaskChecklist(tasks.listadoAsArray);
                console.log({taskCheckList});
                tasks.toggleCompletedTasks(taskCheckList);
                break;
            
            case '6':
                const id = await listadoTasksDelete(tasks.listadoAsArray);
                if( id !== '0'){
                    const ok = await confirmDelete('¿Estas seguro?');
                    if ( ok  ) {
                        tasks.deleteTask( id );
                        console.log('Tarea Borrada');
                    }
                }
                break;

            case '0':
        
                break;
                
            default:

                break;
        }

        saveDB(tasks.listadoAsArray);

        if(option !== '0') await pause();
    }while(option !== '0');
    console.clear();
}

main();