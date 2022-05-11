import {FunctionComponent} from "react";
import {Burger, Header} from "@mantine/core";
import {AuthenticatedHeaderProps} from "./interfaces";

export const AuthenticatedHeader: FunctionComponent<AuthenticatedHeaderProps> = (props) => {
	const {isOpen, toggleIsOpen} = props;

	return (
		<Header height={50} className={"app-shell__header"}>
			<Burger
				opened={isOpen}
				onClick={toggleIsOpen}
				size="md"
				className={"app-shell__burger"}
				mr="xl"
				ml="auto"
			/>
		</Header>
	);
}
