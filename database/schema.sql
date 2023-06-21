CREATE TABLE "Users" (
  "userID" integer PRIMARY KEY,
  "email" varchar(40),
  "user_name" varchar(20),
  "venmo" varchar(30) UNIQUE
);

CREATE TABLE "Groups" (
  "groupID" integer PRIMARY KEY,
  "group_name" varchar(30) NOT NULL
);

CREATE TABLE "User_Groups" (
  "userID" integer,
  "groupID" integer,
  PRIMARY KEY ("userID", "groupID"),
  FOREIGN KEY ("userID") REFERENCES "Users" ("userID"),
  FOREIGN KEY ("groupID") REFERENCES "Groups" ("groupID")
);

CREATE TABLE "Expenses" (
  "expenseID" integer PRIMARY KEY,
  "title" varchar(40),
  "amount" double(7,2),
  "descrip" text,
  "who_paid" integer,
  "n_shares" integer,
  "date" date,
  FOREIGN KEY ("who_paid") REFERENCES "Users" ("userID")
);

CREATE TABLE "Group_Expenses" (
  "groupID" integer,
  "expenseID" integer,
  PRIMARY KEY ("groupID", "expenseID"),
  FOREIGN KEY ("groupID") REFERENCES "Groups" ("groupID"),
  FOREIGN KEY ("expenseID") REFERENCES "Expenses" ("expenseID")
);

CREATE TABLE "Dues" (
  "expenseID" integer,
  "userID" integer,
  "shares" double(7,2) NOT NULL,
  "paid" boolean NOT NULL,
  PRIMARY KEY ("expenseID", "userID")
  FOREIGN KEY ("expenseID") REFERENCES "Expenses" ("expenseID"),
  FOREIGN KEY ("userID") REFERENCES "Users" ("userID")
);

CREATE INDEX ON "Expenses" ("who_paid");

CREATE INDEX ON "Dues" ("expenseID");