import 'core-js/stable';
import { RequestHandler } from 'express';
import 'regenerator-runtime/runtime';
import { getErrorMessage } from '../../error-utils';

export const getCurrentUser: RequestHandler = async (_req, res) => {
	try {
		const user = res.locals;

		return res.status(200).send({
			success: true,
			user: {
				email: user.email,
				fullName: user.fullName,
			},
		});
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(500).send({ success: false, message });
	}
};
