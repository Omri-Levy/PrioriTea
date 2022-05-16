import {BaseArray, GenericFn} from "@prioritea/types";

/**
 * @description Invokes a passed in callback if it is an instance of Function, passing in the second argument. Covers cases where a callback is optional.
 * @param cb {any} - The callback to invoke.
 * @param args {TArgs} - The arguments to pass to the callback, can be either an array or n passed arguments *starting from the second argument.
 * @return {TReturns} - Returns the callback's return value or undefined if the callback is not a function.
 * @template TArgs, TReturns
 */
export const invokeIfFunction =
	<TArgs extends BaseArray, TReturns>(cb: GenericFn<TArgs, TReturns> | undefined, ...args: TArgs) =>
		cb instanceof Function ? cb(...args) : undefined;
