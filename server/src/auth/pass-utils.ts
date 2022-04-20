import { hash, verify } from 'argon2';

export class PassUtils {
	private static _instance: PassUtils;

	private constructor() {}

	static get instance() {
		if (!this._instance) {
			this._instance = new PassUtils();
		}

		return this._instance;
	}

	static async hash(unhashed: string) {
		return hash(unhashed);
	}

	static async compare(hashed: string, unhashed: string) {
		return verify(hashed, unhashed);
	}
}
