import { Response } from "express";
import { IUser } from "../../interfaces";

export const getUser = function (res: Response): IUser | undefined {
	return res.locals.user;
};
