import { verify } from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
	const authorization = req.headers['cookie'];

	if (!authorization) {
		console.error('unauthorized');
		return res
			.status(401)
			.send({ message: 'unauthorized', success: false });
	}

	const token = authorization.split('mid=')[1];

	if (!token) {
		console.error('unauthorized');
		return res
			.status(401)
			.send({ message: 'unauthorized', success: false });
	}

	try {
		await verify(token, process.env.SECRET_ACCESS_TOKEN);
	} catch (err) {
		console.error(err);
		return res
			.status(401)
			.send({ message: 'unauthorized', success: false });
	}
	next();
};
