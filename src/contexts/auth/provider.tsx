import React, { useCallback, useEffect, useState } from "react";
import { authContext } from "./auth-context";
type ProviderProps = { children: React.ReactNode };

const AuthContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const setAuth = useCallback(
    (
      isAuth: boolean,
      userId: string = "",
      token: string = "",
      isAdmin: boolean = false
    ) => {
      setIsAuth(isAuth);
      setIsAdmin(isAdmin);
      setUserId(userId);
      setToken(token);
    },
    []
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(
        true,
        localStorage.getItem("userId") || "",
        localStorage.getItem("token") || "",
        Boolean(Number(localStorage.getItem("isAdmin")))
      );
    }
  }, [setAuth]);

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("isAdmin", (+isAdmin).toString());
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userisAdminId");
    }
  }, [isAdmin, isAuth, token, userId]);

  return (
    <authContext.Provider value={{ isAuth, userId, isAdmin, token, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
