import { Link } from "@remix-run/react";

function NewExpense() {
  return (
    <form method="post">
      <section className="my-2">
        <label htmlFor="title">TItle</label>
        <input id="title" required className="block border-2" />
      </section>
      <section className="my-2">
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" required className="block border-2" />
      </section>
      <section className="my-2">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="datetime-local"
          required
          className="block border-2"
        />
      </section>
      <div className="my-4">
        <button
          type="submit"
          className="bg-teal-500 rounded-sm px-4 py-2 text-white"
        >
          Save
        </button>
        <Link to="../" className="b rounded-sm px-4 py-2">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default NewExpense;
