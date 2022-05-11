import {useColorScheme, useHotkeys, useLocalStorage} from "@mantine/hooks";
import {ColorScheme} from "@mantine/core";
import {useEffect} from "react";

// Typescript inference fails without specifying the return type.
export const useHandleColorScheme = (): [ColorScheme, (value?: ColorScheme) => void] => {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	useEffect(() => {
		document.documentElement.setAttribute("data-color-scheme", colorScheme);
	}, [colorScheme]);

	return [colorScheme, toggleColorScheme];
}
