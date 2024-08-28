import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { Theme, useAuth, useTheme } from "@/components/AuthProvider";
import { useNavigate } from "@tanstack/react-router";

import { LogOut, Moon, SunMoon } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

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
        <Button
          variant="ghost"
          size="icon"
          onPress={() => {
            if (theme === "system" || theme === "dark") {
              changeThemeHandler("light");
            }
            if (theme === "light") {
              changeThemeHandler("dark");
            }
          }}
        >
          {theme === "light" ? (
            <Moon className="size-5 text-muted-foreground" />
          ) : (
            <SunMoon className="size-5" />
          )}
        </Button>
        <DialogTrigger>
          <Button variant="ghost" size="icon">
            <LogOut className="size-4" />
          </Button>

          <DialogOverlay isDismissable={false}>
            <DialogContent role="alertdialog" className="sm:max-w-[400px]">
              {({ close }) => (
                <>
                  <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Are you sure want to logout?
                  </DialogDescription>
                  <DialogFooter className="gap-2">
                    <Button onPress={close} variant="outline">
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onPress={() => {
                        localStorage.clear();
                        setUser(null);
                        setTimeout(() => {
                          navigate({
                            to: "/sign-in",
                            replace: false,
                          });
                        }, 10);
                      }}
                    >
                      Logout
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </DialogOverlay>
        </DialogTrigger>
      </div>
    </header>
  );
};

export default Header;
