// Not to confuse with jsonwebtoken verify
import {hash, verify as verifyArgon2} from "argon2";

export class PassUtils {
	private constructor() {
	}


	static async hash(unhashed: string) {
		return hash(unhashed);
	}

	static async compare(hashed: string, unhashed: string) {
		return verifyArgon2(hashed, unhashed);
	}
}
