import mongoose from 'mongoose';
import { ConnectOptions } from 'mongodb';

export const mongooseConnect = async function (
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
