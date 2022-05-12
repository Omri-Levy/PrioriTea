import {useColorScheme, useHotkeys, useLocalStorage} from "@mantine/hooks";
import {ColorScheme} from "@mantine/core";
import {useCallback, useEffect} from "react";

// Typescript inference fails without specifying the return type.
export const useHandleColorScheme = (): [ColorScheme, (value?: ColorScheme) => void] => {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = useCallback((value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark")), [colorScheme, setColorScheme]);

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	// Makes the color scheme available in CSS.
	useEffect(() => {
		document.documentElement.setAttribute("data-color-scheme", colorScheme);
	}, [colorScheme]);


	return [colorScheme, toggleColorScheme];
}
