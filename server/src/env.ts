import 'dotenv/config';

if (!process.env.PORT) {
	throw new Error('process.env.PORT is undefined');
}

if (!process.env.DATABASE_URL) {
	throw new Error('process.env.DATABASE_URL is undefined');
}

if (!process.env.CORS_ORIGIN) {
	throw new Error('process.env.CORS_ORIGIN is undefined');
}

if (!process.env.SECRET_ACCESS_TOKEN) {
	throw new Error('process.env.SECRET_ACCESS_TOKEN is undefined');
}

if (!process.env.DOMAIN) {
	throw new Error('process.env.DOMAIN is undefined');
}

const {
	NODE_ENV,
	PORT,
	DATABASE_URL,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
} = process.env;

export {
	NODE_ENV,
	PORT,
	DATABASE_URL,
	CORS_ORIGIN,
	SECRET_ACCESS_TOKEN,
	DOMAIN,
};
