import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { privateRootRoute } from ".";

const homeRoute = createRoute({
  getParentRoute: () => privateRootRoute,
  path: "home",
  component: lazyRouteComponent(() => import("@/modules/Home/Pages/Home")),
});

export { homeRoute };
