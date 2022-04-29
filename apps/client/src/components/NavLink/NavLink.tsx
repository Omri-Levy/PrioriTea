import { createStyles } from "@mantine/core";
import { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

interface LinkProps {
  end: boolean;
  to: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

export const NavLink: FunctionComponent<LinkProps> = function ({
  end,
  to,
  children,
  onClick,
}) {
  const useStyles = createStyles((theme) => ({
    link: {
      textTransform: "capitalize",
      display: "flex",
      alignItems: "center",
      lineHeight: 1,
      padding: "8px 12px",
      borderRadius: theme.radius.sm,
      textDecoration: "none",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },

      [theme.fn.smallerThan("sm")]: {
        borderRadius: 0,
        padding: theme.spacing.md,
      },
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.primaryColor[9]!, 0.25)
            : theme.primaryColor[0],
        color:
          theme.primaryColor[
            theme.colorScheme === "dark" ? 3 : 7
          ],
      },
    },
  }));
  const { classes, cx } = useStyles();

  return (
    <RouterNavLink
      className={({ isActive }) =>
        cx(classes.link, { [classes.linkActive]: isActive })
      }
      end={end}
      to={to}
      onClick={onClick}
    >
      {children}
    </RouterNavLink>
  );
};
