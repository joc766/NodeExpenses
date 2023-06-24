const { makeTransaction } = require('./utils');
const { getUser } = require('./userModel');
const {v4: uuidv4 } = require('uuid');
const pool = require('../config/db');

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

    // return result.rows[0];
    return
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
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
    
        // Step 1: Retrieve the expenseIDs associated with the groupID
        const expenseIdsResult = await client.query(
          'DELETE FROM "Group_Expenses" WHERE "groupID" = $1 RETURNING "expenseID";',
          [groupID]
        );
        const expenseIds = expenseIdsResult.rows.map((row) => row.expenseID);
    
        // Step 2: Delete the Dues associated with the expenseIDs
        await client.query('DELETE FROM "Dues" WHERE "expenseID" = ANY($1);', [expenseIds]);
    
        // Step 3: Delete the Expenses associated with the expenseIDs
        await client.query('DELETE FROM "Expenses" WHERE "expenseID" = ANY($1);', [expenseIds]);

        // Step 4: Delete the User_Groups associated with thte groupID
        await client.query('DELETE FROM "User_Groups" WHERE "groupID" = $1;', [groupID])
    
        // Step 5: Delete the Group itself
        await client.query('DELETE FROM "Groups" WHERE "groupID" = $1;', [groupID]);
    
        await client.query('COMMIT');
        // console.log('Group and associated Expenses and Dues deleted successfully.');
      }
    catch (err) {
        client.query('ROLLBACK');
        console.error('Error deleting group and associated Expenses and Dues:', err);
        throw err;
    }
    finally {
        client.release();
    }
}

async function deleteGroupUser(groupID, userID) {
    const query = `DELETE FROM "User_Groups" WHERE "groupID" = $1 AND "userID" = $2;`;
    const values = [ groupID, userID ];
    const result = await makeTransaction(query, values);
    return result;
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