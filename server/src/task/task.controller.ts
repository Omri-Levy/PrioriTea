import { Prisma } from '@prisma/client';
import { RequestHandler, Response } from 'express';
import { getErrorMessage } from '../error-utils';
import { prisma } from '../prisma';
import { validateTask } from './validation';

export const getUserId = function (res: Response): string | undefined {
	return res.locals.user.id;
};

/**
 * @path /api/task/get_tasks
 * @request get
 * @desc sends back all existing tasks from db
 */
const getTasks: RequestHandler = async (_req, res) => {
	try {
		const tasks = await prisma.task.findMany({
			where: { userId: getUserId(res) },
		});

		return res.status(200).send({ tasks });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

const getTask: RequestHandler = async (req, res) => {
	try {
		const task = await prisma.task.findUnique({
			where: {
				id: req.params.id as string,
			},
		});

		return res.status(200).send({ task });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 * @path /api/task/create_task
 * @request post
 * @desc adds a new task to db using parameters sent from the user
 */
const createTask: RequestHandler = async (req, res) => {
	const { error } = await validateTask(req.body);

	try {
		if (error)
			return res.status(400).send({
				success: false,
				message: error.details[0]?.message,
			});

		const task = await prisma.task.create({
			data: {
				description: req.body.description,
				status: req.body.status,
				User: {
					connect: { id: getUserId(res) },
				},
			},
		});

		return res.status(200).send({ success: true, task });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 * @path /api/task/edit_task
 * @request patch
 * @desc updates an existing task from db using an id sent from the user
 */
const editTask: RequestHandler = async (req, res) => {
	try {
		const task = await prisma.task.update({
			where: { id: req.body.id },
			data: {
				priority: req.body.priority,
				description: req.body.description,
				status: req.body.status,
			},
		});

		return res.status(200).send({ task });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

/**
 * @path /api/task/delete_task
 * @request delete
 * @desc deletes an existing task from db using an id sent from the user
 */
const deleteTask: RequestHandler = async (req, res) => {
	try {
		const task = await prisma.task.delete({
			where: {
				id: req.body.id,
			},
		});

		return res.status(200).send({ task });
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(400).send({ success: false, message });
	}
};

export { getTasks, getTask, createTask, editTask, deleteTask };
