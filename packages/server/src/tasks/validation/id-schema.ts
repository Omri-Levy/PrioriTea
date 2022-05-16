import {z} from "zod";

export const idSchema = z.object({
	id: z.string().cuid(`id must be a valid CUID`),
});
