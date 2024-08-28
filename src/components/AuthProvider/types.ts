import { Nullish } from "@/types";
import { User } from "@/modules/Users";

interface AuthContext {
  auth: {
    isAuthenticated: boolean;
    setUser: (user: Nullish<User> | null) => void;
    setToken: (token: string | null) => void;
    user: Nullish<User> | null;
    token: string | null;
  };
  theme: { theme: Theme; setTheme: (theme: Theme) => void };
}

type Theme = "dark" | "light" | "system";

export type { AuthContext, Theme };
