import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
	Progress,
} from "@mantine/core";
import {
	useColorScheme,
	useHotkeys,
	useInterval,
	useLocalStorage
} from "@mantine/hooks";
import {QueryClientProvider} from "react-query";
import {Router} from "../Router/Router";
import {queryClient} from "../../lib/query-client";
import {FunctionComponent, useEffect, useState} from "react";
import {NotificationsProvider} from "@mantine/notifications";
import {
	useUserInfoQuery
} from "../pages/SignIn/hooks/useUserInfoQuery/useUserInfoQuery";
import {Section} from "../Section/Section";
import {SomethingWentWrong} from "../pages/Tasks/Tasks";

export const AuthHandler: FunctionComponent<{children: JSX.Element}> = ({children}) => {
	// If getting the auth state takes unexpectedly long, we'll show a loading indicator.
	// The rest of the app does not load until the auth state is ready, otherwise the user would get a flash of the wrong layout and routes.
	const {isLoading, isError, error} = useUserInfoQuery();
	const [percent, setPercent] = useState(0);
	const interval = useInterval(() =>
			setPercent((percent) => ++percent),
		1000);


	useEffect(() => {

		isLoading ? interval.start() : interval.stop();

		return interval.stop;
	}, [isLoading]);

	if (isLoading) {
		return     (
			<Progress
				sx={{
					borderRadius: 0,
				}}
				size="xl"
				value={percent}
			/>
		);
	}

	// @ts-ignore
	if (isError && error.response.status !== 401) {
		return (
			<Section title={''}>
				<SomethingWentWrong/>
			</Section>
		);
	}

	return children;
}

export const App = () => {
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
			  <AuthHandler>
              	<Router />
			  </AuthHandler>
		  </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
	  </QueryClientProvider>
  );
};
