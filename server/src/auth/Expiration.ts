export class Expiration {
	private static _instance: Expiration;
	private constructor() {}

	static get instance() {
		if (!Expiration._instance) {
			this._instance = new Expiration();
		}

		return this._instance;
	}

	static inSecs(secs: number) {
		const now = new Date();

		return new Date(now.setSeconds(now.getSeconds() + secs));
	}

	static inMinutes(minutes: number) {
		const now = new Date();

		return new Date(now.setMinutes(now.getMinutes() + minutes));
	}

	static inHours(hours: number) {
		const now = new Date();

		return new Date(now.setHours(now.getHours() + hours));
	}

	static inDays(days: number) {
		const now = new Date();

		return new Date(now.setDate(now.getDate() + days));
	}

	static inWeeks(weeks: number) {
		const now = new Date();

		return new Date(now.setDate(now.getDate() + weeks * 7));
	}

	static inMonths(months: number) {
		const now = new Date();

		return new Date(now.setMonth(now.getMonth() + months));
	}

	static inYears(years: number) {
		const now = new Date();

		return new Date(now.setFullYear(now.getFullYear() + years));
	}
}
