const mockGroups = require('./mockGroups.json');
const mockDueExpenses = require('./mockDueExpenses.json');
const mockUserGroups = require('./mockUserGroups.json');
const mockUsers = require('./mockUsers.json');
const mockExpenses = require('./mockExpenses.json');

async function getGroup(groupID) {
    if (groupID > 3) {
        return null;
    }
    const group = mockGroups.find(group => group.groupID == groupID);
    return group;
};

async function getGroupUsers(groupID) {
    const expectedGroupUsers = mockUserGroups.filter(entry => entry.groupID == groupID);
    if (expectedGroupUsers.length == 0) {
        return null;
    }
    let expectedUsers = [];
    for (let i = 0; i < expectedGroupUsers.length; i++) {
      let user = mockUsers.find(user => user.userID == expectedGroupUsers[i].userID);
      expectedUsers.push(user);
    }
    return expectedUsers;
};

async function getGroupExpenses(groupID) {
    const expectedExpenses = mockExpenses.filter(expense => expense.groupID == groupID);
    if (expectedExpenses.length === 0) {
        return null;
    }
    return expectedExpenses;
};

// TODO double check that groups auto-receive an ID
async function addGroup(groupName) {
    if (groupName) {
        return
    }
    else {
        throw Error;
    }
};

async function addGroupUser(groupID, userID) {
    if (groupID && userID) {
        return
    }
    else {
        throw Error;
    }
};

async function deleteGroup(groupID) {
    console.log(groupID);
    if (groupID > 3) {
        throw Error;
    }
    else {
        return
    }
}

async function deleteGroupUser(groupID, userID) {
    if (!groupID || !userID) {
        throw Error;
    }
    else {
        return
    }
}


module.exports = {
    getGroup,
    getGroupUsers,
    getGroupExpenses,
    addGroup,
    addGroupUser,
    deleteGroup,
    deleteGroupUser
}