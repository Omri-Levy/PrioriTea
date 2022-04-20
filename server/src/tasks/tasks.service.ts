import express from 'express';
import { isAuth, Method, restful } from '../';
import {
	createTask,
	deleteTask,
	editTask,
	getTask,
	getTasks,
} from './tasks.controller';

export const tasks = express.Router();

//sends back all existing tasks from db
tasks.get('/', isAuth, getTasks);

tasks.get('/:id', isAuth, getTask);

//adds a new task to db using parameters sent from the user
tasks.post('/', isAuth, createTask);

//updates an existing task from db using an id sent from the user
tasks.patch('/:id', isAuth, editTask);

//deletes an existing task from db using an id sent from the user
tasks.delete('/:id', isAuth, deleteTask);

tasks.all('*', restful([Method.GET, Method.POST, Method.PATCH, Method.DELETE]));
