import { Task, Factory, Seeder } from "..";

export default class CreateTasks implements Seeder {
	public async run(factory: Factory): Promise<any> {
		await factory(Task)().createMany(10);
	}
}
