import { ClassValue } from "clsx";
import { Link as RouterLink } from "react-router-dom";
import { tw } from "../../../util/tw";
import React from "react";

type Props = {
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: ClassValue;
};

/**
 * Link Component that wraps React Router Link
 */
const Link = React.forwardRef<HTMLAnchorElement, Props>(
  ({ to, onClick, children, className }, ref) => {
    if (to === undefined)
      return (
        <a
          ref={ref}
          onClick={onClick}
          className={tw("cursor-pointer", className)}
        >
          {children}
        </a>
      );

    return (
      <RouterLink ref={ref} to={to} onClick={onClick} className={tw(className)}>
        {children}
      </RouterLink>
    );
  }
);

export default Link;
