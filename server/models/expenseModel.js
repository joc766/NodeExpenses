const pool = require('../config/db');
const { makeTransaction } = require('./utils');

async function getExpense(expenseID) {
    const query = `SELECT title, amount, descrip, "who_paid", "n_shares", date FROM "Expenses" WHERE "expenseID" = $1 ORDER BY date;`;
    const values = [ expenseID ];
    const result = await makeTransaction(query, values);
    if (result.rows.length == 0) {
        return null;
    }
    return result.rows[0];
};

async function getExpenseContributors(expenseID) {
    if (!getExpense(expenseID)) {
        return null;
    }
    const query = `SELECT "userID", email, "user_name", venmo FROM "Users" NATURAL JOIN "Dues" WHERE "expenseID" = $1;`;
    const values = [ expenseID ];
    const result = await makeTransaction(query, values);
    return result.rows
};

async function addExpense(groupID, title, amt, descrip, who_paid, date, shares) {
    const client = await pool.connect();
    try {
        client.query('BEGIN');
        const n_shares = shares.length;
        const values1 = [title, amt, descrip, who_paid, n_shares, date];
        const query1 = 'INSERT INTO "Expenses" (title, amount, descrip, "who_paid", "n_shares", date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING "expenseID";';
        const result = await makeTransaction(query1, values1);
        const expenseID = result.rows[0]["expenseID"];

        const query2 = 'INSERT INTO "Group_Expenses" ("groupID", "expenseID") VALUES ($1, $2);';
        const values2 = [groupID, expenseID];
        await makeTransaction(query2, values2);

        // TODO protect against injection attack and come back to a better way of constructing this.
        let initQuery = 'INSERT INTO Dues (expenseID, userID, shares, paid) VALUES \n';
        let query3 = shares.reduce((query, userID, shares) => {
            const paid = userID === who_paid;
            // probably want to precheck these values for bad actors
            query += `("${expenseID}", "${userID}", ${shares}, ${paid}), \n`;
            return query
        }, initQuery)
        query3 += ';'
        console.log(query3);
        await makeTransaction(query3, []);

        client.query('COMMIT');
        const newDues = pool.query(query2);
        return
    }
    catch (err) {
        console.log('ROLLED BACK');
        client.query('ROLLBACK');
        throw err;
    }
    finally {
        client.release();
    }
}

async function deleteExpense(expenseID) {
    const client = await pool.connect();
    try {
        client.query('BEGIN');

        const query1 = `DELETE FROM "Dues" WHERE "expenseID" = $1;`;
        client.query(query1, [expenseID]);

        const query2 = `DELETE FROM "Group_Expenses" WHERE "expenseID" = $1;`;
        client.query(query2, [expenseID]);

        const query3 = `DELETE FROM "Expenses" WHERE "expenseID" = $1;`;
        client.query(query3, [expenseID]);

        client.query('COMMIT');
    }
    catch (err) {
        client.query('ROLLBACK');
    }
    finally {
        client.release()
    }
}

module.exports = {
    getExpense,
    getExpenseContributors,
    addExpense,
    deleteExpense
};