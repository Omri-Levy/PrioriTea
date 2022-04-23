import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../auth/utils/jwt-utils";

export const auth = async function (req: Request, res: Response, next: NextFunction) {
	const token = JwtUtils.getToken(req);
	const user = await JwtUtils.verify(token);

	res.locals.user = user;

	return next();
};
