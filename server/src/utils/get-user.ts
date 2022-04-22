import { Response } from "express";
import { User } from "../interfaces";

export const getUser = function (res: Response): User | undefined {
	return res.locals.user;
};
