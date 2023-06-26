# NodeExpenses
Shared Expenses v2 using PERN stack

## Backend API Documentation


## Endpoints

### Users Endpoints

#### GET /users/:id

- Fetches a specific user by ID.
- Parameters:
  - `id` (required) - The ID of the user to retrieve.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user with the given ID doesn't exist
  - Example Response:
    ```json
    {
      "userID": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "venmo": "johndoe"
    }
    ```

#### GET /users/:id/expenses

- Fetches expenses for a specific user.
- Parameters:
  - `id` (required) - The ID of the user to retrieve expenses for.
  - `unpaidOnly` (optional) - Retrieve only unpaid expenses (boolean).
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user with the given ID doesn't exist
  - Example Response:
    ```json
    [
      {
        "expoenseID": 1,
        "title": "Groceries",
        "amount": 25.00,
        "descrip": "Bought apples, oranges, and bananas",
        "who_paid": 1,
        "n_shares": 5,
        "date": 2022-05-15,
        "userID": 2,
        "paid": false,
      },
      {
        "expoenseID": 2,
        "title": "Hotel",
        "amount": 500.00,
        "descrip": "Security deposit only",
        "who_paid": 2,
        "n_shares": 5,
        "date": 2022-05-11,
        "userID": 1,
        "paid": true,
      }
    ]
    ```

#### GET /users/:id/groups

- Fetches groups for a specific user.
- Parameters:
  - `id` (required) - The ID of the user to retrieve groups for.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user with the given ID doesn't exist
  - Example Response:
    ```json
    [
      {
        "groupID": 1,
        "group_name": "Group 1",
      },
      {
        "groupID": 2,
        "grou_name": "Group 2",
      }
    ]
    ```

#### GET /users/:id/debt

- Fetches debt information for a specific user.
- Parameters:
  - `id` (required) - The ID of the user to retrieve debt information for.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user with the given ID doesn't exist
  - Example Response:
    ```json
    {
      "debt": 52.00
    }
    ```

#### GET /users/:id/debt

- Fetches debt information for a specific user and debtor.
- Parameters:
  - `id` (required) - The ID of the user.
- Query Parameters:
  - `debtorID` (optional) - The ID of the debtor. Default gives total user debt. 
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user or debtor with the given IDs don't exist
  - Example Response:
    ```json
    {
      "debt": 5.00
    }
    ```

#### PUT /users/:id/payAll/:debtorId

- Pays all debt for a user to a specific debtor.
- Parameters:
  - `id` (required) - The ID of the user.
  - `debtorID` (required) - The ID of the debtor.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user or debtor with the given IDs don't exist

#### POST /users

- Creates a new user.
- Request: 
  - Content-type: `application/json`
  - Body parameters:
    - `name`
    - `email`
    - `venmo`
- Response:
  - `200 OK` on success
  - Example Response:
    ```json
    {
      "userID": 3,
      "name": "Alice Smith",
      "email": "alice@example.com",
      "venmo": "alicesmith"
    }
    ```

#### DELETE /users/:id

- Deletes a user.
- Parameters:
  - `id` (required) - The ID of the user to delete.
- Response:
  - `200 OK` on success

### Groups Endpoints

#### GET /group/:id

- Fetches a specific group by ID.
- Parameters:
  - `id` (required) - The ID of the group to retrieve.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the group with the given ID doesn't exist
  - Example Response:
    ```json
    {
      "groupID": 1,
      "name": "Group 1",
    }
    ```

#### GET /group/:id/users

- Fetches users in a specific group.
- Parameters:
  - `id` (required) - The ID of the group to retrieve users for.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the group with the given ID doesn't exist
  - Example Response:
    ```json
      [
        {
          "userID":1,
          "email":"user1@example.com",
          "name":"User 1",
          "venmo":"venmo_user1"
         },
         {
          "userID":2,
          "email":"user2@example.com",
          "name":"User 2",
          "venmo":"venmo_user2"
         }
       ]
    ```

#### GET /group/:id/expenses

- Fetches expenses for a specific group.
- Parameters:
  - `id` (required) - The ID of the group to retrieve expenses for.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the group with the given ID doesn't exist
  - Example Response:
    ```json
    [
      {
        "expenseID": 1,
        "title": "Expense 1",
        "amount": 10.5,
        "descrip": "description",
      },
      {
        "id": 2,
        "title": "Expense 2",
        "amount": 20.0,
        "descrip": "description",
      }
    ]
    ```

#### POST /group

- Creates a new group.
- Response:
  - `200 OK` on success
  - Example Response:
    ```json
    {
      "id": 3,
      "name": "Group 3",
      "description": "Group 3 description"
    }
    ```

#### POST /group/:id/addUser/:userId

- Adds a user to a specific group.
- Parameters:
  - `id` (required) - The ID of the group.
  - `userId` (required) - The ID of the user to add.
- Response:
  - `200 OK` on success

#### DELETE /group/:id

- Deletes a group.
- Parameters:
  - `id` (required) - The ID of the group to delete.
- Response:
  - `200 OK` on success

### Expenses Endpoints

#### GET /expenses/:id

- Fetches a specific expense by ID.
- Parameters:
  - `id` (required) - The ID of the expense to retrieve.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the expense with the given ID doesn't exist
  - Example Response:
    ```json
    {
      "id": 1,
      "title": "Expense 1",
      "description": "Expense 1",
      "amount": 75,
      "who_paid": 1,
      "n_shares": 3,
      "date": 2023-05-02
    }
    ```

#### GET /expenses/:id/contributors

- Fetches contributors for a specific expense.
- Parameters:
  - `id` (required) - The ID of the expense to retrieve contributors for.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the expense with the given ID doesn't exist
  - Example Response:
    ```json
    [
      {
        "id": 1,
        "user_name": "John Doe",
        "venmo": "johnDoe1",
        "email": "john@example.com"
      },
      {
        "id": 2,
        "user_name": "Jane Smith",
        "venmo": "janesmith1",
        "email": "jane@example.com"
      }
    ]
    ```

#### POST /expenses

- Creates a new expense.
- Request Body:
  - `title` (required)
  - `description` (required) 
  - `amount` (required)
  - `n_shares` (required)
  - `who_paid` (required) - the userID of the person who paid
  - `date` (required)
- Response:
  - `200 OK` on success
  - Example Response:
    ```json
    {
      "id": 3,
      "description": "Expense 3",
      "amount": 15.0
    }
    ```

### Dues Endpoints

#### PUT /dues/:id/pay

- Pays a due by ID.
- Parameters:
  - `id` (required) - The ID of the due to pay.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the due with the given ID doesn't exist

#### PUT /dues/:id/markAsPaid

- Marks a due as paid by ID.
- Parameters:
  - `id` (required) - The ID of the due to mark as paid.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the due with the given ID doesn't exist

#### DELETE /dues/:id

- Deletes a due by ID.
- Parameters:
  - `id` (required) - The ID of the due to delete.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the due with the given ID doesn't exist



## Database Documentation

### ALL OF THE DATABASE DATES ARE BASED ON THE DATE IT WAS IN GMT 

### TODO MAYBE I SHOULD CHANGE THAT SYSTEM ^^^

### Commands to access 

- docker exec -it add3863344f5 psql -U jackoconnor -d expenses
  - start command-line session

- docker exec -it add3863344f5 psql -U jackoconnor -d expenses -f /reset.sql
  - reset the database

- docker exec -it add3863344f5 psql -U jackoconnor -d expenses -f /dummy_data.sql
  - insert the dummy data into the database
