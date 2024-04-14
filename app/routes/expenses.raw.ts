import { LoaderFunction, MetaFunction, json, redirect } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
import db from "~/db/index.server";
import { getAuthenticationStatus } from "~/utils/auth.server";

// This will share the path /expenses but not the ./expenses.tsx layout
// function ExpensesRaw() {
//   const data = useLoaderData();
//   return data;
// }

// If you just have a loader in the component, it will return the raw data. This is just like a GET API request
export const loader: LoaderFunction = async ({ request }) => {
  const authStatus = await getAuthenticationStatus(
    request.headers.get("Cookie") as string
  );
  const { isAuthenticated } = authStatus;
  if (!isAuthenticated) {
    throw redirect("/auth");
  }
  const userId = authStatus?.userId;
  const expenses =
    (await db.query(`SELECT * FROM expense WHERE "userId" = ${userId}`))
      ?.rows ?? [];

  return json(expenses);
};

export const meta: MetaFunction = () => {
  return [{ title: "Raw Expense Data" }];
};

// export default ExpensesRaw;
