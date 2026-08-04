import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="grid h-screen w-screen grid-cols-1 lg:grid-cols-2">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
