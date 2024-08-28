/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import type {
  AuthContext as IAuthContext,
  Theme,
} from "@/components/AuthProvider/types";

import { User } from "@/modules/Users";
import { Nullish } from "@/types";

const AuthContext = createContext<IAuthContext | null>(null);

const themeStorageKey = "theme";
const themeStorageValue = localStorage.getItem(themeStorageKey) as Theme;

const userDetails =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")!)
    ? (JSON.parse(localStorage.getItem("user")!) as unknown as User)
    : null;

const tokenDetails =
  localStorage.getItem("token") && jwtDecode(localStorage.getItem("token")!)
    ? localStorage.getItem("token") ?? null
    : null;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Nullish<User> | null>(
    userDetails && tokenDetails ? userDetails : null
  );

  const [token, setToken] = useState<string | null>(
    tokenDetails && userDetails ? tokenDetails : null
  );

  const isTokenExpired =
    token && jwtDecode(token)?.exp && new Date(jwtDecode(token)?.exp! * 1000)
      ? new Date(jwtDecode(token)?.exp! * 1000) < new Date()
      : true;

  const isAuthenticated = user?.id && token && !isTokenExpired ? true : false;

  const [theme, setTheme] = useState<Theme>(
    () => themeStorageValue || "system"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const themeValue = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(themeStorageKey, theme);
      setTheme(theme);
    },
  };

  const auth = { isAuthenticated, user, setUser, setToken, token };

  return (
    <AuthContext.Provider value={{ auth, theme: themeValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
