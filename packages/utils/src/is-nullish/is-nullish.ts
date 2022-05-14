/**
 * @description Returns a boolean for if the value is null or undefined, with the addition of TypeScript support (is keyword).
 * @param value
 */
export const isNullish = (value: any): value is null | undefined =>
	value === null || value === undefined;
