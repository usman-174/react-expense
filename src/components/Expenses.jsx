import React from "react";
import useExpenseStore from "../store";
import ExpanseRow from "./ExpanseRow";

const Expenses = () => {
  const { expenses } = useExpenseStore();
  return (
    <>
      {expenses.length ? (
        <>
          <h2>Expenses</h2>
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
                <ExpanseRow key={expense.id} expense={expense} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1>No Expenses</h1>
      )}
    </>
  );
};

export default Expenses;
