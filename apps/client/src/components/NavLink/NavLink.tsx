import {FunctionComponent} from "react";
import {NavLink as RouterNavLink} from "react-router-dom";
import {LinkProps} from "./interfaces";
import './NavLink.css';

export const NavLink: FunctionComponent<LinkProps> = ({
														  end,
														  to,
														  children,
														  onClick,
													  }) => {


	return (
		<RouterNavLink
			className={({isActive}) => `nav-link${isActive ? `--active` : ``}`}
			end={end}
			to={to}
			onClick={onClick}
		>
			{children}
		</RouterNavLink>
	);
};
