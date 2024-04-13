import { MetaFunction } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
import db from "~/db/index.server";

// This will share the path /expenses but not the ./expenses.tsx layout
// function ExpensesRaw() {
//   const data = useLoaderData();
//   return data;
// }

// If you just have a loader in the component, it will return the raw data. This is just like a GET API request
export async function loader() {
  const expenses = (await db.query("SELECT * FROM expense"))?.rows ?? [];

  return expenses;
}

export const meta: MetaFunction = () => {
  return [{ title: "Raw Expense Data" }];
};

// export default ExpensesRaw;
