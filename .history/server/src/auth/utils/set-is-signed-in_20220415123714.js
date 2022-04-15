import { verify } from 'jsonwebtoken';
import { UserModel } from '../../user';
import { sendAccessToken } from '../utils';

export const setIsSignedIn = async (req, res) => {
	const authorization = req.headers['cookie'];

	if (!authorization) {
		console.error('unauthorized');
		return res.status(401).json({
			success: false,
			isSignedIn: false,
		});
	}

	const token = authorization.split('mid=')[1];

	if (!token) {
		console.error('unauthorized');
		return res.status(401).json({
			success: false,
			isSignedIn: false,
		});
	}
	try {
		const { id } = await verify(token, process.env.SECRET_ACCESS_TOKEN);
		const user = await UserModel.findById(id);

		if (user) {
			return res.status(200).json({
				success: true,
				isSignedIn: true,
			});
		} else {
			sendAccessToken(res, '');
			return res.status(401).json({
				success: false,
				isSignedIn: false,
			});
		}
	} catch (err) {
		console.error(err);

		return res.status(500).json({ message: err.message, success: false });
	}
};
