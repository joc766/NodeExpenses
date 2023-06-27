const pool = require('../config/db');
const { makeTransaction } = require('./utils');

// This model kind of has no reason to add or delete dues as they are created/deleted along with expenses

async function getDue(expenseID, userID) {
    const query = `SELECT * FROM "Dues" NATURAL JOIN "Expenses" WHERE "expenseID" = $1 AND "userID" = $2;`;
    const values = [expenseID, userID];
    const result = await makeTransaction(query, values);

    return result.rows[0];
}

async function payDue(expenseID, userID) {
    const query = `UPDATE "Dues" SET paid = true WHERE "expenseID" = $1 AND "userID" = $2;`;
    const values = [expenseID, userID];
    const result = await makeTransaction(query, values);

    return
};

async function unpayDue(expenseID, userID) {
    const query = `UPDATE "Dues" SET paid = false WHERE "expenseID" = $1 AND "userID" = $2;`;
    const values = [expenseID, userID];
    const result = await makeTransaction(query, values);

    return
};

module.exports = {
    getDue,
    payDue,
    unpayDue
}