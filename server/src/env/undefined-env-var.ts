export const undefinedEnvVar = function (key: string) {
	if (!process.env[key]) {
		throw new Error(`process.env.${key} is undefined`);
	}
};
