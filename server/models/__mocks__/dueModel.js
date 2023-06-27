const mockDueExpenses = require('./mockDueExpenses.json');

async function getDue(expenseID, userID) {
    const due = mockDueExpenses.find(dueExpense => dueExpense.expenseID == expenseID && dueExpense.userID == userID);
    console.log(due);
    if (!due) {
        return null
    }
    return due;
}

async function payDue(expenseID, userID) {
    return 
};

module.exports = {
    getDue,
    payDue
}