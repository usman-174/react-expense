
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How App Works

The app uses Zustand library for state managment because of minimal boilerplate and easy to use and understanding. The store have 2 type of data `Users` and `Expenses`. 

## Users

To create a `User` you need to provide firstName and lastName

## Expenses

To create an `Expense` you need to provide select an available user and a category from `food,travel,equipment` and a cost.

## Main Feature

The app is designed in such a way to reflect changes in all of the datasets if any change in made in the tables. Also `Delete/Edit` is provided in the table row for flexibility. And an additional data table of total cost by category in extracted from the existing 2 data sets.

