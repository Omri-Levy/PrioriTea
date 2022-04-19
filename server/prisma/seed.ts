import { Prisma } from '@prisma/client';
import { prisma } from '../src/prisma';

const userData: Prisma.UserCreateInput[] = [
	{
		fullName: 'Don Smith',
		email: 'don@prisma.io',
		password: '!@#QWEqwe',
		tasks: {
			create: [
				{
					description: 'Join the Prisma Slack',
					priority: 'HIGH',
				},
			],
		},
	},
	{
		fullName: 'John Smith',
		email: 'john@prisma.io',
		password: '!@#QWEqwe',
		tasks: {
			create: [
				{
					description: 'Some task',
					priority: 'LOW',
				},
			],
		},
	},
	{
		fullName: 'Manny Smith',
		email: 'manny@prisma.io',
		password: '!@#QWEqwe',
		tasks: {
			create: [
				{
					description: 'Other task',
					priority: 'ASAP',
				},
			],
		},
	},
];

async function main() {
	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
