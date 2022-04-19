// For the error-handler middleware.
import 'express-async-errors';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import { auth } from './auth';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';
import { morganMiddleware } from './middleware/morgan';
import { tasks } from './tasks';

export const app = express();

app.set('trust proxy', 1);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morganMiddleware);
app.use(helmet());

// routes
app.use('/api/auth', auth);
app.use('/api/tasks', tasks);

// catches 404 response error/non-existent route
app.all(`*`, () => {
	throw new NotFoundError(`Route`);
});

app.use(errorHandler);
