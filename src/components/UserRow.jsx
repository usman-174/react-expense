import React, { useState } from "react";
import { useUsersStore } from "../store";

const UserRow = ({ user }) => {
  // State to manage edit mode and edited user data
  const [isShow, setIsShow] = useState(false);
  const [editUser, setEditUser] = useState(user);

  // Accessing the updateUser and deleteUser actions from the users store
  const updateUser = useUsersStore((state) => state.updateUser);
  const deleteUser = useUsersStore((state) => state.deleteUser);

  // Handler for saving the edited user
  const handleEditSave = () => {
    if (editUser.firstName && editUser.lastName) {
      // Call the updateUser action with the edited user data
      updateUser(editUser);
      setIsShow(false);
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Handler for updating the first name of the edited user
  const handleFirstNameChange = (e) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      firstName: e.target.value,
    }));
  };

  // Handler for updating the last name of the edited user
  const handleLastNameChange = (e) => {
    setEditUser((prevUser) => ({
      ...prevUser,
      lastName: e.target.value,
    }));
  };
  return (
    <tr key={user.id}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{parseFloat(user.totalExpenses).toFixed(2)}</td>

      <td>
        {isShow ? (
          <>
            <input
              type="text"
              value={editUser.firstName}
              onChange={handleFirstNameChange}
            />
            <input
              type="text"
              value={editUser.lastName}
              onChange={handleLastNameChange}
            />
            <button onClick={handleEditSave}>Save</button>
            <button onClick={() => setIsShow(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsShow(true)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
