import { ActionFunction, redirect, json } from "@remix-run/node";

import { z } from "zod";

import db from "~/db/index.server";
import ExpenseForm from "./components/ExpenseForm";
import { getAuthenticationStatus } from "~/utils/auth.server";

function NewExpense() {
  // const submit = useSubmit(); // You can use this hook to programmatically submit the form

  // function onSubmit(evt: SubmitEvent) {
  //   evt?.preventDefault();
  //   submit(evt?.target, {
  //     method: "POST",
  //   });
  // }
  return <ExpenseForm action="./" />;
}

export const action: ActionFunction = async ({ request }) => {
  const authStatus = await getAuthenticationStatus(
    request.headers.get("Cookie") as string
  );
  const { isAuthenticated } = authStatus;
  if (!isAuthenticated) {
    throw redirect("/auth");
  }
  const { userId } = authStatus;

  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const validation = z
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

  if (!validation.success) {
    return json({
      success: false,
      message: validation.error.message ?? "Validation error",
    });
  }

  const { title, amount } = validation.data;

  await db.query(
    `INSERT INTO expense(title, amount, "userId", "createdAt") VALUES('${title}','${amount}', ${userId}, NOW())`
  );

  return redirect("/expenses");
};

export default NewExpense;
