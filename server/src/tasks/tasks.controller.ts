import { taskSchema } from './tasks.validation';
import { RequestHandler, Response } from 'express';
import { getErrorMessage } from '../error-utils';
import { prisma } from '../db/prisma';
import { logger } from '..';

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

		logger.error(err);

		return res.status(400).send({ message });
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

		logger.error(err);

		return res.status(400).send({ message });
	}
};

/**
 * @path /api/task/create_task
 * @request post
 * @desc adds a new task to db using parameters sent from the user
 */
const createTask: RequestHandler = async (req, res) => {
	try {
		taskSchema
			.pick({
				priority: true,
				description: true,
				status: true,
			})
			.parse({
				priority: req.body.priority,
				description: req.body.description,
				status: req.body.status,
			});
		await prisma.task.create({
			data: {
				priority: req.body.priority,
				description: req.body.description,
				status: req.body.status,
				User: {
					connect: { id: getUserId(res) },
				},
			},
		});
		const tasks = await prisma.task.findMany({
			where: { userId: getUserId(res) },
		});

		return res.status(200).send({ tasks });
	} catch (err) {
		const message = getErrorMessage(err);

		logger.error(err);

		return res.status(400).send({ message });
	}
};

/**
 * @path /api/task/edit_task
 * @request patch
 * @desc updates an existing task from db using an id sent from the user
 */
const editTask: RequestHandler = async (req, res) => {
	try {
		taskSchema
			.pick({
				priority: true,
				description: true,
				status: true,
			})
			.partial()
			.parse({
				priority: req.body.priority,
				description: req.body.description,
				status: req.body.status,
			});
		await prisma.task.update({
			where: { id: req.params.id },
			data: {
				priority: req.body.priority,
				description: req.body.description,
				status: req.body.status,
			},
		});
		const tasks = await prisma.task.findMany({
			where: { userId: getUserId(res) },
		});

		return res.status(200).send({ tasks });
	} catch (err) {
		const message = getErrorMessage(err);

		logger.error(err);

		return res.status(400).send({ message });
	}
};

/**
 * @path /api/task/delete_task
 * @request delete
 * @desc deletes an existing task from db using an id sent from the user
 */
const deleteTask: RequestHandler = async (req, res) => {
	try {
		await prisma.task.delete({
			where: {
				id: req.params.id,
			},
		});
		const tasks = await prisma.task.findMany({
			where: { userId: getUserId(res) },
		});

		return res.status(200).send({ tasks });
	} catch (err) {
		const message = getErrorMessage(err);

		logger.error(err);

		return res.status(400).send({ message });
	}
};

export { getTasks, getTask, createTask, editTask, deleteTask };
