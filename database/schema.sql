CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE cents AS (
  amount decimal(7,2)
);

CREATE TABLE "Users" (
  "userID" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" varchar(40),
  "user_name" varchar(20),
  "venmo" varchar(30) UNIQUE
);

CREATE TABLE "Groups" (
  "groupID" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "group_name" varchar(30) NOT NULL
);

CREATE TABLE "User_Groups" (
  "userID" uuid,
  "groupID" uuid,
  PRIMARY KEY ("userID", "groupID"),
  FOREIGN KEY ("userID") REFERENCES "Users" ("userID"),
  FOREIGN KEY ("groupID") REFERENCES "Groups" ("groupID")
);

CREATE TABLE "Expenses" (
  "expenseID" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" varchar(40),
  "amount" cents,
  "descrip" text,
  "who_paid" uuid,
  "n_shares" integer,
  "date" date,
  FOREIGN KEY ("who_paid") REFERENCES "Users" ("userID")
);

CREATE TABLE "Group_Expenses" (
  "groupID" uuid,
  "expenseID" uuid,
  PRIMARY KEY ("groupID", "expenseID"),
  FOREIGN KEY ("groupID") REFERENCES "Groups" ("groupID"),
  FOREIGN KEY ("expenseID") REFERENCES "Expenses" ("expenseID")
);

CREATE TABLE "Dues" (
  "expenseID" uuid,
  "userID" uuid,
  "shares" decimal(7,2) NOT NULL,
  "paid" boolean NOT NULL,
  PRIMARY KEY ("expenseID", "userID"),
  FOREIGN KEY ("expenseID") REFERENCES "Expenses" ("expenseID"),
  FOREIGN KEY ("userID") REFERENCES "Users" ("userID")
);

CREATE INDEX ON "Expenses" ("who_paid");

CREATE INDEX ON "Dues" ("expenseID");