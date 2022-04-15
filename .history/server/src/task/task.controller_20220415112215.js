import Task from './task.model.js';
import taskValidation from './validation/task-validation-schema.js';
import { verify as verifyJwt } from 'jsonwebtoken';

/**
 * @path /api/task/get_tasks
 * @request get
 * @desc sends back all existing tasks from mongodb
 */
const getTasks = async (req, res) => {
	try {
		const authorization = req.headers['cookie'];
		const token = authorization.split('mid=')[1];
		const verified = verifyJwt(token, process.env.SECRET_ACCESS_TOKEN);
		const tasks = await Task.find({ owner: verified.id });

		return res.status(200).json(tasks);
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
};

const getTask = async (req, res) => {
	try {
		const authorization = req.headers['cookie'];
		const token = authorization.split('mid=')[1];
		const verified = verifyJwt(token, process.env.SECRET_ACCESS_TOKEN);
		const task = await Task.find({
			owner: verified.id,
			_id: req.params.id,
		});

		return res.status(200).json(task);
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
};

/**
 * @path /api/task/create_task
 * @request post
 * @desc adds a new task to mongodb using parameters sent from the user
 */
const createTask = async (req, res) => {
	console.log(req.body);
	const { error } = await taskValidation(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const authorization = req.headers['cookie'];
	const token = authorization.split('mid=')[1];

	const verified = verifyJwt(token, process.env.SECRET_ACCESS_TOKEN);
	const newTask = new Task({
		priority: req.body.priority,
		task: req.body.task,
		owner: verified.id,
	});

	try {
		const savedTask = await newTask.save();

		return res.status(200).json({ task: savedTask._id });
	} catch (err) {
		return res.status(400).json({ message: err });
	}
};

/**
 * @path /api/task/edit_task
 * @request patch
 * @desc updates an existing task from mongodb using an id sent from the user
 */
const editTask = async (req, res) => {
	try {
		const oldTask = await Task.findById(req.body._id);
		const updatedTask = await Task.updateOne(
			{ _id: req.body._id },
			{
				$set: {
					priority: req.body.priority
						? req.body.priority
						: oldTask.priority,
					task: req.body.task ? req.body.task : oldTask.task,
					status: req.body.status ? req.body.status : oldTask.status,
				},
			},
		);

		return res.status(200).json(updatedTask);
	} catch (err) {
		return res.status(400).json({ message: err });
	}
};

/**
 * @path /api/task/delete_task
 * @request delete
 * @desc deletes an existing task from mongodb using an id sent from the user
 */
const deleteTask = async (req, res) => {
	try {
		const deletedTask = await Task.deleteOne({ _id: req.body._id });

		return res.status(200).json(deletedTask);
	} catch (err) {
		return res.status(400).json({ message: err });
	}
};

export { getTasks, getTask, createTask, editTask, deleteTask };
