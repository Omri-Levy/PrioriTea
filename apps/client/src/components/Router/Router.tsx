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

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={"/"}
					element={
						isAuth ? <AuthenticatedLayout /> : <UnauthenticatedLayout />
					}
				>
					{routes.map(({ path, element, text }) =>
						<Route
							index={path === "/"}
							key={`${path}-route`}
							path={path}
							element={
								text ?
									<Section title={text}>{element}</Section>
									: element
							}
						/>
					)}
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
