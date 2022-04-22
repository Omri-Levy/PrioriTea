import { logger } from "./utils/logger";

export interface IDatabase {
	connect(): any;
}

export interface IDatabaseConstruct {
	new <TOptions extends object>(options: TOptions): IDatabase;
}

export class Database implements IDatabase {
	public connectMsg = `Connected to db`;


	constructor(private db: IDatabase) {
	
	}

	private onConnect() {
		logger.info(this.connectMsg);
	}

	async connect() {
		try {
			return this.db.connect().then(() => {
				this.onConnect();
			});
		} catch (err) {
			logger.error(err);
		}
	}
}
