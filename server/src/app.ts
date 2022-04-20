import cors from 'cors';
import { json, urlencoded } from 'express';
// For the error-router middleware.
import 'express-async-errors';
import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler';
import { morganMiddleware } from './middleware/morgan';
import { Server } from './Server';
import { UserController } from './user/user.controller';

const app = new Server(process.env.PORT!);

app.config({ setting: 'trust proxy', val: 1 })
	.registerMiddleware(
		cors({ origin: process.env.CORS_ORIGIN, credentials: true }),
		urlencoded({ extended: true }),
		json(),
		morganMiddleware,
		helmet(),
	)
	.registerControllers(new UserController())
	.registerMiddleware(errorHandler);

export { app };
