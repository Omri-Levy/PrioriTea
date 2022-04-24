export const timeout = function (ms: number): Promise<Response> {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${ms} ms.`));
		}, ms);
	});
};
