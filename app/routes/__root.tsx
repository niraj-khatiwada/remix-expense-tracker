import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Nav from "~/components/Nav";

function RootLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export const meta: MetaFunction = () => [
  {
    title: "Home",
  },
  { description: "Home page" },
];

export default RootLayout;
