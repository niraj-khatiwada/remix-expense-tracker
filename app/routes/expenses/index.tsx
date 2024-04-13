import { Link } from "@remix-run/react";

function Expenses() {
  return (
    <div>
      <Link to="./new" className="px-3 py-2 bg-teal-500 block my-2 w-fit">
        + New Expense
      </Link>
      Expenses
      <Link to="./raw" className=" block text-blue-500">
        Raw
      </Link>
    </div>
  );
}

export default Expenses;
