import {
  ActionIcon,
  AppShell,
  Burger,
  Container,
  createStyles,
  Footer,
  Group,
  Header, Paper,
  Text,
  Transition,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { FunctionComponent } from "react";
import { Link, Outlet } from "react-router-dom";
import { BrandGithub, BrandLinkedin, MoonStars, Sun } from "tabler-icons-react";
import { NavLink } from "../NavLink/NavLink";
import { useRoutes } from "../Router/useRoutes";

interface LayoutProps {}

export const UnauthenticatedLayout: FunctionComponent<LayoutProps> =
  function () {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [isOpen, toggleIsOpen] = useBooleanToggle(false);
    // Avoids passing an unneeded value argument from the burger's onClick.
    const toggleBurger = () => toggleIsOpen();
    const routes = useRoutes();
    const HEADER_HEIGHT = 60;
    const useStyles = createStyles((mantineTheme, _params, getRef) => {
      const icon = getRef("icon");

      return {
        root: {
          position: "relative",
          zIndex: 1,
        },

        dropdown: {
          position: "absolute",
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          zIndex: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTopWidth: 0,
          overflow: "hidden",

          [theme.fn.largerThan("sm")]: {
            display: "none",
          },
        },

        header: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        },

        burger: {
          [theme.fn.largerThan("sm")]: {
            display: "none",
          },
        },

        footer: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        icon: {
          ref: icon,
          color: "inherit",
          marginRight: mantineTheme.spacing.sm,
        },
        links: {
          [theme.fn.smallerThan("sm")]: {
            display: "none",
          },
          marginRight: mantineTheme.spacing.sm,
        },
      };
    });
    const { classes } = useStyles();
    const links = routes.map(function ({ path, end, text, Icon, onClick }) {
      const handleClick = function () {
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
          <Icon className={classes.icon} />
          <span>{text}</span>
        </NavLink>
      );
    });

    return (
      <AppShell
        styles={{
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        footer={
          <Footer p="md" height={60} className={classes.footer}>
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
          <Header height={HEADER_HEIGHT} className={classes.root}>
            <Container className={classes.header} size={"xl"}>
              <Group>
                <Burger
                  opened={isOpen}
                  onClick={toggleBurger}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                  className={classes.burger}
                />
                <Text
                  component={Link}
                  to="/"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                    fontWeight: "bolder",
                  }}
                >
                  PrioriTea
                </Text>
              </Group>
              <Group>
                <Group spacing={5} className={classes.links}>
                  {links}
                </Group>

                <Transition
                  transition="pop-top-right"
                  duration={200}
                  mounted={isOpen}
                >
                  {(styles) => (
                    <Paper
                      className={classes.dropdown}
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
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                        // @ts-ignore
                    color: theme.colors[
                      theme.primaryColor][
                        theme.colorScheme === "dark" ? 5 : 7
                      ],
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
