const pool = require('../config/db.js');

async function getUserById(userId) {
  // const result = await pool.query(`SELECT * FROM Users WHERE id = :userId`, { userId });
  // userInfo = result.rows[0];
  // return userInfo;
}

async function getUserTransactions(userId, params) {
  // TODO 
  const unpaidOnly = params.unpaidOnly || false;
  // Query: SELCT * FROM Transactions WHERE userId = userId AND paid = ${unpaidOnly} ORDER BY date;
}

async function getUserGroups(userId) {
  // TODO
  // Query: SELECT g.* FROM Groups g JOIN User_Groups ug ON g.groupId = ug.groupId WHERE ug.userId = :userId

}

async function addUser(uid, email, name, venmo) {
  // TODO
  // Query: INSERT INTO Users (userId, email, name, venmo) VALUES (:uid, :email, :name, :venmo)
}

async function payDebtor(userId, debtorId) {
  // TODO
  // Query: UPDATE Dues 
  // SET paid = true 
  // FROM Expenses
  // WHERE Dues.expenseId = Expenses.expenseId
  // AND Expenses.who_paid = :debtorId
  // AND Dues.userId = :userId;
}

async function deleteUser(uid) {
  // TODO
  // Query: DELETE FROM Users WHERE userId = :uid;
}
  
module.exports = {
  getUserById,
  getUserTransactions,
  getUserGroups,
  addUser,
  payDebtor,
  deleteUser
};
  