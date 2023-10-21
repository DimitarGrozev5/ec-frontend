import { useContext } from "react";
import { authContext } from "./auth-context";

/**
 * Hook that returns the current auth data
 */
export const useAuth = () => {
  const ctx = useContext(authContext);

  if (ctx === undefined) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }

  return ctx;
};
