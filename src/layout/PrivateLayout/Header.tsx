import { Theme, useAuth, useTheme } from "@/components/AuthProvider";

import { Moon, SunMoon } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const { user } = useAuth();

  const changeThemeHandler = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <header className="sticky top-0 z-10 flex h-[68px] items-center justify-between gap-2 border-b border-foreground/10 bg-background/95 p-3 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <p className="max-w-[inherit] truncate text-xl capitalize text-muted-foreground">
          Assessment
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden min-h-10 max-w-48 truncate md:block">
          <p className="truncate text-sm font-medium text-foreground">
            {user?.firstName || "N/A"}
          </p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {user?.email ?? "N/A"}
          </p>
        </div>{" "}
        {theme === "light" ? (
          <Moon
            className="cursor-pointer text-muted-foreground"
            onClick={() => {
              changeThemeHandler("dark");
            }}
          />
        ) : (
          <SunMoon
            className="cursor-pointer"
            onClick={() => {
              changeThemeHandler("light");
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
