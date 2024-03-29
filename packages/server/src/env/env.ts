import {undefinedEnvVar} from "./undefined-env-var";

const envVars = [
	"PORT",
	"CORS_ORIGIN",
	"SECRET_ACCESS_TOKEN",
	"DOMAIN",
	"BASE_URL",
];

// Throws an error is a required env variable is undefined.
// if (!process.env[KEY]) { throw error }
envVars.forEach((env) => undefinedEnvVar(env));

const {
	PORT,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
	BASE_URL,
} = process.env;

export {
	PORT,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
	BASE_URL,
};
