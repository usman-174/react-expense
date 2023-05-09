import React, { useState } from "react";
import { useExpenseStore, useUsersStore } from "../store";

const AddExpense = () => {
  // State to manage the form input values for the new expense
  const [expense, setExpense] = useState({
    fullName: "",
    category: "",
    description: "",
    cost: "",
    userId: "",
  });

  // Accessing the users data from the users store
  const users = useUsersStore((state) => state.users);

  // Accessing the addExpense action from the expense store
  const addExpense = useExpenseStore((state) => state.addExpense);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validating the expense fields
    if (validateExpense()) {
      // Parsing and validating the cost
      const parsedCost = parseFloat(expense.cost);
      if (!isNaN(parsedCost) && parsedCost >= 0) {
        // Creating a new expense object with a unique ID and formatted cost
        const newExpense = {
          ...expense,
          id: String(Date.now()),
          cost: parsedCost.toFixed(2),
        };

        // Call the addExpense action with the new expense data
        addExpense(newExpense);
        resetExpense();
      } else {
        alert("Please enter a valid cost.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Function to validate the expense fields
  const validateExpense = () => {
    return (
      expense.fullName !== "" &&
      expense.category !== "" &&
      expense.description !== "" &&
      expense.cost !== "" &&
      expense.userId !== ""
    );
  };

  // Function to reset the expense form
  const resetExpense = () => {
    setExpense({
      fullName: "",
      category: "",
      description: "",
      cost: "",
      userId: "",
    });
  };

  // Handler for updating the user of the new expense
  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    const selectedUser = users.find((user) => user.id === selectedUserId);
    if (selectedUser) {
      setExpense((prevExpense) => ({
        ...prevExpense,
        userId: selectedUserId,
        fullName: selectedUser.firstName + " " + selectedUser.lastName,
      }));
    }
  };

  // Handler for updating the input values of the expense fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <select value={expense.userId} onChange={handleUserChange}>
          <option value="">Select Full Name</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName + " " + user.lastName}
            </option>
          ))}
        </select>
        <select
          value={expense.category}
          onChange={handleInputChange}
          name="category"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Equipment">Equipment</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={expense.description}
          onChange={handleInputChange}
          name="description"
        />
        <input
          type="text"
          placeholder="Cost"
          value={expense.cost}
          onChange={handleInputChange}
          name="cost"
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
