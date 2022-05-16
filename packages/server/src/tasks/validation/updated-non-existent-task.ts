import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {NotFoundError} from "../../errors/not-found-error";

export const updatedNonExistentTask = function (err: unknown) {
	if (
		err instanceof PrismaClientKnownRequestError &&
		err.code === "P2025" &&
		err.meta?.cause === "Record to update not found."
	) {
		throw new NotFoundError("No task matches the provided id.");
	}
};
