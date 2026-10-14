import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="mx-auto grid h-screen w-full max-w-480 grid-cols-1 lg:grid-cols-2">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
