import React from "react";
import { tw } from "../../../util/tw";
import { ClassValue } from "clsx";

type Props = {
  center?: boolean;
  className?: ClassValue;
  children: React.ReactNode;
};

const Header3: React.FC<Props> = ({ center, className = "", children }) => {
  return (
    <h3
      className={tw(
        "text-xl",
        "text-zinc-100",
        center && "text-center",
        className
      )}
    >
      {children}
    </h3>
  );
};

export default Header3;
