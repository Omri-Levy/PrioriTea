// @ts-ignore
import Faker from "faker";
import { plainToClass } from "class-transformer";
import { define, factory } from "typeorm-seeding";
import { User } from "../users/users-entity";
import { Task } from "./tasks.entity";

define(Task, (faker: typeof Faker) => {
	const priority = faker.random.arrayElement([
		`low`,
		`medium`,
		`high`,
		`asap`,
		`eventually`,
		`later`,
		`soon`,
		`by 5PM 01/01/2024`,
	]);
	const description = faker.lorem.paragraph(1);
	const status = faker.random.arrayElement([
		`done`,
		`standby`,
		`in-progress`,
		`awaiting approval`,
		`pending`,
		`waiting on ${faker.name.firstName()}`,
		`soon`,
		`by 5PM 01/01/2024`,
	]);

	const user = factory(User)() as any;

	return plainToClass(Task, {
		priority,
		description,
		status,
		user,
	});
});
