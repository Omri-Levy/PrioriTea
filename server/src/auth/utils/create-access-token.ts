import { sign } from 'jsonwebtoken';
import { SECRET_ACCESS_TOKEN, User } from '../../';

export const createAccessToken = (user: User) => {
	return sign(
		{
			id: user.id,
			email: user.email,
			fullName: user.fullName,
		},
		SECRET_ACCESS_TOKEN,
		{ expiresIn: '9h' },
	);
};
