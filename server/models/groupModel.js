const { getClient, closeClient, makeTransaction } = require('./utils');
const { getUser } = require('./userModel');
const {v4: uuidv4 } = require('uuid');

async function getGroup(groupID) {
    const query = `SELECT * FROM "Groups" WHERE "groupID" = $1::int`;
    const values = [ groupID ];

    const result = await makeTransaction(query, values);

    if (result.rows.length == 0) {
        return null;
    }
    groupInfo = result.rows[0];

    return groupInfo;
};

async function getGroupUsers(groupID) {
    const query = `SELECT u.* FROM "Users" u NATURAL JOIN "User_Groups" ug WHERE ug."groupID" = $1::int`;
    const values = [ groupID ];

    const result = await makeTransaction(query, values);

    return result.rows;
};

async function getGroupExpenses(groupID) {
    if (!getGroup(groupID)) {
        return null;
    }

    const query = `SELECT e.* FROM "Group_Expenses" g NATURAL JOIN "Expenses" e WHERE "groupID" = $1::int;`;
    const result = await makeTransaction(query, values);

    return result.rows;
};

// TODO double check that groups auto-receive an ID
async function addGroup(name) {
    // TODO TEMP FIX NOT GOOD
    const checkQuery = `SELECT MAX("groupID") FROM "Groups";`
    const checkResult = await makeTransaction(checkQuery, []);
    const newId = checkResult.rows[0]["max"] + 1;

    const query = `INSERT INTO "Groups" ("groupID", group_name) VALUES ($1::int, $2);`;
    const values = [ newId, name ];

    const result = await makeTransaction(query, values);

    return result.rows[0];
};

async function addGroupUser(groupID, userID) {
    // TODO should really be throwing multiple different types of errors here so we can display a message
    // need to learn how to catch specific errors here

    const group = await getGroup(groupID);
    const user = await getUser(userID);

    if (!group || !user) {
        throw Error
    }

    const query = `INSERT INTO "User_Groups" ("groupID", "userID") VALUES ($1::int, $2::int);`;
    const values = [ groupID, userID ];

    const result = await makeTransaction(query, values);

    return result
};

async function deleteGroup(groupID) {
    // TODO MAKE SURE THE GROUP EXISTS
    try {
        const query = `DELETE FROM "Groups" WHERE "groupID" = $1;`;
        const values = [ groupID ];
        try {
            const result = await makeTransaction(client, query, values);
            return result
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    catch (err) {
        throw err;
    }
    finally {
        closeClient(client);
    }
}

async function deleteGroupUser(groupID, userID, cnxn=null) {
    // TODO MAKE SURE THE USER EXISTS IN THE GROUP
    const client = await getClient(cnxn);
    try {
        const query = `DELETE FROM "User_Groups" WHERE "groupID" = $1 AND "userID" = $2;`;
        const values = [ groupID, userID ];
        try {
            const result = await makeTransaction(client, query, values);
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    catch (err) {
        throw err;
    }
    finally {
        closeClient(client);
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