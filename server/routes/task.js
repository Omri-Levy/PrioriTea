import express from 'express';
import {
    createTask,
    filterTasks,
    getTasks,
    editTask,
    deleteTask
} from '../controllers/task.js';


const task = express.Router();

//sends back a filtered array using a parameter sent from the user
task.post('/filter_tasks', (req, res) => filterTasks(req, res));

//sends back all existing tasks from mongodb
task.get('/get_tasks', (req, res) => getTasks(req, res));

//adds a new task to mongodb using parameters sent from the user
task.post('/create_task', (req, res) => createTask(req, res));

//updates an existing task from mongodb using an id sent from the user
task.patch('/edit_task', (req, res) => editTask(req, res));

//deletes an existing task from mongodb using an id sent from the user
task.delete('/delete_task', (req, res) => deleteTask(req, res));

export default task;
