import { undefinedEnvVar } from "./undefined-env-var";

const envVars = [
	"VITE_PORT",
	"VITE_CORS_ORIGIN",
	"VITE_SECRET_ACCESS_TOKEN",
	"VITE_DOMAIN",
	"VITE_BASE_URL",
];

// Throws an error is a required env variable is undefined.
// if (!import.meta.env[KEY]) { throw error }
envVars.forEach((env) => undefinedEnvVar(env));

const {
	VITE_PORT,
	VITE_CORS_ORIGIN,
	VITE_SECRET_ACCESS_TOKEN,
	VITE_DOMAIN,
	VITE_BASE_URL,
} = import.meta.env;

export {
	VITE_PORT,
	VITE_CORS_ORIGIN,
	VITE_SECRET_ACCESS_TOKEN,
	VITE_DOMAIN,
	VITE_BASE_URL,
};
