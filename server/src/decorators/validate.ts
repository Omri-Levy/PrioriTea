// import { AnyZodObject /* ZodError */, ZodError } from 'zod';
// import { RequestValidationError } from '..';

// export const Validate = function <TSchema extends AnyZodObject>(
// 	schema: TSchema,
// ): Promise<MethodDecorator> {
// 	return function <TFunction extends Function>(
// 		_target: TFunction,
// 		_methodKey: string | symbol,
// 		descriptor: PropertyDescriptor,
// 	) {
// 		const ogMethod = descriptor.value;

// 		descriptor.value = async function (...args: any[]) {
// 			try {
// 				const [req, _res] = args;
// 				await schema.parseAsync(req.body);

// 				return ogMethod.apply(this, args);
// 			} catch (err) {
// 				if (err instanceof ZodError) {
// 					throw new RequestValidationError(err);
// 				}

// 				throw err;
// 			}
// 		};
// 	} as any;
// } as any;

export const Validate = () => {};
