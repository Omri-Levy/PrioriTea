import {isNullish} from "../is-nullish/is-nullish";

export const noNullish = <TData extends Array<unknown>, >(
	parts: TemplateStringsArray,
	...exps: TData
	// TypeScript can't infer the return value.
): string =>
	// TemplateStringsArray can not be reduced.
	Array.from(parts)
		// slice(1) since the reduce's initial value is parts[0].
		.slice(1)
		// Concatenate the parts and the expressions, while dropping null and undefined expressions.
		.reduce((str, char, i) => {

			// drops ${null} and ${undefined}
			if (!isNullish(exps[i])) {
				// @ts-ignore
				str += exps[i];
			}

			// Add non-expressions regardless of value.
			str += char;

			return str;

			// parts[1] is unneeded for this purpose.
			// ?? `` since TypeScript insists the return value is any
			// for the function and string | undefined for str.
		}, parts[0] ?? ``);
