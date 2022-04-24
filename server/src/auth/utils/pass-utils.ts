// Not to confuse with jsonwebtoken verify
import { hash, verify as verifyArgon2 } from "argon2";

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
