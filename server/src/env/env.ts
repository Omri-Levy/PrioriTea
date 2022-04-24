import { undefinedEnvVar } from "./undefined-env-var";

const envVars = [
	"PORT",
	"CORS_ORIGIN",
	"SECRET_ACCESS_TOKEN",
	"DOMAIN",
	"BASE_URL",
];

// Throws an error is a required env variable is undefined.
// if (!process.env.[KEY]) { throw error }
envVars.forEach(function (env) {
	undefinedEnvVar(env);
});

const {
	NODE_ENV,
	PORT,
	DB_URL,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
	BASE_URL,
} = process.env;

export {
	NODE_ENV,
	PORT,
	DB_URL,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
	BASE_URL,
};
