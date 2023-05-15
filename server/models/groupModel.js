const pool = require('../config/db.js');

async function getGroup(groupId) {
    // TODO
    // Query: SELECT * FROM Groups WHERE groupId = :groupId
}

async function getGroupUsers(groupid) {
    // TODO
    // Query: SELECT u.* FROM Users u JOIN User_Groups ug ON u.userId = ug.userId WHERE ug.groupId = :groupId
}

async function getGroupExpenses(groupId) {
    // TODO
    // Query: SELECT * FROM Expenses WHERE groupId = :groupId;
}

// TODO double check that groups auto-receive an ID
async function addGroup(name) {
    // TODO
    // Query: INSERT INTO groups (groupName) VALUES (:name)
}

async function addGroupUser(groupId, userId) {
    // TODO
    // Query: INSERT INTO User_Groups (groupId, userID) VALUES (:groupId, :userId)
}


module.exports = {
    getGroup,
    getGroupUsers,
    getGroupExpenses,
    addGroup,
    addGroupUser
}