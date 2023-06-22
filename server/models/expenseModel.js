const pool = require('../config/db');
const { getClient, closeClient, makeTransaction } = require('./utils');

async function getExpense(expenseID, cnxn=null) {
    const client = await getClient(cnxn);
    const query = `SELECT title, amount, descrip, "who_paid", "n_shares", date FROM expenses WHERE id = $1 ORDER BY date;`;
    const values = [ expenseID ];
    try {
        const result = await makeTransaction(client, query, values);
        if (result.rows.length == 0) {
            return null;
        }
        return result.rows[0];
    }
    catch (err) {
        console.log(err);
        client.query('ROLLBACK');
        throw err;
    }
    finally {
        closeClient(client);
    }
};

async function getExpenseContributors(expenseID, cnxn=null) {
    const client = getClient(cnxn);
    const query = `SELECT userID, email, name, venmo FROM "Users" NATURAL JOIN "Dues" WHERE expenseID = $1;`;
    const values = [ expenseID ];
    try {
        // check that the expense exists
        if (!getExpense(expenseID)) {
            return null;
        }
        const result = await makeTransaction(client, query, values);
        return result.rows
    }
    catch (err) {
        console.log(err);
        client.query('ROLLBACK');
        throw err;
    }
    finally {
        closeClient(client);
    }

};

async function addExpense(title, amt, descrip, who_paid, date, shares, cnxn=null) {
    const client = getClient(cnxn);
    try {
        const n_shares = shares.length;
        const values = [title, amt, descrip, who_paid, n_shares, date];
        const query1 = 'INSERT INTO Expenses (title, amount, descrip, who_paid, n_shares, date) VALUES ($1, $2, $3, $4, $5, $6);';
        const result = makeTransaction(client, query1, values);
        const newExpense = result.rows[0]
        const query2 = 'INSERT INTO Dues (expenseID, userID, shares, paid) VALUES \n';
        for (obj of shares) {
            for (key in obj) {
                const userID = key;
                const shares = obj[key];
                const paid = userID === who_paid;
                // probably want to precheck these values for bad actors
                query2 += `(${newExpense.expenseID}, ${userID}, ${shares}, ${paid}),\n`;
            }
        }
        query2 += ';'
        console.log(query2);
        const newDues = pool.query(query2);
        return newDues
    }
    catch (err) {
        client.query('ROLLBACK');
        throw err;
    }
    finally {
        closeClient(client);
    }
}

async function deleteExpense(expenseID) {
    // TODO
    // Queries:
    // - DELETE FROM Dues WHERE expenseID = :expenseID
    // - Delete FROM Expenses WHERE expenseID = :expenseID
}

module.exports = {
    getExpense,
    getExpenseContributors,
    addExpense,
    deleteExpense
};