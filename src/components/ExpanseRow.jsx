import React, { useState } from "react";
import useExpenseStore from "../store";

const ExpanseRow = ({ expense }) => {
  const [isShow, setIsShow] = useState(false);
  const [editExpense, setEditExpense] = useState(expense);
  const updateExpense = useExpenseStore((state) => state.updateExpense);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);


  const handleEditSave = () => {
    if (
      editExpense.fullName &&
      editExpense.category &&
      editExpense.description &&
      editExpense.cost &&
      editExpense.userId
    ) {
      const parsedCost = parseFloat(editExpense.cost);
      if (!isNaN(parsedCost) && parsedCost >= 0) {
        const updatedExpense = {
          ...editExpense,
          cost: parsedCost.toFixed(2),
        };
        updateExpense(updatedExpense);
        setIsShow(false);
      } else {
        alert("Please enter a valid cost.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <>
      <tr key={expense.id}>
        <td>{expense.fullName}</td>
        <td>{expense.category}</td>
        <td>{expense.description}</td>
        <td>{expense.cost}</td>

        <td>
          {isShow ? (
            <>
              <select
                value={editExpense.category}
                onChange={(e) =>
                  setEditExpense((prevExpense) => ({
                    ...prevExpense,
                    category: e.target.value,
                  }))
                }
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Equipment">Equipment</option>
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
              <button onClick={() => setIsShow((show) => !show)}>Edit</button>
              <button onClick={()=>deleteExpense(expense.id)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default ExpanseRow;
