/**
 * @description Maps n times using the passed in callback, passes a one-based number as the first argument, and a zero-based index as the second argument.
 * @param n
 * @param strategy
 */
import {arrayOfN} from "../array-of-n/array-of-n";

export const mapRange = <TItem>(n: number, strategy: (n: number, i: number) => TItem) => arrayOfN(n).map(strategy);
