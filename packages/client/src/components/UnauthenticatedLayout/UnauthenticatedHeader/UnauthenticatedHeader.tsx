import {FunctionComponent} from "react";
import {
	Burger,
	Container,
	Group,
	Header,
	Paper,
	Text,
	Transition,
} from "@mantine/core";
import {Link} from "react-router-dom";
import {invokeIfFunction} from "@prioritea/utils";
import {ThemeToggle} from "../ThemeToggle/ThemeToggle";
import {useToggle} from "../../../hooks/useToggle/useToggle";
import {HEADER_HEIGHT} from "../../../constants";
import {useRoutes} from "../../Router/useRoutes";
import {NavLink} from "../../NavLink/NavLink";
import "./UnauthenticatedHeader.css";

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
				{Icon && (
					<Icon
						className={
							"app-shell__header__navlink__icon--unauthenticated"
						}
					/>
				)}
				<span>{text}</span>
			</NavLink>
		);
	});

	return (
		<Header height={HEADER_HEIGHT} className={"header"}>
			<Container
				className={"app-shell__header__container--unauthenticated"}
				size={"xl"}
			>
				<Group>
					<Burger
						opened={isOpen}
						onClick={toggleIsOpen}
						size="sm"
						mr="xl"
						className={"app-shell__header__burger--unauthenticated"}
					/>
					<Text
						component={Link}
						to="/sign-in"
						className={"app-shell__header__logo--unauthenticated"}
					>
						PrioriTea
					</Text>
				</Group>
				<Group>
					<Group
						spacing={5}
						className={"app-shell__header__links--unauthenticated"}
					>
						{links}
					</Group>

					<Transition
						transition="pop-top-right"
						duration={200}
						mounted={isOpen}
					>
						{(styles) => (
							<Paper
								className={
									"app-shell__header__dropdown--unauthenticated"
								}
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
};
