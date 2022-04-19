import { Response } from 'express';

export const sendAccessToken = function (res: Response, token: string) {
	return res.cookie('mid', token, {
		maxAge: 1000 * 60 * 60 * 9,
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(Date.now() + 1000 * 60 * 60 * 9),
		domain:
			process.env.NODE_ENV === 'production'
				? process.env.DOMAIN
				: undefined,
	});
};
