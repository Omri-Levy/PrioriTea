import {FunctionComponent} from "react";
import {QueryClientProvider} from "react-query";
import {ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import {
	useHandleColorScheme
} from "./hooks/useHandleColorScheme/useHandleColorScheme";
import {IChildren} from "../../interfaces";
import {queryClient} from "../../lib/query-client";

export const Providers: FunctionComponent<IChildren> = (props) => {
	const {children} = props;
	const [colorScheme, toggleColorScheme] = useHandleColorScheme();

	return (
		<QueryClientProvider client={queryClient}>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					theme={{
						colorScheme,
						colors: {
							// Tailwind orange
							"tw-orange": [
								"#FFF7ED",
								"#FFEDD5",
								"#FED7AA",
								"#FDBA74",
								"#FB923C",
								"#F97316",
								"#EA580C",
								"#C2410C",
								"#9A3412",
								"#7c2d12",
							],
						},
						primaryColor: "tw-orange",
					}}
					withGlobalStyles
					withNormalizeCSS
					withCSSVariables
				>
					<NotificationsProvider position={"top-center"}>
						{children}
					</NotificationsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</QueryClientProvider>
	);
};
