const mockUsers = require('./mockUsers.json');
const mockDueExpenses = require('./mockDueExpenses.json');
const mockUserGroups = require('./mockUserGroups.json');

async function getUser(userID) {
    if (userID != 1) {
        return null;
    }
    return mockUsers.find(user => user.userID == userID);
};

async function getUserExpenses(userID, unpaidOnly = null) {
    if (userID != 1) {
        return null;
    }
    var result = mockDueExpenses.filter(expense => expense.userID == userID)
    if (unpaidOnly != null) {
        result = result.filter(expense => expense.paid == unpaidOnly)
    }
    return result
}

async function getUserGroups(userID) {
    if (userID != 1) {
        return null;
    }
    return mockUserGroups.filter(group => group.userID == userID)
}

async function getUserDebt(userID, debtorID) {
    if (userID != 1) {
        return null;
    }
    var expectedUnpaid = mockDueExpenses.filter(expense => expense.userID == userID && expense.paid === false);
    if (debtorID != undefined) {
        expectedUnpaid = expectedUnpaid.filter(expense => expense.who_paid == debtorID);
    }
    const expectedDebt = expectedUnpaid.reduce((total, expense) => total + expense.amount, 0);
    return {debt: expectedDebt}
}

async function payDebtor(userID, debtorID) {
    return
}

async function addUser(email, name, venmo, userID = 4) {
    if (!userID) {
        const userID = uuidv4();
    }
    if (!email || !name || !venmo) {
        return null;
    }
    const newUser = mockUsers[0];
    return newUser
}

async function deleteUser(userID) {
    return mockUsers.find(user => user.userID == userID);
}

module.exports = {
    getUser,
    getUserExpenses,
    getUserGroups,
    getUserDebt,
    addUser,
    payDebtor,
    deleteUser,
}