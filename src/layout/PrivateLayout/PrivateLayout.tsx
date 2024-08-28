import { Outlet } from "@tanstack/react-router";
import Header from "./Header";

const PrivateLayout = () => {
  return (
    <main className="min-h-dvh">
      <Header />
      <Outlet />
    </main>
  );
};

export default PrivateLayout;
