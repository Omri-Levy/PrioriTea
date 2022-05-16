import { BaseArray } from "@prioritea/types";
import { useEffect } from "react";

/**
 * @description console.log useEffect with the passed values passed to the dependency array. Accepts any number of arguments, or alternatively an array of values.
 * @param values
 */
export const useConsole = (...values: BaseArray) => {
	useEffect(() => {
		console.log(...values);
	}, [values]);
};
