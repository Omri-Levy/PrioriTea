import {AppShell, Burger, Divider, Header, Navbar, Text} from "@mantine/core";
import {
	FunctionComponent,
	MouseEventHandler,
	useCallback,
	useState
} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Logout} from "tabler-icons-react";
import {AuthApi} from "../../api/auth-api";
import {NavLink} from "../NavLink/NavLink";
import {useRoutes} from "../Router/useRoutes";
import "./AuthenticatedLayout.css";
import {useMutation, useQueryClient} from "react-query";

export const useSignOutMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(
		async () => AuthApi.signOut(),
		{
			onSuccess() {
				queryClient.setQueryData(['userInfo'], undefined);

				navigate('/sign-in', {replace: true});
			}
		})
}

export const AuthenticatedLayout: FunctionComponent = () => {
	// Avoids passing an unneeded value argument from the burger's onClick.
	const routes = useRoutes();
	const links = routes.map(({ path, end, text, Icon, onClick }) => {
		const handleClick = () => {
			onClick && onClick();
			setOpened(false);
		};

		return (
			<NavLink
				to={path}
				end={end}
				onClick={handleClick}
				key={`${path}-nav-link`}
			>
				{Icon && <Icon className={"navlink__icon"} />}
				<span>{text}</span>
			</NavLink>
		);
	});
	const [opened, setOpened] = useState(false);
	const {mutateAsync} = useSignOutMutation();
	const onSignOut: MouseEventHandler<HTMLAnchorElement> = useCallback(async (e) => {
			e.preventDefault();

			return mutateAsync();
		},
		[mutateAsync],
	);


	return (
		<AppShell
			sx={{
				['@media (max-width: 768px)']: {
					main: {
						paddingInline: "0.5rem",
					}
				},
			}}
			className={"app-shell"}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			fixed
			header={
				<Header height={50}  className={"app-shell__header"}>
					<Burger
						opened={opened}
						onClick={() => setOpened((prev) => !prev)}
						size="md"
						className={"app-shell__burger"}
						mr="xl"
						ml="auto"
					/>
				</Header>
			}
			navbar={
				<Navbar width={{ sm: 300 }} p="md" hiddenBreakpoint="sm" hidden={!opened} >
					<Navbar.Section grow>
						<Text
							mt="auto"
							component={Link}
							to="/"
							className="app-shell__logo"
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

					<Navbar.Section className={"app-shell__footer"}>
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
							className="app-shell__link"
							onClick={onSignOut}
						>
							<Logout className={"app-shell__link__icon"} />
							<span className="capitalize">Sign Out</span>
						</Link>
					</Navbar.Section>
				</Navbar>

			}
		>
			<Outlet />
		</AppShell>
	);
};
