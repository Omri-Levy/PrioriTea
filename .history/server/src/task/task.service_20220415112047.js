import express from 'express';
import { getTasks, getTask, editTask, deleteTask } from './task.controller';

export const task = express.Router();

//sends back all existing tasks from mongodb
task.get('/get_tasks', isAuth, (req, res) => getTasks(req, res));

//adds a new task to mongodb using parameters sent from the user
task.post('/create_task', isAuth, (req, res) => createTask(req, res));

//updates an existing task from mongodb using an id sent from the user
task.patch('/edit_task', isAuth, (req, res) => editTask(req, res));

//deletes an existing task from mongodb using an id sent from the user
task.delete('/delete_task', isAuth, (req, res) => deleteTask(req, res));
