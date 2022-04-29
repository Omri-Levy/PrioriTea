import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../../context/AuthContext/AuthContext";
import { LoadingProvider } from "../../context/LoadingContext/LoadingContext";
import { Router } from "../Router/Router";

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

  const queryClient = new QueryClient();

  return (
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
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LoadingProvider>
              <Router />
            </LoadingProvider>
          </AuthProvider>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
