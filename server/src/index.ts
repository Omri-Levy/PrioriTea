import 'dotenv/config';
import { app } from './app';
import { prisma } from './db/prisma';

if (!process.env.DATABASE_URL) {
	throw new Error('process.env.DATABASE_URL is undefined');
}

if (!process.env.PORT) {
	throw new Error('process.env.PORT is undefined');
}

(async () => {
	try {
		//webserver
		app.listen();
	} catch (err) {
		console.error(err);
	} finally {
		await prisma.$disconnect();
	}
})();
