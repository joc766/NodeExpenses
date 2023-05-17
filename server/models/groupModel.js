const pool = require('../config/db.js');

async function getGroup(groupID) {
    // TODO
    // Query: SELECT * FROM Groups WHERE groupID = :groupID
};

async function getGroupUsers(groupid) {
    // TODO
    // Query: SELECT u.* FROM Users u JOIN User_Groups ug ON u.userID = ug.userID WHERE ug.groupID = :groupID
};

async function getGroupExpenses(groupID) {
    // TODO
    // Query: SELECT * FROM Expenses WHERE groupID = :groupID;
};

// TODO double check that groups auto-receive an ID
async function addGroup(name) {
    // TODO
    // Query: INSERT INTO groups (groupName) VALUES (:name)
};

async function addGroupUser(groupID, userID) {
    // TODO
    // Query: INSERT INTO User_Groups (groupID, userID) VALUES (:groupID, :userID)
};

async function deleteGroup(groupID) {
    // TODO
    // Query: DELETE FROM Groups WHERE groupID = :groupID;
}

async function deleteGroupUser(groupID, userID) {
    // TODO 
    // Query: DELETE FROM User_Groups WHERE gr
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