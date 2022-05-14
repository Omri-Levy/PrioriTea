import {RequestHandler} from "express";
import {User} from "@prisma/client";

export interface IAuthController {
    signUp: RequestHandler;
    signIn: RequestHandler;
    signOut: RequestHandler;
    userInfo: RequestHandler;
}

export interface IAuthService {
    signUp(email: string, name: string, password: string): Promise<User | null>;

    signIn(email: string, name: string): Promise<User | null>;
}
