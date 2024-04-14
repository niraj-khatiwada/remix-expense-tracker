import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useMatches, useFetcher } from "@remix-run/react";
import { z } from "zod";

import ClientOnly from "~/components/ClientOnly";
import { type Expense } from "~/types/expense";
import db from "~/db/index.server";
import { LoaderData } from "~/types/loader-data";

function Expense() {
  // Shows the entry point from root to this page. Also allows you to use loader data if was fetched.
  // It also includes data from layouts
  const matches = useMatches();
  console.log(matches);

  const loaderData: LoaderData<Expense> = useLoaderData();
  const fetcher = useFetcher();

  function handleDelete() {
    const proceed = window.confirm(
      "Are your sure you wan to delete this expense?"
    );
    if (proceed) {
      fetcher.submit(null, {
        method: "DELETE",
        action: `./delete`,
      });
    }
  }
  return (
    <div className="block p-2 px-5 bg-gray-100 rounded-md w-fit my-2 min-w-[250px]">
      {!loaderData.success ? (
        <p className="bg-red-300 p-2">{loaderData.message}</p>
      ) : null}
      {loaderData?.success ? (
        <>
          <p className="my-2 border-b-2">{loaderData?.data?.title ?? ""}</p>
          <p className="my-2 border-b-2">${loaderData?.data?.amount ?? ""}</p>
          <p className="my-2 border-b-2 min-h-[50px]">
            <ClientOnly fallback={"loading..."}>
              {new Date(loaderData?.data?.createdAt)?.toLocaleString()}
            </ClientOnly>
          </p>
          <Link to="./edit" className="bg-teal-300 px-3 py-1 rounded-sm mr-2">
            Edit
          </Link>
          {/* <Form
            method="delete"
            action="./delete"
            className="inline-block m-0 p-0"
          >
            <button className="m-0 bg-red-400 px-3 py-1 rounded-sm">
              Delete
            </button>
          </Form> */}
          {/* You can definitely use Form for method delete. An alternative approach is to use useFetcher instead */}
          {/* It's useful when the action does not redirect you somewhere, instead just returns some data. */}
          <button
            className="m-0 bg-red-400 px-3 py-1 rounded-sm"
            onClick={handleDelete}
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? "Deleting..." : "Delete"}
          </button>
        </>
      ) : null}
      {fetcher?.data ? (
        <pre>
          <code>{JSON.stringify(fetcher?.data ?? {}, null, 2)}</code>
        </pre>
      ) : null}
    </div>
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const validation = z
    .object({
      expenseId: z.coerce.number(),
    })
    .safeParse(params);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.message,
    };
  }

  const { expenseId } = validation.data;

  const result = await db.query(
    `SELECT * FROM expense WHERE id = '${expenseId}'`
  );

  return {
    success: true,
    data: result?.rows?.[0] ?? null,
  };
};

export default Expense;
