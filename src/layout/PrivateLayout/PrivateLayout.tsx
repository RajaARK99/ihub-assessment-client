import { Outlet } from "@tanstack/react-router";

const PrivateLayout = () => {
  return (
    <main className="min-h-dvh">
      <Outlet />
    </main>
  );
};

export default PrivateLayout;
