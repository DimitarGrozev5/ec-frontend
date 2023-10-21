import React from "react";
import { tw } from "../../../util/tw";
import { ClassValue } from "clsx";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

type Props = {
  onClick?: () => void;
  variant?: "plain" | "contained";
  uppercase?: boolean;
  children: React.ReactNode;
  className?: ClassValue;
  loading?: boolean;
};

/**
 * Button Component
 * @param onClick onClick event handler
 * @param variant Button variant - plain or contained (defaults to plain)
 * @param loading Flag to display loading state in button
 * @param uppercase Flag to toggle text case (defaults to uppercase)
 * @param className CSS class name property
 */
const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      onClick,
      variant = "plain",
      uppercase = true,
      children,
      className,
      loading,
    },
    ref
  ) => {
    return (
      <button
        disabled={loading}
        ref={ref}
        onClick={onClick}
        className={tw(
          "inline-flex flex-row items-center justify-center gap-2",
          "p-1",
          // "transition-all duration-100",
          "text-zinc-300",
          uppercase && "uppercase",
          "hover:text-zinc-400",
          !loading && "active:scale-95",
          variant === "contained" && "text-emerald-50 bg-emerald-600",
          variant === "contained" && "border border-emerald-500 rounded-md",
          variant === "contained" && "py-2 px-4",
          variant === "contained" &&
            "hover:bg-emerald-700 hover:border-emerald-600 hover:text-emerald-100",
          !loading &&
            variant === "contained" &&
            "active:scale-100 active:outline active:outline-2 active:outline-offset-2 active:outline-emerald-800",
          className
        )}
      >
        {loading && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
        {children}
      </button>
    );
  }
);

export default Button;
