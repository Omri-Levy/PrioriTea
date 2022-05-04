import {
	ActionIcon,
	AppShell,
	Burger,
	Container,
	Footer,
	Group,
	Header,
	Paper,
	Text,
	Transition,
	useMantineColorScheme
} from "@mantine/core";
import {useBooleanToggle} from "@mantine/hooks";
import {FunctionComponent} from "react";
import {Link, Outlet} from "react-router-dom";
import {BrandGithub, BrandLinkedin, MoonStars, Sun} from "tabler-icons-react";
import {NavLink} from "../NavLink/NavLink";
import {useRoutes} from "../Router/useRoutes";
import "./Unauthenticated.css"

export const UnauthenticatedLayout: FunctionComponent =
   () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [isOpen, toggleIsOpen] = useBooleanToggle(false);
    // Avoids passing an unneeded value argument from the burger's onClick.
    const toggleBurger = () => toggleIsOpen();
    const routes = useRoutes();
    const HEADER_HEIGHT = 60;
    const links = routes.map(({ path, end, text, Icon, onClick }) => {
      const handleClick = () => {
        onClick && onClick();
        toggleIsOpen();
      };

      return (
        <NavLink
          to={path}
          end={end}
          onClick={handleClick}
          key={`${path}-nav-link`}
        >
          <Icon className={"navlink__icon"} />
          <span>{text}</span>
        </NavLink>
      );
    });

    return (
      <AppShell
        className={"app-shell--unauthenticated"}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        footer={
          <Footer p="md" height={HEADER_HEIGHT} className={"app-shell__footer--unauthenticated"}>
            <Text
              color="dimmed"
              size="sm"
              variant="link"
              component="a"
              href="https://omrilevy-portfolio.netlify.app/"
              target="_blank"
            >
              &copy; {new Date().getFullYear()} Omri Levy
            </Text>

            <Group spacing={0} position="right" noWrap>
              <ActionIcon
                size="lg"
                component="a"
                href="https://www.linkedin.com/in/omri-levy-798b901b1/"
                target="_blank"
              >
                <BrandLinkedin size={20} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                component="a"
                href="https://github.com/Omri-Levy"
                target="_blank"
              >
                <BrandGithub size={20} />
              </ActionIcon>
            </Group>
          </Footer>
        }
        header={
          <Header height={60} className={"app-shell__header--unauthenticated"}>
            <Container className={"app-shell__header__container--unauthenticated"} size={"xl"}>
              <Group>
                <Burger
                  opened={isOpen}
                  onClick={toggleBurger}
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
                <Group spacing={5} className={"app-shell__links--unauthenticated"}>
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
                <ActionIcon
                  onClick={() => toggleColorScheme()}
                  size="lg"
				  className={"app-shell__color-scheme-toggle--unauthenticated"}
				  sx={(theme) => ({
					  // @ts-ignore
					  color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7]
				  })}
                >
                  {colorScheme === "dark" ? (
                    <Sun size={18} />
                  ) : (
                    <MoonStars size={18} />
                  )}
                </ActionIcon>
              </Group>
            </Container>
          </Header>
        }
      >
        <Container size={"sm"}>
          <Outlet />
        </Container>
      </AppShell>
    );
  };
