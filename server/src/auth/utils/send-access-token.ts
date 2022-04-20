import { Response } from 'express';
import { DOMAIN, isDev } from '../../';

export const sendAccessToken = function (res: Response, token: string) {
	const isProd = !isDev();

	return res.cookie('mid', token, {
		maxAge: 1000 * 60 * 60 * 9,
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		secure: isProd,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 9),
		domain: isProd ? DOMAIN : undefined,
	});
};
