import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Allows the merging of tailwind classes
 */
export const tw = (...args: ClassValue[]) => twMerge(clsx(...args));
