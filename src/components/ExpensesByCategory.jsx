import React from "react";
import { calculateTotalExpensesByCategory } from "../helpers/calculateCategoryExpenses";
import { useExpenseStore } from "../store";


const ExpensesByCategory = () => {
  const { expenses } = useExpenseStore();

  return (
    <>
      <h2>Total Expenses by Category</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Expenses</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(calculateTotalExpensesByCategory(expenses)).map(
            ([category, totalExpenses]) => (
              <tr key={category} >
                <td>{category}</td>
                <td>{parseFloat(totalExpenses).toFixed(2)}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default ExpensesByCategory;
