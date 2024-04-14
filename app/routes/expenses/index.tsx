import { Link, useLoaderData } from "@remix-run/react";

import db from "~/db/index.server";
import { Expense } from "~/types/expense";
import ClientOnly from "~/components/ClientOnly";

function Expenses() {
  const expenses: Expense[] = useLoaderData();
  return (
    <div>
      <Link to="./new" className="px-3 py-2 bg-teal-500 block my-2 w-fit">
        + New Expense
      </Link>
      <section>
        Expenses:{" "}
        <Link to="./raw" className=" block text-blue-500 w-fit">
          Raw
        </Link>
        <div>
          {expenses?.length !== 0 ? (
            expenses?.map((expense) => (
              <Link
                to={`./${expense?.id}`}
                key={expense?.id}
                className="block p-2 px-5 bg-gray-100 rounded-md w-fit my-2 min-w-[250px]"
              >
                <p className="my-2 border-b-2">{expense?.title ?? ""}</p>
                <p className="my-2 border-b-2">${expense?.amount ?? ""}</p>
                <p className="my-2 border-b-2 min-h-[50px]">
                  <ClientOnly fallback={"loading..."}>
                    {new Date(expense?.createdAt)?.toLocaleString()}
                  </ClientOnly>
                </p>
              </Link>
            ))
          ) : (
            <span className="block text-center m-5">Empty Expenses...</span>
          )}
        </div>
      </section>
    </div>
  );
}

export async function loader() {
  const result = await db.query("SELECT * FROM expense;");
  return result?.rows;
}

export default Expenses;
