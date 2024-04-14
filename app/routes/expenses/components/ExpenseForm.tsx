import {
  Link,
  useActionData,
  Form,
  useNavigation,
  FormProps,
} from "@remix-run/react";
import { Expense } from "~/types/expense";

type ExpenseFormProps = {
  action: string;
  method?: FormProps["method"];
  expense?: Expense;
};

function ExpenseForm({ action, expense, method = "POST" }: ExpenseFormProps) {
  const { state } = useNavigation();

  const actionData = useActionData<{
    success: boolean;
    message?: string;
  }>();

  return (
    <Form method={method} action={action}>
      {actionData && !actionData?.success ? (
        <p className="bg-red-300 px-2 py-1">
          {actionData?.message ?? "Something went wrong..."}
        </p>
      ) : null}
      <section className="my-2">
        <label htmlFor="title">TItle</label>
        <input
          id="title"
          name="title"
          required
          className="block border-2"
          defaultValue={expense?.title ?? ""}
        />
      </section>
      <section className="my-2">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          required
          className="block border-2"
          defaultValue={expense?.amount ?? ""}
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
          defaultValue={expense?.createdAt?.slice(0, -5) ?? ""}
        />
      </section>
      <div className="my-4">
        <button
          className="bg-teal-500 rounded-sm px-4 py-2 text-white"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Saving..." : "Save"}
        </button>
        <Link to="/expenses" className="b rounded-sm px-4 py-2">
          Cancel
        </Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
