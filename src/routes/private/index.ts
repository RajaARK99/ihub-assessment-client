import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";

export * from "@/routes/private/home";

import { rootRoute, homeRoute } from "@/routes";

const privateRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "private-route",
  component: lazyRouteComponent(
    () => import("@/layout/PrivateLayout/PrivateLayout")
  ),
  beforeLoad: ({ context: { isAuthenticated } }) => {
    if (!isAuthenticated) {
      throw redirect({
        to: "/sign-in",
        replace: false,
      });
    }
  },
});

const privateRoute = privateRootRoute.addChildren([homeRoute]);

export { privateRootRoute, privateRoute };
