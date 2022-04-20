import 'express-async-errors';
import 'reflect-metadata';
import { app, logger, prisma } from './';

(async () => {
	try {
		app.listen();
	} catch (err) {
		logger.error(err);
	} finally {
		await prisma.$disconnect();
	}
})();
