import React, { useState } from "react";
import { useExpenseStore, useUsersStore } from "../store";
import { CATEGORIES } from "./AddExpense";

const ExpenseRow = ({ expense }) => {
  // State to manage edit mode and edited expense data
  const [isShow, setIsShow] = useState(false);
  const [editExpense, setEditExpense] = useState(expense);

  // Accessing the updateExpense and deleteExpense actions from the expense store
  const updateExpense = useExpenseStore((state) => state.updateExpense);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  // Accessing the users data from the users store
  const users = useUsersStore((state) => state.users);

  // Handler for saving the edited expense
  const handleEditSave = () => {
    // Validating expense fields
    if (!validateExpense(editExpense)) {
      alert("Please fill out all fields.");
      return;
    }

    // Parsing and validating the cost
    const parsedCost = parseFloat(editExpense.cost);
    if (isNaN(parsedCost) || parsedCost < 0) {
      alert("Please enter a valid cost.");
      return;
    }

    // Updating the expense with the parsed cost
    const updatedExpense = {
      ...editExpense,
      cost: parsedCost.toFixed(2),
    };

    // Call the updateExpense action with the updated expense data
    updateExpense(updatedExpense);
    setIsShow(false);
  };

  // Function to validate the expense fields
  const validateExpense = (expense) => {
    return (
      expense.fullName.trim().length > 0 &&
      expense.category.trim().length > 0 &&
      expense.description.trim().length > 0 &&
      expense.cost.trim().length > 0 &&
      expense.userId.trim().length > 0
    );
  };

  // Handler for updating the user of the edited expense
  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    const selectedUser = users.find((user) => user.id === selectedUserId);
    if (selectedUser) {
      setEditExpense((prevExpense) => ({
        ...prevExpense,
        userId: selectedUserId,
        fullName: selectedUser.firstName + " " + selectedUser.lastName,
      }));
    }
  };
  return (
    <tr key={expense.id}>
      <td>{expense.fullName}</td>
      <td>{expense.category}</td>
      <td>{expense.description}</td>
      <td>{expense.cost}</td>
      <td>
        {isShow ? (
          <>
            <select value={editExpense.userId} onChange={handleUserChange}>
              <option value="">Select Full Name</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName + " " + user.lastName}
                </option>
              ))}
            </select>

            <select
              value={editExpense.category}
              onChange={(e) =>
                setEditExpense((prevExpense) => ({
                  ...prevExpense,
                  category: e.target.value,
                }))
              }
              name="category"
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat, i) => {
                return (
                  <option key={i} value={cat}>
                    {cat.toUpperCase()}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              value={editExpense.description}
              onChange={(e) =>
                setEditExpense((prevExpense) => ({
                  ...prevExpense,
                  description: e.target.value,
                }))
              }
            />
            <input
              type="text"
              value={editExpense.cost}
              onChange={(e) =>
                setEditExpense((prevExpense) => ({
                  ...prevExpense,
                  cost: e.target.value,
                }))
              }
            />
            <button onClick={handleEditSave}>Save</button>
            <button onClick={() => setIsShow((show) => !show)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsShow(true)}>Edit</button>
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ExpenseRow;
