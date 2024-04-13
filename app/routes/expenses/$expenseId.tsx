import { useParams } from "@remix-run/react";

function Expense() {
  const { expenseId } = useParams();
  return <div>Expense: {expenseId}</div>;
}

export default Expense;
