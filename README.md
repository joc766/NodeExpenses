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
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "venmo": johndoe
    }
    ```

#### GET /users/:id/transactions

- Fetches transactions for a specific user.
- Parameters:
  - `id` (required) - The ID of the user to retrieve transactions for.
  - `unpaidOnly` (optional) - Retrieve only unpaid transactions (boolean).
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user with the given ID doesn't exist
  - Example Response:
    ```json
    [
      {
        "id": 1,
        "description": "Expense 1",
        "amount": 10.5,
        "paid": true
      },
      {
        "id": 2,
        "description": "Expense 2",
        "amount": 20.0,
        "paid": false
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
        "id": 1,
        "name": "Group 1",
        "description": "Group 1 description"
      },
      {
        "id": 2,
        "name": "Group 2",
        "description": "Group 2 description"
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
      "id": 1,
      "debtorId": 2,
      "amount": 50.0
    }
    ```

#### GET /users/:id/debt/:debtorId

- Fetches debt information for a specific user and debtor.
- Parameters:
  - `id` (required) - The ID of the user.
  - `debtorId` (required) - The ID of the debtor.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user or debtor with the given IDs don't exist
  - Example Response:
    ```json
    {
      "id": 1,
      "debtorId": 2,
      "amount": 50.0
    }
    ```

#### PUT /users/:id/payAll/:debtorId

- Pays all debt for a user to a specific debtor.
- Parameters:
  - `id` (required) - The ID of the user.
  - `debtorId` (required) - The ID of the debtor.
- Response:
  - `200 OK` on success
  - `404 Not Found` if the user or debtor with the given IDs don't exist

#### POST /users

- Creates a new user.
- Response:
  - `200 OK` on success
  - Example Response:
    ```json
    {
      "id": 3,
      "name": "Alice Smith",
      "email": "alice@example.com"
    }
    ```

#### POST /users/register

- Registers a new user.
- Response:
  - `200 OK` on success
  - Example Response:
    ```json
    {
      "id": 4,
      "name": "Bob Johnson",
      "email": "bob@example.com"
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
      "id": 1,
      "name": "Group 1",
      "description": "Group 1 description"
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

Please note that the above documentation assumes the usage of Express.js router and asynchronous functions for handling the endpoints.


