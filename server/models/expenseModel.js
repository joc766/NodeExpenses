const pool = require('../config/db');

async function getExpense(expenseID) {
    // TODO 
    // Query: SELECT * FROM expenses WHERE id = expenseID;
};

async function getExpenseContributors(expenseID) {
    // TODO 
    // Query: SELECT u.*, d.* FROM users u JOIN dues d ON u.id = d.userID WHERE d.expenseID = expenseID;
};

async function addExpense(title, amt, descrip, who_paid, date, shares) {
    // NOT SURE ABOUT EXACT SYNTAX HERE BUT LOGIC IS GOOD FOR NOW.
    const n_shares = shares.length;
    const values = {title: title, amt: amt, descrip: descrip, who_paid: who_paid, n_shares: n_shares, date: date};
    const query1 = 'INSERT INTO Expenses (title, amount, descrip, who_paid, n_shares, date) VALUES (:title, :amt, :descrip, :who_paid, :n_shares, :date);'
    const result = await pool.query(query1, values)
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
    const newDues = pool.query(query2);
    return newDues
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