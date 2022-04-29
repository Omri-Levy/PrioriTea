import {
  AppShell, Burger, createStyles,
  Divider, Header, MediaQuery, Navbar, Text, useMantineTheme
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Logout, Settings, SwitchHorizontal
} from "tabler-icons-react";
import { AuthApi } from "../../api/auth-api";
import { queryClient } from "../../lib/query-client";
import { NavLink } from "../NavLink/NavLink";
import { useRoutes } from "../Router/useRoutes";

interface LayoutProps {}

export const AuthenticatedLayout: FunctionComponent<LayoutProps> = function () {
  const theme = useMantineTheme();
  // Avoids passing an unneeded value argument from the burger's onClick.
  const routes = useRoutes();

  const useStyles = createStyles((_theme, _params, getRef) => {
    const icon = getRef("icon");

    return {

 navbar: {

  },

  links: {

  },

    
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
        marginRight: theme.spacing.sm,
      },

      header: {
        display: "flex",
        alignItems: "center",
        top: 0,
        right: 0,
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

     
    };
  });
  const { classes } = useStyles();
  const links = routes.map(function ({ path, end, text, Icon, onClick }) {
    const handleClick = function () {
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
        <Icon className={classes.icon} />
        <span>{text}</span>
      </NavLink>
    );
  });
  const [opened, setOpened] = useState(false);

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
      header={
           <Header height={50}  className={classes.header}>
                    <MediaQuery largerThan="sm" styles={{display: "none"}}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((prev) => !prev)}
                  size="md"
                  color={theme.colors.gray[6]}
                  mr="xl"
                  ml="auto"
                />
                </MediaQuery>
          </Header>
      }
      navbar={        
        <Navbar width={{ sm: 300 }} p="md" hiddenBreakpoint="sm" hidden={!opened} className={classes.navbar}>
          <Navbar.Section grow>
            <Text
              mt="auto"
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

                queryClient.setQueryData(['userInfo'], undefined);
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
