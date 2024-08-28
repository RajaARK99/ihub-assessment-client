import { Fragment } from "react";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  ScrollRestoration,
} from "@tanstack/react-router";

import { AuthContext } from "@/components/AuthProvider";
import { Toaster } from "@/components/Toast";

import { publicRoute, privateRoute } from "@/routes";

const rootRoute = createRootRouteWithContext<AuthContext["auth"]>()({
  component: () => (
    <Fragment>
      <ScrollRestoration />
      <Outlet />
      <Toaster />
    </Fragment>
  ),
  beforeLoad: ({ context: { isAuthenticated }, location: { pathname } }) => {
    if (pathname === "/") {
      if (!isAuthenticated) {
        localStorage?.removeItem("token");
        throw redirect({
          to: "/sign-in",
          replace: false,
        });
      } else
        throw redirect({
          to: "/home",
          replace: false,
          search: {
            limit: 10,
            page: 1,
          },
        });
    }
  },
});
const routeTree = rootRoute.addChildren([publicRoute, privateRoute]);

export { rootRoute, routeTree };
