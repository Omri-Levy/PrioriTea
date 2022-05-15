import { Response } from "express";
import {UserDto} from "@prioritea/types";

export const getUser = function (res: Response): UserDto | undefined {
	return res.locals.user;
};
