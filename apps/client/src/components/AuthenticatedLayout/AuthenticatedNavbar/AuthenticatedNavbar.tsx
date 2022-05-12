import {FunctionComponent, MouseEventHandler, useCallback} from "react";
import {
	useSignOutMutation
} from "../hooks/useSignOutMutation/useSignOutMutation";
import {useRoutes} from "../../Router/useRoutes";
import {NavLink} from "../../NavLink/NavLink";
import {Divider, Navbar, Text} from "@mantine/core";
import {Link} from "react-router-dom";
import {Logout} from "tabler-icons-react";
import {AuthenticatedNavbarProps} from "./interfaces";
import './AuthenticatedNavbar.css';

export const AuthenticatedNavbar: FunctionComponent<AuthenticatedNavbarProps> = (props) => {
	const {isOpen, toggleOffIsOpen} = props;
	const {mutateAsync} = useSignOutMutation();
	const onSignOut: MouseEventHandler<HTMLAnchorElement> = useCallback(async (e) => {
			e.preventDefault();

			return mutateAsync();
		},
		[mutateAsync],
	);
	const routes = useRoutes(true);
	const links = routes.map(({path, end, text, Icon, onClick}) => {
		if (!text) return null;

		const handleClick = () => {
			onClick && onClick();
			toggleOffIsOpen();
		};

		return (
			<NavLink
				to={path}
				end={end}
				onClick={handleClick}
				key={`${path}-nav-link`}
			>
				{Icon &&
					<Icon className={"authenticated-navbar__nav-link__icon"}/>}
				<span>{text}</span>
			</NavLink>
		);
	});

	return (
		<Navbar width={{sm: 300}} p="md" hiddenBreakpoint="sm"
				hidden={!isOpen}>
			<Navbar.Section grow>
				<Text
					mt="auto"
					component={Link}
					to="/"
					className="authenticated-navbar__logo"
				>
					PrioriTea
				</Text>
				<Divider/>
				{links}
				{/*<NavLink to={"/settings"} end={true}>*/}
				{/*  <Settings className={"navlink__icon"} />*/}
				{/*  <span>Settings</span>*/}
				{/*</NavLink>*/}
			</Navbar.Section>

			<Navbar.Section className={"authenticated-navbar__footer"}>
				{/*<Link*/}
				{/*  to="#"*/}
				{/*  className="app-shell__link"*/}
				{/*  onClick={(event) => event.preventDefault()}*/}
				{/*>*/}
				{/*  <SwitchHorizontal className={"app-shell__link__icon"} />*/}
				{/*  <span className="capitalize">*/}
				{/*    Change account*/}
				{/*  </span>*/}
				{/*</Link>*/}

				<Link
					to="/sign-in"
					className="authenticated-navbar__link"
					onClick={onSignOut}
				>
					<Logout className={"authenticated-navbar__link__icon"}/>
					<span className="capitalize">Sign Out</span>
				</Link>
			</Navbar.Section>
		</Navbar>


	);
}
