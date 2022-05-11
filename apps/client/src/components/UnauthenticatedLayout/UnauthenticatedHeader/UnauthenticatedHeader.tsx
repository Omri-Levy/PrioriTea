import {FunctionComponent} from "react";
import {useToggle} from "../../../hooks/useToggle/useToggle";
import {useRoutes} from "../../Router/useRoutes";
import {NavLink} from "../../NavLink/NavLink";
import {
	Burger,
	Container,
	Group,
	Header,
	Paper,
	Text,
	Transition
} from "@mantine/core";
import {HEADER_HEIGHT} from "../../../../constants";
import {Link} from "react-router-dom";
import {ThemeToggle} from "../ThemeToggle/ThemeToggle";
import {invokeIfFunction} from "@prioritea/utils";

export const UnauthenticatedHeader: FunctionComponent = () => {
	const [isOpen, toggleIsOpen] = useToggle();
	const routes = useRoutes(false);
	const links = routes.map(({path, end, text, Icon, onClick}) => {
		if (!text) return null;

		const handleClick = () => {
			invokeIfFunction(onClick);

			toggleIsOpen();
		};

		return (
			<NavLink
				to={path}
				end={end}
				onClick={handleClick}
				key={`${path}-nav-link`}
			>
				{Icon && <Icon className={"navlink__icon"}/>}
				<span>{text}</span>
			</NavLink>
		);
	});

	return (
		<Header height={HEADER_HEIGHT}
				className={"app-shell__header--unauthenticated"}>
			<Container
				className={"app-shell__header__container--unauthenticated"}
				size={"xl"}>
				<Group>
					<Burger
						opened={isOpen}
						onClick={toggleIsOpen}
						size="sm"
						mr="xl"
						className={"app-shell__burger--unauthenticated"}
					/>
					<Text
						component={Link}
						to="/"
						className={"app-shell__logo--unauthenticated"}
					>
						PrioriTea
					</Text>
				</Group>
				<Group>
					<Group spacing={5}
						   className={"app-shell__links--unauthenticated"}>
						{links}
					</Group>

					<Transition
						transition="pop-top-right"
						duration={200}
						mounted={isOpen}
					>
						{(styles) => (
							<Paper
								className={"app-shell__dropdown--unauthenticated"}
								withBorder
								style={styles}
							>
								{links}
							</Paper>
						)}
					</Transition>
					<ThemeToggle/>
				</Group>
			</Container>
		</Header>
	);
}
