import { CATEGORIES } from "../components/AddExpense";

function calculateTotalExpensesByCategory(expenses) {
  // Parse the JSON string into an array of objects
  const data = expenses;

  // Create an object to store the category-wise total cost
  const result = {};

  // Initialize the result object with the categories and set the total cost to 0

  CATEGORIES.forEach((category) => {
    result[category] = 0;
  });

  // Iterate over each object in the data array
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const category = item.category.toLowerCase();
    const cost = parseFloat(item.cost);

    // If the category exists in the result object, add the cost to the existing category total
    if (result.hasOwnProperty(category)) {
      result[category] += cost;
    }
  }

  // Return the result object
  return result;
}

export { calculateTotalExpensesByCategory };
