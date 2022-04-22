import { DB_URL } from "./src/env";
import { Task } from "./src/tasks/tasks-entity";
import { User } from "./src/users/users-entity";

export default {
	name: "default",
	type: "postgres",
	database: "prioritea",
	entities: [User, Task],
	synchronize: true,
	logging: false,
	// These two lines have been added:
	seeds: ["./src/**/*-seed.ts"],
	factories: ["./src/**/*-factory.ts"],
	migrations: ["src/migrations/*.js"],
	url: DB_URL,
	cli: {
		migrationsDir: "src/migrations",
	},
};
