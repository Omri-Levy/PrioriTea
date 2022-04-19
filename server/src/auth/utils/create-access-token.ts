import { sign } from 'jsonwebtoken';
import { User } from '../../utils';

export const createAccessToken = (user: User) => {
	return sign(
		{
			id: user.id,
			email: user.email,
			fullName: user.fullName,
		},
		process.env.SECRET_ACCESS_TOKEN!,
		{ expiresIn: '9h' },
	);
};
