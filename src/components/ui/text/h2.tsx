import React from "react";
import { tw } from "../../../util/tw";
import { ClassValue } from "clsx";

type Props = {
  center?: boolean;
  className?: ClassValue;
  children: React.ReactNode;
};

const Header2: React.FC<Props> = ({ center, className = "", children }) => {
  return (
    <h2
      className={tw(
        "text-3xl",
        "text-zinc-100",
        center && "text-center",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Header2;
