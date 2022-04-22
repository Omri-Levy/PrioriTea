import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { User } from "./users.entity";

export default class CreateUsers implements Seeder {
	// @ts-ignore
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(User)().createMany(10);
	}
}
