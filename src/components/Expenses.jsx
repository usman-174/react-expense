import React from "react";

import ExpenseRow from "./ExpanseRow";
import { useExpenseStore } from "../store";


const Expenses = () => {
  const { expenses } = useExpenseStore();

  return (
    <>
      <h2>Expenses</h2>
      {expenses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No Expenses</h1>
      )}
    </>
  );
};

export default Expenses;
