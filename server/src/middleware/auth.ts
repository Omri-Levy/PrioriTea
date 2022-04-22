import { RequestHandler } from "express";
import { JwtUtils } from "..";

export const auth: RequestHandler = async function (req, res, next) {
	const token = JwtUtils.getToken(req);
	const user = await JwtUtils.verify(token);

	res.locals.user = user;

	return next();
};
