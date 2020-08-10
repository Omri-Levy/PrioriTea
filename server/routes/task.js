import express from 'express';
import Task from '../models/Task.js';
import taskValidation from '../validation/taskValidation.js';


const task = express.Router();
let filterExists = false;

const checkFilter = async () => {
    if (filterExists) {
        return (
            await Task
                .find({priority: 'ASAP'})
                .sort([['createdAt', -1]])
        );

    } else {
        return (
            await Task
                .find({})
                .sort([['createdAt', -1]])
        );
    }
}

task.post('/filter_tasks',
    async (req,
           res) => {
        try {
            filterExists = await req.body.filter;
            const tasks = await checkFilter();
            res.json(tasks);
            return filterExists;
        } catch (err) {
            res.json(err);
            console.log(err);
        }
    }
)

task.get('/get_tasks',
    async (req,
           res) => {
        try {
            const tasks = await checkFilter();
            res.json(tasks)
            console.log(tasks)
        } catch (err) {
            res.json(err);
            console.log(err);
        }
    }
)

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
