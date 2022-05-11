// Not to confuse with argon2 verify
import { Request, Response } from "express";
import { sign, verify as verifyJwt } from "jsonwebtoken";
import { VITE_DOMAIN, VITE_SECRET_ACCESS_TOKEN } from "../../env/env";
import { isDev } from "../../env/is-dev";
import { UnauthorizedError } from "../../errors/unauthorized-error";
import { IJwtPayload } from "../../interfaces";
import { Expiration } from "../../utils/expiration";
import {UserDto} from "@prioritea/types";

export class JwtUtils {
	// eslint-disable-next-line no-use-before-define
	private static _instance: JwtUtils;

	private constructor() {}

	static get instance() {
		if (!JwtUtils._instance) {
			this._instance = new JwtUtils();
		}

		return this._instance;
	}

	static getToken(req: Request) {
		const { cookie } = req.headers;

		if (!cookie) {
			throw new UnauthorizedError();
		}

		const [, token] = cookie.split(`mid=`);

		return token;
	}

	static createAccessTokenCookie(res: Response, toTokenize: UserDto | string) {
		const isProd = !isDev();
		// Allows passing an empty string instead of a user when unauthenticated.
		const token =
			typeof toTokenize === `string`
				? toTokenize
				: JwtUtils.createAccessToken(toTokenize);

		return res.cookie(`mid`, token, {
			maxAge: 1000 * 60 * 60 * 9,
			httpOnly: true,
			sameSite: `lax`,
			path: `/`,
			secure: isProd,
			expires: Expiration.inHours(9),
			domain: isProd ? VITE_DOMAIN : undefined,
		});
	}

	static createAccessToken(user: UserDto) {
		return sign(
			{
				exp: Expiration.inHours(9).getTime(),
				data: {
					id: user.id,
					email: user.email,
					name: user.name,
				},
			},
			VITE_SECRET_ACCESS_TOKEN!
		);
	}

	static deleteAccessTokenCookie(res: Response) {
		this.createAccessTokenCookie(res, ``);
	}

	static isExpired(exp: number) {
		return Date.now() >= exp * 1000;
	}

	static async verify(token: string | undefined) {
		if (!token) {
			throw new UnauthorizedError();
		}

		const { exp, data } = verifyJwt(
			token,
			VITE_SECRET_ACCESS_TOKEN!
		) as IJwtPayload;

		if (this.isExpired(exp)) {
			throw new UnauthorizedError();
		}

		return data;
	}
}
