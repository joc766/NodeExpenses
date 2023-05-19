-- Insert dummy data into the "Users" table
INSERT INTO "Users" ("userID", "email", "name", "venmo")
VALUES
  (1, 'user1@example.com', 'User 1', 'venmo_user1'),
  (2, 'user2@example.com', 'User 2', 'venmo_user2'),
  (3, 'user3@example.com', 'User 3', 'venmo_user3');

-- Insert dummy data into the "Groups" table
INSERT INTO "Groups" ("groupID", "name")
VALUES
  (1, 'Group 1'),
  (2, 'Group 2'),
  (3, 'Group 3');

-- Insert dummy data into the "User_Groups" table
INSERT INTO "User_Groups" ("userID", "groupID")
VALUES
  (1, 1),
  (2, 1),
  (2, 2),
  (3, 2),
  (3, 3),
  (1, 3);

-- Insert dummy data into the "Expenses" table
INSERT INTO "Expenses" ("expenseID", "title", "amount", "descrip", "who_paid", "n_shares", "date")
VALUES
  (1, 'Expense 1', 120.00, 'Description 1', 1, 2, '2023-05-01'),
  (2, 'Expense 2', 75.00, 'Description 2', 2, 2, '2023-05-02'),
  (3, 'Expense 3', 60.50, 'Description 3', 3, 2, '2023-05-03');

-- Insert dummy data into the "Group_Expenses" table
INSERT INTO "Group_Expenses" ("groupID", "expenseID")
VALUES
  (1, 1),
  (2, 2),
  (3, 3);


INSERT INTO "Dues" ("expenseID", "userID", "shares", "paid") VALUES 
    (1, 1, 1.00, false),
    (1, 2, 1.00, false),
    (2, 2, 1.00, false),
    (2, 3, 1.00, false),
    (3, 3, 1.00, false),
    (3, 1, 1.00, false);
