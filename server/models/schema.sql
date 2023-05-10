CREATE TABLE Groups (
    id INTEGER NOT NULL PRIMARY KEY,
    Group_name varchar(30) NOT NULL
);

CREATE TABLE Users (
    id INTEGER NOT NULL PRIMARY KEY,
    Name varchar(20),
    Username varchar(20) UNIQUE,
    Debt NUMERIC(7,2),
    Venmo varchar(30),
    groupID INTEGER NOT NULL,
    Hash TEXT,
    FOREIGN KEY(groupID) REFERENCES Groups(id)
);

CREATE TABLE Expenses (
    id INTEGER NOT NULL PRIMARY KEY,
    Amount DOUBLE(7,2),
    Expense_name TEXT,
    Who_paid INTEGER,
    Num_shares INTEGER,
    Person_cost DOUBLE(7,2),
    Date DATE,
    groupID INT NOT NULL,
    FOREIGN KEY(groupID) REFERENCES Groups(id),
    FOREIGN KEY(Who_paid) REFERENCES Users(id)
);

CREATE TABLE Dues (
    venmo TEXT NOT NULL,
    expenseID INTEGER NOT NULL,
    Shares DOUBLE(7,2) NOT NULL,
    Paid BOOLEAN NOT NULL,
    groupID INT NOT NULL,
    FOREIGN KEY(groupID) REFERENCES Groups(id),
    FOREIGN KEY(expenseID) REFERENCES Expenses(id)
);
