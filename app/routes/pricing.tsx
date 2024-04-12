import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Nav from "~/components/Nav";

function PricingLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export const meta: MetaFunction = () => [
  { title: "Pricing" },
  { description: "Pricing page" },
];

export default PricingLayout;
