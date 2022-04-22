import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { Request, RequestHandler, Response } from "express";
import { autoInjectable } from "tsyringe";
import { Method } from "../enums";
import { BASE_URL } from "../env";
import { restful } from "../middleware/restful";
import { CreatedResponse } from "../responses/created-response";
import { OkResponse } from "../responses/ok-response";
import { getUser } from "../utils/get-user";
import { JwtUtils } from "../utils/jwt-utils";
import { zParse } from "../utils/z-parse";
import { AuthService } from "./auth-service";
import { emailAlreadyInUse } from "./email-already-in-use";
import { signInSchema } from "./validation/sign-in-schema";
import { signUpSchema } from "./validation/sign-up-schema";

interface IAuthController {
	signUp: RequestHandler;
	signIn: RequestHandler;
	signOut: RequestHandler;
	getUserInfo: RequestHandler;
}

@ClassMiddleware(restful([Method.GET, Method.POST]))
@Controller(`${BASE_URL}/auth`)
@autoInjectable()
export class AuthController implements IAuthController {
	constructor(public service: AuthService) {}

	/**
	 * @path /api/user/sign-up
	 * @request post
	 * @desc add a new user to db
	 */
	@Post(`sign-up`)
	async signUp(req: Request, res: Response) {
		const { email, fullName, password } = await zParse(signUpSchema as any, req.body);
		try {
		const user = await this.service.signUp(email, fullName, password);

		return new CreatedResponse(res, { data: { user } });

		
		} catch(err) {
			emailAlreadyInUse(err);

			throw err;
		}
	}

	/**
	 * @path /api/user/sign-in
	 * @request post
	 * @desc sign in an existing user from db
	 */
	@Post(`sign-in`)
	async signIn(req: Request, res: Response) {
		const { email, password } = await zParse(signInSchema, req);

		const user = await this.service.signIn(email, password);

		JwtUtils.createAccessTokenCookie(res, user);

		return new OkResponse(res);
	}

	/**
	 * @path /api/user/sign-out
	 * @request post
	 * @desc sign out an existing user from db
	 */
	@Post(`sign-out`)
	async signOut(_req: Request, res: Response) {
		JwtUtils.deleteAccessTokenCookie(res);

		return new OkResponse(res);
	}

	@Get(`current-user`)
	async getUserInfo(_req: Request, res: Response) {
		const user = getUser(res);

		return new OkResponse(res, {
			data: {
				user: user
					? {
							email: user.email,
							fullName: user.fullName,
					  }
					: null,
			},
		});
	}
}
