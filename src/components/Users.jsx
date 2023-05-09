import React from "react";
import { useUsersStore } from "../store";
import UserRow from "./UserRow";

const Users = () => {
  const { users } = useUsersStore();
  return (
    <>
      {users.length ? (
        <div>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Total Expenses</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow key={user.id}user={user} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No Users</h1>
      )}
    </>
  );
};

export default Users;
