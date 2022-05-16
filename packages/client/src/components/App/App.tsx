import { Router } from "../Router/Router";
import { AuthHandler } from "../AuthHandler/AuthHandler";
import { Providers } from "../Providers/Providers";

export const App = () => (
	<Providers>
		<AuthHandler>
			<Router />
		</AuthHandler>
	</Providers>
);
