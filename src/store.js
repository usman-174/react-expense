import { create } from "zustand";
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

const useUsersStore = create((set) => ({
  // Initial state with users data
  users: savedUsers,

  // Function to update the users state
  setUsers: (users) => set({ users }),

  // Function to update a specific user
  updateUser: (updatedUser) =>
    set((state) => {
      // Map through the users array and replace the updated user
      const updatedUsers = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );

      // Update the users data in localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Retrieve the expenses data from the expense store
      const updatedExpenses = useExpenseStore
        .getState()
        .expenses.map((expense) => {
          // If the expense belongs to the updated user, update the fullName property
          if (expense.userId === updatedUser.id) {
            return {
              ...expense,
              fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
            };
          }
          return expense;
        });

      // Update the expenses data in the expense store
      useExpenseStore.getState().setExpenses(updatedExpenses);

      // Update the expenses data in localStorage
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      // Return the updated users state
      return { users: updatedUsers };
    }),

  // Function to delete a user
  deleteUser: (userId) =>
    set((state) => {
      // Filter out the user with the specified userId
      const updatedUsers = state.users.filter((user) => user.id !== userId);

      // Update the users data in localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Retrieve the expenses data from the expense store
      const updatedExpenses = useExpenseStore
        .getState()
        .expenses.filter((expense) => expense.userId !== userId);

      // Update the expenses data in the expense store
      useExpenseStore.getState().setExpenses(updatedExpenses);

      // Update the expenses data in localStorage
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      // Return the updated users state
      return { users: updatedUsers };
    }),

  // Function to add a new user
  addUser: (user) =>
    set((state) => {
      // Add the new user to the users array
      const updatedUsers = [...state.users, user];

      // Update the users data in localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Return the updated users state
      return { users: updatedUsers };
    }),
}));

const useExpenseStore = create((set) => ({
  // Initial state with expenses data
  expenses: savedExpenses,

  // Function to update the expenses state
  setExpenses: (expenses) => set({ expenses }),

  // Function to add a new expense
  addExpense: (expense) =>
    set((state) => {
      // Add the new expense to the expenses array
      const updatedExpenses = [...state.expenses, expense];

      // Update the expenses data in localStorage
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      // Retrieve the users data from the user store
      const users = useUsersStore.getState().users;

      // Map through the users array and update the totalExpenses for the user associated with the new expense
      const updatedUsers = users.map((user) => {
        if (user.id === expense.userId) {
          const totalExpense = user.totalExpenses + Number(expense.cost);
          return { ...user, totalExpenses: totalExpense };
        }
        return user;
      });

      // Update the users data in the user store
      useUsersStore.getState().setUsers(updatedUsers);

      // Update the users data in localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Return the updated expenses state
      return { expenses: updatedExpenses };
    }),

  // Function to delete an expense
  deleteExpense: (expenseId) =>
    set((state) => {
      // Filter out the expense with the specified expenseId
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== expenseId
      );

      // Update the expenses data in localStorage
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      // Retrieve the users data from the user store
      const users = useUsersStore.getState().users;

      // Map through the users array and recalculate the totalExpenses for each user
      const updatedUsers = users.map((user) => {
        // Filter expenses that belong to the current user
        const userExpenses = updatedExpenses.filter(
          (expense) => user.id === expense.userId
        );

        // Calculate the new totalExpense for the user based on the filtered expenses
        const totalExpense = userExpenses.reduce(
          (total, expense) => total + Number(expense.cost),
          0
        );

        return { ...user, totalExpenses: totalExpense };
      });

      // Update the users data in the user store
      useUsersStore.getState().setUsers(updatedUsers);

      // Update the users data in localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Return the updated expenses state
      return { expenses: updatedExpenses };
    }),

  updateExpense: (updatedExpense) =>
    set((state) => {
      // Map through the expenses array and replace the updated expense
      const updatedExpenses = state.expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      );

      // Update the expenses data in localStorage
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      // Retrieve the users data from the user store
      const users = useUsersStore.getState().users;

      // Map through the users array and recalculate the totalExpenses for each user
      const updatedUsers = users.map((user) => {
        // Filter expenses that belong to the current user
        const expenses = updatedExpenses.filter(
          (expense) => expense.userId === user.id
        );
        // Calculate the new totalExpense for the user based on the filtered expenses
        const totalExpense = expenses.reduce(
          (total, expense) => total + Number(expense.cost),
          0
        );

        return { ...user, totalExpenses: totalExpense };
      });

      // Update the users data in the user store
      useUsersStore.getState().setUsers(updatedUsers);

      // Update the users data in localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Return the updated expenses state
      return { expenses: updatedExpenses };
    }),
}));

export { useExpenseStore, useUsersStore };
