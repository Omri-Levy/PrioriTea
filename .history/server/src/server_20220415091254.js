import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import getCurrentUser from './src/js/getCurrentUser.js';
import setIsSignedIn from './src/js/setIsSignedIn.js';
import auth from './src/routes/auth.js';
import task from './src/routes/task.js';
import morgan from 'morgan';

(async () => {
	try {
		const app = express();

		app.set('trust proxy', 1);
		app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());
		app.use(morgan('combined'));

		//route middlewares
		app.use('/api/user', auth);
		app.use('/api/task', task);
		app.use('/api/user/sign_in', cookieParser());
		app.post('/api/get_current_user', getCurrentUser);
		app.post('/api/auth', setIsSignedIn);

		//connect to db
		await mongoose.connect(
			process.env.MONGODB_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			},
			() => console.log('connected to db'),
		);

		//webserver
		app.listen(process.env.PORT, () =>
			console.log(`Listening on port ${process.env.PORT}`),
		);
	} catch (err) {
		console.error(err);
	}
})();
