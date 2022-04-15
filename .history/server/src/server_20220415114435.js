import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import { setIsSignedIn, getCurrentUser } from './auth';
import { auth } from './auth';
import { task } from './task';
import morgan from 'morgan';

(async () => {
	try {
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
