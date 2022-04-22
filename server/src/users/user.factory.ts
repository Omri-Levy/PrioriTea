import { Faker, GenderType } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { User } from "./users.entity";

define(User, (faker: Faker) => {
	const gender = faker.name.gender(true).toLowerCase() as GenderType;
	const firstName = faker.name.firstName(gender);
	const lastName = faker.name.lastName(gender);
	const email = faker.internet.email(firstName, lastName);

	const user = new User();

	user.email = email;
	user.fullName = `${firstName} ${lastName}`;
	user.password = faker.random.word();

	return user;
});
