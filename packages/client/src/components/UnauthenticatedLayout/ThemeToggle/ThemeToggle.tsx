import { FunctionComponent } from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";
import "./ThemeToggle.css";

export const ThemeToggle: FunctionComponent = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const size = 18;

	return (
		<ActionIcon
			onClick={() => toggleColorScheme()}
			size="lg"
			className={"app-shell__theme-toggle--unauthenticated"}
		>
			{colorScheme === "dark" ? (
				<Sun size={size} />
			) : (
				<MoonStars size={size} />
			)}
		</ActionIcon>
	);
};
