import { RequestHandler } from 'express';
import { getErrorMessage } from '../../error-utils';
import { UserModel } from '../../user';
import { getUser } from '../../utils';
import { sendAccessToken } from '../utils';

export const setIsSignedIn: RequestHandler = async (_req, res) => {
	try {
		const { id } = getUser(res)!;
		const user = await UserModel.findById(id).exec();

		if (user) {
			return res.status(200).send({
				success: true,
				isSignedIn: true,
			});
		} else {
			sendAccessToken(res, '');
			return res.status(401).send({
				success: false,
				isSignedIn: false,
				message: 'unauthorized',
			});
		}
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(500).send({ message, success: false });
	}
};
