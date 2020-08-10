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
            title: req.body.title,
            owner: req.body.owner
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
                        title: req.body.title ? req.body.title : oldTask.title,
                        owner: req.body.owner ? req.body.owner : oldTask.owner,
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

