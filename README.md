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
      "name": "John Doe",
      "email": "john@example.com",
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
        "date": 2022-05-15
      },
      {
        "expoenseID": 2,
        "title": "Hotel",
        "amount": 500.00,
        "descrip": "Security deposit only",
        "who_paid": 2,
        "n_shares": 5,
        "date": 2022-05-11
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
        "name": "Group 1",
      },
      {
        "groupID": 2,
        "name": "Group 2",
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

#### GET /users/:id/debt/:debtorId

- Fetches debt information for a specific user and debtor.
- Parameters:
  - `id` (required) - The ID of the user.
  - `debtorID` (required) - The ID of the debtor.
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

#### GET /groups/:id

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

#### GET /groups/:id/users

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
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    ]
    ```

#### GET /groups/:id/expenses

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
        "id": 1,
        "description": "Expense 1",
        "amount": 10.5
      },
      {
        "id": 2,
        "description": "Expense 2",
        "amount": 20.0
      }
    ]
    ```

#### POST /groups

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

#### POST /groups/:id/addUser/:userId

- Adds a user to a specific group.
- Parameters:
  - `id` (required) - The ID of the group.
  - `userId` (required) - The ID of the user to add.
- Response:
  - `200 OK` on success

#### DELETE /groups/:id

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
      "description": "Expense 1",
      "amount": 10.5
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
        "name": "John Doe",
        "email": "john@example.com"
      },
      {
        "id": 2,
        "name": "Jane Smith",
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


