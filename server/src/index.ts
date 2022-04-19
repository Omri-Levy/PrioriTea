import 'dotenv/config';
import { app } from './app';
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('process.env.MONGODB_URI is undefined');
}

if (!process.env.PORT) {
	throw new Error('process.env.PORT is undefined');
}

const mongooseConnect = async function (
	uri: string,
	options: ConnectOptions = {},
) {
	return new Promise(function (resolve, reject) {
		mongoose.connect(uri, options, (err) => {
			if (err) {
				return reject(err);
			}

			return resolve('Connected to db');
		});
	});
};

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
