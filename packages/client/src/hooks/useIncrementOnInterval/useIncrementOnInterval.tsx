import {useEffect, useState} from "react";
import {useInterval} from "@mantine/hooks";

/**
 * @description Steps a number by one step every interval, starting from the start argument when the passed in boolean is true, and stops the interval when false.
 * @return {[number, (count: number) => void]} The number and a function to set the number.
 * @param condition {boolean} Whether to start the interval.
 * @param {number} [start = 0] The number to start from.
 * @param {number} [step = 1] The number to step by.
 * @param {number} [intervalInMs = 1000] The interval in milliseconds in which to step the number.
 * @param {boolean} [increment = true] Whether to increment or decrement the number.
 */
export const useIncrementOnInterval = (condition: boolean, start = 0, step = 1, intervalInMs = 1000, increment = true): [number, (count: number) => void] => {
	const [count, setCount] = useState(start);
	const interval = useInterval(() =>
			setCount((count) => increment ? count + step : count - step),
		intervalInMs);


	useEffect(() => {

		condition ? interval.start() : interval.stop();

		return interval.stop;
	}, [condition]);

	return [count, setCount];
}
