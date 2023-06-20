const { makeTransaction } = require('./utils');
const {v4: uuidv4 } = require('uuid');

async function getGroup(groupID) {
    const query = `SELECT * FROM "Groups" WHERE "groupID" = $1::int`;
    const values = [ groupID ];
    try {
        const result = await makeTransaction(query, values);
        groupInfo = result.rows[0];
        return groupInfo;
    }
    catch (err) {
        throw err;
    }
};

async function getGroupUsers(groupID) {
    const query = `SELECT u.* FROM "Users" u NATURAL JOIN "User_Groups" ug WHERE ug."groupID" = $1::int`;
    const values = [ groupID ];
    try {
        const result = await makeTransaction(query, values);
        return result.rows;
    }
    catch (err) {
        throw err;
    }
};

async function getGroupExpenses(groupID) {
    const checkQuery = `SELECT * FROM "Groups" WHERE "groupID" = $1::int;`;
    const values = [groupID];
    try {
        const result = await makeTransaction(checkQuery, values);
        if (result.rows.length == 0) {
            return null;
        }
    }
    catch (err) {
        throw err;
    }
    const query = `SELECT e.* FROM "Group_Expenses" g NATURAL JOIN "Expenses" e WHERE "groupID" = $1::int;`;
    try {
        const result = await makeTransaction(query, values);
        return result.rows;
    }
    catch (err) {
        throw err;
    }
};

// TODO double check that groups auto-receive an ID
async function addGroup(name) {
    // TODO TEMP FIX NOT GOOD
    const checkQuery = `SELECT MAX("groupID") FROM "Groups";`
    const checkResult = await makeTransaction(checkQuery, []);
    const newId = checkResult.rows[0]["max"] + 1;
    const query = `INSERT INTO "Groups" ("groupID", group_name) VALUES ($1::int, $2);`;
    const values = [ newId, name ];
    try {
        const result = await makeTransaction(query, values);
        return result.rows[0];
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

async function addGroupUser(groupID, userID) {
    // TODO should really be throwing multiple different types of errors here so we can display a message
    // need to learn how to catch specific errors here
    // Query: INSERT INTO User_Groups (groupID, userID) VALUES (:groupID, :userID)
    const checkQuery1 = `SELECT * FROM "Groups" WHERE "groupID" = $1::int;`;
    const checkQuery2 = `SELECT * FROM "Users" WHERE "userID" = $1::int;`;
    try {
        const result1 = await makeTransaction(checkQuery1, [ groupID ]);
        const result2 = await makeTransaction(checkQuery2, [ userID ]);
        if (result1.rows.length == 0 || result2.rows.length == 0) {
            throw Error
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }

    const query = `INSERT INTO "User_Groups" ("groupID", "userID") VALUES ($1::int, $2::int);`;
    const values = [ groupID, userID ];
    try {
        const result = await makeTransaction(query, values);
        return result
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    
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