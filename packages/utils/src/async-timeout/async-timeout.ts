import {AsyncTimeout} from "./types";

export const asyncTimeout: AsyncTimeout = async (ms = 0, payload?: any) =>
	new Promise((resolve) => setTimeout(() => resolve(payload)
		, ms)
	);
