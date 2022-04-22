import { ConnectionOptions, createConnection } from "typeorm";
import ormconfig from "../ormconfig";

/**
 * Ensures consistency of property and method names across different
 * databases and ORMs.
 */
export class TypeormAdapter {
	constructor() {}

	async connect() {
		return createConnection(ormconfig as ConnectionOptions);
	}
}
