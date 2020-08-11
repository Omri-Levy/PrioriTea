import Task from '../models/Task.js';
import taskValidation from '../validation/taskValidation.js';

/**
 * @path /api/task/get_tasks
 * @request get
 * @desc sends back all existing tasks from mongodb
 */
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

/**
 * @path /api/task/create_task
 * @request post
 * @desc adds a new task to mongodb using parameters sent from the user
 */
const createTask = async (req, res) => {
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

}

/**
 * @path /api/task/edit_task
 * @request patch
 * @desc updates an existing task from mongodb using an id sent from the user
 */
const editTask = async (req, res) => {
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
}

/**
 * @path /api/task/delete_task
 * @request delete
 * @desc deletes an existing task from mongodb using an id sent from the user
 */
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.deleteOne(
            {_id: req.body._id});
        res.json(deletedTask);
    } catch (err) {
        res.json({message: err});
    }
}

export {
    getTasks,
    createTask,
    editTask,
    deleteTask
};
