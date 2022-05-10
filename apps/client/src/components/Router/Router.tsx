import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthenticatedLayout} from "../AuthenticatedLayout/AuthenticatedLayout";
import {Section} from "../Section/Section";
import {
	UnauthenticatedLayout
} from "../UnauthenticatedLayout/UnauthenticatedLayout";
import {useRoutes} from "./useRoutes";
import {
	useUserInfoQuery
} from "../pages/SignIn/hooks/useUserInfoQuery/useUserInfoQuery";
import {Progress} from "@mantine/core";
import {useEffect, useState} from "react";
import {useInterval} from "@mantine/hooks";
import {SomethingWentWrong} from "../pages/Tasks/Tasks";

export const Router = () => {
	const {data: isAuth, isLoading, isError} = useUserInfoQuery();
	const routes = useRoutes();
	const [percent, setPercent] = useState(0);
	const interval = useInterval(() =>
			setPercent((percent) => ++percent),
		1000);


	useEffect(() => {

		(isLoading && !interval.active)
			? interval.start() : interval.stop();

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

	if (isError) {
		return (
			<Section title={''}>
				<SomethingWentWrong/>
			</Section>
		);
	}


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
