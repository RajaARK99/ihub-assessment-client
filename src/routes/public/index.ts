import { createRoute } from "@tanstack/react-router";

export * from "@/routes/public/auth";

import { authRoute, rootRoute } from "@/routes";

const publicRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public-route",
});

const publicRoute = publicRootRoute.addChildren([authRoute]);

export { publicRoute, publicRootRoute };
