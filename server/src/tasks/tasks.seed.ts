import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { Task } from "./tasks.entity";

export default class CreateTasks implements Seeder {
	// @ts-ignore
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(Task)().createMany(10);
	}
}
