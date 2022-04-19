import 'dotenv/config';
import { app } from './app';
import { prisma } from './prisma';

if (!process.env.DATABASE_URL) {
	throw new Error('process.env.DATABASE_URL is undefined');
}

if (!process.env.PORT) {
	throw new Error('process.env.PORT is undefined');
}

(async () => {
	try {
		//webserver
		app.listen(process.env.PORT, () =>
			console.log(`Listening on port ${process.env.PORT}`),
		);
	} catch (err) {
		console.error(err);
	} finally {
		await prisma.$disconnect();
	}
})();
