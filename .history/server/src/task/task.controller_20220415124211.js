import { TaskModel } from './task.model.js';
import taskValidation from './validation/validate-task.js';
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
		const verified = await verifyJwt(
			token,
			process.env.SECRET_ACCESS_TOKEN,
		);
		const tasks = await TaskModel.find({ owner: verified.id });

		return res.status(200).json(tasks);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ success: false, message: err.message });
	}
};

const getTask = async (req, res) => {
	try {
		const authorization = req.headers['cookie'];
		const token = authorization.split('mid=')[1];
		const verified = await verifyJwt(
			token,
			process.env.SECRET_ACCESS_TOKEN,
		);
		const task = await TaskModel.find({
			owner: verified.id,
			_id: req.params.id,
		});

		return res.status(200).json(task);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ success: false, message: err.message });
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

	if (error)
		return res
			.status(400)
			.json({ success: false, message: error.details[0].message });

	const authorization = req.headers['cookie'];
	const token = authorization.split('mid=')[1];

	const verified = verifyJwt(token, process.env.SECRET_ACCESS_TOKEN);
	const newTask = new TaskModel({
		priority: req.body.priority,
		task: req.body.task,
		owner: verified.id,
	});

	try {
		const savedTask = await newTask.save();

		return res.status(200).json({ success: true, task: savedTask._id });
	} catch (err) {
		return res.status(400).json({ success: false, message: err.message });
	}
};

/**
 * @path /api/task/edit_task
 * @request patch
 * @desc updates an existing task from mongodb using an id sent from the user
 */
const editTask = async (req, res) => {
	try {
		const oldTask = await TaskModel.findById(req.body._id);
		const updatedTask = await TaskModel.updateOne(
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
		return res.status(400).json({ success: false, message: err.message });
	}
};

/**
 * @path /api/task/delete_task
 * @request delete
 * @desc deletes an existing task from mongodb using an id sent from the user
 */
const deleteTask = async (req, res) => {
	try {
		const deletedTask = await TaskModel.deleteOne({ _id: req.body._id });

		return res.status(200).json(deletedTask);
	} catch (err) {
		return res.status(400).json({ success: false, message: err.message });
	}
};

export { getTasks, getTask, createTask, editTask, deleteTask };
