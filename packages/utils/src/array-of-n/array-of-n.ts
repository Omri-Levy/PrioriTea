/**
 * @description Returns an array of n numbers.
 * @param n
 */
export const arrayOfN = (n: number) =>
	Array.from({length: n}, (_, i) => i + 1);
