// @ts-ignore
import Faker from "faker";
import { plainToClass } from "class-transformer";
import { define } from "typeorm-seeding";
import { User } from "./users.entity";

define(User, (faker: typeof Faker) => {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const email = faker.internet.email(firstName, lastName);
	const fullName = `${firstName} ${lastName}`;
	const password = faker.internet.password() + "!";

	return plainToClass(User, {
		email,
		fullName,
		password,
	});
});
