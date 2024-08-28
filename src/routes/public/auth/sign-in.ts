import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { authRootRoute } from "@/routes/public/auth";

const signInRoute = createRoute({
  getParentRoute: () => authRootRoute,
  path: "sign-in",
  component: lazyRouteComponent(() => import("@/modules/Auth/Pages/SignIn")),
});

export { signInRoute };
