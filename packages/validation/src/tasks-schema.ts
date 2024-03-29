import z from 'zod';

// FIXME: importing @prioritea/types or @prioritea/validation into client breaks CRA
enum Status {
	IDLE = 'IDLE',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
}

enum Priority {
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	MIN = Priority.ONE,
	MAX = Priority.FIVE,
}

export const toKebabCase = (str: string) =>
	str
		// camel to kebab
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		// snake to kebab
		.replace(/_/g, '-')
		// spaces to kebab
		.replace(/\s/g, '-')
;
export const formatTaskStatus = (status: string) => toCapitalized(toKebabCase(status)?.toLowerCase())


export const toCapitalized = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);

const toScreamingSnakeCase = (str: string) =>
	str
		// camel to snake
		?.replace(/([a-z])([A-Z])/g, '$1_$2')
		// kebab to snake
		?.replace(/-/g, '_')
		// spaces to snake
		?.replace(/\s/g, '_')
		?.toUpperCase();

export const taskSchema = z.object({
	id: z.string().cuid(`id must be a valid CUID`),
	priority: z.number({
		errorMap() {
			return {message: `Priority must be a round number`}
		}
	}).min(Priority.MIN, `Priority must be greater than or equal to ${Priority.MIN}`).max(Priority.MAX, `Priority must be less than or equal to ${Priority.MAX}`),
	description: z.string().min(1, `Description must contain at least 1 character(s)`).max(500, `Description must contain at most 500 character(s)`),
	status: z
		.nativeEnum(Status, {
			errorMap() {
				// Convert the SCREAMING_SNAKE_CASE enum to human-readable
				const values = Object.values(Status)
					.map((status, i, arr) => {
						// Enums are separated by underscores, turns
						// In_progress to In-progress.
						const str = formatTaskStatus(status);

						// Prepends 'or' to the last item in the enum
						return i === arr.length - 1 ? `or ${str}` :
							str;
					}).join(', ');

				// Status must be Idle, In-progress, or Completed
				return {message: `Status must be ${values}`};
			}
		})
		.transform((value) =>
			toScreamingSnakeCase(value) as Status)
		.optional(),
	userId: z.string().cuid(`id must be a valid CUID`),
	createdAt: z.date(),
	updatedAt: z.date(),
});
