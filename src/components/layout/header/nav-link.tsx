import React from "react";
import { NavLink } from "react-router-dom";
import { tw } from "../../../util/tw";

type Props = {
  to: string;
  children: string;
  onClick?: () => void;
};
const NavigationLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ to, children, onClick }, ref) => {
    return (
      <NavLink
        ref={ref}
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          tw(
            "text-zinc-400",
            "hover:text-emerald-600",
            "transition-colors duration-300",
            isActive && "text-emerald-600"
          )
        }
      >
        {children}
      </NavLink>
    );
  }
);

export default NavigationLink;
