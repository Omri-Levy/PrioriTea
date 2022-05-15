import {FunctionComponent} from "react";
import {
	useUserInfoQuery
} from "../pages/SignIn/hooks/useUserInfoQuery/useUserInfoQuery";
import {Progress} from "@mantine/core";
import {Section} from "../Section/Section";
import {
	useIncrementOnInterval
} from "../../hooks/useIncrementOnInterval/useIncrementOnInterval";
import {SomethingWentWrong} from "../SomethingWentWrong/SomethingWentWrong";
import {IChildren} from "../../interfaces";
import './AuthHandler.css';

/**
 * @description Used as a way of rendering errors, loadings, and calling the useUserInfoQuery prior to the Router component.
 * @param children
 * @constructor
 */
export const AuthHandler: FunctionComponent<IChildren> = ({children}) => {
	// If getting the auth state takes unexpectedly long, we'll show a loading indicator.
	// The rest of the app does not load until the auth state is ready, otherwise the user would get a flash of the wrong layout and routes.
	const {isLoading, isError, error} = useUserInfoQuery();
	const [percent] = useIncrementOnInterval(isLoading);


	if (isLoading) {
		return (
			<Progress
				className="progress-bar"
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

	return <>{children}</>;
}
