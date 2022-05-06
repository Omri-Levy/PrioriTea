import { Prisma } from "@prisma/client";
import { db } from "../db/db";
import { faker } from "@faker-js/faker";

// Iterate n times
const users = 10;
const rows = 10;
const pages = 10;

export type BaseArray = any[];

/**
 * @description Returns an array of n numbers.
 * @param n
 */
export const arrayOfN = (n: number) =>
	Array.from({length: n }, (_, i) => i + 1);

/**
 * @description Maps n times using the passed in callback, passes a one-based number as the first argument, and a zero-based index as the second argument.
 * @param n
 * @param strategy
 */
export const mapRange = <TItem>(n: number, strategy: (n: number, i: number) => TItem) => arrayOfN(n).map(strategy);

const userData = mapRange<Prisma.UserCreateInput>(users, () =>
	({
		name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		email: faker.internet.email(),
		password: faker.internet.password() + "!1qQ",
		tasks: {
			create: mapRange(rows * pages, () => ({
				description: faker.lorem.paragraph(1),
				priority: faker.helpers.arrayElement([
					1,
					2,
					3,
					4,
					5
				]),
			}))
		},
	}));

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
