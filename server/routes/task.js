import express from 'express';
import Task from '../models/Task.js';
import taskValidation from '../validation/taskValidation.js';


const task = express.Router();

task.get('/get_tasks',
    async (req,
           res) => {
        const tasks = await Task.find().sort([['createdAt', -1]]);
        res.json(tasks)
    })

task.post('/create_task',
    async (req,
           res) => {
        const {error} = await taskValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const newTask = new Task({
            priority: req.body.priority,
            task: req.body.task,
            status: req.body.status
        });

        try {
            const savedTask = await newTask.save();
            res.json({task: savedTask._id});
        } catch (err) {
            res.json({message: err});
        }

    });

task.patch('/edit_task',
    async (req,
           res) => {
        try {
            const oldTask = await Task.findById(req.body._id);
            const updatedTask = await Task.updateOne(
                {_id: req.body._id},
                {
                    $set: {
                        priority: req.body.priority ? req.body.priority :
                            oldTask.priority,
                        task: req.body.task ? req.body.task : oldTask.task,
                        status: req.body.status ? req.body.status :
                            oldTask.status
                    }
                });
            res.json(updatedTask);
        } catch (err) {
            res.json({message: err});
        }
    });

task.delete('/delete_task',
    async (req,
           res) => {
        try {
            const deletedTask = await Task.deleteOne(
                {_id: req.body._id});
            res.json(deletedTask);
        } catch (err) {
            res.json({message: err});
        }
    });

export default task;
