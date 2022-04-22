import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { BadRequestError } from "../errors/bad-request-error";


export const emailAlreadyInUse = function (err: unknown) {
	if (err instanceof PrismaClientKnownRequestError &&
		err.code === 'P2002' &&
		(err.meta as { target: Array<string>; })?.target.includes('email')) {
		throw new BadRequestError('Email already in use');
	}
};
