import React, { useState } from "react";
import { useUsersStore } from "../store";

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const addUser = useUsersStore((state) => state.addUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName?.length || !lastName?.length) {
      alert("Please fill the field!");
      return;
    }
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
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
