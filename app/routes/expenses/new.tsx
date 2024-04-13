import { ActionFunction, redirect, json } from "@remix-run/node";
import {
  Link,
  useActionData,
  Form,
  useNavigation,
  // useSubmit
} from "@remix-run/react";
import { z } from "zod";

import db from "~/db/index.server";

function NewExpense() {
  // const submit = useSubmit(); // You can use this hook to programmatically submit the form

  const { state } = useNavigation();

  const actionData = useActionData<{
    success: boolean;
    message?: string;
  }>();

  // function onSubmit(evt: SubmitEvent) {
  //   evt?.preventDefault();
  //   submit(evt?.target, {
  //     method: "POST",
  //   });
  // }
  return (
    <Form
      method="post"
      action="./"
      // onSubmit={onSubmit}
    >
      {actionData && !actionData?.success ? (
        <p className="bg-red-300 px-2 py-1">
          {actionData?.message ?? "Something went wrong..."}
        </p>
      ) : null}
      <section className="my-2">
        <label htmlFor="title">TItle</label>
        <input id="title" name="title" required className="block border-2" />
      </section>
      <section className="my-2">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          required
          className="block border-2"
        />
      </section>
      <section className="my-2">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          required
          className="block border-2"
        />
      </section>
      <div className="my-4">
        <button
          className="bg-teal-500 rounded-sm px-4 py-2 text-white"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Saving..." : "Save"}
        </button>
        <Link to="../" className="b rounded-sm px-4 py-2">
          Cancel
        </Link>
      </div>
    </Form>
  );
}

export const action: ActionFunction = async ({ request }) => {
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
    `INSERT INTO expense(title, amount, "createdAt") VALUES('${title}', '${amount}', NOW())`
  );

  return redirect("/expenses");
};

export default NewExpense;
