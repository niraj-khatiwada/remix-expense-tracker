import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Layout from "~/components/Layout";

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export const meta: MetaFunction = () => [
  {
    title: "Home",
  },
  { description: "Home page" },
];

export default RootLayout;
