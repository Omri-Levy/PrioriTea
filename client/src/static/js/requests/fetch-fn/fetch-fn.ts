import { timeout } from './timeout';
import { TIMEOUT_IN_MS } from '../../../../config';

export const fetchFn = async (url: string, body?: Record<string, unknown>) => {
	try {
		const res = await Promise.race([
			fetch(url, {
				headers: {
					'Content-Type': 'application/json',
				}, 
				body: body ? JSON.stringify(body) : undefined,
			}),
			timeout(TIMEOUT_IN_MS),
		]);
		const data = await res.json();

		if (!res.ok) {
			throw new Error(`${data.message} (${res.status})`);
		}

		return data;
	} catch (err) {
		console.error(err);

		throw err;
	}
};
