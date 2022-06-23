const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                value:'1',
                name: `Crear tareas`            
            },
            {
                value: '2',
                name: 'Listar tareas'
            },
            {
                value:'3',
                name: 'Listar tareas completadas'
            },
            {
                value: '4',
                name: 'Listar tareas pendientes'
            },
            {
                value:'5',
                name: 'Completar tarea/s'
            },
            {
                value: '6',
                name: 'Borrar tarea'
            },
            {
                value:'0',
                name: 'Salir'
            }
            ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opcion  '.grey);
    console.log('========================='.green);

    const {option} = await inquirer.prompt(menuOptions)
    return option;
}


const pause  = async() => {
    const pauseOption = [
        {
            type: 'input',
            name: `Press`,
            message: `Presione ${'ENTER'.green} para continuar\n`,
        }
    ]
    console.log('\n');
    return await inquirer.prompt(pauseOption)
}

const readInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt( question );
    return description;
}

const listadoTasksDelete = async( tasks ) => {

    const choices = tasks.map( (task, index) => {
        
        const indexColor = `${index+1}`.green;

        return {
            value: task.id,
            name: `${indexColor} ${task.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0 '.green + 'Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt( questions );

    return id;
}

const confirmDelete = async( message ) => {
    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(questions);
    return ok;
}


const showTaskChecklist = async( tasks ) => {

    const choices = tasks.map( (task, index) => {
        
        const indexColor = `${index+1}`.green;

        return {
            value: task.id,
            name: `${indexColor} ${task.description}`,
            checked: task.completed ? true : false
            
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( questions );

    return ids;
}


module.exports = {
    inquirerMenu,
    readInput,
    pause,
    listadoTasksDelete,
    confirmDelete,
    showTaskChecklist
}