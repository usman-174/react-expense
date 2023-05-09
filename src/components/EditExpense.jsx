import React, { useState, useEffect } from "react";
import { useExpenseStore, useUsersStore } from "../store";

const EditExpense = ({ expense, isShow }) => {
  const [fullName, setFullName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [userId, setUserId] = useState("");

  const users = useUsersStore((state) => state.users);
  const addExpense = useExpenseStore((state) => state.addExpense);

  useEffect(() => {
    setFullName(expense.fullName);
    setCategory(expense.category);
    setDescription(expense.description);
    setCost(expense.cost);
    setUserId(expense.userId);
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName && category && description && cost && userId) {
      const parsedCost = parseFloat(cost);
      if (!isNaN(parsedCost) && parsedCost >= 0) {
        const updatedExpense = {
          ...expense,
          fullName,
          category,
          description,
          cost: parsedCost.toFixed(2),
          userId,
        };
        addExpense(updatedExpense);
        setFullName("");
        setCategory("");
        setUserId("");
        setDescription("");
        setCost("");
      } else {
        alert("Please enter a valid cost.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  //   const handleUserChange = (e) => {
  //     if (users.length) {
  //       const found = users.find((x) => x.id === e.target.value);
  //       if (found) {
  //         setUserId(e.target.value);
  //         setFullName(found.firstName + " " + found.lastName);
  //       }
  //     }
  //   };
  if (!isShow) return "";
  return (
    <div>
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        {/* <select value={userId} onChange={handleUserChange}>
          <option value="">Select Full Name</option>
          {users.map((user) => (
            <option
              key={user.id}
              style={{ color: "black" }}
              value={user.id}
            >
              {user.firstName + " " + user.lastName}
            </option>
          ))}
        </select> */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Equipment">Equipment</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpense;
