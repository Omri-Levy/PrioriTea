import 'dotenv/config';
import { app } from './app';
import { mongooseConnect } from './mongoose-connect';

if (!process.env.MONGODB_URI) {
	throw new Error('process.env.MONGODB_URI is undefined');
}

if (!process.env.PORT) {
	throw new Error('process.env.PORT is undefined');
}

(async () => {
	try {
		//connect to db
		await mongooseConnect(process.env.MONGODB_URI!).then(function (res) {
			console.log(res);
		});

		//webserver
		app.listen(process.env.PORT, () =>
			console.log(`Listening on port ${process.env.PORT}`),
		);
	} catch (err) {
		console.error(err);
	}
})();
