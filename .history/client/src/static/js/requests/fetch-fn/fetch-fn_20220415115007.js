export const fetchFn = async (url, options) => {
	try {
		const res = await fetch(url, options);
		const data = await res.json();

		if (!res.ok) {
			throw new Error(`${data.message} (${res.status})`);
		}

		return { res, data };
	} catch (err) {
		console.error(err);
	}
};
