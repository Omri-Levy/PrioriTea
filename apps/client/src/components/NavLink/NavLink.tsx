import {createStyles} from "@mantine/core";
import {FunctionComponent} from "react";
import {NavLink as RouterNavLink} from "react-router-dom";
import {LinkProps} from "./interfaces";

export const NavLink: FunctionComponent<LinkProps> = ({
														  end,
														  to,
														  children,
														  onClick,
													  }) => {
	const useStyles = createStyles((theme, _params, getRef) => {
		const icon = getRef("icon");

		return {
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
							// @ts-ignore
							? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
							// @ts-ignore
							: theme.colors[theme.primaryColor][0],
					color:
						theme.colorScheme === "dark"
							? theme.white
							// @ts-ignore
							: theme.colors[theme.primaryColor][7],
					[`& .${icon}`]: {
						color:
						// @ts-ignore
							theme.colors[
								theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7],
					},
				},
			},
		}
	});
	const {classes, cx} = useStyles();

	return (
		<RouterNavLink
			className={({isActive}) =>
				cx(classes.link, {[classes.linkActive]: isActive})
			}
			end={end}
			to={to}
			onClick={onClick}
		>
			{children}
		</RouterNavLink>
	);
};
