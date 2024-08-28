import { AxiosError } from "axios";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@tanstack/react-query";

import Loading from "@/components/Loading";
import { useAuth, AuthProvider } from "@/components/AuthProvider";

import { routeTree } from "@/routes";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    isAuthenticated: false,
    setUser: undefined!,
    user: undefined!,
    setToken: undefined!,
    token: undefined!,
  },
  defaultPendingComponent: () => (
    <div className="grid min-h-screen w-full place-content-center p-5">
      <Loading className="h-10 w-10" />
    </div>
  ),
  defaultNotFoundComponent: () => {
    return (
      <div className="grid w-full place-content-center p-5">
        Oops page not found.
      </div>
    );
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={auth} />;
};
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<{ code: number; message: string }>;
  }
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

