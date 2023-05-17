const pool = require('../config/db');

async function getExpense(expenseID) {
    // TODO 
    // Query: SELECT * FROM expenses WHERE id = expenseID;
};

async function getExpenseContributors(expenseID) {
    // TODO 
    // Query: SELECT u.*, d.* FROM users u JOIN dues d ON u.id = d.userID WHERE d.expenseID = expenseID;
};

module.exports = {
    getExpense,
    getExpenseContributors
};