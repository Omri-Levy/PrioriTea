import mongoose from 'mongoose';
import 'dotenv/config.js';
import { app } from './app';

(async () => {
	try {
		//connect to db
		await mongoose
			.connect(
				process.env.MONGODB_URI,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useFindAndModify: false,
					useCreateIndex: true,
				},
				() => {
					console.log('connected to db');
				},
			)
			.catch(function (err) {
				console.error(err);

				throw err;
			});

		//webserver
		app.listen(process.env.PORT, () =>
			console.log(`Listening on port ${process.env.PORT}`),
		);
	} catch (err) {
		console.error(err);
	}
})();
