import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Layout from "~/components/Layout";

function ExpensesLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export const meta: MetaFunction = () => [
  { title: "My Expenses" },
  { description: "My Expenses" },
];

export default ExpensesLayout;
