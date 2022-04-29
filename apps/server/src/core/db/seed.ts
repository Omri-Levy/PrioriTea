import { Prisma } from "@prisma/client";
import { db } from "../db/db";
import { faker } from "@faker-js/faker";

// Iterate 10 times
const userData: Prisma.UserCreateInput[] = [...Array(10)].map(function () {
	return {
		fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
		email: faker.internet.email(),
		password: faker.internet.password() + "!1qQ",
		tasks: {
			create: [
				{
					description: faker.lorem.paragraph(1),
					priority: faker.random.arrayElement([
						"HIGH",
						"LOW",
						"EVENTUALLY",
						"ASAP",
						"LATER",
						"BY 01/01/2024",
						"NOW",
						"OPTIONAL",
					]),
				},
			],
		},
	};
});

async function main() {
	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await db.user.create({
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
		await db.$disconnect();
	});
