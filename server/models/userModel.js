const { makeTransaction } = require('./utils');
const { v4: uuidv4 } = require('uuid');

async function getUser(userID) {
  const query = `SELECT * FROM "Users" WHERE "userID" = $1`;
  const values = [ userID ];
  const result = await makeTransaction(query, values);
  userInfo = result.rows[0];
  return userInfo;
};

async function getUserExpenses(userID, unpaidOnly = null) {
  var query = `SELECT * FROM "Expenses" NATURAL JOIN "Dues" WHERE "userID" = $1::int`;
  var values = [ Number(userID) ];
  if (unpaidOnly !== null) {
    query += ` AND "paid" = $2`;
    values.push(unpaidOnly);
  }
  query += ` ORDER BY "date";`;
  const result = await makeTransaction(query, values);
  return result.rows;
};

async function getUserGroups(userID) {
  const query = `SELECT g.* FROM "Groups" g NATURAL JOIN "User_Groups" WHERE "userID" = $1::int`;
  const values = [ Number(userID) ];
  const result = await makeTransaction(query, values);
  return result.rows;
};

async function getUserDebt(userID, debtorID) {
  let query = `SELECT COALESCE(SUM(amount), 0.00) AS debt FROM "Dues" d NATURAL JOIN "Expenses" e WHERE "userID" = $1::int AND "paid" = false`;
  let values = [ Number(userID) ];
  if (debtorID !== undefined) {
    query += ` AND "who_paid" = $2::int`;
    values.push(Number(debtorID));
  }
  query += `;`;
  const result = await makeTransaction(query, values);
  return result.rows[0]
};

async function payDebtor(userID, debtorID) {
  const query = `UPDATE "Dues" SET "paid" = true WHERE "userID" = $1::int AND "who_paid" = $2::int`;
  const values = [ Number(userID), Number(debtorID) ];
  const result = await makeTransaction(query, values);
  return result.rows[0];
}

async function addUser(email, name, venmo) {
  const query = `INSERT INTO "Users" ("email", "name", "venmo") VALUES ($1, $2, $3)`;
  const values = [ email, name, venmo ];
  const result = await makeTransaction(query, values);
  return result.rows[0];
}

async function deleteUser(userID) {
  const query = `DELETE FROM "Users" WHERE "userID" = $1::int`;
  const values = [ Number(userID) ];
  const result = await makeTransaction(query, values);
  return result.rows[0];
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
  