import React from "react";

type AuthContextType = {
  isAuth: boolean;
  isAdmin: boolean;
  userId: string;
  token: string;
  setAuth: (
    isAuth: boolean,
    userId?: string,
    token?: string,
    isAdimn?: boolean
  ) => void;
};

export const authContext = React.createContext<AuthContextType>({
  isAuth: false,
  isAdmin: false,
  userId: "",
  token: "",
  setAuth: () => {},
});
