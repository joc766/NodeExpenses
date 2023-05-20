const mockUsers = require('./mockUsers.json');

async function getUser(userID) {
    return mockUsers[0]
};

async function getUserExpenses(userID, unpaidOnly = null) {
    return mockUsers[0]
}

async function getUserGroups(userID) {
    return mockUsers[0]
}

async function getUserDebt(userID, debtorID) {
    return mockUsers[0]
}

async function payDebtor(userID, debtorID) {
    return mockUsers[0]
}

async function addUser(userID, debtorID) {
    return mockUsers[0]
}

async function deleteUser(userID, debtorID) {
    return mockUsers[0]
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