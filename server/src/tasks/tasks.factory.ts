import { define, factory } from "typeorm-seeding";
import { Faker } from "@faker-js/faker";
import { User } from "../users/users.entity";
import { Task } from "./tasks.entity";

define(Task, (faker: Faker) => {
	const task = new Task();

	task.priority = faker.random.arrayElement([
		`low`,
		`medium`,
		`high`,
		`asap`,
		`eventually`,
		`later`,
		`soon`,
		`by 5PM 01/01/2024`,
	]);
	task.description = `${faker.word.verb()} ${faker.word.conjunction()} ${faker.word.noun()}`;
	task.status = faker.random.arrayElement([
		`done`,
		`standby`,
		`in-progress`,
		`awaiting approval`,
		`pending`,
		`waiting on ${faker.name.firstName()}`,
		`soon`,
		`by 5PM 01/01/2024`,
	]);

	task.user = factory(User)() as any;

	return task;
});
