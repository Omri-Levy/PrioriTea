import { Request, RequestHandler, Response } from "express";
import { Controller, IRoute } from "../core/controller";
import { Method } from "@prioritea/types";
import { auth } from "../middleware/auth";
import { restful } from "../middleware/restful";
import { CreatedResponse } from "../responses/created-response";
import { OkResponse } from "../responses/ok-response";
import { Middleware } from "../types";
import { zParse } from "../utils/z-parse";
import { AuthService } from "./auth.service";
import { emailAlreadyInUse } from "./utils/email-already-in-use";
import { getUser } from "./utils/get-user";
import { JwtUtils } from "./utils/jwt-utils";
import { signUpSchema, signInSchema } from "@prioritea/validation";

interface IAuthController {
	signUp: RequestHandler;
	signIn: RequestHandler;
	signOut: RequestHandler;
	userInfo: RequestHandler;
}

export class AuthController
	extends Controller<AuthService>
	implements IAuthController
{
	_service = new AuthService();
	prefix = "/auth";
	routes: Array<IRoute> = [
		{
			method: Method.POST,
			path: "/sign-up",
			handler: this.signUp.bind(this),
		},
		{
			method: Method.POST,
			path: "/sign-in",
			handler: this.signIn.bind(this),
		},
		{
			method: Method.POST,
			path: "/sign-out",
			handler: this.signOut.bind(this),
			middleware: [auth],
		},
		{
			method: Method.GET,
			path: "/user-info",
			handler: this.userInfo.bind(this),
			middleware: [auth],
		},
	];
	middleware?: Array<Middleware> = [restful([Method.GET, Method.POST])];

	constructor() {
		super();

		this.registerRoutes();
	}

	/**
	 * @path /api/user/sign-up
	 * @request post
	 * @desc add a new user to db
	 */
	async signUp(req: Request, res: Response) {
		const { email, name, password } = await zParse(
			signUpSchema as any,
			req.body
		);
		try {
			const user = await this.service.signUp(email, name, password);

			return new CreatedResponse(res, { data: { user } });
		} catch (err) {
			emailAlreadyInUse(err);

			throw err;
		}
	}

	/**
	 * @path /api/user/sign-in
	 * @request post
	 * @desc sign in an existing user from db
	 */
	async signIn(req: Request, res: Response) {
		const { email, password } = await zParse(signInSchema, req.body);

		const user = await this.service.signIn(email, password);

		JwtUtils.createAccessTokenCookie(res, user);

		return new OkResponse(res);
	}

	/**
	 * @path /api/user/sign-out
	 * @request post
	 * @desc sign out an existing user from db
	 */
	async signOut(_req: Request, res: Response) {
		JwtUtils.deleteAccessTokenCookie(res);

		return new OkResponse(res);
	}

	async userInfo(_req: Request, res: Response) {
		const user = getUser(res);

		return new OkResponse(res, {
			data: {
				user: user
					? {
							email: user.email,
							name: user.name,
					  }
					: null,
			},
		});
	}
}
