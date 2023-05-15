CREATE TABLE "Users" (
  "userId" integer PRIMARY KEY,
  "email" varchar(40),
  "name" varchar(20),
  "venmo" varchar(30) UNIQUE
);

CREATE TABLE "Groups" (
  "groupId" integer PRIMARY KEY,
  "group_name" varchar(30) NOT NULL
);

CREATE TABLE "User_Groups" (
  "userID" integer,
  "groupID" integer,
  PRIMARY KEY ("userID", "groupID")
);

CREATE TABLE "Expenses" (
  "expenseId" integer PRIMARY KEY,
  "expense_name" varchar(40),
  "amount" double(7,2),
  "description" text,
  "who_paid" integer,
  "num_shares" integer,
  "person_cost" double(7,2),
  "date" date
);

CREATE TABLE "Group_Expenses" (
  "groupID" integer,
  "expenseID" integer,
  PRIMARY KEY ("groupID", "expenseID")
);

CREATE TABLE "Dues" (
  "expenseId" integer,
  "userId" integer,
  "shares" double(7,2) NOT NULL,
  "paid" boolean NOT NULL,
  PRIMARY KEY ("expenseId", "userId")
);

ALTER TABLE "User_Groups" ADD FOREIGN KEY ("userID") REFERENCES "Users" ("userId");

ALTER TABLE "User_Groups" ADD FOREIGN KEY ("groupID") REFERENCES "Groups" ("groupId");

ALTER TABLE "Expenses" ADD FOREIGN KEY ("who_paid") REFERENCES "Users" ("userId");

ALTER TABLE "Group_Expenses" ADD FOREIGN KEY ("groupID") REFERENCES "Groups" ("groupId");

ALTER TABLE "Group_Expenses" ADD FOREIGN KEY ("expenseID") REFERENCES "Expenses" ("expenseId");

ALTER TABLE "Dues" ADD FOREIGN KEY ("expenseId") REFERENCES "Expenses" ("expenseId");

ALTER TABLE "Dues" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("userId");
