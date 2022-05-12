import {FunctionComponent} from "react";
import {Burger, Header} from "@mantine/core";
import {AuthenticatedHeaderProps} from "./interfaces";
import {HEADER_HEIGHT} from "../../../../constants";
import './AuthenticatedHeader.css';

export const AuthenticatedHeader: FunctionComponent<AuthenticatedHeaderProps> = (props) => {
	const {isOpen, toggleIsOpen} = props;
	const offset = 10;

	return (
		<Header height={HEADER_HEIGHT - offset}
				className={"authenticated-header__header"}>
			<Burger
				opened={isOpen}
				onClick={toggleIsOpen}
				size="md"
				className={"authenticated-header__burger"}
				ml="auto"
			/>
		</Header>
	);
}
