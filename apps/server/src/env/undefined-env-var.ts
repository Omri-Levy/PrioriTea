export const undefinedEnvVar = function (key: string) {
	if (!import.meta.env[key]) {
		throw new Error(`import.meta[${key}] is undefined`);
	}
};
