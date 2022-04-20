import { Response, Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import {
	DOMAIN,
	isDev,
	JwtPayload,
	SECRET_ACCESS_TOKEN,
	UnauthorizedError,
	User,
} from '../';
import { Expiration } from './Expiration';

export class JwtUtils {
	private static _instance: JwtUtils;

	private constructor() {}

	static get instance() {
		if (!JwtUtils._instance) {
			this._instance = new JwtUtils();
		}

		return this._instance;
	}

	static getToken(req: Request) {
		const cookie = req.headers['cookie'];

		if (!cookie) {
			throw new UnauthorizedError();
		}

		const [, token] = cookie.split('mid=');

		return token;
	}

	static createAccessTokenCookie(res: Response, toTokenize: User | string) {
		const isProd = !isDev();
		// Allows passing an empty string instead of a user when unauthenticated.
		const token =
			typeof toTokenize === 'string'
				? toTokenize
				: JwtUtils.createAccessToken(toTokenize);

		return res.cookie('mid', token, {
			maxAge: 1000 * 60 * 60 * 9,
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			secure: isProd,
			expires: Expiration.inHours(9),
			domain: isProd ? DOMAIN : undefined,
		});
	}

	static createAccessToken(user: User) {
		return sign(
			{
				exp: Expiration.inHours(9).getTime(),
				data: {
					id: user.id,
					email: user.email,
					fullName: user.fullName,
				},
			},
			SECRET_ACCESS_TOKEN,
		);
	}

	static deleteAccessTokenCookie(res: Response) {
		this.createAccessTokenCookie(res, '');
	}

	static isExpired(exp: number) {
		return Date.now() >= exp * 1000;
	}

	static async verify(token: string | undefined) {
		if (!token) {
			throw new UnauthorizedError();
		}

		try {
			const { exp, data } = (await verify(
				token,
				SECRET_ACCESS_TOKEN,
			)) as JwtPayload;

			if (this.isExpired(exp)) {
				throw new UnauthorizedError();
			}

			return data;
		} catch (err) {
			throw err;
		}
	}
}
