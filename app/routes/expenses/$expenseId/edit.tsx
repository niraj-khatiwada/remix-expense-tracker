import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { z } from "zod";

import ExpenseForm from "../components/ExpenseForm";
import db from "~/db/index.server";
import { useLoaderData } from "@remix-run/react";
import { LoaderData } from "~/types/loader-data";
import { Expense } from "~/types/expense";
import { getAuthenticationStatus } from "~/utils/auth.server";

function ExpenseEdit() {
  const loaderData: LoaderData<Expense> = useLoaderData();
  return loaderData?.success ? (
    <ExpenseForm method="PATCH" action="./" expense={loaderData?.data} />
  ) : null;
}

export const action: ActionFunction = async ({ params, request }) => {
  if (request.method !== "PATCH") {
    throw new Error("Invalid action method.");
  }

  const authStatus = await getAuthenticationStatus(
    request.headers.get("Cookie") as string
  );
  const { isAuthenticated } = authStatus;
  if (!isAuthenticated) {
    throw redirect("/auth");
  }
  const { userId } = authStatus;

  const paramsValidation = z
    .object({
      expenseId: z.coerce.number(),
    })
    .safeParse(params);

  if (!paramsValidation.success) {
    return {
      success: false,
      message: paramsValidation.error.message,
    };
  }

  const { expenseId } = paramsValidation.data;

  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const formDataValidation = z
    .object({
      title: z.string(),
      amount: z
        .string()
        .refine((amount) => !isNaN(+amount), {
          message: "Invalid amount,",
        })
        .transform(Number.parseFloat),
      date: z.coerce.date(),
    })
    .safeParse(formPayload);

  if (!formDataValidation.success) {
    return json({
      success: false,
      message: formDataValidation.error.message ?? "Validation error",
    });
  }

  const { title, amount } = formDataValidation.data;

  await db.query(
    `UPDATE expense SET title='${title}', amount='${amount}' WHERE id = ${expenseId} AND "userId" = ${userId}`
  );

  return redirect("/expenses");
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const authStatus = await getAuthenticationStatus(
    request.headers.get("Cookie") as string
  );
  const { isAuthenticated } = authStatus;
  if (!isAuthenticated) {
    throw redirect("/auth");
  }
  const { userId } = authStatus;

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
    `SELECT * FROM expense WHERE id = '${expenseId}' AND "userId" = ${userId}`
  );

  return {
    success: true,
    data: result?.rows?.[0] ?? null,
  };
};

export default ExpenseEdit;
