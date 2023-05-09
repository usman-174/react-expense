import React, { useState } from "react";
import { useUsersStore } from "../store";

const AddUser = () => {
  // State variables for first name and last name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const addUser = useUsersStore((state) => state.addUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if either first name or last name is missing
    if (!firstName?.length || !lastName?.length) {
      alert("Please fill the field!");
      return;
    }

    // Add the user if both first name and last name are present
    if (firstName && lastName) {
      const user = {
        id: String(Date.now()),
        firstName,
        lastName,
        totalExpenses: 0,
      };
      addUser(user);
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for first name */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {/* Input field for last name */}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {/* Submit button */}
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
