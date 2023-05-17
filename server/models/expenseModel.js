const pool = require('../config/db');

async function getExpense(expenseId) {
    // TODO 
    // Query: SELECT * FROM expenses WHERE id = expenseId;
};

async function getExpenseContributors(expenseId) {
    // TODO 
    // Query: SELECT u.*, d.* FROM users u JOIN dues d ON u.id = d.userID WHERE d.expenseID = expenseId;
};

module.exports = {
    getExpense,
    getExpenseContributors
};