const pool = require('../config/db.js');

async function getUserById(userId) {
  const result = await pool.query(`SELECT * FROM Users WHERE id = ${userId}`);
  userInfo = result.rows[0];
  return userInfo;
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
  
module.exports = {
  getUserById,
  getUserTransactions,
  getUserGroups
};
  