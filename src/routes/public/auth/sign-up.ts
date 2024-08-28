import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { authRootRoute } from "@/routes/public/auth";

const signUpRoute = createRoute({
  getParentRoute: () => authRootRoute,
  path: "sign-up",
  component: lazyRouteComponent(() => import("@/modules/Auth/Pages/SignUp")),
});

export { signUpRoute };
