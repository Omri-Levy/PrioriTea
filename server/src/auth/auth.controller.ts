import { NextFunction, Request, RequestHandler, Response } from 'express';
import {
	All,
	Controller,
	Get,
	InjectService,
	Method,
	Post,
	restful,
} from '../';
import { AuthService } from './';

interface IAuthController {
	signUp: RequestHandler;
	signIn: RequestHandler;
	signOut: RequestHandler;
	getUserInfo: RequestHandler;
	methodNotAllowed: RequestHandler;
}

@Controller('/auth')
@InjectService()
export class AuthController implements IAuthController {
	constructor(private service: AuthService) {}

	/**
	 * @path /api/user/sign-up
	 * @request post
	 * @desc add a new user to db
	 */
	@Post('/sign-up')
	async signUp(req: Request, res: Response) {
		return this.service.signUp(req, res);
	}

	/**
	 * @path /api/user/sign-in
	 * @request post
	 * @desc sign in an existing user from db
	 */
	@Post('/sign-in')
	async signIn(req: Request, res: Response) {
		return this.service.signIn(req, res);
	}

	/**
	 * @path /api/user/sign-out
	 * @request post
	 * @desc sign out an existing user from db
	 */
	@Post('/sign-out')
	async signOut(req: Request, res: Response) {
		return this.service.signOut(req, res);
	}

	@Get('/current-user')
	async getUserInfo(req: Request, res: Response) {
		return this.service.getUserInfo(req, res);
	}

	@All('*')
	methodNotAllowed(req: Request, res: Response, next: NextFunction) {
		return restful([Method.GET, Method.POST])(req, res, next);
	}
}
