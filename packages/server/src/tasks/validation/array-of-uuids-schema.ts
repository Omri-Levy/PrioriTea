import {z} from "zod";

export const arrayOfUuidsSchema = z.object({
	ids: z
		.string()
		.cuid(`ids must contain valid CUIDs.`)
		.array()
		.min(1, `ids must contain at least 1 CUID(s)`),
})
