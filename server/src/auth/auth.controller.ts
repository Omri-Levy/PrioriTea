import { ClassMiddleware, Controller, Post, Get } from "@overnightjs/core";
import { RequestHandler, Request, Response } from "express";
import { Method } from "../enums";
import { BASE_URL } from "../env";
import { restful } from "../middleware/restful";
import { CreatedResponse } from "../responses/created-response";
import { OkResponse } from "../responses/ok-response";
import { getUser } from "../utils/get-user";
import { JwtUtils } from "../utils/jwt-utils";
import { AuthService } from "./auth.service";

interface IAuthController {
  signUp: RequestHandler;
  signIn: RequestHandler;
  signOut: RequestHandler;
  getUserInfo: RequestHandler;
}

@ClassMiddleware(restful([Method.GET, Method.POST]))
@Controller(`${BASE_URL}/auth`)
export class AuthController implements IAuthController {
  constructor(private service: AuthService) {}

  /**
   * @path /api/user/sign-up
   * @request post
   * @desc add a new user to db
   */
  @Post(`sign-up`)
  async signUp(req: Request, res: Response) {
    const { email, fullName, password } = req.body;
    const user = await this.service.signUp(email, fullName, password);

    return new CreatedResponse(res, { data: { user } });

    // emailAlreadyInUse(err);
  }

  /**
   * @path /api/user/sign-in
   * @request post
   * @desc sign in an existing user from db
   */
  @Post(`sign-in`)
  async signIn(req: Request, res: Response) {
    // signInSchema.parse({
    // 	email: req.body.email,
    // 	password: req.body.password,
    // });

    const { email, password } = req.body;
    const user = await this.service.signIn(email, password);

    JwtUtils.createAccessTokenCookie(res, user);

    return new OkResponse(res);
    // if (err instanceof z.ZodError) {
    // 	throw new RequestValidationError(err);
    // }
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
