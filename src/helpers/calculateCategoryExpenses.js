const calculateTotalExpensesByCategory = (expenses) => {
    const totalExpensesByCategory = {};
  
    expenses.forEach((expense) => {
      const { category, cost } = expense;
  
      if (totalExpensesByCategory.hasOwnProperty(category)) {
        totalExpensesByCategory[category] += parseFloat(cost);
      } else {
        totalExpensesByCategory[category] = parseFloat(cost);
      }
    });
  
    return totalExpensesByCategory;
  };

  export {calculateTotalExpensesByCategory}