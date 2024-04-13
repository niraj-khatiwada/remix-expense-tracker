import { Outlet } from "@remix-run/react";
import Layout from "~/components/Layout";

function AuthLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default AuthLayout;
