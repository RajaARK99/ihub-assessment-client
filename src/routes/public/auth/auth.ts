import { createRoute, redirect } from "@tanstack/react-router";

import { signInRoute, signUpRoute, publicRootRoute } from "@/routes";

const authRootRoute = createRoute({
  getParentRoute: () => publicRootRoute,
  id: "auth",
  beforeLoad: ({ context: { isAuthenticated } }) => {
    if (isAuthenticated) {
      throw redirect({
        to: "/home",
      });
    }
  },
});

const authRoute = authRootRoute.addChildren([signInRoute, signUpRoute]);
export { authRootRoute, authRoute };
