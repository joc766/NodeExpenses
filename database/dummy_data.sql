-- Insert dummy data into the "Users" table
INSERT INTO "Users" ("email", "user_name", "venmo")
VALUES
  ('user1@example.com', 'User 1', 'venmo_user1'),
  ('user2@example.com', 'User 2', 'venmo_user2'),
  ('user3@example.com', 'User 3', 'venmo_user3');

-- Insert dummy data into the "Groups" table
INSERT INTO "Groups" ("group_name")
VALUES
  ('Group 1'),
  ('Group 2'),
  ('Group 3');

-- Insert dummy data into the "User_Groups" table
INSERT INTO "User_Groups" ("userID", "groupID")
VALUES
  ((SELECT "userID" FROM "Users" WHERE "email" = 'user1@example.com'), (SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 1')),
  ((SELECT "userID" FROM "Users" WHERE "email" = 'user2@example.com'), (SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 1')),
  ((SELECT "userID" FROM "Users" WHERE "email" = 'user2@example.com'), (SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 2')),
  ((SELECT "userID" FROM "Users" WHERE "email" = 'user3@example.com'), (SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 2')),
  ((SELECT "userID" FROM "Users" WHERE "email" = 'user3@example.com'), (SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 3')),
  ((SELECT "userID" FROM "Users" WHERE "email" = 'user1@example.com'), (SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 3'));

-- Insert dummy data into the "Expenses" table
INSERT INTO "Expenses" ("title", "amount", "descrip", "who_paid", "n_shares", "date")
VALUES
  ('Expense 1', 120.00, 'Description 1', (SELECT "userID" FROM "Users" WHERE "email" = 'user1@example.com'), 2, '2023-05-01'),
  ('Expense 2', 75.00, 'Description 2', (SELECT "userID" FROM "Users" WHERE "email" = 'user2@example.com'), 2, '2023-05-02'),
  ('Expense 3', 60.50, 'Description 3', (SELECT "userID" FROM "Users" WHERE "email" = 'user3@example.com'), 2, '2023-05-03');

-- Insert dummy data into the "Group_Expenses" table
INSERT INTO "Group_Expenses" ("groupID", "expenseID")
VALUES
  ((SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 1'), (SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 1')),
  ((SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 2'), (SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 2')),
  ((SELECT "groupID" FROM "Groups" WHERE "group_name" = 'Group 3'), (SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 3'));

-- Insert dummy data into the "Dues" table
INSERT INTO "Dues" ("expenseID", "userID", "shares", "paid")
VALUES
  ((SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 1'), (SELECT "userID" FROM "Users" WHERE "email" = 'user1@example.com'), 1.00, false),
  ((SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 1'), (SELECT "userID" FROM "Users" WHERE "email" = 'user2@example.com'), 1.00, false),
  ((SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 2'), (SELECT "userID" FROM "Users" WHERE "email" = 'user2@example.com'), 1.00, false),
  ((SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 2'), (SELECT "userID" FROM "Users" WHERE "email" = 'user3@example.com'), 1.00, false),
  ((SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 3'), (SELECT "userID" FROM "Users" WHERE "email" = 'user3@example.com'), 1.00, false),
  ((SELECT "expenseID" FROM "Expenses" WHERE "title" = 'Expense 3'), (SELECT "userID" FROM "Users" WHERE "email" = 'user1@example.com'), 1.00, false);
