import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { verify } from 'jsonwebtoken';

export const getCurrentUser = async (req, res, next) => {
	const authorization = req.headers['cookie'];

	if (!authorization) {
		console.error('unauthorized');
		return res
			.status(401)
			.json({ success: false, message: 'unauthorized' });
	}

	const token = authorization.split('mid=')[1];

	if (!token) {
		console.error('unauthorized');

		return res
			.status(401)
			.json({ success: false, message: 'unauthorized' });
	}

	try {
		const verified = await verify(token, process.env.SECRET_ACCESS_TOKEN);

		if (!verified) {
			console.error('unauthorized');

			return res
				.status(401)
				.json({ success: false, message: 'unauthorized' });
		}

		res.json({
			success: true,
			email: verified.email,
			fullName: verified.fullName,
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({ success: false, message: err.message });
	}

	next();
};
