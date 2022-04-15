import mongoose from 'mongoose';
import 'dotenv/config.js';
import { app } from './app';

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
			(err) => {
				if (err) {
					console.error(err);

					throw err;
				}

				console.log('connected to db');
			},
		);

		//webserver
		app.listen(process.env.PORT, () =>
			console.log(`Listening on port ${process.env.PORT}`),
		);
	} catch (err) {
		console.error(err);
	}
})();
