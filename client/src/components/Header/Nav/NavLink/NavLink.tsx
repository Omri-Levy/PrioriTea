import { NavLink as RouterNavLink } from "react-router-dom";
import { FunctionComponent, ReactNode } from "react";
import { VoidFunction } from "../../../../types";

interface NavLinkProps {
  end: boolean;
  to: string;
  onClick?: VoidFunction;
  children: ReactNode;
}

export const NavLink: FunctionComponent<NavLinkProps> = function ({
  end,
  to,
  children,
  onClick,
}) {
  return (
    <li className="nav__item">
      <RouterNavLink
        className={({ isActive }) => `nav__link${isActive ? "--active" : ""}`}
        end={end}
        to={to}
        onClick={onClick}
      >
        {children}
      </RouterNavLink>
    </li>
  );
};
