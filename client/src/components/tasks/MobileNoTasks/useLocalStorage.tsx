import { useCallback, useEffect, useState } from "react";


export const useLocalStorage = function (initialValue: any, key: string) {
	const setLocalStorage = useCallback(
		function (value: any) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[key]
	);
	const getLocalStorage = useCallback(
		function () {
			const cachedValue = localStorage.getItem(key);

			return cachedValue ? JSON.parse(cachedValue) : cachedValue;
		},
		[key]
	);
	const [value, setValue] = useState(function () {
		return getLocalStorage() ?? initialValue;
	});

	useEffect(
		function () {
			setLocalStorage(value);
		},
		[value, setLocalStorage]
	);

	return [value, setValue];
};
