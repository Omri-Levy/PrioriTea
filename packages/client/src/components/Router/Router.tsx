import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthenticatedLayout} from "../AuthenticatedLayout/AuthenticatedLayout";
import {Section} from "../Section/Section";
import {
	UnauthenticatedLayout
} from "../UnauthenticatedLayout/UnauthenticatedLayout";
import {useRoutes} from "./useRoutes";
import {useIsAuth} from "../pages/SignIn/hooks/useIsAuth/useIsAuth";


export const Router = () => {
	const isAuth = useIsAuth();
	const routes = useRoutes(isAuth);
	const routesEls = routes.map(({
									  path, element, text
								  }) =>
		<Route
			index={path === "/"}
			key={`${path}-route`}
			path={path}
			element={
				// Can assume a route with no text does not require a nav link and a page wrapper
				text ?
					<Section title={text}>{element}</Section>
					: element
			}
		/>
	);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={"/"}
					element={
						isAuth ? <AuthenticatedLayout/> :
							<UnauthenticatedLayout/>
					}
				>
					{routesEls}
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
