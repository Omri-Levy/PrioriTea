import cookieParser from 'cookie-parser';
import cors from 'cors';
import { json, urlencoded } from 'express';
// For the error-router middleware.
import helmet from 'helmet';
import { CORS_ORIGIN, errorHandler, morgan, PORT, router, Server } from '.';

export const app = new Server(PORT, router);

app.config({ setting: 'trust proxy', val: 1 })
	.registerMiddleware(
		cookieParser(),
		cors({ origin: CORS_ORIGIN, credentials: true }),
		urlencoded({ extended: true }),
		json(),
		morgan,
		helmet(),
	)
	.registerRouter()
	.registerMiddleware(errorHandler);
