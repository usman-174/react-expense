import React, { useState } from "react";
import { useUsersStore } from "../store";

const UserRow = ({ user }) => {
  const [isShow, setIsShow] = useState(false);
  const [editUser, setEditUser] = useState(user);
  const updateExpense = useUsersStore((state) => state.updateUser);
  const deleteExpense = useUsersStore((state) => state.deleteUser);

  const handleEditSave = () => {
    if (editUser.firstName && editUser.lastName) {
      updateExpense(editUser);
      setIsShow(false);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <tr key={user.id}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{parseInt(user.totalExpenses).toFixed(2)}</td>

      <td>
        {isShow ? (
          <>
            <input
              type="text"
              value={editUser.firstName}
              onChange={(e) =>
                setEditUser((prevUser) => ({
                  ...prevUser,
                  firstName: e.target.value,
                }))
              }
            />
            <input
              type="text"
              value={editUser.lastName}
              onChange={(e) =>
                setEditUser((prevUser) => ({
                  ...prevUser,
                  lastName: e.target.value,
                }))
              }
            />
            <button onClick={handleEditSave}>Save</button>
            <button onClick={() => setIsShow(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsShow(true)}>Edit</button>
            <button onClick={() => deleteExpense(user.id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
