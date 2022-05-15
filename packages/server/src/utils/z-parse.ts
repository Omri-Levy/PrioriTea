import { Request } from 'express';
import { AnyZodObject, z, ZodError } from "zod";
import { RequestValidationError } from "../errors/request-validation-error";

export const zParse = async <T extends AnyZodObject>(
	schema: T,
	req: Request
): Promise<z.infer<T>> => {
	try {
		return await schema.parseAsync(req);
	} catch (err) {
		if (err instanceof ZodError) {
			throw new RequestValidationError(err);
		}

		throw err;
	}
}
