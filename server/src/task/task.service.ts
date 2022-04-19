import express from 'express';
import {
	getTasks,
	getTask,
	editTask,
	deleteTask,
	createTask,
} from './task.controller';
import { isAuth } from '../auth';

export const task = express.Router();

//sends back all existing tasks from mongodb
task.get('/get-tasks', isAuth, getTasks);

task.get('/get-task', isAuth, getTask);

//adds a new task to mongodb using parameters sent from the user
task.post('/create-task', isAuth, createTask);

//updates an existing task from mongodb using an id sent from the user
task.patch('/edit-task', isAuth, editTask);

//deletes an existing task from mongodb using an id sent from the user
task.delete('/delete-task', isAuth, deleteTask);
