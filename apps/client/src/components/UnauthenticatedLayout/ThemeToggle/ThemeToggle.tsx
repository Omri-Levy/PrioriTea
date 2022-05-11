import {FunctionComponent} from "react";
import {ActionIcon, useMantineColorScheme} from "@mantine/core";
import {MoonStars, Sun} from "tabler-icons-react";

export const ThemeToggle: FunctionComponent = () => {
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();

	return (
		<ActionIcon
			onClick={() => toggleColorScheme()}
			size="lg"
			className={"app-shell__color-scheme-toggle--unauthenticated"}
			sx={(theme) => ({
				// @ts-ignore
				color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7]
			})}
		>
			{colorScheme === "dark" ? (
				<Sun size={18}/>
			) : (
				<MoonStars size={18}/>
			)}
		</ActionIcon>
	);
}
