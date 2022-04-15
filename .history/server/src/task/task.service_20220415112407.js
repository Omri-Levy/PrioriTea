import express from 'express';
import { getTasks, getTask, editTask, deleteTask } from './task.controller';
import { isAuth } from '../../auth/auth.service';

export const task = express.Router();

//sends back all existing tasks from mongodb
task.get('/get-tasks', isAuth, (req, res) => getTasks(req, res));

task.get('/get-task', isAuth, (req, res) => getTask(req, res));

//adds a new task to mongodb using parameters sent from the user
task.post('/create-task', isAuth, (req, res) => createTask(req, res));

//updates an existing task from mongodb using an id sent from the user
task.patch('/edit-task', isAuth, (req, res) => editTask(req, res));

//deletes an existing task from mongodb using an id sent from the user
task.delete('/delete-task', isAuth, (req, res) => deleteTask(req, res));
