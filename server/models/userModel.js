const pool = require('../config/db.js');

async function getUser(userID) {
  const client = await pool.connect();
  try {
    var result = await client.query(`SELECT * FROM "Users" WHERE "userID" = $1`, [ userID ]);
    await client.query('COMMIT');
  }
  catch (err) {
    console.log(err);
    await client.query('ROLLBACK');
    throw err;
  }
  finally {
    client.release();
  }
  userInfo = result.rows[0];
  return userInfo;
}

async function getUserExpenses(userID, unpaidOnly = null) {
  const client = await pool.connect();
  try {
    var query = `SELECT * FROM "Expenses" NATURAL JOIN "Dues" WHERE "userID" = $1::int`;
    var values = [ Number(userID) ];
    if (unpaidOnly !== null) {
      query += ` AND "paid" = $2`;
      values.push(unpaidOnly);
    }
    query += ` ORDER BY "date";`;
    // console.log(query, values)
    var result = await client.query(query, values);
    await client.query('COMMIT');
  }
  catch (err) {
    console.log(err);
    await client.query('ROLLBACK');
    throw err;
  }
  finally {
    client.release();
  }
  return result.rows;
}

async function getUserGroups(userID) {
  // TODO
  // Query: SELECT g.* FROM Groups g JOIN User_Groups ug ON g.groupID = ug.groupID WHERE ug.userID = :userID
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
  