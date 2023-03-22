## Problem Instructions

Write a React page that contains a table display a list of transactions fetched from server
The whole assignment should take no more than 4 hours to complete
Be sure to commit and push all your change to your own Github repo when you are finished

### Features:

-   A table display of transactions fetched from server. the table should have these columns:
    -   id
    -   date
    -   mechant
    -   amount
    -   note
    -   category name
    -   actions
-   In actions column, display an edit button. when click on it:

    -   Turn a whole transaction row into a view that allow user to edit the following columns:
        -   Category (optional)
        -   Date (optional)
        -   Note (optional)
        -   actions now contains a save button and a cancel button
    -   click on save will trigger a request ` PATCH/transactions/:id`
    -   click on cancel will switch back to the original transaction view

-   Handle cases when:
    -   there is no transactions,
    -   error getting transactions, display proper error message
    -   error editing transactions, display proper error message
-   Write unit tests for the component and functions

-   Optional/Bonus: Declare Type/Interface as you see fit
-   Optional/Bonus: Use react-query to cache/refresh api data when needed. [https://react-query-v3.tanstack.com](https://react-query-v3.tanstack.com)

### Review criteria

-   Working code
-   Clean/Testable code
-   Attention to detail

### Server API endpoints

`GET /transactions`

examples response:

```
[{
    id: '1',
    date: '2023-03-10',
    mechant: 'starbuck',
    note: '',
    amount: 5.95,
    category: '1'
}]
```

`GET /transaction_categories`

example response:

```
[{
    id: '1',
    name: "Restaurant"
},{
    id: '2',
    name: "Grocery"
},{
    id: '3',
    name: "Gas"
},]
```

`PATCH /transaction/1`

example body payload:

```
{
    category: '2',
    date: '2023-02-15',
    note: ''
}
```

`DELETE /transaction/1`

## Available Scripts

In the project directory, you can run:

### `yarn`

Install all the required node library\

### `yarn start`

Runs the app in the development mode.\

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
