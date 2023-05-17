const pool = require('../config/db.js');

async function getUser(userID) {
  // const result = await pool.query(`SELECT * FROM Users WHERE id = :userID`, { userID });
  // userInfo = result.rows[0];
  // return userInfo;
}

async function getUserExpenses(userID, unpaidOnly = false) {
  // TODO 
  // Query: SELCT * FROM Expenses WHERE userID = userID AND paid = ${unpaidOnly} ORDER BY date;
}

async function getUserGroups(userID) {
  // TODO
  // Query: SELECT g.* FROM Groups g JOIN User_Groups ug ON g.groupID = ug.groupID WHERE ug.userID = :userID

}

async function getUserDebt(userID) {
  // TODO 
  // Query: SELECT SUM(amount) FROM Dues WHERE userID = :userID AND paid = false; 
  //
}

async function getUserDebt(userID, debtorID) {
  // TODO
  // Query: SELECT SUM(d.amount) FROM Dues d JOIN Expenses e on d.expenseID = e.ExpenseID WHERE userID = :userID AND paid = false AND debtorID = :debtorID;
}

async function payDebtor(userID, debtorID) {
  // TODO
  // Query: UPDATE Dues 
  // SET paid = true 
  // FROM Expenses
  // WHERE Dues.expenseID = Expenses.expenseID
  // AND Expenses.who_paid = :debtorID
  // AND Dues.userID = :userID;
}

async function addUser(uid, email, name, venmo) {
  // TODO
  // Query: INSERT INTO Users (userID, email, name, venmo) VALUES (:uid, :email, :name, :venmo)
}

async function deleteUser(userID) {
  // TODO
  // Query: DELETE FROM Users WHERE userID = :userID;
}
  
module.exports = {
  getUser,
  getUserExpenses,
  getUserGroups,
  getUserDebt,
  addUser,
  payDebtor,
  deleteUser
};
  