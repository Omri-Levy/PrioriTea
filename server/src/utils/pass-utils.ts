import { hash, verifyArgon2 } from "..";

export class PassUtils {
	// eslint-disable-next-line no-use-before-define
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
		return verifyArgon2(hashed, unhashed);
	}
}
