import { RequestHandler } from 'express';
import { getErrorMessage } from '../error-utils';
import { TaskModel } from './task.model';
import { validateTask } from './validation';

/**
 * @path /api/task/get_tasks
 * @request get
 * @desc sends back all existing tasks from mongodb
 */
const getTasks: RequestHandler = async (_req, res) => {
	try {
		const owner = res.locals.user.id;
		const tasks = await TaskModel.find({ owner }).exec();

		return res.status(200).json(tasks);
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

const getTask: RequestHandler = async (req, res) => {
	try {
		const owner = res.locals.user.id;
		const task = await TaskModel.find({
			owner,
			_id: req.params.id,
		}).exec();

		return res.status(200).json(task);
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 * @path /api/task/create_task
 * @request post
 * @desc adds a new task to mongodb using parameters sent from the user
 */
const createTask: RequestHandler = async (req, res) => {
	console.log(req.body);
	const { error } = await validateTask(req.body);

	if (error)
		return res
			.status(400)
			.send({ success: false, message: error.details[0]?.message });

	const owner = res.locals.user.id;
	const newTask = new TaskModel({
		priority: req.body.priority,
		task: req.body.task,
		owner,
	});

	try {
		const savedTask = await newTask.save();

		return res.status(200).send({ success: true, task: savedTask._id });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 * @path /api/task/edit_task
 * @request patch
 * @desc updates an existing task from mongodb using an id sent from the user
 */
const editTask: RequestHandler = async (req, res) => {
	try {
		const oldTask = await TaskModel.findById(req.body._id).exec();
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
		).exec();

		return res.status(200).json(updatedTask);
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 * @path /api/task/delete_task
 * @request delete
 * @desc deletes an existing task from mongodb using an id sent from the user
 */
const deleteTask: RequestHandler = async (req, res) => {
	try {
		const deletedTask = await TaskModel.deleteOne({
			_id: req.body._id,
		}).exec();

		return res.status(200).json(deletedTask);
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

export { getTasks, getTask, createTask, editTask, deleteTask };
