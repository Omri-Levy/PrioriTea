import {Request, Response} from "express";
import {User} from "@prisma/client";

export interface IUsersController {
    getUsers(req: Request, res: Response): void;

    getUser(req: Request, res: Response): void;

    updateUser(req: Request, res: Response): void;

    deleteUser(req: Request, res: Response): void;
}

export interface IUsersService {
    getUsers(): Promise<Array<User>>;

    getUser(id: string): Promise<User | null>;

    updateUser(
        id: string,
        email?: string,
        name?: string,
        password?: string
    ): Promise<Array<User> | null>;

    deleteUser(id: string): Promise<Array<User> | null>;
}
