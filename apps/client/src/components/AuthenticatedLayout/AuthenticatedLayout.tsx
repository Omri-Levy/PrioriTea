import {
  ActionIcon,
  AppShell,
  Burger,
  Code,
  createStyles,
  Divider,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { FunctionComponent } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Logout,
  MoonStars,
  Settings,
  Sun,
  SwitchHorizontal,
} from "tabler-icons-react";
import { AuthApi } from "../../api/auth-api";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { NavLink } from "../NavLink/NavLink";
import { useRoutes } from "../Router/useRoutes";

interface LayoutProps {}

export const AuthenticatedLayout: FunctionComponent<LayoutProps> = function () {
  const {signOut} = useAuthContext();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isOpen, toggleIsOpen] = useBooleanToggle(false);
  // Avoids passing an unneeded value argument from the burger's onClick.
  const toggleBurger = () => toggleIsOpen();
  const routes = useRoutes();
  const useStyles = createStyles((mantineTheme, _params, getRef) => {
    const icon = getRef("icon");

    return {
      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      },
      icon: {
        ref: icon,
        color: "inherit",
        marginRight: mantineTheme.spacing.sm,
      },

      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      },

      link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[1]
            : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color: theme.colorScheme === "dark" ? theme.white : theme.black,

          [`& .${icon}`]: {
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          },
        },
      },

      linkIcon: {
        ref: icon,
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
              : theme.colors[theme.primaryColor][0],
          color:
            theme.colorScheme === "dark"
              ? theme.white
              : theme.colors[theme.primaryColor][7],
          [`& .${icon}`]: {
            color:
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 5 : 7
              ],
          },
        },
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
      navbar={
        <Navbar height={"100%"} width={{ sm: 300 }} p="md">
          <Navbar.Section grow>
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
            <Divider/>
            {links}
            <NavLink to={"/settings"} end={true}>
              <Settings className={classes.icon} />
              <span>Settings</span>
            </NavLink>
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a
              href="#"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <SwitchHorizontal className={classes.linkIcon} />
              <span style={{ textTransform: "capitalize" }}>
                Change account
              </span>
            </a>

            <NavLink
              to="/sign-in"
              end
              onClick={async () => {
                await AuthApi.signOut();

                signOut();
              }}
            >
              <Logout className={classes.linkIcon} />
              <span style={{ textTransform: "capitalize" }}>Sign Out</span>
            </NavLink>
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  );
};
