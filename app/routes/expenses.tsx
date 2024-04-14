import {
  // HeadersFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import Layout from "~/components/Layout";
import { getAuthenticationStatus } from "~/utils/auth.server";

function ExpensesLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const authStatus = await getAuthenticationStatus(
    request.headers.get("Cookie") as string
  );
  const { isAuthenticated } = authStatus;
  if (!isAuthenticated) {
    throw redirect("/auth");
  }
  return authStatus;
};

export const meta: MetaFunction = () => [
  { title: "My Expenses" },
  { description: "My Expenses" },
];

// Set custom headers for this /expenses page only
// You might think this will apply to all pages inside expenses but no. This will just be applied to /expenses page
// export const headers: HeadersFunction = () => ({
//   "Cache-Control": "max-age=60",
// });

export default ExpensesLayout;
