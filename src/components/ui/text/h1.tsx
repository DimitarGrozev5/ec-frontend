import React from "react";
import { tw } from "../../../util/tw";
import { ClassValue } from "clsx";

type Props = {
  className?: ClassValue;
  children: React.ReactNode;
};

const Header1: React.FC<Props> = ({ className = "", children }) => {
  return (
    <h1 className={tw("text-5xl", "text-zinc-100", className)}>{children}</h1>
  );
};

export default Header1;
