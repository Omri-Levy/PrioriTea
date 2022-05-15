import {Router} from "../Router/Router";
import {AuthHandler} from "../AuthHandler/AuthHandler";
import {Providers} from "../Providers/Providers";

export const App = () => {
	return (
		<Providers>
			<AuthHandler>
				<Router />
			</AuthHandler>
		</Providers>
	);
};
