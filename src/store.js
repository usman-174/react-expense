import { create } from "zustand";
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
const useUsersStore = create((set) => ({
  users: savedUsers,
  setUsers: (users) => set({ users }),
  updateUser: (updatedUser) =>
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const updatedExpenses = useExpenseStore
        .getState()
        .expenses.map((expense) => {
          if (expense.userId === updatedUser.id) {
            return {
              ...expense,
              fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
            };
          }
          return expense;
        });

      useExpenseStore.getState().setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      return { users: updatedUsers };
    }),
  deleteUser: (userId) =>
    set((state) => {
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const updatedExpenses = useExpenseStore
        .getState()
        .expenses.filter((expense) => expense.userId !== userId);

      useExpenseStore.getState().setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      return { users: updatedUsers };
    }),
  addUser: (user) =>
    set((state) => {
      const updatedUsers = [...state.users, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    }),
}));

const useExpenseStore = create((set) => ({
  expenses: savedExpenses,
  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) =>
    set((state) => {
      const updatedExpenses = [...state.expenses, expense];
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      const users = useUsersStore.getState().users;
      const updatedUsers = users.map((user) => {
        if (user.id === expense.userId) {
          const totalExpense = user.totalExpenses + Number(expense.cost);
          return { ...user, totalExpenses: totalExpense };
        }
        return user;
      });

      useUsersStore.getState().setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return { expenses: updatedExpenses };
    }),
  deleteExpense: (expenseId) =>
    set((state) => {
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== expenseId
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      const users = useUsersStore.getState().users;
      const updatedUsers = users.map((user) => {
        const userExpenses = updatedExpenses.filter(
          (expense) => user.id === expense.userId
        );
        const totalExpense = userExpenses.reduce(
          (total, expense) => total + Number(expense.cost),
          0
        );
        return { ...user, totalExpenses: totalExpense };
      });

      useUsersStore.getState().setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return { expenses: updatedExpenses };
    }),
  updateExpense: (updatedExpense) =>
    set((state) => {
      const updatedExpenses = state.expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      const users = useUsersStore.getState().users;
      const updatedUsers = users.map((user) => {
        const expenses = updatedExpenses.filter(
          (expense) => expense.userId === user.id
        );
        const totalExpense = expenses.reduce(
          (total, expense) => total + Number(expense.cost),
          0
        );
        return { ...user, totalExpenses: totalExpense };
      });

      useUsersStore.getState().setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return { expenses: updatedExpenses };
    }),
}));

export default useExpenseStore;

export { useExpenseStore, useUsersStore };
