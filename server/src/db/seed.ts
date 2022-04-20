import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { logger } from '..';
import { prisma } from '../db/prisma';

(async function () {
	const hashedPassword = await hash('!@#123QWEqwe');
	const tasks = [
		{
			description: 'Do homework',
			priority: 'HIGH',
		},
		{
			description: 'Create a new project',
			priority: 'LOW',
		},
		{
			description: 'Create a new task',
			priority: 'ASAP',
		},
		{
			description: 'Create a new user',
			priority: 'Some day',
		},
		{
			description: 'Buy some milk',
			priority: 'Eventually',
		},
		{
			description: 'Take out the trash',
			priority: 'Optional',
		},
		{
			description: 'Do the dishes',
			priority: 'Soon',
		},
		{
			description: 'Finish this project',
			priority: 'By 2023',
		},
		{
			description: 'Finish this task',
			priority: 'By 7 PM',
		},
		{
			description: 'Exercise',
			priority: 'MID',
		},
	];
	const userData: Prisma.UserCreateInput[] = [
		{
			fullName: 'Don Smith',
			email: 'don@prisma.io',
			password: hashedPassword,
			tasks: {
				create: tasks,
			},
		},
		{
			fullName: 'John Smith',
			email: 'john@prisma.io',
			password: hashedPassword,
			tasks: {
				create: tasks,
			},
		},
		{
			fullName: 'Manny Smith',
			email: 'manny@prisma.io',
			password: hashedPassword,
			tasks: {
				create: tasks,
			},
		},
	];

	async function main() {
		logger.info(`Start seeding ...`);
		for (const u of userData) {
			const user = await prisma.user.create({
				data: u,
			});
			logger.info(`Created user with id: ${user.id}`);
		}
		logger.info(`Seeding finished.`);
	}

	main()
		.catch((e) => {
			logger.error(e);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
})();
