import AddExpense from "./components/AddExpense";
import Expenses from "./components/Expenses";
import ExpensesByCategory from "./components/ExpensesByCategory";
import Users from "./components/Users";
import AddUser from "./components/addUser";

function App() {
  return (
    <div style={{ margin: "20px" }}>
      <ExpensesByCategory />
      <hr />
      <Expenses />
      <hr />
      <AddExpense />
      <hr />
      <Users />
      <hr />
      <AddUser />
    </div>
  );
}

export default App;
