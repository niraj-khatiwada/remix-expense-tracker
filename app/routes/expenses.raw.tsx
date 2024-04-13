import { MetaFunction } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";

// This will share the path /expenses but not the ./expenses.tsx layout
// function ExpensesRaw() {
//   const data = useLoaderData();
//   return data;
// }

// If you just have a loader in the component, it will return the raw data. This is just like a GET API request
export function loader() {
  return [
    {
      id: "1",
      title: "Food",
      amount: 1500,
      description: "New year fest.",
    },
  ];
}

export const meta: MetaFunction = () => {
  return [{ title: "Raw Expense Data" }];
};

// export default ExpensesRaw;
