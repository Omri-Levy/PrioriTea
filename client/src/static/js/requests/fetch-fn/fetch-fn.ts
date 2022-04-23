import { timeout } from './timeout';
import { TIMEOUT_IN_MS } from '../../../../config';

export const fetchFn = async (url, options) => {
	try {
		const res = await Promise.race([
			fetch(url, options),
			timeout(TIMEOUT_IN_MS),
		]);
		const data = await res.json();

		if (!res.ok) {
			throw new Error(`${data.message} (${res.status})`);
		}

		return { res, data };
	} catch (err) {
		console.error(err);

		throw err;
	}
};
