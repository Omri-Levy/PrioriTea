import { prisma } from '../../db/prisma';
import { RequestHandler } from 'express';
import { getErrorMessage } from '../../error-utils';
import { getUser } from '../../utils';
import { sendAccessToken } from '../utils';

export const setIsSignedIn: RequestHandler = async (_req, res) => {
	try {
		const { id } = getUser(res)!;
		const user = await prisma.user.findUnique({ where: { id } });

		if (user) {
			return res.status(200).send({});
		} else {
			sendAccessToken(res, '');
			return res.status(401).send({
				message: 'unauthorized',
			});
		}
	} catch (err) {
		const message = getErrorMessage(err);

		console.error(err);

		return res.status(500).send({ message });
	}
};
