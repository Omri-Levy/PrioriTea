import z from 'zod';

export const taskSchema = z.object({
	id: z.string().cuid(),
	priority: z.number().min(1, `Priority must be greater than or equal to 1`).max(5, `Priority must be less than or equal to 5`),
	description: z.string().min(1).max(80),
	status: z.string().min(1).max(80).optional(),
	userId: z.string().cuid(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
