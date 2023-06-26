const mockDueExpenses = require('./mockDueExpenses.json');
const mockExpenses = require('./mockExpenses.json');
const mockUsers = require('./mockUsers.json');

async function getExpense(expenseID) {
    return mockExpenses.find(expense => expense.expenseID == expenseID);
}

async function getExpenseContributors(expenseID) {
    const expectedDues = mockDueExpenses.filter(due => due.expenseID == expenseID);
    if (expectedDues.length == 0) {
        return null;
    }
    const expectedUsers = expectedDues.map(due => mockUsers.find(user => user.userID = due.userID))
    return expectedUsers;
}

async function addExpense(groupID, title, amt, descrip, who_paid, date, shares) {
    return
}

async function deleteExpense(expenseID) {
    return
}

module.exports = {
    getExpense,
    getExpenseContributors,
    addExpense,
    deleteExpense
}